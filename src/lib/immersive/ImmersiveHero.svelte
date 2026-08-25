<script>
	/*
	 * ImmersiveHero — the opener for the Game of Prompts landing page.
	 *
	 * Keeps the beloved GoP wordmark treatment (mono caps, "PROMPTS" in
	 * the green gradient) but replaces the old three.js particle network
	 * behind it with a 2D cursor-reactive competitor field. That removes
	 * a WebGL context from a page that now runs seven canvas scenes, and
	 * the field re-themes with the toggle for free.
	 *
	 * Two motion layers, both optional:
	 *   1. The canvas field (drawHeroField) — always running while the
	 *      hero is on screen; first signal that the page responds to you.
	 *   2. A GSAP scroll timeline that parallaxes the wordmark, sub-copy
	 *      and stat row at different rates as you leave the hero, so the
	 *      handoff into the first pinned scene feels continuous.
	 *
	 * Under prefers-reduced-motion neither layer runs: the canvas is
	 * painted once and the copy sits still. The DOM is identical either
	 * way, so no content sits behind a motion gate.
	 */

	import { onMount } from 'svelte';
	import { drawHeroField } from './scene-kit.js';
	import {
		loadGsap,
		prefersReducedMotion,
		fitCanvas,
		cssVar,
		onThemeChange,
		scrollTo
	} from '$lib/motion.js';

	/** First line of the wordmark. */
	export let titleTop = 'GAME OF';
	/** Second line, rendered in the accent gradient. */
	export let titleBottom = 'PROMPTS';
	/** One-line promise under the wordmark (HTML allowed). */
	export let tagline = '';
	/** Supporting paragraph. */
	export let lede = '';
	/** [{ label, href, external?, primary? }] */
	export let actions = [];
	/** [{ value, label }] — the stat row. */
	export let stats = [];
	/** Anchor id of the first pinned scene, for the "see how" jump. */
	export let firstSceneId = '';

	let root;
	let canvasEl;
	let layerTitle;
	let layerSub;
	let layerStats;
	let layerScroll;

	function jumpToFirstScene(event) {
		if (!firstSceneId) return;
		event.preventDefault();
		scrollTo(`#${firstSceneId}`);
	}

	onMount(() => {
		const reduced = prefersReducedMotion();
		let ctx = null;
		let width = 0;
		let height = 0;
		let raf = 0;
		let onScreen = true;
		const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: false };
		const start = performance.now();

		let palette = readPalette();
		function readPalette() {
			return {
				node: cssVar('--viz-node', '#4ade80'),
				link: cssVar('--viz-link', 'rgba(74,222,128,0.4)'),
				grid: cssVar('--viz-grid', 'rgba(245,245,245,0.07)'),
				warm: cssVar('--viz-warm', '#fbbf24'),
				dim: cssVar('--viz-dim', 'rgba(245,245,245,0.22)'),
				accent: cssVar('--accent', '#4ade80'),
				onSurface: cssVar('--on-surface', '#f5f5f5'),
				onSurfaceRgb: cssVar('--on-surface-rgb', '245, 245, 245')
			};
		}

		function render() {
			if (!ctx) return;
			ctx.clearRect(0, 0, width, height);
			drawHeroField(ctx, {
				width,
				height,
				progress: 1,
				palette,
				mouse: { x: mouse.x, y: mouse.y, active: mouse.active },
				time: reduced ? 0 : (performance.now() - start) / 1000
			});
		}

		function resize() {
			if (!canvasEl) return;
			const fitted = fitCanvas(canvasEl);
			ctx = fitted.ctx;
			width = fitted.width;
			height = fitted.height;
			render();
		}

		resize();
		const ro = new ResizeObserver(() => resize());
		ro.observe(canvasEl);
		const stopThemeWatch = onThemeChange(() => {
			palette = readPalette();
			render();
		});

		if (reduced) {
			return () => {
				ro.disconnect();
				stopThemeWatch();
			};
		}

		function onPointerMove(event) {
			const rect = canvasEl.getBoundingClientRect();
			mouse.tx = (event.clientX - rect.left) / Math.max(1, rect.width);
			mouse.ty = (event.clientY - rect.top) / Math.max(1, rect.height);
			mouse.active = true;
		}
		function onPointerLeave() {
			mouse.active = false;
		}
		window.addEventListener('pointermove', onPointerMove, { passive: true });
		root.addEventListener('pointerleave', onPointerLeave);

		function loop() {
			mouse.x += (mouse.tx - mouse.x) * 0.07;
			mouse.y += (mouse.ty - mouse.y) * 0.07;
			render();
			raf = requestAnimationFrame(loop);
		}
		const startLoop = () => {
			if (!raf) raf = requestAnimationFrame(loop);
		};
		const stopLoop = () => {
			if (raf) cancelAnimationFrame(raf);
			raf = 0;
		};

		// Scrolled past the hero → stop burning frames on it.
		const io = new IntersectionObserver(
			(entries) => {
				onScreen = entries.some((e) => e.isIntersecting);
				if (onScreen) startLoop();
				else stopLoop();
			},
			{ rootMargin: '10% 0px' }
		);
		io.observe(root);
		startLoop();

		function onVisibility() {
			if (document.hidden) stopLoop();
			else if (onScreen) startLoop();
		}
		document.addEventListener('visibilitychange', onVisibility);

		let cleanupGsap = () => {};
		let cancelled = false;

		loadGsap().then((bits) => {
			if (!bits || cancelled || !root) return;
			const { gsap } = bits;
			const scope = gsap.context(() => {
				// Entrance. `stats` is optional, so filter out missing layers
				// rather than handing GSAP an undefined target.
				gsap.from([layerTitle, layerSub, layerStats].filter(Boolean), {
					y: 34,
					opacity: 0,
					duration: 0.9,
					ease: 'power3.out',
					stagger: 0.13,
					// The splash screen holds the viewport for ~5s; starting the
					// entrance behind it would waste it.
					delay: 0.2
				});

				// Depth-ordered parallax on exit.
				gsap
					.timeline({
						scrollTrigger: {
							trigger: root,
							start: 'top top',
							end: 'bottom top',
							scrub: 0.6
						}
					})
					.to(layerTitle, { y: -140, opacity: 0.15, ease: 'none' }, 0)
					.to(layerSub, { y: -90, opacity: 0.1, ease: 'none' }, 0)
					.to(canvasEl, { y: 90, opacity: 0.35, ease: 'none' }, 0);

				if (layerStats) {
					gsap.to(layerStats, {
						y: -50,
						opacity: 0,
						ease: 'none',
						scrollTrigger: {
							trigger: root,
							start: 'top top',
							end: 'bottom top',
							scrub: 0.6
						}
					});
				}

				if (layerScroll) {
					gsap.to(layerScroll, {
						y: 9,
						repeat: -1,
						yoyo: true,
						duration: 1.1,
						ease: 'sine.inOut'
					});
				}
			}, root);
			cleanupGsap = () => scope.revert();
		});

		return () => {
			cancelled = true;
			stopLoop();
			window.removeEventListener('pointermove', onPointerMove);
			document.removeEventListener('visibilitychange', onVisibility);
			root.removeEventListener('pointerleave', onPointerLeave);
			io.disconnect();
			ro.disconnect();
			stopThemeWatch();
			cleanupGsap();
		};
	});
