/*
 * src/lib/immersive/scenes.js
 * ------------------------------------------------------------------
 * Procedural canvas scenes for the Game of Prompts landing page, each
 * scrubbed by the scroll progress that PinnedScene feeds in.
 *
 * There are no render/photo assets for GoP, so every scene here is
 * drawn from code: the same "scroll scrubs a movie" feel as a frame
 * sequence, but a few KB of maths rather than a few hundred MB of
 * JPEGs — and, crucially, the visuals re-theme instantly because every
 * colour is resolved from the CSS custom properties at draw time.
 *
 * Each export has the signature:
 *   draw(ctx, { width, height, progress, palette, mouse, time, align })
 * and must be a pure function of those inputs (no hidden state), so a
 * single static paint at progress = 1 is a valid reduced-motion
 * fallback.
 *
 * The scenes follow the actual protocol described on the page — game
 * service, solver service, GoP Web, the 256-bit secret, commitments,
 * the pot, judges. Nothing here asserts anything the copy doesn't.
 */

import { clamp, range, smoothstep } from '$lib/motion.js';
import {
	rand,
	rgba,
	roundRect,
	backdrop,
	stage,
	label,
	sealedBox,
	hashStrip,
	trophy
} from './scene-kit.js';

/* ==================================================================
 * SCENE 1 — The arena
 * A challenge is posted; solvers converge on it and are scored. This
 * is the whole product in one picture, so it opens the story.
 * ================================================================== */
export function drawArenaScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);
	const unit = 120 * scale;

	const post = range(progress, 0.0, 0.2); // the challenge appears
	const gather = range(progress, 0.16, 0.5); // solvers converge
	const run = range(progress, 0.45, 0.76); // they are executed & scored
	const rank = range(progress, 0.7, 1.0); // a leaderboard resolves

	// Cursor tilt — a few degrees of parallax on the whole stage.
	ctx.save();
	ctx.translate(cx, cy);
	ctx.rotate((mouse.x - 0.5) * 0.05);
	ctx.translate(-cx, -cy);

	// --- The challenge at the centre ---
	const cw = unit * 1.05;
	const ch = unit * 0.72;
	sealedBox(ctx, cx - cw / 2, cy - ch / 2, cw, ch, post, palette, {
		scan: run > 0 ? time : 0
	});
	label(ctx, 'GAME', cx, cy - ch * 0.12, palette, smoothstep(post), 12 * Math.max(0.85, scale), 700, {
		maxWidth: cw * 0.86
	});
	label(
		ctx,
		'SERVICE',
		cx,
		cy + ch * 0.16,
		palette,
		smoothstep(post) * 0.7,
		10 * Math.max(0.85, scale),
		700,
		{ maxWidth: cw * 0.86 }
	);

	// --- Solvers converging on it ---
	const N = compact ? 6 : 9;
	const ringR = Math.min(width * (compact ? 0.36 : 0.19), height * 0.4);
	const scores = [];

	for (let i = 0; i < N; i++) {
		const a = (i / N) * Math.PI * 2 - Math.PI / 2;
		const far = ringR * 1.9;
		// Each solver eases in from further out, slightly staggered.
		const arrive = smoothstep(range(gather, i * 0.06, 0.55 + i * 0.05));
		const r = far + (ringR - far) * arrive;
		let sx = cx + Math.cos(a) * r;
		let sy = cy + Math.sin(a) * r * 0.95;

		// Cursor nudges the field — the arena is alive, not a diagram.
		const mx = mouse.x * width;
		const my = mouse.y * height;
		const ddx = sx - mx;
		const ddy = sy - my;
		const dd = Math.hypot(ddx, ddy) || 1;
		const push = Math.min(34, 2600 / (dd + 40));
		sx += (ddx / dd) * push;
		sy += (ddy / dd) * push;

		// A deterministic per-solver "score", revealed as `run` completes.
		const raw = rand(i * 3 + 7);
		scores.push({ i, raw, x: sx, y: sy, a });

		if (arrive <= 0.01) continue;

		// Link to the game service, dashes flowing inward while running.
		ctx.save();
		ctx.globalAlpha = arrive * (0.35 + 0.45 * smoothstep(run));
		ctx.strokeStyle = palette.link;
		ctx.lineWidth = 1.2;
		ctx.setLineDash([5, 7]);
		ctx.lineDashOffset = time * 26;
		ctx.beginPath();
		ctx.moveTo(sx, sy);
		ctx.lineTo(cx, cy);
		ctx.stroke();
		ctx.restore();

		// The solver itself: a small sealed box, because a solver is a
		// Celaut service too.
		const bw = 22 * Math.max(0.8, scale);
		const bh = 16 * Math.max(0.8, scale);
		ctx.save();
		ctx.globalAlpha = arrive;
		roundRect(ctx, sx - bw / 2, sy - bh / 2, bw, bh, 3);
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.06);
		ctx.fill();
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 1.4;
		ctx.stroke();
		ctx.restore();
	}

	ctx.restore();

	// --- Execution packets: solvers being run inside the game service ---
	if (run > 0) {
		scores.forEach((s, i) => {
			const k = (time * 0.5 + i * 0.17) % 1;
			ctx.save();
			ctx.globalAlpha = smoothstep(run) * (1 - Math.abs(k - 0.5) * 1.3);
			ctx.fillStyle = palette.node;
			ctx.beginPath();
			ctx.arc(s.x + (cx - s.x) * k, s.y + (cy - s.y) * k, 3, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		});
	}

	// --- Leaderboard: scores resolve, the top one lights up ---
	if (rank > 0) {
		const sorted = [...scores].sort((a, b) => b.raw - a.raw).slice(0, compact ? 3 : 4);
		const bw = Math.min(width * (compact ? 0.6 : 0.2), 260);
		const bx = cx - bw / 2;
		const by = cy + Math.min(height * 0.24, ringR * 1.05);
		const rowH = 20 * Math.max(0.85, scale);
		sorted.forEach((s, idx) => {
			const appear = smoothstep(range(rank, idx * 0.12, 0.55 + idx * 0.12));
			if (appear <= 0.01) return;
			const y = by + idx * rowH;
			const top = idx === 0;
			ctx.save();
			ctx.globalAlpha = appear * (top ? 1 : 0.6);
			ctx.fillStyle = top ? palette.warm : palette.dim;
			ctx.fillRect(bx, y, bw * (0.35 + 0.65 * s.raw) * appear, 3);
			ctx.restore();
			label(
				ctx,
				top ? 'WINNER' : `#${idx + 1}`,
				bx - 26,
				y + 1,
				palette,
				appear * (top ? 0.95 : 0.5),
				9
			);
		});
	}
}

