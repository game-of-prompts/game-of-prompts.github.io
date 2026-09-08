import { localizedLabel } from './labels.js';
/*
 * src/lib/immersive/scene-kit.js
 * ------------------------------------------------------------------
 * Shared drawing primitives for every procedural canvas scene on the
 * Game of Prompts landing page.
 *
 * Contract for a scene function:
 *   draw(ctx, { width, height, progress, palette, mouse, time, align })
 * It must be a PURE function of those inputs — no hidden state — so a
 * single paint at progress = 1 is a valid reduced-motion fallback.
 *
 * Colours are never hardcoded: PinnedScene resolves the palette from
 * the CSS custom properties in app.css at draw time and repaints on
 * theme flips, so every canvas re-themes with the rest of the page.
 */

import { clamp, smoothstep } from '$lib/motion.js';

/** Stable hash-based "random" in [0,1); same input → same output. */
export function rand(i) {
	const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
	return x - Math.floor(x);
}

/** `rgba()` from an "r, g, b" triple string plus alpha. */
export function rgba(triple, alpha) {
	return `rgba(${triple}, ${alpha})`;
}

/** Rounded rectangle path (older Safari lacks ctx.roundRect). */
export function roundRect(ctx, x, y, w, h, r) {
	const radius = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + w - radius, y);
	ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
	ctx.lineTo(x + w, y + h - radius);
	ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
	ctx.lineTo(x + radius, y + h);
	ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
}

/**
 * Faint dot-grid backdrop shared by every scene, with a soft glow behind
 * the focal point. The grid parallaxes slightly toward the cursor.
 */
export function backdrop(ctx, width, height, palette, progress, mouse, align = 'left') {
	const step = 46;
	const px = (mouse.x - 0.5) * 18;
	const py = (mouse.y - 0.5) * 18;
	ctx.save();
	ctx.fillStyle = palette.grid;
	for (let x = -step; x < width + step; x += step) {
		for (let y = -step; y < height + step; y += step) {
			ctx.beginPath();
			ctx.arc(x + px, y + py, 1.1, 0, Math.PI * 2);
			ctx.fill();
		}
	}
	// Glow tracks the stage side so it never lights up the caption column.
	const gx = width * (align === 'center' ? 0.5 : align === 'right' ? 0.34 : 0.66);
	const glow = ctx.createRadialGradient(
		gx,
		height * 0.5,
		0,
		gx,
		height * 0.5,
		Math.max(width, height) * 0.6
	);
	glow.addColorStop(0, rgba(palette.onSurfaceRgb, 0.05 + 0.05 * smoothstep(progress)));
	glow.addColorStop(1, 'rgba(0,0,0,0)');
	ctx.fillStyle = glow;
	ctx.fillRect(0, 0, width, height);
	ctx.restore();
}

/**
 * Layout anchor. The caption occupies one side of the pinned section, so
 * the visual composes into the OTHER side: `align: 'left'` copy → stage
 * on the right, and vice versa. On compact viewports the copy sits in a
 * scrim along the bottom, so the stage centres and rides high instead.
 */
export function stage(width, height, align = 'left') {
	const compact = width < 820;
	// 'center' is what the static/reduced-motion layout asks for: the copy
	// is below the canvas there, so the visual gets the whole frame.
	const centred = compact || align === 'center';
	return {
		compact,
		cx: centred ? width * 0.5 : width * (align === 'right' ? 0.32 : 0.68),
		cy: compact ? height * 0.3 : height * 0.5,
		scale: Math.min(compact ? width / 460 : width / 1500, height / 760) * (compact ? 1 : 1.3)
	};
}