</script>

<header class="hero" bind:this={root}>
	<canvas class="hero-canvas" bind:this={canvasEl} aria-hidden="true"></canvas>
	<div class="hero-glow" aria-hidden="true"></div>

	<div class="hero-inner">
		<div bind:this={layerTitle}>
			<h1 class="hero-wordmark">
				<span class="wordmark-line">{titleTop}</span>
				<span class="wordmark-line wordmark-accent">{titleBottom}</span>
			</h1>
			{#if tagline}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<p class="tagline">{@html tagline}</p>
			{/if}
		</div>

		<div class="lede" bind:this={layerSub}>
			{#if lede}<p>{lede}</p>{/if}
			{#if actions.length}
				<div class="actions">
					{#each actions as a}
						{#if a.external}
							<a
								class="btn"
								class:btn-primary={a.primary}
								class:btn-secondary={!a.primary}
								href={a.href}
								target="_blank"
								rel="noopener noreferrer">{a.label}</a
							>
						{:else if a.href.startsWith('#')}
							<a
								class="btn"
								class:btn-primary={a.primary}
								class:btn-secondary={!a.primary}
								href={a.href}
								on:click={jumpToFirstScene}>{a.label}</a
							>
						{:else}
							<a
								class="btn"
								class:btn-primary={a.primary}
								class:btn-secondary={!a.primary}
								href={a.href}>{a.label}</a
							>
						{/if}
					{/each}
				</div>
			{/if}
		</div>

		{#if stats.length}
			<ul class="stats" bind:this={layerStats}>
				{#each stats as s}
					<li>
						<span class="stat-value">{s.value}</span>
						<span class="stat-label">{s.label}</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="scroll-hint" bind:this={layerScroll} aria-hidden="true">
		<span>Scroll</span>
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M12 5v14M5 12l7 7 7-7" />
		</svg>
	</div>
</header>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		min-height: 100svh;
		display: flex;
		align-items: center;
		overflow: hidden;
		background: var(--surface-deep);
		color: var(--on-surface);
	}

	.hero-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		display: block;
		z-index: 0;
	}

	.hero-glow {
		position: absolute;
		width: min(800px, 120vw);
		height: min(800px, 120vw);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: radial-gradient(
			circle,
			rgba(74, 222, 128, 0.14) 0%,
			rgba(34, 197, 94, 0.05) 40%,
			transparent 70%
		);
		pointer-events: none;
		z-index: 0;
	}

	.hero-inner {
		position: relative;
		z-index: 1;
		width: min(1100px, 100%);
		margin: 0 auto;
		padding: 120px clamp(20px, 6vw, 48px) 140px;
	}

	.hero-wordmark {
		margin: 0;
		font-family: var(--font-mono);
		font-size: clamp(2.6rem, 9.5vw, 7rem);
		font-weight: 800;
		letter-spacing: 0.06em;
		line-height: 1.03;
	}

	.wordmark-line {
		display: block;
		color: var(--on-surface);
	}

	.wordmark-accent {
		background: linear-gradient(135deg, #4ade80, #22c55e, #86efac);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		filter: drop-shadow(0 0 30px rgba(74, 222, 128, 0.4));
	}

	:global([data-theme='light']) .wordmark-accent {
		background: linear-gradient(135deg, #15803d, #16a34a, #22c55e);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		filter: none;
	}

	.tagline {
		margin: 18px 0 0;
		font-size: clamp(1.05rem, 2.6vw, 1.5rem);
		font-weight: 500;
		line-height: 1.35;
		color: var(--on-surface-muted);
		letter-spacing: 0.01em;
	}

	.lede {
		margin-top: 28px;
		max-width: 58ch;
	}

	.lede p {
		margin: 0;
		font-size: clamp(1rem, 1.5vw, 1.12rem);
		line-height: 1.72;
		color: var(--on-surface-muted);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		margin-top: 28px;
	}

	.stats {
		list-style: none;
		margin: 52px 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 22px;
		max-width: 860px;
	}

	.stats li {
		padding-top: 16px;
		border-top: 2px solid var(--accent);
	}

	.stat-value {
		display: block;
		font-family: var(--font-mono);
		font-size: clamp(1.3rem, 3vw, 1.9rem);
		font-weight: 700;
		color: var(--on-surface);
	}

	.stat-label {
		display: block;
		margin-top: 6px;
		font-size: 0.9rem;
		line-height: 1.5;
		color: var(--on-surface-muted);
	}

	.scroll-hint {
		position: absolute;
		left: 50%;
		bottom: 26px;
		transform: translateX(-50%);
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--on-surface-subtle);
	}

	.scroll-hint svg {
		width: 18px;
		height: 18px;
	}

	@media (max-width: 820px) {
		.hero-inner {
			padding: 104px clamp(18px, 6vw, 28px) 120px;
		}

		.stats {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero {
			min-height: 0;
		}
	}
</style>