/* ==================================================================
 * SCENE 2 — Three components
 * Game Service, Solver Service, GoP Web. Three sealed boxes that
 * assemble, label themselves, then wire together.
 * ================================================================== */
export function drawComponentsScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const one = range(progress, 0.0, 0.26);
	const two = range(progress, 0.22, 0.5);
	const three = range(progress, 0.46, 0.72);
	const wire = range(progress, 0.66, 1.0);

	// Sized for the longest translated title, not for English. "GAME
	// SERVICE" is 12 characters; "Servicio de juego" is 17, and the
	// previous 150px cap drew the stroke through the letters.
	const bw = Math.min(compact ? width * 0.5 : 148 * scale, 188);
	const bh = Math.max(bw * 0.78, 92 * Math.max(0.85, scale));
	const gap = bw * 0.42;

	// Triangle layout: game + solver on top, GoP Web below between them.
	const nodes = [
		{ x: cx - (bw + gap) / 2, y: cy - bh * 0.85, t: one, name: 'GAME SERVICE', sub: 'creator' },
		{ x: cx + (bw + gap) / 2, y: cy - bh * 0.85, t: two, name: 'SOLVER SERVICE', sub: 'player' },
		{ x: cx, y: cy + bh * 0.9, t: three, name: 'GoP WEB', sub: 'portal' }
	];

	// Wiring first so boxes sit on top of it.
	if (wire > 0) {
		const pairs = [
			[0, 1],
			[0, 2],
			[1, 2]
		];
		pairs.forEach((p, i) => {
			const k = smoothstep(range(wire, i * 0.15, 0.6 + i * 0.15));
			if (k <= 0.01) return;
			const a = nodes[p[0]];
			const b = nodes[p[1]];
			ctx.save();
			ctx.globalAlpha = k * 0.6;
			ctx.strokeStyle = palette.link;
			ctx.lineWidth = 1.3;
			ctx.setLineDash([4, 8]);
			ctx.lineDashOffset = -time * 22;
			ctx.beginPath();
			ctx.moveTo(a.x, a.y);
			ctx.lineTo(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k);
			ctx.stroke();
			ctx.restore();
		});
	}

	nodes.forEach((n, i) => {
		const t = n.t;
		if (t <= 0.01) return;
		// A gentle float so the trio breathes.
		const bob = Math.sin(time * 0.8 + i * 1.7) * 3 * smoothstep(t);
		const x = n.x - bw / 2;
		const y = n.y - bh / 2 + bob;
		sealedBox(ctx, x, y, bw, bh, t, palette, { scan: i === 0 ? time : 0 });
		// Both labels live INSIDE the box, so the box is their width budget.
		// Without it a translation overruns the glyph it names: "GAME
		// SERVICE" is 12 characters, "Servicio de juego" is 17, and the
		// stroke ends up drawn through the letters.
		const inner = bw * 0.86;
		const nameH = label(
			ctx,
			n.name,
			n.x,
			n.y - 6 + bob,
			palette,
			smoothstep(t),
			11 * Math.max(0.8, scale),
			700,
			{ maxWidth: inner }
		);
		// Pushed down by however tall the name turned out, so a two-line
		// name does not sit on top of the subtitle.
		label(
			ctx,
			n.sub,
			n.x,
			n.y + 12 + bob + Math.max(0, nameH - 14),
			palette,
			smoothstep(t) * 0.55,
			9 * Math.max(0.8, scale),
			700,
			{ maxWidth: inner }
		);
	});
}

