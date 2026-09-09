<script>
	/* A steady, balanced wordmark over a slowly turning astral sigil.
	 * Motion belongs to the backdrop, never to the title. Reduced motion
	 * paints a static sigil; existing viewport gating pauses offscreen work.
	 */

	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { createSigilField } from './sigil-field.js';
	import {
		loadGsap,
		prefersReducedMotion,
		fitCanvas,
		cssVar,
		onThemeChange,
		scrollTo
	} from '$lib/motion.js';

	/** First words of the wordmark. */
	export let titleTop = 'GAME OF';
	/** Final word, rendered in the accent colour. */
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
	/*
	 * The word under the scroll arrow. A prop rather than a literal
	 * because it is the one string this component owned itself — every
	 * other one is passed in — and it has to speak the reader's
	 * language like the rest of the page.
	 */
	export let scrollLabel = 'Scroll';

	let root;
	let canvasEl;
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
		const field = createSigilField();

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
			field.draw(ctx, width, height, palette.accent, reduced ? 0 : performance.now());
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

		function loop() {
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
					.to(layerSub, { y: -90, opacity: 0.1, ease: 'none' }, 0)
					.to(canvasEl, { y: 90, opacity: 0.35, ease: 'none' }, 0);

				if (layerStats) {
					/*
					 * Exit fade for the stat row. Two things this must NOT do,
					 * because both shipped once and made the row vanish on the
					 * first scroll:
					 *
					 *  1. Be a standalone scrubbed `gsap.to`. ScrollTrigger
					 *     immediately renders those, so it captured the row's
					 *     "from" state (opacity 0, y 34 — the entrance above
					 *     had not started yet), then tweened from 0 to 0.
					 *     Later tween wins, so the row was invisible for good
					 *     the moment the reader scrolled. `fromTo` with explicit
					 *     values + `immediateRender: false` makes the start
					 *     state independent of whatever the entrance is doing.
					 *
					 *  2. Key off the hero's own height. The row sits at the
					 *     bottom of a ~940px hero; on a short viewport it is
					 *     below the fold, so fading it across the hero's scroll
					 *     meant it was already gone by the time it came into
					 *     view. It now fades only once it has reached the top
					 *     quarter of the viewport, i.e. after it has been read.
					 */
					gsap.fromTo(
						layerStats,
						{ y: 0, opacity: 1 },
						{
							y: -50,
							opacity: 0.1,
							ease: 'none',
							immediateRender: false,
							scrollTrigger: {
								trigger: layerStats,
								start: 'top 25%',
								end: 'bottom top',
								scrub: 0.6
							}
						}
					);
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
			document.removeEventListener('visibilitychange', onVisibility);
			io.disconnect();
			ro.disconnect();
			stopThemeWatch();
			cleanupGsap();
		};
	});
</script>

<svelte:head>
	<link rel="preload" href={`${base}/fonts/game-of-thrones.woff2`} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<header class="hero" bind:this={root}>
	<canvas class="hero-canvas" bind:this={canvasEl} aria-hidden="true"></canvas>
	<div class="hero-glow" aria-hidden="true"></div>

	<div class="hero-inner">
		<div>
			<h1 class="hero-wordmark" dir="ltr">
				<span>{titleTop}</span> <span class="wordmark-accent">{titleBottom}</span>
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
		<span>{scrollLabel}</span>
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
	@font-face {
		font-family: 'Game of Thrones Hero';
		src: url('/fonts/game-of-thrones.woff2') format('woff2');
		font-style: normal;
		font-weight: 400;
		font-display: swap;
	}

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
		pointer-events: none;
		mask-image: linear-gradient(to bottom, black 15%, transparent 85%);
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
		font-family: 'Game of Thrones Hero', Georgia, serif;
		font-size: clamp(1.8rem, 5.2vw, 4.2rem);
		font-weight: 400;
		line-height: 1.18;
		letter-spacing: 0.025em;
		color: var(--on-surface);
		text-shadow: 0 2px 18px var(--surface-deep);
	}

	.hero-wordmark span {
		display: inline-block;
	}

	.wordmark-accent {
		color: var(--accent-text, var(--accent));
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