/** A dot travelling along a segment; `k` is 0–1 along the path. */
export function packet(ctx, ax, ay, bx, by, k, colour, alpha = 1, radius = 3.2) {
	ctx.save();
	ctx.globalAlpha = alpha * (1 - Math.abs(k - 0.5) * 1.1);
	ctx.fillStyle = colour;
	ctx.beginPath();
	ctx.arc(ax + (bx - ax) * k, ay + (by - ay) * k, radius, 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();
}

/**
 * Draw a label pinned to a point in the scene. Canvas text is the one
 * place a scene can state a term ("SOLVER", "COMMITMENT") that the
 * caption beside it is talking about.
 */
export function label(ctx, text, x, y, palette, alpha = 1, size = 12, weight = 700) {
	if (alpha <= 0.01) return;
	ctx.save();
	ctx.globalAlpha = alpha;
	ctx.font = `${weight} ${size}px 'JetBrains Mono', ui-monospace, monospace`;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.8);
	ctx.fillText(localizedLabel(text), x, y, Math.min(200, ctx.canvas.clientWidth * 0.34));
	ctx.restore();
}

/**
 * The sealed-service glyph: a rounded box whose four edges draw
 * themselves in sequence, then tint. Both the game-service and the
 * solver-service are Celaut services — sealed, content-addressed
 * boxes — so this glyph recurs wherever that idea does.
 *
 * `t` 0 → 1 controls the seal.
 */
export function sealedBox(ctx, x, y, w, h, t, palette, { tint = true, scan = 0, colour } = {}) {
	const s = smoothstep(clamp(t));
	if (s <= 0) return;
	const stroke = colour || palette.node;
	ctx.save();
	ctx.strokeStyle = stroke;
	ctx.lineWidth = 2.4;
	ctx.lineCap = 'round';
	const edges = [
		[x, y, x + w, y],
		[x + w, y, x + w, y + h],
		[x + w, y + h, x, y + h],
		[x, y + h, x, y]
	];
	edges.forEach((e, i) => {
		const k = clamp((s - i * 0.2) / 0.4);
		if (k <= 0) return;
		ctx.beginPath();
		ctx.moveTo(e[0], e[1]);
		ctx.lineTo(e[0] + (e[2] - e[0]) * k, e[1] + (e[3] - e[1]) * k);
		ctx.stroke();
	});
	if (tint && s > 0.85) {
		ctx.globalAlpha = 0.08;
		ctx.fillStyle = stroke;
		roundRect(ctx, x, y, w, h, 4);
		ctx.fill();
	}
	if (scan > 0 && s > 0.85) {
		ctx.globalAlpha = 0.3;
		const scanY = y + ((scan * 60) % h);
		ctx.strokeStyle = stroke;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(x, scanY);
		ctx.lineTo(x + w, scanY);
		ctx.stroke();
	}
	ctx.restore();
}

/**
 * A short row of monospace "hash" glyphs. Commitments are the spine of
 * the whole Game of Prompts protocol, so several scenes need to show a
 * digest materialising. `settle` 0 → 1 scrambles → locks the characters.
 */
const HEX = '0123456789abcdef';
export function hashStrip(ctx, x, y, w, chars, seed, settle, palette, alpha = 1, size = 12) {
	if (alpha <= 0.01) return;
	ctx.save();
	ctx.globalAlpha = alpha;
	ctx.font = `600 ${size}px 'JetBrains Mono', ui-monospace, monospace`;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	const gap = w / chars;
	for (let i = 0; i < chars; i++) {
		const locked = settle > (i + 0.5) / chars;
		const idx = locked
			? Math.floor(rand(seed + i) * 16)
			: Math.floor(rand(seed + i + Math.floor(settle * 400)) * 16);
		ctx.fillStyle = locked ? palette.node : palette.dim;
		ctx.fillText(HEX[idx], x + gap * (i + 0.5), y);
	}
	ctx.restore();
}