/* ==================================================================
 * SCENE 3 — The creator's flow
 * Design → paper → 256-bit secret → package & publish → reveal. Drawn
 * as a spine of stations that light up in sequence, with the secret
 * digest visibly sealing itself.
 * ================================================================== */
export function drawCreatorScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const STATIONS = ['DESIGN', 'PAPER', 'SECRET', 'PUBLISH', 'REVEAL'];
	const spanH = Math.min(height * 0.56, 380);
	const top = cy - spanH / 2;
	const step = spanH / (STATIONS.length - 1);
	const x = cx - (compact ? 0 : 40 * scale);

	// The spine.
	const drawn = smoothstep(progress);
	ctx.save();
	ctx.strokeStyle = palette.dim;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(x, top);
	ctx.lineTo(x, top + spanH * drawn);
	ctx.stroke();
	ctx.restore();

	STATIONS.forEach((name, i) => {
		const t = smoothstep(range(progress, i * 0.19, 0.16 + i * 0.19));
		if (t <= 0.01) return;
		const y = top + i * step;
		const r = (7 + 5 * t) * Math.max(0.85, scale);

		// Pulse ring on the station currently resolving.
		const active = t > 0.05 && t < 0.99;
		if (active) {
			ctx.save();
			ctx.globalAlpha = 0.25 * (0.5 + 0.5 * Math.sin(time * 3));
			ctx.fillStyle = palette.node;
			ctx.beginPath();
			ctx.arc(x, y, r * 2.4, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}

		ctx.save();
		ctx.globalAlpha = t;
		ctx.fillStyle = i === 2 || i === 4 ? palette.warm : palette.node;
		ctx.beginPath();
		ctx.arc(x, y, r * 0.55, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = ctx.fillStyle;
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI * 2);
		ctx.stroke();
		ctx.restore();

		label(ctx, name, x + (compact ? 0 : 78 * scale), y, palette, t, 11 * Math.max(0.85, scale), 700, {
			maxWidth: compact ? width * 0.5 : 132 * scale
		});

		// Station 3 (SECRET) shows a 256-bit digest settling into place.
		if (i === 2) {
			const w = Math.min(width * (compact ? 0.5 : 0.16), 190);
			hashStrip(
				ctx,
				x + (compact ? -w / 2 : 130 * scale),
				y + (compact ? 22 : 0),
				w,
				12,
				11,
				t,
				palette,
				t,
				11
			);
		}
		// Station 5 (REVEAL) shows the same digest going public on-chain.
		if (i === 4) {
			const w = Math.min(width * (compact ? 0.5 : 0.16), 190);
			const rx = x + (compact ? -w / 2 : 130 * scale);
			hashStrip(ctx, rx, y + (compact ? 22 : 0), w, 12, 11, 1, palette, t, 11);
			// A ledger bar underneath it: the reveal transaction.
			ctx.save();
			ctx.globalAlpha = t * 0.75;
			ctx.strokeStyle = palette.warm;
			ctx.lineWidth = 1.4;
			ctx.beginPath();
			ctx.moveTo(rx, y + (compact ? 34 : 12));
			ctx.lineTo(rx + w * t, y + (compact ? 34 : 12));
			ctx.stroke();
			ctx.restore();
		}
	});

	// The commitment forming out of the secret, once it exists.
	const commit = range(progress, 0.42, 0.8);
	if (commit > 0 && !compact) {
		const bx = x - 190 * scale;
		const by = cy;
		const bwid = 96 * scale;
		const bhei = 62 * scale;
		sealedBox(ctx, bx - bwid / 2, by - bhei / 2, bwid, bhei, commit, palette, {
			colour: palette.warm
		});
		label(ctx, 'COMMITMENT', bx, by, palette, smoothstep(commit), 9 * Math.max(0.85, scale), 700, {
			maxWidth: 120 * scale
		});
	}
}

/* ==================================================================
 * SCENE 4 — The player's journey
 * Read the paper → build a solver → register the ID (gas only) → the
 * seed drops → run the game service locally → submit the commitment.
 * The seed reveal is the pivot, so it gets a visible burst.
 * ================================================================== */
