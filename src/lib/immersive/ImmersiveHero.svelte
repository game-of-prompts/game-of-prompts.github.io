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
	/*
	 * The word under the scroll arrow. A prop rather than a literal
	 * because it is the one string this component owned itself — every
	 * other one is passed in — and it has to speak the reader's
	 * language like the rest of the page.
	 */
	export let scrollLabel = 'Scroll';

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
		/** @type {MutationObserver | undefined} */
		let splashObserver;

		loadGsap().then((bits) => {
			if (!bits || cancelled || !root) return;
			const { gsap } = bits;
			const scope = gsap.context(() => {
				// Animate inner title elements only: the outer layer belongs to
				// scroll parallax. Separate ownership prevents entrance/exit races.
				const entrance = gsap.timeline({ paused: true });
				entrance
					.from('.wordmark-top', { y: 18, opacity: 0, duration: 0.65, ease: 'power3.out' }, 0)
					.from('.wordmark-glyph', {
						yPercent: 115, rotationX: -75, opacity: 0,
						transformOrigin: '50% 100%', duration: 1.05,
						stagger: 0.065, ease: 'power4.out'
					}, 0.12)
					.from('.wordmark-rule', { scaleX: 0, duration: 1.1, ease: 'expo.out' }, 0.45)
					.from('.tagline', { y: 14, opacity: 0, duration: 0.7 }, 0.65)
					.fromTo('.wordmark-accent', { '--sheen': '120%' }, {
						'--sheen': '-20%', duration: 1.2, ease: 'power2.inOut'
					}, 0.75);

				// The splash owns its duration. Observe its actual dismissal,
				// rather than guessing a delay and wasting the reveal behind it.
				const splash = document.getElementById('gop-splash');
				const reveal = () => {
					if (splash && getComputedStyle(splash).display !== 'none') return;
					splashObserver?.disconnect();
					// Restored/deep-link scroll positions should not replay an
					// offscreen entrance when the visitor returns to the top.
					if (window.scrollY > 80) entrance.progress(1);
					else entrance.play();
				};
				if (splash && getComputedStyle(splash).display !== 'none') {
					splashObserver = new MutationObserver(reveal);
					splashObserver.observe(splash, { attributes: true, attributeFilter: ['style'] });
				}
				reveal();

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
			splashObserver?.disconnect();
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
			<h1 class="hero-wordmark" aria-label={`${titleTop} ${titleBottom}`} dir="ltr">
				<span class="wordmark-top" aria-hidden="true"><span class="wordmark-marker">&gt;_</span>{titleTop}</span>
				<span class="wordmark-line wordmark-accent" aria-hidden="true">
					{#each Array.from(titleBottom) as letter}<span class="wordmark-glyph">{letter}</span>{/each}
				</span>
				<span class="wordmark-rule" aria-hidden="true"></span>
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
		--wordmark-start: #d5ffe6;
		--wordmark-end: #35d875;
		--wordmark-glint: #ffffff;
		position: relative;
		width: fit-content;
		max-width: 100%;
		margin: 0;
		font-family: var(--font-mono);
		font-weight: 800;
		line-height: 1;
	}

	.wordmark-top {
		display: flex;
		align-items: center;
		gap: 0.9em;
		margin-bottom: 18px;
		font-size: clamp(1rem, 2.3vw, 1.65rem);
		font-weight: 500;
		letter-spacing: 0.32em;
		color: var(--on-surface);
	}

	.wordmark-marker {
		color: var(--accent);
		font-size: 0.8em;
		letter-spacing: -0.12em;
	}

	.wordmark-line {
		display: flex;
		font-size: clamp(2.6rem, 12.3vw, 11.6rem);
		letter-spacing: -0.065em;
		perspective: 700px;
		padding: 0.06em 0.08em 0.12em 0;
	}

	.wordmark-accent {
		--sheen: -20%;
		filter: drop-shadow(0 8px 26px rgb(34 197 94 / 0.16));
	}

	.wordmark-glyph {
		display: inline-block;
		background: linear-gradient(115deg,
			transparent calc(var(--sheen) - 14%),
			var(--wordmark-glint) var(--sheen),
			transparent calc(var(--sheen) + 14%)),
			linear-gradient(175deg, var(--wordmark-start) 8%, var(--wordmark-end) 85%);
		-webkit-background-clip: text;
		background-clip: text;
		color: var(--wordmark-end);
		-webkit-text-fill-color: transparent;
	}

	.wordmark-rule {
		display: block;
		height: 2px;
		margin-top: 12px;
		background: linear-gradient(90deg, var(--accent), var(--accent) 16%, transparent 85%);
		transform-origin: left;
	}

	:global([data-theme='light']) .hero-wordmark {
		--wordmark-start: #166534;
		--wordmark-end: #15803d;
		--wordmark-glint: #3ca567;
	}

	:global([data-theme='light']) .wordmark-accent {
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
		.wordmark-line {
			font-size: clamp(3rem, 22vw, 7.4rem);
		}

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