/** A small trophy/throne silhouette — the prize at the end of a game. */
export function trophy(ctx, cx, cy, size, t, palette, alpha = 1) {
	const s = smoothstep(clamp(t));
	if (s <= 0.01 || alpha <= 0.01) return;
	ctx.save();
	ctx.globalAlpha = alpha * s;
	ctx.strokeStyle = palette.warm;
	ctx.lineWidth = Math.max(1.6, size * 0.055);
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	const w = size;
	const h = size * 1.1;
	const x = cx - w / 2;
	const y = cy - h / 2;
	// Cup
	ctx.beginPath();
	ctx.moveTo(x + w * 0.2, y);
	ctx.lineTo(x + w * 0.8, y);
	ctx.lineTo(x + w * 0.72, y + h * 0.45);
	ctx.quadraticCurveTo(x + w * 0.5, y + h * 0.62, x + w * 0.28, y + h * 0.45);
	ctx.closePath();
	ctx.stroke();
	ctx.globalAlpha = alpha * s * 0.12;
	ctx.fillStyle = palette.warm;
	ctx.fill();
	ctx.globalAlpha = alpha * s;
	// Handles
	ctx.beginPath();
	ctx.moveTo(x + w * 0.2, y + h * 0.08);
	ctx.quadraticCurveTo(x - w * 0.1, y + h * 0.28, x + w * 0.26, y + h * 0.36);
	ctx.moveTo(x + w * 0.8, y + h * 0.08);
	ctx.quadraticCurveTo(x + w * 1.1, y + h * 0.28, x + w * 0.74, y + h * 0.36);
	ctx.stroke();
	// Stem + base
	ctx.beginPath();
	ctx.moveTo(cx, y + h * 0.6);
	ctx.lineTo(cx, y + h * 0.82);
	ctx.moveTo(x + w * 0.28, y + h * 0.95);
	ctx.lineTo(x + w * 0.72, y + h * 0.95);
	ctx.stroke();
	ctx.restore();
}

/* ==================================================================
 * HERO — cursor-reactive competitor field
 * Not scroll-scrubbed; it breathes and follows the pointer, so the very
 * first thing on the page already feels like a live arena.
 * ================================================================== */
export function drawHeroField(ctx, { width, height, palette, mouse, time }) {
	const N = width < 820 ? 24 : 42;
	const mx = mouse.x * width;
	const my = mouse.y * height;
	const pts = [];

	for (let i = 0; i < N; i++) {
		const bx = rand(i) * width;
		const by = rand(i + 100) * height;
		const drift = 18 + rand(i + 200) * 26;
		let x = bx + Math.sin(time * 0.22 + i * 1.3) * drift;
		let y = by + Math.cos(time * 0.19 + i * 0.9) * drift;
		// Competitors lean toward the cursor — the arena notices you.
		const dx = mx - x;
		const dy = my - y;
		const d = Math.hypot(dx, dy) || 1;
		if (d < 260) {
			const pull = (1 - d / 260) * 26;
			x += (dx / d) * pull;
			y += (dy / d) * pull;
		}
		pts.push({ x, y, r: 1.6 + rand(i + 300) * 2.4, d });
	}

	// Links between near neighbours. O(n²) over ≤42 points is ~900 cheap
	// distance checks per frame — an order of magnitude under the old
	// three.js particle network this replaces.
	ctx.save();
	ctx.lineWidth = 1;
	for (let i = 0; i < N; i++) {
		for (let j = i + 1; j < N; j++) {
			const dx = pts[i].x - pts[j].x;
			const dy = pts[i].y - pts[j].y;
			const d = Math.hypot(dx, dy);
			const max = width < 820 ? 130 : 175;
			if (d > max) continue;
			ctx.globalAlpha = (1 - d / max) * 0.4;
			ctx.strokeStyle = palette.link;
			ctx.beginPath();
			ctx.moveTo(pts[i].x, pts[i].y);
			ctx.lineTo(pts[j].x, pts[j].y);
			ctx.stroke();
		}
	}
	ctx.restore();

	pts.forEach((p, i) => {
		const near = p.d < 260;
		ctx.save();
		ctx.globalAlpha = near ? 0.95 : 0.5;
		ctx.fillStyle = i % 7 === 0 ? palette.warm : palette.node;
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.r * (near ? 1.5 : 1), 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	});

	if (mouse.active) {
		const g = ctx.createRadialGradient(mx, my, 0, mx, my, 230);
		g.addColorStop(0, rgba(palette.onSurfaceRgb, 0.07));
		g.addColorStop(1, 'rgba(0,0,0,0)');
		ctx.save();
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, width, height);
		ctx.restore();
	}
}