export function drawPlayerScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const read = range(progress, 0.0, 0.18);
	const build = range(progress, 0.14, 0.38);
	const register = range(progress, 0.34, 0.52);
	const seed = range(progress, 0.5, 0.66);
	const run = range(progress, 0.62, 0.84);
	const submit = range(progress, 0.8, 1.0);

	const unit = 110 * scale;

	// --- The paper (left/top): lines of rules the player reads first ---
	const pw = unit * 0.72;
	const ph = unit * 0.95;
	const px = cx - unit * (compact ? 0.95 : 1.15);
	const py = cy - ph / 2 - unit * 0.15;
	if (read > 0) {
		const t = smoothstep(read);
		ctx.save();
		ctx.globalAlpha = t * (1 - smoothstep(build) * 0.55);
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 1.6;
		roundRect(ctx, px, py, pw, ph, 4);
		ctx.stroke();
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.04);
		ctx.fill();
		for (let i = 0; i < 6; i++) {
			const lt = clamp(t * 6 - i);
			if (lt <= 0) continue;
			ctx.globalAlpha = t * 0.4 * lt;
			ctx.fillStyle = palette.dim;
			ctx.fillRect(px + 9, py + 14 + i * (ph - 24) / 6, (pw - 18) * (0.6 + rand(i) * 0.4) * lt, 2.5);
		}
		ctx.restore();
		label(ctx, 'PAPER', px + pw / 2, py - 12, palette, t * 0.8, 9 * Math.max(0.85, scale), 700, {
			maxWidth: pw * 1.5
		});
	}

	// --- The solver being built (centre) ---
	const sw = unit * 0.86;
	const sh = unit * 0.62;
	const sx = cx - sw / 2;
	const sy = cy - sh / 2 - unit * 0.15;
	sealedBox(ctx, sx, sy, sw, sh, build, palette, { scan: run > 0 ? time : 0 });
	label(ctx, 'SOLVER', cx, cy - unit * 0.15, palette, smoothstep(build), 10 * Math.max(0.85, scale), 700, {
		maxWidth: sw * 0.86
	});

	// --- Registering the solver ID: a hash locks in, gas only ---
	if (register > 0) {
		const w = Math.min(width * (compact ? 0.44 : 0.13), 160);
		hashStrip(
			ctx,
			cx - w / 2,
			sy + sh + 22 * scale,
			w,
			10,
			31,
			register,
			palette,
			smoothstep(register),
			10
		);
		label(
			ctx,
			'SOLVER ID · GAS ONLY',
			cx,
			sy + sh + 40 * scale,
			palette,
			smoothstep(register) * 0.6,
			8.5 * Math.max(0.85, scale)
		);
	}

	// --- The seed reveal: an expanding ring from the game service ---
	const seedX = cx + unit * (compact ? 0.9 : 1.15);
	const seedY = cy - unit * 0.15;
	if (seed > 0) {
		const t = smoothstep(seed);
		for (let i = 0; i < 3; i++) {
			const k = clamp(t * 1.5 - i * 0.25);
			if (k <= 0) continue;
			ctx.save();
			ctx.globalAlpha = (1 - k) * 0.55;
			ctx.strokeStyle = palette.warm;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(seedX, seedY, k * unit * 1.1, 0, Math.PI * 2);
			ctx.stroke();
			ctx.restore();
		}
		ctx.save();
		ctx.globalAlpha = t;
		ctx.fillStyle = palette.warm;
		ctx.beginPath();
		ctx.arc(seedX, seedY, 8 * Math.max(0.85, scale), 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
		label(ctx, 'SEED', seedX, seedY + 24 * scale, palette, t, 10 * Math.max(0.85, scale), 700, {
			maxWidth: 110 * scale
		});
	}

	// --- Running: the solver executes inside the game service ---
	if (run > 0) {
		const t = smoothstep(run);
		const k = (time * 0.6) % 1;
		ctx.save();
		ctx.globalAlpha = t * (1 - Math.abs(k - 0.5) * 1.2);
		ctx.fillStyle = palette.warm;
		ctx.beginPath();
		ctx.arc(seedX + (cx - seedX) * k, seedY, 3.4, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();

		// A score bar filling as evaluation proceeds.
		const bw = sw * 0.82;
		ctx.save();
		ctx.globalAlpha = t;
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.1);
		ctx.fillRect(cx - bw / 2, sy - 16 * scale, bw, 4);
		ctx.fillStyle = palette.node;
		ctx.fillRect(cx - bw / 2, sy - 16 * scale, bw * t, 4);
		ctx.restore();
		label(ctx, 'SCORE', cx, sy - 28 * scale, palette, t * 0.75, 9 * Math.max(0.85, scale), 700, {
			maxWidth: 120 * scale
		});
	}

	// --- Submitting the commitment + fee to the chain ---
	if (submit > 0) {
		const t = smoothstep(submit);
		const by = cy + Math.min(height * 0.22, unit * 1.5);
		const w = Math.min(width * (compact ? 0.6 : 0.2), 250);
		ctx.save();
		ctx.globalAlpha = t;
		ctx.strokeStyle = palette.warm;
		ctx.lineWidth = 1.6;
		roundRect(ctx, cx - w / 2, by - 22 * scale, w, 44 * scale, 5);
		ctx.stroke();
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.05);
		ctx.fill();
		ctx.restore();
		// Hash on the left ~58%, fee caption in the remaining column.
		// English is "+ FEE"; Spanish is "Cuota de participación" — the
		// previous shared-row layout drew the second line through the box.
		const feeCol = w * 0.36;
		hashStrip(ctx, cx - w * 0.46, by, w * 0.52, 12, 57, 1, palette, t, 10);
		label(ctx, '+ FEE', cx + w * 0.28, by, palette, t * 0.85, 9 * Math.max(0.85, scale), 700, {
			maxWidth: feeCol
		});

		// Falling into the chain.
		const k = (time * 0.4) % 1;
		ctx.save();
		ctx.globalAlpha = t * (1 - k);
		ctx.fillStyle = palette.warm;
		ctx.beginPath();
		ctx.arc(cx, by + 20 * scale + k * 28 * scale, 3, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
}

/* ==================================================================
 * SCENE 5 — Score validation
 * The contract recomputes a commitment from solver ID + score + hashed
 * logs + the revealed secret, and compares it to what was published.
 * Matching halves snap together; that's the entire trust story.
 * ================================================================== */
export function drawValidationScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const published = range(progress, 0.0, 0.2); // the earlier commitment
	const reveal = range(progress, 0.16, 0.36); // secret goes public
	const inputs = range(progress, 0.32, 0.58); // four inputs gather
	const compute = range(progress, 0.54, 0.78); // contract recomputes
	const match = range(progress, 0.74, 1.0); // the two digests match

	const w = Math.min(width * (compact ? 0.66 : 0.2), 260);
	const gapY = Math.min(height * 0.18, 120 * scale);

	// --- Top: the commitment the player published at submission time ---
	if (published > 0) {
		const t = smoothstep(published);
		label(ctx, 'PUBLISHED COMMITMENT', cx, cy - gapY - 26 * scale, palette, t * 0.65, 9, 700, {
			maxWidth: w
		});
		hashStrip(ctx, cx - w / 2, cy - gapY, w, 14, 91, 1, palette, t, 12);
	}

	// --- The four inputs the contract feeds into the hash ---
	const INPUTS = ['SOLVER ID', 'SCORE', 'HASHED LOGS', 'SECRET'];
	const colW = w / INPUTS.length;
	INPUTS.forEach((name, i) => {
		// The secret only exists after the creator reveals it.
		const gate = i === 3 ? reveal : inputs;
		const t = smoothstep(range(gate, i * 0.12, 0.6 + i * 0.12));
		if (t <= 0.01) return;
		const ix = cx - w / 2 + colW * (i + 0.5);
		const iy = cy + gapY * 0.28;
		ctx.save();
		ctx.globalAlpha = t;
		ctx.fillStyle = i === 3 ? palette.warm : palette.node;
		ctx.beginPath();
		ctx.arc(ix, iy, 4.5 * Math.max(0.85, scale), 0, Math.PI * 2);
		ctx.fill();
		// Feed line down into the hasher.
		if (compute > 0) {
			ctx.globalAlpha = t * smoothstep(compute) * 0.6;
			ctx.strokeStyle = i === 3 ? palette.warm : palette.link;
			ctx.lineWidth = 1.2;
			ctx.beginPath();
			ctx.moveTo(ix, iy + 7);
			ctx.lineTo(cx, iy + gapY * 0.55);
			ctx.stroke();
		}
		ctx.restore();
		label(
			ctx,
			name,
			ix,
			iy - 16 * Math.max(0.85, scale),
			palette,
			t * 0.7,
			compact ? 7 : 8 * Math.max(0.85, scale),
			700,
			{ maxWidth: colW * 0.92 }
		);
	});

	// --- The hasher: a box that churns then emits a digest ---
	if (compute > 0) {
		const t = smoothstep(compute);
		const hy = cy + gapY * 0.83;
		const hw = w * 0.5;
		const hh = 26 * Math.max(0.85, scale);
		ctx.save();
		ctx.globalAlpha = t;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 1.6;
		roundRect(ctx, cx - hw / 2, hy - hh / 2, hw, hh, 4);
		ctx.stroke();
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.05);
		ctx.fill();
		ctx.restore();
		label(ctx, 'blake2b', cx, hy, palette, t * 0.85, 10 * Math.max(0.85, scale), 700, {
			maxWidth: w * 0.8
		});

		// Recomputed digest below. Give the caption enough clearance from
		// the hasher box that the two never sit on the same baseline.
		const ry = hy + 48 * Math.max(0.85, scale);
		label(ctx, 'RECOMPUTED', cx, ry - 20 * Math.max(0.85, scale), palette, t * 0.6, 9, 700, {
			maxWidth: w
		});
		hashStrip(ctx, cx - w / 2, ry, w, 14, 91, t, palette, t, 12);

		// --- The match: both strips flash and a tick lands ---
		if (match > 0) {
			const m = smoothstep(match);
			const pulse = 0.55 + 0.45 * Math.sin(time * 4);
			ctx.save();
			ctx.globalAlpha = m * 0.18 * pulse;
			ctx.fillStyle = palette.node;
			ctx.fillRect(cx - w / 2 - 8, cy - gapY - 12, w + 16, 22);
			ctx.fillRect(cx - w / 2 - 8, ry - 12, w + 16, 22);
			ctx.restore();

			// Connecting brace between the two identical digests.
			ctx.save();
			ctx.globalAlpha = m * 0.5;
			ctx.strokeStyle = palette.node;
			ctx.lineWidth = 1.4;
			ctx.setLineDash([4, 5]);
			ctx.beginPath();
			ctx.moveTo(cx + w / 2 + 14, cy - gapY);
			ctx.lineTo(cx + w / 2 + 26, cy - gapY);
			ctx.lineTo(cx + w / 2 + 26, ry);
			ctx.lineTo(cx + w / 2 + 14, ry);
			ctx.stroke();
			ctx.restore();

			// Verified tick. Kept inside the canvas on narrow viewports, where
			// the strip already runs most of the width.
			const tx = Math.min(cx + w / 2 + 48 * Math.max(0.8, scale), width - 26);
			const ty = (cy - gapY + ry) / 2;
			const r = 15 * Math.max(0.85, scale);
			ctx.save();
			ctx.globalAlpha = m;
			ctx.strokeStyle = palette.node;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(tx, ty, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * m);
			ctx.stroke();
			ctx.beginPath();
			ctx.lineCap = 'round';
			ctx.moveTo(tx - r * 0.42, ty);
			ctx.lineTo(tx - r * 0.1, ty + r * 0.34);
			ctx.lineTo(tx + r * 0.45, ty - r * 0.34);
			ctx.stroke();
			ctx.restore();
		}
	}
}

