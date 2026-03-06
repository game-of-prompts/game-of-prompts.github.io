<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		height?: number;
		/** 'light-to-dark' | 'dark-to-light' | 'auto' (default) */
		direction?: 'light-to-dark' | 'dark-to-light' | 'auto';
	}

	let { height = 120, direction = 'auto' }: Props = $props();

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let destroyed = false;
		let animationId: number;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio, 2);
			canvas.width = canvas.offsetWidth * dpr;
			canvas.height = canvas.offsetHeight * dpr;
			ctx.scale(dpr, dpr);
		};

		resize();
		window.addEventListener('resize', resize, { passive: true });

		const particleCount = 40;
		const connectionDistance = 100;

		interface Particle {
			x: number;
			y: number;
			vx: number;
			vy: number;
			size: number;
			alpha: number;
		}

		const w = () => canvas.offsetWidth;
		const h = () => canvas.offsetHeight;

		const particles: Particle[] = [];
		for (let i = 0; i < particleCount; i++) {
			particles.push({
				x: Math.random() * (w() || 800),
				y: Math.random() * (h() || height),
				vx: (Math.random() - 0.5) * 0.4,
				vy: (Math.random() - 0.5) * 0.2,
				size: Math.random() * 2 + 0.5,
				alpha: Math.random() * 0.5 + 0.2
			});
		}

		const animate = () => {
			if (destroyed) return;
			animationId = requestAnimationFrame(animate);

			const cw = w();
			const ch = h();
			const dpr = Math.min(window.devicePixelRatio, 2);

			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, cw, ch);

			// Move particles
			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;

				if (p.x < 0) p.x = cw;
				if (p.x > cw) p.x = 0;
				if (p.y < 0) p.y = ch;
				if (p.y > ch) p.y = 0;
			}

			// Draw connections
			for (let i = 0; i < particleCount; i++) {
				for (let j = i + 1; j < particleCount; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);

					if (dist < connectionDistance) {
						const alpha = (1 - dist / connectionDistance) * 0.2;
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.strokeStyle = `rgba(74, 222, 128, ${alpha})`;
						ctx.lineWidth = 0.5;
						ctx.stroke();
					}
				}
			}

			// Draw particles
			for (const p of particles) {
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(74, 222, 128, ${p.alpha})`;
				ctx.fill();
			}
		};

		animate();

		return () => {
			destroyed = true;
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', resize);
		};
	});
</script>

<div class="section-transition" style="height: {height}px;" data-dir={direction}>
	<canvas bind:this={canvas} class="transition-canvas"></canvas>
</div>

<style>
	.section-transition {
		position: relative;
		width: 100%;
		background: var(--bg-primary);
		overflow: hidden;
	}

	/* Light-to-dark gradient (between a light section and a dark game section) */
	:global([data-theme="light"]) .section-transition[data-dir="light-to-dark"],
	:global(:root:not([data-theme="dark"])) .section-transition[data-dir="light-to-dark"] {
		background: linear-gradient(to bottom, #f8fafc 0%, #050505 100%) !important;
	}

	/* Dark-to-light gradient (between a dark game section and a light section) */
	:global([data-theme="light"]) .section-transition[data-dir="dark-to-light"],
	:global(:root:not([data-theme="dark"])) .section-transition[data-dir="dark-to-light"] {
		background: linear-gradient(to bottom, #050505 0%, #f8fafc 100%) !important;
	}

	.transition-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
</style>
