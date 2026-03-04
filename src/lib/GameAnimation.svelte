<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		type: 'trading' | 'protein' | 'openworld' | 'arcade';
	}

	let { type }: Props = $props();

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let destroyed = false;
		let animationId: number;
		const isMobile = window.innerWidth < 768;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio, 2);
			canvas.width = canvas.offsetWidth * dpr;
			canvas.height = canvas.offsetHeight * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		resize();
		window.addEventListener('resize', resize, { passive: true });

		const w = () => canvas.offsetWidth;
		const h = () => canvas.offsetHeight;

		if (type === 'trading') {
			initTrading(ctx, w, h, isMobile, () => destroyed, (id: number) => { animationId = id; });
		} else if (type === 'protein') {
			initProtein(ctx, w, h, isMobile, () => destroyed, (id: number) => { animationId = id; });
		} else if (type === 'openworld') {
			initOpenWorld(ctx, w, h, isMobile, () => destroyed, (id: number) => { animationId = id; });
		} else if (type === 'arcade') {
			initArcade(ctx, w, h, isMobile, () => destroyed, (id: number) => { animationId = id; });
		}

		return () => {
			destroyed = true;
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', resize);
		};
	});

	function initTrading(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean,
		isDestroyed: () => boolean,
		setId: (id: number) => void
	) {
		const dataPoints: number[] = [];
		const maxPoints = isMobile ? 60 : 120;
		let time = 0;
		const particles: { x: number; y: number; vy: number; alpha: number; }[] = [];

		// Seed initial data
		let val = 0.5;
		for (let i = 0; i < maxPoints; i++) {
			val += (Math.random() - 0.48) * 0.04;
			val = Math.max(0.1, Math.min(0.9, val));
			dataPoints.push(val);
		}

		function animate() {
			if (isDestroyed()) return;
			setId(requestAnimationFrame(animate));
			time++;

			const cw = w();
			const ch = h();
			ctx.clearRect(0, 0, cw, ch);

			// Update price
			const prevVal = dataPoints[dataPoints.length - 1];
			let newVal = prevVal + (Math.random() - 0.48) * 0.03;
			newVal = Math.max(0.05, Math.min(0.95, newVal));
			dataPoints.push(newVal);
			if (dataPoints.length > maxPoints) dataPoints.shift();

			// Spawn particles on peaks
			if (newVal > prevVal + 0.015) {
				const pCount = isMobile ? 2 : 4;
				for (let j = 0; j < pCount; j++) {
					particles.push({
						x: cw,
						y: (1 - newVal) * ch,
						vy: -Math.random() * 2 - 0.5,
						alpha: 1
					});
				}
			}

			// Draw candlestick-like bars
			const barWidth = cw / maxPoints;
			for (let i = 1; i < dataPoints.length; i++) {
				const x = i * barWidth;
				const open = dataPoints[i - 1];
				const close = dataPoints[i];
				const top = Math.min(open, close);
				const bottom = Math.max(open, close);
				const isUp = close >= open;

				ctx.fillStyle = isUp ? 'rgba(74, 222, 128, 0.15)' : 'rgba(74, 222, 128, 0.08)';
				ctx.fillRect(x - barWidth * 0.3, (1 - bottom) * ch, barWidth * 0.6, (bottom - top) * ch + 1);
			}

			// Draw line
			ctx.beginPath();
			ctx.strokeStyle = '#4ade80';
			ctx.lineWidth = 2;
			ctx.shadowColor = '#4ade80';
			ctx.shadowBlur = 8;
			for (let i = 0; i < dataPoints.length; i++) {
				const x = (i / (maxPoints - 1)) * cw;
				const y = (1 - dataPoints[i]) * ch;
				if (i === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.stroke();
			ctx.shadowBlur = 0;

			// Fill under line
			ctx.lineTo(cw, ch);
			ctx.lineTo(0, ch);
			ctx.closePath();
			ctx.fillStyle = 'rgba(74, 222, 128, 0.05)';
			ctx.fill();

			// Particles
			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				p.y += p.vy;
				p.alpha -= 0.02;
				if (p.alpha <= 0) { particles.splice(i, 1); continue; }
				ctx.beginPath();
				ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(74, 222, 128, ${p.alpha})`;
				ctx.fill();
			}
		}

		animate();
	}

	function initProtein(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean,
		isDestroyed: () => boolean,
		setId: (id: number) => void
	) {
		const nodeCount = isMobile ? 8 : 14;
		let angle = 0;

		function animate() {
			if (isDestroyed()) return;
			setId(requestAnimationFrame(animate));
			angle += 0.008;

			const cw = w();
			const ch = h();
			const cx = cw / 2;
			const cy = ch / 2;
			ctx.clearRect(0, 0, cw, ch);

			const nodes: { x: number; y: number; z: number; r: number }[] = [];

			for (let i = 0; i < nodeCount; i++) {
				const t = (i / nodeCount) * Math.PI * 2;
				const radiusX = Math.min(cw, ch) * 0.3;
				const radiusY = Math.min(cw, ch) * 0.15;
				const x3d = Math.cos(t + angle) * radiusX;
				const y3d = Math.sin(t * 2 + angle * 0.7) * radiusY;
				const z3d = Math.sin(t + angle) * radiusX * 0.5;

				// Perspective
				const scale = 1 + z3d / (radiusX * 3);
				const screenX = cx + x3d * scale;
				const screenY = cy + y3d * scale;

				const pulse = 1 + Math.sin(angle * 3 + i) * 0.3;
				const baseR = isMobile ? 5 : 8;
				nodes.push({ x: screenX, y: screenY, z: z3d, r: baseR * pulse * scale });
			}

			// Sort by z for depth ordering
			const sortedIndices = nodes.map((_, i) => i).sort((a, b) => nodes[a].z - nodes[b].z);

			// Draw connections
			for (let i = 0; i < nodes.length - 1; i++) {
				const a = nodes[i];
				const b = nodes[i + 1];
				const alpha = 0.2 + ((a.z + b.z) / (w() * 0.6) + 0.5) * 0.3;
				ctx.beginPath();
				ctx.moveTo(a.x, a.y);
				ctx.lineTo(b.x, b.y);
				ctx.strokeStyle = `rgba(74, 222, 128, ${Math.max(0.1, alpha)})`;
				ctx.lineWidth = 1.5;
				ctx.stroke();
			}

			// Draw nodes
			for (const idx of sortedIndices) {
				const node = nodes[idx];
				const alpha = 0.4 + ((node.z / (w() * 0.3)) + 0.5) * 0.6;
				ctx.beginPath();
				ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(74, 222, 128, ${Math.max(0.2, Math.min(1, alpha))})`;
				ctx.fill();
				ctx.strokeStyle = `rgba(74, 222, 128, ${Math.max(0.1, alpha * 0.5)})`;
				ctx.lineWidth = 1;
				ctx.stroke();
			}
		}

		animate();
	}

	function initOpenWorld(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean,
		isDestroyed: () => boolean,
		setId: (id: number) => void
	) {
		let time = 0;
		const cols = isMobile ? 8 : 12;
		const rows = isMobile ? 6 : 8;

		function animate() {
			if (isDestroyed()) return;
			setId(requestAnimationFrame(animate));
			time += 0.02;

			const cw = w();
			const ch = h();
			ctx.clearRect(0, 0, cw, ch);

			const cellW = cw / cols;
			const cellH = ch / rows;

			// Perspective grid — first person looking down at voxel ground
			for (let r = 0; r < rows; r++) {
				for (let c = 0; c < cols; c++) {
					// Walking illusion: offset based on time
					const offsetR = r + time * 0.5;
					const offsetC = c + Math.sin(time * 0.3) * 0.3;

					// Noise-like height variation
					const noise = Math.sin(offsetR * 1.7 + offsetC * 2.3) * 0.5 +
								  Math.sin(offsetC * 3.1 + offsetR * 0.7) * 0.3 +
								  Math.sin(time + r * 0.5 + c * 0.3) * 0.2;

					const brightness = 0.1 + (noise + 1) * 0.15;
					const depth = r / rows; // Closer rows = brighter, further = dimmer
					const alpha = (0.3 + depth * 0.5) * brightness;

					const x = c * cellW;
					const y = r * cellH;

					// Perspective scaling
					const perspScale = 0.7 + depth * 0.3;
					const pW = cellW * perspScale - 1;
					const pH = cellH * perspScale - 1;
					const pX = x + (cellW - pW) / 2;
					const pY = y + (cellH - pH) / 2;

					ctx.fillStyle = `rgba(74, 222, 128, ${Math.max(0.03, Math.min(0.5, alpha))})`;
					ctx.fillRect(pX, pY, pW, pH);

					// Add slight border
					ctx.strokeStyle = `rgba(74, 222, 128, ${Math.max(0.02, alpha * 0.3)})`;
					ctx.lineWidth = 0.5;
					ctx.strokeRect(pX, pY, pW, pH);
				}
			}

			// Horizontal scan line for walking effect
			const scanY = (time * 30) % ch;
			ctx.fillStyle = 'rgba(74, 222, 128, 0.03)';
			ctx.fillRect(0, scanY, cw, 2);
		}

		animate();
	}

	function initArcade(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean,
		isDestroyed: () => boolean,
		setId: (id: number) => void
	) {
		let time = 0;
		const dotCount = isMobile ? 15 : 30;
		interface Dot {
			x: number; y: number; vx: number; vy: number; size: number;
		}
		const dots: Dot[] = [];
		for (let i = 0; i < dotCount; i++) {
			dots.push({
				x: Math.random() * 400,
				y: Math.random() * 200,
				vx: (Math.random() - 0.5) * 2,
				vy: (Math.random() - 0.5) * 2,
				size: Math.random() * 3 + 2
			});
		}

		// Pac-man style character
		let pacX = 50;
		let pacDir = 1;

		function animate() {
			if (isDestroyed()) return;
			setId(requestAnimationFrame(animate));
			time += 0.03;

			const cw = w();
			const ch = h();
			ctx.clearRect(0, 0, cw, ch);

			// Move pac
			pacX += pacDir * 1.5;
			if (pacX > cw - 20) pacDir = -1;
			if (pacX < 20) pacDir = 1;

			const mouthAngle = Math.abs(Math.sin(time * 3)) * 0.4;

			// Draw pac-man
			ctx.beginPath();
			ctx.arc(pacX, ch / 2, 14, mouthAngle + (pacDir < 0 ? Math.PI : 0), Math.PI * 2 - mouthAngle + (pacDir < 0 ? Math.PI : 0));
			ctx.lineTo(pacX, ch / 2);
			ctx.closePath();
			ctx.fillStyle = '#4ade80';
			ctx.shadowColor = '#4ade80';
			ctx.shadowBlur = 12;
			ctx.fill();
			ctx.shadowBlur = 0;

			// Draw dots
			for (const d of dots) {
				ctx.beginPath();
				ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(74, 222, 128, ${0.3 + Math.sin(time + d.x) * 0.2})`;
				ctx.fill();
			}

			// Grid lines
			ctx.strokeStyle = 'rgba(74, 222, 128, 0.04)';
			ctx.lineWidth = 0.5;
			for (let x = 0; x < cw; x += 30) {
				ctx.beginPath();
				ctx.moveTo(x, 0);
				ctx.lineTo(x, ch);
				ctx.stroke();
			}
			for (let y = 0; y < ch; y += 30) {
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(cw, y);
				ctx.stroke();
			}
		}

		animate();
	}
</script>

<div class="game-animation">
	<canvas bind:this={canvas} class="game-canvas"></canvas>
</div>

<style>
	.game-animation {
		width: 100%;
		height: 200px;
		position: relative;
		overflow: hidden;
		border-radius: 12px 12px 0 0;
	}

	.game-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		background: #050505;
	}
</style>