/* ==================================================================
 * SCENE 6 — The pot
 * Participation fees pile into a pot; commissions are carved off for
 * creator, judges and platform; the rest plus the game NFT goes to the
 * highest validated score.
 * ================================================================== */
export function drawPotScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const fill = range(progress, 0.0, 0.34); // fees arrive
	const split = range(progress, 0.32, 0.62); // commissions carved off
	const award = range(progress, 0.58, 0.84); // winner takes the rest
	const nft = range(progress, 0.8, 1.0); // NFT minted to the winner

	const potW = Math.min(width * (compact ? 0.5 : 0.16), 190);
	const potH = potW * 0.9;
	const px = cx - potW / 2;
	const py = cy - potH * 0.1;

	// --- Coins falling in ---
	const COINS = compact ? 6 : 9;
	for (let i = 0; i < COINS; i++) {
		const t = smoothstep(range(fill, i * 0.08, 0.5 + i * 0.08));
		if (t <= 0.01) continue;
		const startX = cx + (rand(i) - 0.5) * potW * 2.2;
		const startY = py - potH * 1.6;
		const endX = px + potW * (0.15 + rand(i + 40) * 0.7);
		const endY = py + potH * (0.62 + rand(i + 80) * 0.24);
		ctx.save();
		ctx.globalAlpha = 0.85;
		ctx.fillStyle = palette.warm;
		ctx.beginPath();
		ctx.arc(
			startX + (endX - startX) * t,
			startY + (endY - startY) * t,
			4.4 * Math.max(0.85, scale),
			0,
			Math.PI * 2
		);
		ctx.fill();
		ctx.restore();
	}

	// --- The pot itself ---
	ctx.save();
	ctx.globalAlpha = 0.9;
	ctx.strokeStyle = palette.node;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(px, py);
	ctx.lineTo(px + potW * 0.14, py + potH);
	ctx.lineTo(px + potW * 0.86, py + potH);
	ctx.lineTo(px + potW, py);
	ctx.stroke();
	// Level of funds inside.
	const level = smoothstep(fill) * (1 - smoothstep(award) * 0.85);
	if (level > 0.01) {
		const lh = potH * 0.78 * level;
		ctx.globalAlpha = 0.18;
		ctx.fillStyle = palette.warm;
		ctx.beginPath();
		ctx.moveTo(px + potW * 0.14 + (potH - lh) * 0.12, py + potH - lh);
		ctx.lineTo(px + potW * 0.86 - (potH - lh) * 0.12, py + potH - lh);
		ctx.lineTo(px + potW * 0.86, py + potH);
		ctx.lineTo(px + potW * 0.14, py + potH);
		ctx.closePath();
		ctx.fill();
	}
	ctx.restore();
	label(ctx, 'THE POT', cx, py - 18 * scale, palette, smoothstep(fill), 10 * Math.max(0.85, scale), 700, {
		maxWidth: 140 * scale
	});

	// --- Commission slices peeling off to the sides ---
	if (split > 0) {
		const CUTS = ['CREATOR', 'JUDGES', 'PLATFORM'];
		CUTS.forEach((name, i) => {
			const t = smoothstep(range(split, i * 0.14, 0.6 + i * 0.14));
			if (t <= 0.01) return;
			const a = -Math.PI * 0.85 + i * 0.42;
			const dist = potW * 1.15 * t;
			const ex = cx + Math.cos(a) * dist * (align === 'right' ? -1 : 1);
			const ey = cy + Math.sin(a) * dist * 0.7;
			ctx.save();
			ctx.globalAlpha = t * 0.85;
			ctx.fillStyle = palette.dim;
			ctx.beginPath();
			ctx.arc(ex, ey, 5 * Math.max(0.85, scale), 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = palette.link;
			ctx.lineWidth = 1.1;
			ctx.setLineDash([3, 5]);
			ctx.beginPath();
			ctx.moveTo(cx, cy);
			ctx.lineTo(ex, ey);
			ctx.stroke();
			ctx.restore();
			label(ctx, name, ex, ey - 14 * Math.max(0.85, scale), palette, t * 0.6, 8.5, 700, {
				maxWidth: 120 * Math.max(0.85, scale)
			});
		});
	}

	// --- The winner receives the remainder ---
	if (award > 0) {
		const t = smoothstep(award);
		const wy = py + potH + Math.min(height * 0.14, 92 * scale);
		// Stream from pot to winner.
		const k = (time * 0.5) % 1;
		ctx.save();
		ctx.globalAlpha = t * (1 - Math.abs(k - 0.5) * 1.2);
		ctx.fillStyle = palette.warm;
		ctx.beginPath();
		ctx.arc(cx, py + potH + (wy - py - potH) * k, 4, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
		trophy(ctx, cx, wy, 42 * Math.max(0.85, scale), t, palette, t);
		label(
			ctx,
			'HIGHEST VALIDATED SCORE',
			cx,
			wy + 40 * Math.max(0.85, scale),
			palette,
			t * 0.7,
			compact ? 8 : 9
		);
	}

	// --- Plus the game NFT ---
	if (nft > 0) {
		const t = smoothstep(nft);
		const nx = cx + Math.min(width * 0.1, potW * 0.95);
		const ny = py + potH + Math.min(height * 0.14, 92 * scale);
		const s = 26 * Math.max(0.85, scale);
		ctx.save();
		ctx.globalAlpha = t;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 1.8;
		ctx.translate(nx, ny);
		ctx.rotate(Math.sin(time * 0.9) * 0.12);
		roundRect(ctx, -s / 2, -s / 2, s, s, 4);
		ctx.stroke();
		ctx.fillStyle = rgba(palette.onSurfaceRgb, 0.06);
		ctx.fill();
		ctx.restore();
		label(ctx, 'NFT', nx, ny, palette, t * 0.9, 9 * Math.max(0.85, scale), 700, {
			maxWidth: 90 * scale
		});
	}
}

/* ==================================================================
 * SCENE 7 — Judges
 * Judges audit the creator's resolution, not the players. A magnifier
 * sweeps the creator's proof; if it's bad, the creator's commission
 * goes to the judge instead. Players sit outside the blast radius.
 * ================================================================== */
export function drawJudgesScene(ctx, { width, height, progress, palette, mouse, time, align }) {
	backdrop(ctx, width, height, palette, progress, mouse, align);
	const { cx, cy, scale, compact } = stage(width, height, align);

	const proof = range(progress, 0.0, 0.22); // creator's proof appears
	const watch = range(progress, 0.18, 0.46); // judges take position
	const scan = range(progress, 0.42, 0.72); // the audit sweeps it
	const verdict = range(progress, 0.68, 1.0); // outcome resolves

	const bw = Math.min(width * (compact ? 0.58 : 0.18), 220);
	const bh = bw * 0.55;
	const bx = cx - bw / 2;
	const by = cy - bh / 2;

	// --- The creator's resolution proof under review ---
	sealedBox(ctx, bx, by, bw, bh, proof, palette, { colour: palette.warm });
	label(
		ctx,
		"CREATOR'S PROOF",
		cx,
		by - 16 * Math.max(0.85, scale),
		palette,
		smoothstep(proof) * 0.8,
		9.5
	);
	hashStrip(ctx, bx + bw * 0.12, cy, bw * 0.76, 12, 137, smoothstep(proof), palette, smoothstep(proof), 11);

	// --- Judges around it ---
	// The horizontal spread is capped against the stage half-width so a
	// judge can never drift over the caption column.
	const J = 3;
	const ringR = Math.min(width * (compact ? 0.32 : 0.15), height * 0.3);
	const spreadX = Math.min(ringR * 1.35, bw * 0.85);
	for (let i = 0; i < J; i++) {
		const t = smoothstep(range(watch, i * 0.14, 0.6 + i * 0.14));
		if (t <= 0.01) continue;
		const a = -Math.PI / 2 + ((i - 1) * Math.PI) / 2.6;
		const jx = cx + Math.cos(a) * spreadX;
		const jy = cy + Math.sin(a) * ringR * 1.05;
		ctx.save();
		ctx.globalAlpha = t;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 1.8;
		// A simple "eye" glyph: judges watch.
		ctx.beginPath();
		ctx.ellipse(jx, jy, 13 * Math.max(0.8, scale), 8 * Math.max(0.8, scale), 0, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fillStyle = palette.node;
		ctx.beginPath();
		ctx.arc(jx, jy, 3.6 * Math.max(0.8, scale), 0, Math.PI * 2);
		ctx.fill();
		// Sightline to the proof.
		ctx.globalAlpha = t * 0.4 * (0.5 + 0.5 * smoothstep(scan));
		ctx.strokeStyle = palette.link;
		ctx.lineWidth = 1;
		ctx.setLineDash([3, 6]);
		ctx.lineDashOffset = time * 18;
		ctx.beginPath();
		ctx.moveTo(jx, jy);
		ctx.lineTo(cx, cy);
		ctx.stroke();
		ctx.restore();
	}
	label(
		ctx,
		'JUDGES',
		cx,
		cy - ringR * 1.05 - 24 * Math.max(0.85, scale),
		palette,
		smoothstep(watch) * 0.7,
		9.5
	);

	// --- The audit sweep across the proof ---
	if (scan > 0) {
		const t = smoothstep(scan);
		const sxp = bx + bw * ((time * 0.35) % 1);
		ctx.save();
		ctx.globalAlpha = t * 0.7;
		ctx.strokeStyle = palette.node;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(sxp, by);
		ctx.lineTo(sxp, by + bh);
		ctx.stroke();
		ctx.restore();
	}

	// --- Verdict: the creator's commission is what's at stake ---
	if (verdict > 0) {
		const t = smoothstep(verdict);
		const vy = by + bh + Math.min(height * 0.15, 96 * scale);
		// Commission chip moving from the creator's side toward the judges.
		const travel = smoothstep(range(verdict, 0.3, 1));
		const fromX = cx - bw * 0.34;
		const toX = cx + bw * 0.34;
		ctx.save();
		ctx.globalAlpha = t;
		ctx.strokeStyle = palette.dim;
		ctx.lineWidth = 1.2;
		ctx.setLineDash([4, 6]);
		ctx.beginPath();
		ctx.moveTo(fromX, vy);
		ctx.lineTo(toX, vy);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.fillStyle = palette.warm;
		ctx.beginPath();
		ctx.arc(fromX + (toX - fromX) * travel, vy, 6 * Math.max(0.85, scale), 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
		label(ctx, 'CREATOR FEE', fromX, vy - 18 * Math.max(0.85, scale), palette, t * 0.6, 8.5, 700, {
			maxWidth: Math.abs(toX - fromX) * 0.62
		});
		label(ctx, 'HONEST JUDGE', toX, vy - 18 * Math.max(0.85, scale), palette, t * travel * 0.85, 8.5, 700, {
			maxWidth: Math.abs(toX - fromX) * 0.62
		});

		// Players, explicitly untouched, sitting outside the exchange.
		const pyv = vy + 34 * Math.max(0.85, scale);
		for (let i = 0; i < 4; i++) {
			ctx.save();
			ctx.globalAlpha = t * 0.55;
			ctx.fillStyle = palette.node;
			ctx.beginPath();
			ctx.arc(cx + (i - 1.5) * 22 * Math.max(0.85, scale), pyv, 3.4, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}
		label(
			ctx,
			'PLAYERS UNAFFECTED',
			cx,
			pyv + 18 * Math.max(0.85, scale),
			palette,
			t * 0.6,
			compact ? 8 : 9
		);
	}
}
