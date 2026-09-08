<script lang="ts">
	/*
	 * Game of Prompts — immersive landing page.
	 *
	 * The story is staged as a sequence of full-screen PINNED scenes.
	 * Each one holds the viewport while the scroll wheel scrubs a
	 * procedural <canvas> animation and cross-fades the caption beats
	 * beside it, so the protocol explains itself visually instead of
	 * being listed:
	 *
	 *   1. The arena          — a challenge is posted, solvers compete
	 *   2. Three components   — game service · solver service · GoP Web
	 *   3. The creator's flow — design → paper → secret → publish → reveal
	 *   4. The player's journey — read → build → register → seed → run → submit
	 *   5. Score validation   — the contract recomputes the commitment
	 *   6. The pot            — fees in, commissions out, winner + NFT
	 *   7. Judges             — the creator gets audited, not the players
	 *
	 * Below the scenes the page returns to normal flow for the things
	 * that want to be read rather than watched: the video, the security
	 * summary, the game-type showcase, the FAQ and the CTA.
	 *
	 * MOTION IS ADDITIVE ONLY. Under prefers-reduced-motion the pins and
	 * scrubs never initialise, each canvas paints one final frame, and
	 * every caption beat renders stacked — the exact same words, as a
	 * plain illustrated article.
	 *
	 * EVERY USER-FACING STRING COMES FROM THE DICTIONARY.
	 * There is no English in this file's markup: the copy lives in
	 * `$lib/i18n/en.js` and its sixteen siblings, and is read through
	 * `$t('some.key')`. Scene captions are whole arrays (`scenes.arena.beats`),
	 * indexed positionally by the SceneBeat list below — so adding a
	 * beat means adding an entry to seventeen dictionaries, which is
	 * exactly the friction that keeps them in sync. Beat boundaries
	 * (`from`/`to`) are computed from the array length rather than
	 * hardcoded, so a translation with a different number of beats
	 * would still divide the scroll evenly instead of leaving a gap.
	 */

	import { onMount } from 'svelte';
	import ScrollAnimation from '$lib/ScrollAnimation.svelte';
	import SectionTransition from '$lib/SectionTransition.svelte';
	import GameAnimation from '$lib/GameAnimation.svelte';
	import { hoverCorners } from '$lib/hoverCorners';
	import FaqSection from '$lib/FaqSection.svelte';

	import ImmersiveHero from '$lib/immersive/ImmersiveHero.svelte';
	import PinnedScene from '$lib/immersive/PinnedScene.svelte';
	import SceneBeat from '$lib/immersive/SceneBeat.svelte';
	import {
		drawArenaScene,
		drawComponentsScene,
		drawCreatorScene,
		drawPlayerScene,
		drawValidationScene,
		drawPotScene,
		drawJudgesScene
	} from '$lib/immersive/scenes.js';
	import { startSmoothScroll, loadGsap, prefersReducedMotion } from '$lib/motion.js';
	import { t, href } from '$lib/i18n/index.js';

	const VIDEO_ID = 'BeFfxoGaxQ4';
	const DOC_URL =
		'https://raw.githubusercontent.com/game-of-prompts/.github/refs/heads/main/profile/README.md';
	const AI_PROMPT = `Please read this Markdown document and answer questions about it: ${DOC_URL}`;

	let videoStarted = $state(false);
	function startVideo() { videoStarted = true; }

	/*
	 * Beat boundaries, derived rather than written down.
	 *
	 * The old markup carried literal `from={0.315} to={0.648}` pairs,
	 * which encoded "three beats" in two places at once. Translations
	 * are read from arrays now, so the split is computed from the array
	 * length: n beats divide [0,1] into n equal spans, the last one
	 * `hold`s to the end of the pin. Same numbers as before for the
	 * scenes that had even splits, and no way for a dictionary and a
	 * timeline to disagree.
	 */
	function span(i: number, n: number) {
		return { from: i / n, to: (i + 1) / n };
	}

	const heroActions = $derived([
		{ label: $t('hero.actions.launch'), href: 'https://game-of-prompts.github.io/app/', external: true, primary: true },
		{ label: $t('hero.actions.github'), href: 'https://github.com/game-of-prompts', external: true },
		{ label: $t('hero.actions.how'), href: '#arena' }
	]);

	let motion = $state(false);
	let groundRoot: HTMLElement;

	onMount(() => {
		motion = !prefersReducedMotion();

		// Copy button handlers for the "ask an AI" prompt in the FAQ.
		// The label is restored from the dictionary rather than from a
		// literal, so the "Copied!" state speaks the reader's language.
		const copyBtns = document.querySelectorAll('.copy-btn[data-copy-url]');
		const copyHandlers: Array<[Element, () => void]> = [];
		copyBtns.forEach((btn) => {
			const handler = () => {
				const url = btn.getAttribute('data-copy-url');
				if (!url) return;
				navigator.clipboard.writeText(url);
				btn.classList.add('copied');
				const labelEl = btn.querySelector('.copy-label');
				const idle = labelEl?.getAttribute('data-idle-label') || '';
				const done = labelEl?.getAttribute('data-copied-label') || '';
				if (labelEl) labelEl.textContent = done;
				window.setTimeout(() => {
					btn.classList.remove('copied');
					if (labelEl) labelEl.textContent = idle;
				}, 2000);
			};
			btn.addEventListener('click', handler);
			copyHandlers.push([btn, handler]);
		});

		let stopScroll = () => {};
		let cleanupGsap = () => {};
		let cancelled = false;

		startSmoothScroll().then((stop) => {
			if (cancelled) stop();
			else stopScroll = stop;
		});

		if (prefersReducedMotion()) {
			return () => {
				copyHandlers.forEach(([el, h]) => el.removeEventListener('click', h));
			};
		}

		loadGsap().then((bits) => {
			if (!bits || cancelled) return;
			const { gsap, ScrollTrigger } = bits;
			const scope = gsap.context(() => {
				// Light reveals for the non-pinned sections below the scenes.
				gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
					gsap.from(el, {
						y: 28,
						opacity: 0,
						duration: 0.7,
						ease: 'power2.out',
						scrollTrigger: { trigger: el, start: 'top 88%' }
					});
				});
				gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
					gsap.from(group.children, {
						y: 26,
						opacity: 0,
						duration: 0.6,
						ease: 'power2.out',
						stagger: 0.07,
						scrollTrigger: { trigger: group, start: 'top 85%' }
					});
				});
				// Parallax on the full-screen game-type showcases: the copy
				// drifts against its canvas as each one passes through.
				gsap.utils.toArray<HTMLElement>('.game-type-fullscreen').forEach((sec) => {
					const copy = sec.querySelector('.gt-content');
					const art = sec.querySelector('.gt-animation-canvas');
					if (!copy || !art) return;
					gsap
						.timeline({
							scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 0.5 }
						})
						.fromTo(copy, { y: 60 }, { y: -60, ease: 'none' }, 0)
						.fromTo(art, { y: -34, scale: 1.06 }, { y: 34, scale: 1, ease: 'none' }, 0);
				});
			});

			// Pins are created by the PinnedScene children; one refresh once
			// fonts and images have settled keeps every start/end accurate.
			ScrollTrigger.refresh();
			cleanupGsap = () => scope.revert();
		});

		return () => {
			cancelled = true;
			copyHandlers.forEach(([el, h]) => el.removeEventListener('click', h));
			stopScroll();
			cleanupGsap();
		};
	});
</script>

<svelte:head>
	<title>{$t('meta.title')}</title>
	<meta name="description" content={$t('meta.description')} />
	<meta name="theme-color" content="#0a0a0a" />
	<meta property="og:title" content={$t('meta.ogTitle')} />
	<meta property="og:description" content={$t('meta.ogDescription')} />
	<meta property="og:type" content="website" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<!-- Noto covers the scripts Inter has no glyphs for: Arabic, Devanagari,
	     Korean, and the CJK ranges used by the Chinese and Japanese
	     dictionaries. Without them those locales render as tofu boxes. -->
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+Arabic:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans+KR:wght@400;600;700&family=Noto+Sans+SC:wght@400;600;700&family=Noto+Sans+JP:wght@400;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<!-- ============================================ -->
<!-- HERO SECTION                                 -->
<!-- ============================================ -->

<ImmersiveHero
	titleTop={$t('hero.titleTop')}
	titleBottom={$t('hero.titleBottom')}
	tagline={$t('hero.tagline')}
	lede={$t('hero.lede')}
	actions={heroActions}
	stats={$t('hero.stats')}
	scrollLabel={$t('hero.scroll')}
	firstSceneId="arena"
/>

<!-- ============================================================ -->
<!-- SCENE 1 — The arena                                          -->
<!-- ============================================================ -->
<PinnedScene
	id="arena"
	label={$t('scenes.arena.label')}
	draw={drawArenaScene}
	scrollLength={2.4}
	let:progress
	let:static={isStatic}
>
	<div class="beats" class:flow={isStatic}>
		{#each $t('scenes.arena.beats') as beat, i}
			{@const n = $t('scenes.arena.beats').length}
			<SceneBeat {progress} {isStatic} {...span(i, n)} hold={i === n - 1}>
				<h2>{beat.h}</h2>
				<p>{@html beat.p}</p>
				{#if beat.note}<span class="beat-note">{beat.note}</span>{/if}
			</SceneBeat>
		{/each}
	</div>
</PinnedScene>

<!-- ============================================================ -->
<!-- SCENE 2 — Core components                                    -->
<!-- ============================================================ -->
<PinnedScene
	id="components"
	label={$t('scenes.components.label')}
	align="right"
	draw={drawComponentsScene}
	scrollLength={2.6}
	let:progress
	let:static={isStatic}
>
	<div class="beats" class:flow={isStatic}>
		{#each $t('scenes.components.beats') as beat, i}
			{@const n = $t('scenes.components.beats').length}
			<SceneBeat {progress} {isStatic} {...span(i, n)} hold={i === n - 1}>
				<h2>{beat.h}</h2>
				<p>{@html beat.p}</p>
				{#if beat.note}<span class="beat-note">{beat.note}</span>{/if}
			</SceneBeat>
		{/each}
	</div>
</PinnedScene>

<!-- ============================================================ -->
<!-- SCENE 3 — Creator flow                                       -->
<!-- ============================================================ -->
<PinnedScene
	id="creator-flow"
	label={$t('scenes.creator.label')}
	draw={drawCreatorScene}
	scrollLength={2.8}
	let:progress
	let:static={isStatic}
>
	<div class="beats" class:flow={isStatic}>
		{#each $t('scenes.creator.beats') as beat, i}
			{@const n = $t('scenes.creator.beats').length}
			<SceneBeat {progress} {isStatic} {...span(i, n)} hold={i === n - 1}>
				<h2>{beat.h}</h2>
				<p>{@html beat.p}</p>
				{#if beat.note}<span class="beat-note">{beat.note}</span>{/if}
			</SceneBeat>
		{/each}
	</div>
</PinnedScene>

<!-- ============================================================ -->
<!-- SCENE 4 — Player journey                                     -->
<!-- ============================================================ -->
<PinnedScene
	id="player-journey"
	label={$t('scenes.player.label')}
	align="right"
	draw={drawPlayerScene}
	scrollLength={3}
	let:progress
	let:static={isStatic}
>
	<div class="beats" class:flow={isStatic}>
		{#each $t('scenes.player.beats') as beat, i}
			{@const n = $t('scenes.player.beats').length}
			<SceneBeat {progress} {isStatic} {...span(i, n)} hold={i === n - 1}>
				<h2>{beat.h}</h2>
				<p>{@html beat.p}</p>
				{#if beat.note}<span class="beat-note">{beat.note}</span>{/if}
			</SceneBeat>
		{/each}
	</div>
</PinnedScene>

<!-- ============================================================ -->
<!-- SCENE 5 — Score validation                                   -->
<!-- ============================================================ -->
<PinnedScene
	id="score-validation"
	label={$t('scenes.validation.label')}
	draw={drawValidationScene}
	scrollLength={2.8}
	let:progress
	let:static={isStatic}
>
	<div class="beats" class:flow={isStatic}>
		{#each $t('scenes.validation.beats') as beat, i}
			{@const n = $t('scenes.validation.beats').length}
			<SceneBeat {progress} {isStatic} {...span(i, n)} hold={i === n - 1}>
				<h2>{beat.h}</h2>
				<p>{@html beat.p}</p>
				{#if beat.note}<span class="beat-note">{beat.note}</span>{/if}
			</SceneBeat>
		{/each}
	</div>
</PinnedScene>

<!-- Readable reference for the five validation steps -->
<section class="ground" bind:this={groundRoot}>
	<div class="block">
		<h2 data-reveal>{$t('steps.title')}</h2>
		<ol class="steps" data-reveal-group>
			{#each $t('steps.items') as s, i}
				<li class="step">
					<div class="step-head">
						<span class="step-num">{String(i + 1).padStart(2, '0')}</span>
						<span class="step-badge">{s.badge}</span>
					</div>
					<h3>{s.title}</h3>
					<p>{s.desc}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- ============================================================ -->
<!-- SCENE 6 — The pot                                            -->
<!-- ============================================================ -->
<PinnedScene
	id="the-pot"
	label={$t('scenes.pot.label')}
	align="right"
	draw={drawPotScene}
	scrollLength={2.6}
	let:progress
	let:static={isStatic}
>
	<div class="beats" class:flow={isStatic}>
		{#each $t('scenes.pot.beats') as beat, i}
			{@const n = $t('scenes.pot.beats').length}
			<SceneBeat {progress} {isStatic} {...span(i, n)} hold={i === n - 1}>
				<h2>{beat.h}</h2>
				<p>{@html beat.p}</p>
				{#if beat.note}<span class="beat-note">{beat.note}</span>{/if}
			</SceneBeat>
		{/each}
	</div>
</PinnedScene>

<!-- ============================================================ -->
<!-- SCENE 7 — Judges                                             -->
<!-- ============================================================ -->
<PinnedScene
	id="judges"
	label={$t('scenes.judges.label')}
	draw={drawJudgesScene}
	scrollLength={2.6}
	let:progress
	let:static={isStatic}
>
	<div class="beats" class:flow={isStatic}>
		{#each $t('scenes.judges.beats') as beat, i}
			{@const n = $t('scenes.judges.beats').length}
			<SceneBeat {progress} {isStatic} {...span(i, n)} hold={i === n - 1}>
				<h2>{beat.h}</h2>
				<p>{@html beat.p}</p>
				{#if beat.note}<span class="beat-note">{beat.note}</span>{/if}
			</SceneBeat>
		{/each}
	</div>
</PinnedScene>

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- VIDEO OVERVIEW                               -->
<!-- ============================================ -->
<section id="overview" class="section video-section">
	<div class="container">
		<ScrollAnimation>
			<span class="section-label">{$t('video.label')}</span>
			<h2 class="section-title">{$t('video.title')}</h2>
			<p class="section-subtitle">{$t('video.subtitle')}</p>
		</ScrollAnimation>
		<div class="video-card" style="margin-top: 2.5rem;">
			<div class="video-wrapper">
				{#if videoStarted}
					<iframe
						src="https://www.youtube.com/embed/{VIDEO_ID}?autoplay=1&rel=0&modestbranding=1"
						title={$t('video.iframeTitle')}
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
				{:else}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="video-thumbnail" onclick={startVideo}>
						<img src="https://img.youtube.com/vi/{VIDEO_ID}/hqdefault.jpg" alt={$t('video.thumbAlt')} class="video-thumb-img" />
						<div class="play-btn-overlay">
							<svg class="play-btn-svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
								<circle cx="40" cy="40" r="38" stroke="#22c55e" stroke-width="3" fill="rgba(34, 197, 94, 0.15)" />
								<polygon points="32,24 60,40 32,56" fill="#22c55e" />
							</svg>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<SectionTransition height={100} />

<!-- SECURITY                                     -->
<!-- ============================================ -->
<section id="security" class="section section-security" style="scroll-margin-top: 80px;">
	<div class="container">
		<ScrollAnimation>
			<span class="section-label">{$t('security.label')}</span>
			<h2 class="section-title">{$t('security.title')}</h2>
			<p class="section-subtitle">{$t('security.subtitle')}</p>
		</ScrollAnimation>

		<div class="security-grid">
			{#each $t('security.cards') as card, i}
				<ScrollAnimation delay={i * 150} animation="scale">
					<div class="card security-card" use:hoverCorners>
						<div class="security-icon">
							{#if i === 0}
								<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
									<path d="M7 11V7a5 5 0 0110 0v4" />
								</svg>
							{:else if i === 1}
								<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
									<circle cx="12" cy="12" r="3" />
									<line x1="1" y1="1" x2="23" y2="23" stroke-width="2" />
								</svg>
							{:else}
								<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
									<polyline points="9 12 11 14 15 10" />
								</svg>
							{/if}
						</div>
						<h3>{card.title}</h3>
						<p>{card.desc}</p>
					</div>
				</ScrollAnimation>
			{/each}
		</div>

	</div>
</section>

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- GAME TYPES                                   -->
<!-- ============================================ -->
<section id="games" class="section narrative-section">
	<div class="container">
		<div class="narrative-content">
			<h2 class="narrative-title">{$t('gameTypes.title')}</h2>
			<p class="narrative-text">{$t('gameTypes.text')}</p>
		</div>
	</div>
</section>

<SectionTransition height={80} />

<!-- ============================================ -->
<!-- GAME TYPES — full-screen, unique per type   -->
<!--                                              -->
<!-- The canvas type, the emoji and the per-type  -->
<!-- class are structure, not copy, so they stay  -->
<!-- here and pair positionally with the          -->
<!-- dictionary's `gameTypes.items`.              -->
<!-- ============================================ -->
{#each [{ kind: 'arcade', cls: 'game-type-arcade', icon: '🎮' }, { kind: 'openworld', cls: 'game-type-world', icon: '🌍' }, { kind: 'trading', cls: 'game-type-trading', icon: '📈' }, { kind: 'protein', cls: 'game-type-science', icon: '🧬' }] as gt, i}
	{@const item = $t('gameTypes.items')[i]}
	<section class="game-type-fullscreen {gt.cls}">
		<div class="gt-bg-glow"></div>
		<div class="gt-animation-canvas">
			<GameAnimation type={gt.kind} />
		</div>
		<div class="gt-content">
			<span class="gt-icon" aria-hidden="true">{gt.icon}</span>
			<span class="gt-label">{$t('gameTypes.eyebrow', { n: String(i + 1).padStart(2, '0') })}</span>
			<h2 class="gt-title">{item.title}</h2>
			<p class="gt-desc">{item.desc}</p>
			<p class="gt-score"><span class="gt-score-label">{$t('common.scoring')}</span> {item.score}</p>
		</div>
		<div class="gt-grid-lines" aria-hidden="true"></div>
	</section>
{/each}

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- OPTIONAL FEATURES — Full-screen cinematic    -->
<!-- ============================================ -->

<section class="section narrative-section">
	<div class="container">
		<div class="narrative-content">
			<h2 class="narrative-title">{$t('features.title')}</h2>
			<p class="narrative-text">{$t('features.text')}</p>
		</div>
	</div>
</section>

<SectionTransition height={80} />

{#each [{ kind: 'resource', cls: 'game-type-resource', id: 'feature-resource', icon: '⚙️', status: 'available' }, { kind: 'poker', cls: 'game-type-poker', id: 'feature-poker', icon: '🃏', status: 'research' }, { kind: 'payattempt', cls: 'game-type-payattempt', id: 'feature-payattempt', icon: '🔬', status: 'research' }] as f, i}
	{@const item = $t('features.items')[i]}
	<section class="game-type-fullscreen {f.cls}" id={f.id}>
		<div class="gt-bg-glow"></div>
		<div class="gt-animation-canvas">
			<GameAnimation type={f.kind} />
		</div>
		<div class="gt-content">
			<span class="gt-icon" aria-hidden="true">{f.icon}</span>
			<span class="gt-label">
				{$t('features.eyebrow', { n: String(i + 1).padStart(2, '0') })} ·
				<span class="feature-tag-status" class:active={f.status === 'available'} class:research={f.status === 'research'}>
					{$t(`features.status.${f.status}`)}
				</span>
			</span>
			<h2 class="gt-title">{item.title}</h2>
			<p class="gt-desc">{item.desc}</p>
			<ul class="gt-bullets">
				{#each item.bullets as b}
					<li>{b}</li>
				{/each}
			</ul>
		</div>
		<div class="gt-grid-lines" aria-hidden="true"></div>
	</section>
{/each}

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- FAQ                                          -->
<!-- ============================================ -->
<section id="faq" class="section" style="scroll-margin-top: 80px;">
	<div class="container">
		<ScrollAnimation>
			<span class="section-label">{$t('faq.label')}</span>
			<h2 class="section-title">{$t('faq.title')}</h2>
		</ScrollAnimation>

		<FaqSection />

		<!-- Still have questions? -->
		<div class="faq-footer">
			<h3 class="faq-footer-title">{$t('faq.footerTitle')}</h3>
			<p class="faq-footer-desc">{$t('faq.footerDesc')}</p>

			<!-- Primary: copy prompt -->
			<div class="faq-copy-prompt">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="prompt-box copy-btn" data-copy-url={AI_PROMPT}>
					<span class="prompt-text">{AI_PROMPT}</span>
					<span class="prompt-copy-icon">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
						<!-- The idle/copied labels ride on the element so the
						     onMount handler can restore them in the active
						     language without importing the store. -->
						<span
							class="copy-label"
							data-idle-label={$t('faq.copyPrompt')}
							data-copied-label={$t('faq.copied')}>{$t('faq.copyPrompt')}</span
						>
					</span>
				</div>
			</div>

			<!-- Secondary: open directly -->
			<p class="faq-or-label">{$t('faq.orLabel')}</p>
			<div class="ai-links-secondary">
				<a href="https://chat.openai.com/?prompt={encodeURIComponent(AI_PROMPT)}" class="btn-ai-secondary" target="_blank" rel="noopener">
					ChatGPT ↗
				</a>
				<a href="https://claude.ai/new?q={encodeURIComponent(AI_PROMPT)}" class="btn-ai-secondary" target="_blank" rel="noopener">
					Claude ↗
				</a>
			</div>

			<!-- Disclaimer -->
			<p class="faq-disclaimer">
				{$t('faq.disclaimerBefore')}<a href="https://github.com/game-of-prompts/.github/blob/main/profile/README.md" target="_blank" rel="noopener">{$t('faq.disclaimerLink')}</a>{$t('faq.disclaimerAfter')}
			</p>

			<div class="telegram-link">
				<a href="https://t.me/unstop_bots" class="btn btn-secondary" target="_blank" rel="noopener" use:hoverCorners>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
					{$t('faq.telegram')}
				</a>
			</div>
		</div>
	</div>
</section>

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- GET STARTED                                  -->
<!-- ============================================ -->
<section id="get-started" class="section section-cta" style="scroll-margin-top: 80px;">
	<div class="container">
		<ScrollAnimation animation="scale">
			<div class="cta-block">
				<div class="cta-glow"></div>
				<span class="section-label">{$t('cta.label')}</span>
				<h2>{$t('cta.title')}</h2>
				<div class="cta-steps">
					{#each $t('cta.steps') as step, i}
						<div class="cta-step">
							<div class="cta-step-number">{i + 1}</div>
							<p>{@html step}</p>
						</div>
					{/each}
				</div>
				<div class="cta-actions">
					<a href="https://github.com/game-of-prompts" class="btn btn-primary" target="_blank" rel="noopener" use:hoverCorners>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
						{$t('cta.github')}
					</a>
					<a href="https://celaut-project.github.io" class="btn btn-secondary" target="_blank" rel="noopener" use:hoverCorners>
						{$t('cta.celaut')}
					</a>
					<a href="https://ergoblockchain.org" class="btn btn-secondary" target="_blank" rel="noopener" use:hoverCorners>
						{$t('cta.ergo')}
					</a>
				</div>
			</div>
		</ScrollAnimation>
	</div>
</section>

<!-- Footer -->
<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<a href={$href('/')} class="footer-logo">
				<img src="/gop-logo.png" alt="GoP" class="footer-logo-img" />
			</a>
			<p>{$t('footer.tagline')}</p>
			<p class="footer-links">
				<a href="https://github.com/game-of-prompts" target="_blank" rel="noopener">{$t('footer.github')}</a>
				· <a href="https://ergoblockchain.org" target="_blank" rel="noopener">{$t('footer.ergo')}</a>
				· <a href="https://celaut-project.github.io" target="_blank" rel="noopener">{$t('footer.celaut')}</a>
			</p>
		</div>
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a href="#" class="back-to-top" aria-label={$t('common.backToTop')} use:hoverCorners>↑</a>
	</div>
</footer>

<style>
	/* ============================================ */
	/* IMMERSIVE SCENE CAPTIONS                     */
	/* ============================================ */

	/* In motion mode every beat of a scene shares one grid cell and
	   cross-fades. The reserved min-height stops the layout jumping as
	   beats of different lengths swap in. */
	.beats {
		display: grid;
		min-height: 16.5em;
	}

	/* Reduced motion / no-JS: beats become ordinary stacked paragraphs. */
	.beats.flow {
		display: block;
		min-height: 0;
	}

	.beats.flow :global(.beat + .beat) {
		margin-top: 36px;
	}

	@media (max-width: 820px) {
		.beats {
			min-height: 14.5em;
		}}

	/* Hero tagline accent (passed as HTML into ImmersiveHero). */
	:global(.hero-grad) {
		background: linear-gradient(135deg, #4ade80, #22c55e);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	:global([data-theme='light']) :global(.hero-grad) {
		background: linear-gradient(135deg, #15803d, #16a34a);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	/* ============================================ */
	/* GROUNDED REFERENCE BLOCK                     */
	/* (the readable list under the pinned scenes)  */
	/* ============================================ */
	.ground {
		max-width: 1060px;
		margin: 0 auto;
		padding: 0 clamp(20px, 6vw, 24px);
		background: var(--bg-primary);
	}

	.block {
		padding: 88px 0 72px;
	}

	.block h2 {
		font-family: var(--font-mono);
		font-size: clamp(1.5rem, 3.2vw, 2rem);
		color: var(--text-primary);
		margin: 0 0 28px;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--border-card);
		letter-spacing: 0.01em;
	}

	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 20px;
	}

	.step {
		padding: 22px;
		border: 1px solid var(--border-card);
		border-radius: var(--radius);
		background: var(--bg-card);
	}

	.step-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 12px;
	}

	.step-num {
		font-family: var(--font-mono);
		font-size: 1.4rem;
		font-weight: 700;
		color: var(--green-400);
	}

	.step-badge {
		font-family: var(--font-mono);
		font-size: 0.62rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		padding: 4px 9px;
		border-radius: 100px;
		border: 1px solid var(--border-card);
		color: var(--text-muted);
	}

	.step h3 {
		font-size: 1.02rem;
		margin: 0 0 8px;
		color: var(--text-primary);
	}

	.step p {
		margin: 0;
		font-size: 0.94rem;
		line-height: 1.62;
		color: var(--text-secondary);
	}

	/* ============================================ */
	/* REDUCED MOTION                               */
	/* ============================================ */
	/* With no pins the page is a normal document; make sure nothing
	   still assumes a 100vh stage. */
	@media (prefers-reduced-motion: reduce) {
		.beats {
			display: block;
			min-height: 0;
		}

		.beats :global(.beat + .beat) {
			margin-top: 36px;
		}}
	/* ============================================ *//* HERO                                         *//* ============================================ */

	@keyframes glowPulse {
		0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
		50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
	}

	.hero-logo {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.hero-logo-mark {
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16px;
		background: rgba(34, 197, 94, 0.08);
		border: 1px solid rgba(34, 197, 94, 0.2);
		box-shadow: 0 0 24px rgba(34, 197, 94, 0.12);
	}

	.hero-logo-img {
		width: 40px;
		height: 40px;
		object-fit: contain;
		filter: drop-shadow(0 0 8px rgba(74, 222, 128, 0.4));
	}

	.hero-logo-name {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 600;
		color: rgba(74, 222, 128, 0.6);
		letter-spacing: 0.25em;
		text-transform: uppercase;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--green-400);
		padding: 6px 16px;
		border-radius: 100px;
		border: 1px solid rgba(74, 222, 128, 0.2);
		background: rgba(74, 222, 128, 0.06);
		margin-bottom: 2rem;
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--green-400);
		animation: dotPulse 2s ease-in-out infinite;
	}

	@keyframes dotPulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.3; }
	}

	@keyframes launchPulse {
		0%, 100% { box-shadow: 0 0 24px rgba(34, 197, 94, 0.4), 0 0 48px rgba(34, 197, 94, 0.15); }
		50% { box-shadow: 0 0 32px rgba(34, 197, 94, 0.55), 0 0 64px rgba(34, 197, 94, 0.2); }
	}

	/* ============================================ */
	/* VIDEO OVERVIEW                                */
	/* ============================================ */
	.video-section {
		padding-top: 4rem;
		padding-bottom: 4rem;
	}

	.video-card {
		max-width: 800px;
		width: 100%;
		margin: 2.5rem auto 0;
		border-radius: 16px;
		padding: 4px;
		background: linear-gradient(135deg, rgba(74, 222, 128, 0.4), rgba(34, 197, 94, 0.3), rgba(74, 222, 128, 0.2));
		box-shadow: 0 0 40px rgba(74, 222, 128, 0.08), 0 0 80px rgba(34, 197, 94, 0.04);
	}

	.video-wrapper {
		width: 100%;
		aspect-ratio: 16 / 9;
		border-radius: 13px;
		overflow: hidden;
		background: #000;
		display: block;
	}

	.video-wrapper iframe {
		display: block;
		width: 100%;
		height: 100%;
		border: none;
	}

	.video-thumbnail {
		position: relative;
		width: 100%;
		height: 100%;
		cursor: pointer;
		overflow: hidden;
	}

	.video-thumb-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.play-btn-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.35);
		transition: background 0.3s;
	}

	.video-thumbnail:hover .play-btn-overlay {
		background: rgba(0, 0, 0, 0.15);
	}

	.play-btn-svg {
		filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.6)) drop-shadow(0 0 40px rgba(34, 197, 94, 0.3));
		transition: transform 0.3s, filter 0.3s;
	}

	.video-thumbnail:hover .play-btn-svg {
		transform: scale(1.1);
		filter: drop-shadow(0 0 30px rgba(34, 197, 94, 0.8)) drop-shadow(0 0 60px rgba(34, 197, 94, 0.4));
	}

	/* ============================================ */
	/* FOUNDATIONS / HOW IT WORKS                    */
	/* ============================================ */
	.foundations-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
		gap: 24px;
		margin-top: 3rem;
	}

	.foundation-card {
		position: relative;
		overflow: hidden;
	}

	.foundation-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--green-400), var(--green-500));
		opacity: 0;
		transition: opacity 0.3s;
	}

	.foundation-card:hover::before {
		opacity: 1;
	}

	.foundation-icon {
		width: 56px;
		height: 56px;
		border-radius: var(--radius);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.25rem;
	}

	.celaut-icon {
		background: var(--green-glow);
		color: var(--green-400);
	}

	.ergo-icon {
		background: var(--green-glow);
		color: var(--green-400);
	}

	.foundation-features {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 1.25rem;
	}

	.feature-tag {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 500;
		padding: 4px 10px;
		border-radius: 100px;
		background: rgba(74, 222, 128, 0.04);
		border: 1px solid rgba(74, 222, 128, 0.08);
		color: var(--text-muted);
	}

	.foundation-link {
		display: inline-flex;
		align-items: center;
		margin-top: 1.25rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--green-400);
		text-decoration: none;
		transition: gap 0.2s;
		gap: 4px;
	}

	.foundation-link:hover {
		color: var(--green-500);
		gap: 8px;
	}

	.ergo-link {
		color: var(--green-400) !important;
	}

	.ergo-link:hover {
		color: var(--green-500) !important;
	}

	.foundations-summary {
		margin-top: 2rem;
		padding: 24px 32px;
		background: rgba(74, 222, 128, 0.03);
		border: 1px solid rgba(74, 222, 128, 0.1);
		border-radius: var(--radius);
	}

	.foundations-summary p {
		color: var(--text-secondary);
		text-align: center;
	}

	.foundations-summary strong {
		color: var(--green-400);
	}

	/* Why GoP */
	.why-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 24px;
		margin-top: 2rem;
	}

	.why-icon {
		width: 52px;
		height: 52px;
		border-radius: var(--radius);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.creator-accent {
		background: var(--green-glow);
		color: var(--green-400);
	}

	.player-accent {
		background: var(--green-glow);
		color: var(--green-400);
	}
	/* ============================================ *//* CORE COMPONENTS                              *//* ============================================ */

	/* ============================================ */
	/* FLOW STEPS (Creator & Player)                */
	/* ============================================ */
	.flow-steps {
		margin-top: 3rem;
		display: flex;
		flex-direction: column;
		gap: 24px;
		max-width: 100%;
		width: 100%;
	}

	.flow-step {
		display: flex;
		gap: 24px;
		align-items: flex-start;
		padding: 28px;
		background: var(--bg-card);
		border: 1px solid rgba(74, 222, 128, 0.08);
		border-radius: var(--radius-lg);
		transition: all 0.3s;
	}

	.flow-step:hover {
		border-color: rgba(74, 222, 128, 0.2);
		background: var(--bg-card-hover);
	}

	.step-number {
		flex-shrink: 0;
		width: 44px;
		height: 44px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 1.1rem;
		background: var(--green-glow);
		color: var(--green-400);
		border: 1px solid rgba(74, 222, 128, 0.2);
	}

	.step-content h3 {
		color: var(--text-primary);
		margin-bottom: 0.35rem;
	}

	.step-content p {
		font-size: 0.95rem;
	}

	.step-note {
		display: block;
		margin-top: 0.5rem;
		font-size: 0.8rem;
		font-style: italic;
		color: var(--text-muted);
	}

	/* Player Steps Variation — now green */
	.player-steps {
		margin-left: 0;
	}

	.player-step:hover {
		border-color: rgba(74, 222, 128, 0.2) !important;
	}

	.player-number {
		background: rgba(34, 197, 94, 0.12) !important;
		color: #86efac !important;
		border-color: rgba(34, 197, 94, 0.2) !important;
	}

	/* ============================================ */
	/* SECURITY                                     */
	/* ============================================ */
	.section-security {
		background: var(--bg-primary);
	}

	.security-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 24px;
		margin-top: 3rem;
		align-items: stretch;
	}

	.security-card {
		text-align: center;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.security-card p {
		flex: 1;
	}

	.security-icon {
		width: 56px;
		height: 56px;
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1rem;
		background: var(--green-glow);
		color: var(--green-400);
	}
	/* ============================================ *//* SCORE VALIDATION — CYBERPUNK SECTION         *//* ============================================ */

	/* Glassmorphism card */

	:global(.validation-card.active) {
		opacity: 1 !important;
		transform: translateY(0) !important;
	}

	:global(.validation-card.active)::before {
		transform: scaleY(1) !important;
	}

	/* CTA Button */
	.sv-cta-wrap {
		display: flex;
		justify-content: center;
		margin-top: 3rem;
	}

	.sv-cta-btn {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 16px 40px;
		background: rgba(0, 255, 136, 0.05);
		border: 2px solid rgba(0, 255, 136, 0.4);
		border-radius: 12px;
		color: #00ff88;
		font-family: var(--font-mono), monospace;
		font-size: 1.05rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: visible;
		letter-spacing: 0.02em;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	.sv-cta-btn:hover {
		background: rgba(0, 255, 136, 0.1);
		border-color: rgba(0, 255, 136, 0.7);
		box-shadow: 0 0 30px rgba(0, 255, 136, 0.2), 0 0 60px rgba(0, 255, 136, 0.08);
		transform: scale(1.03);
	}

	.sv-cta-btn:active {
		transform: scale(0.98);
	}

	/* Particle explosion from button */
	:global(.sv-particle) {
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #00ff88;
		pointer-events: none;
		top: 50%;
		left: 50%;
		animation: svParticleExplode 0.8s ease-out var(--delay, 0s) forwards;
	}

	:global(.sv-particle:nth-child(odd)) {
		background: #7c3aed;
	}

	:global(.sv-particle:nth-child(3n)) {
		background: #ffd700;
		width: 4px;
		height: 4px;
	}

	@keyframes svParticleExplode {
		0% {
			transform: translate(0, 0) scale(1);
			opacity: 1;
		}
		100% {
			transform: translate(var(--px, 100px), var(--py, -100px)) scale(0);
			opacity: 0;
		}
	}

	/* ============================================ */
	/* GAME TYPES                                   */
	/* ============================================ */
	.games-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 20px;
		margin-top: 3rem;
		align-items: stretch;
	}

	.games-grid :global(.scroll-animation) {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.game-card {
		padding: 28px;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.game-card p {
		flex: 1;
	}

	.game-icon {
		font-size: 2.75rem;
		display: block;
		margin-bottom: 1rem;
		line-height: 1;
	}

	.game-score {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-top: 1rem;
		padding-top: 0.75rem;
		border-top: 1px solid rgba(74, 222, 128, 0.06);
		font-size: 0.8rem;
		color: var(--text-muted);
		font-family: var(--font-mono);
	}

	.game-score svg {
		color: var(--green-400);
		flex-shrink: 0;
	}

	/* ============================================ */
	/* OPTIONAL FEATURES                            */
	/* ============================================ */
	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 24px;
		margin-top: 3rem;
		align-items: stretch;
	}

	.feature-card {
		padding: 32px;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.feature-desc {
		flex: 1;
	}

	.feature-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.feature-emoji {
		font-size: 1.8rem;
	}

	.feature-header h3 {
		margin-bottom: 0;
		flex: 1;
	}

	.feature-tag-status {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 3px 10px;
		border-radius: 100px;
		display: inline-block;
		font-variant: all-small-caps;
		vertical-align: middle;
	}

	.feature-tag-status.active {
		background: rgba(74, 222, 128, 0.1);
		color: var(--green-400);
		border: 1px solid rgba(74, 222, 128, 0.2);
	}

	.feature-tag-status.research {
		background: rgba(34, 197, 94, 0.08);
		color: #86efac;
		border: 1px solid rgba(34, 197, 94, 0.15);
	}

	.feature-tag-status.coming-soon {
		background: rgba(74, 222, 128, 0.06);
		color: #bbf7d0;
		border: 1px solid rgba(74, 222, 128, 0.15);
	}

	.feature-desc {
		margin-bottom: 1rem;
	}

	.feature-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.feature-list li {
		font-size: 0.9rem;
		color: var(--text-secondary);
		padding-left: 20px;
		position: relative;
	}

	.feature-list li::before {
		content: '›';
		position: absolute;
		left: 0;
		color: var(--green-400);
		font-weight: 700;
		font-size: 1.1rem;
		line-height: 1.4;
	}

	/* ============================================ */
	/* CTA                                          */
	/* ============================================ */
	.section-cta {
		padding-bottom: 60px;
	}

	.cta-block {
		position: relative;
		text-align: center;
		padding: 64px 48px;
		background: var(--bg-card);
		border: 1px solid rgba(74, 222, 128, 0.08);
		border-radius: 24px;
		overflow: hidden;
	}

	.cta-glow {
		position: absolute;
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(74, 222, 128, 0.06) 0%, transparent 70%);
		top: -100px;
		right: -100px;
		pointer-events: none;
	}

	.cta-block h2 {
		position: relative;
	}

	.cta-steps {
		display: flex;
		gap: 24px;
		margin: 2.5rem auto;
		max-width: 800px;
		text-align: left;
		flex-wrap: wrap;
		justify-content: center;
	}

	.cta-step {
		flex: 1;
		min-width: 200px;
		display: flex;
		gap: 12px;
		align-items: flex-start;
	}

	.cta-step-number {
		flex-shrink: 0;
		width: 28px;
		height: 28px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 0.8rem;
		background: var(--green-glow);
		color: var(--green-400);
		border: 1px solid rgba(74, 222, 128, 0.2);
	}

	.cta-step p {
		font-size: 0.9rem;
	}

	.cta-step strong {
		color: var(--text-primary);
	}

	.cta-actions {
		display: flex;
		gap: 12px;
		justify-content: center;
		flex-wrap: wrap;
		position: relative;
	}

	/* ============================================ */
	/* FOOTER                                       */
	/* ============================================ */
	.footer {
		padding: 40px 24px;
		border-top: 1px solid rgba(74, 222, 128, 0.06);
	}

	.footer .container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 16px;
	}

	.footer-content {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.footer-logo {
		text-decoration: none;
		display: inline-block;
		margin-bottom: 4px;
	}

	.footer-logo-img {
		width: 36px;
		height: 36px;
		object-fit: contain;
		opacity: 0.8;
		transition: opacity 0.2s;
	}

	.footer-logo:hover .footer-logo-img {
		opacity: 1;
	}

	.footer-content p {
		font-size: 0.82rem;
		color: var(--text-muted);
	}

	.footer-links {
		margin-top: 2px;
	}

	.footer-links a {
		color: var(--text-secondary);
		font-size: 0.82rem;
	}

	.footer-links a:hover {
		color: var(--green-400);
	}

	.back-to-top {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background: rgba(74, 222, 128, 0.04);
		border: 1px solid rgba(74, 222, 128, 0.08);
		color: var(--text-secondary);
		font-size: 1.1rem;
		text-decoration: none;
		transition: all 0.2s;
		position: relative;
		overflow: visible;
	}

	.back-to-top:hover {
		background: rgba(74, 222, 128, 0.08);
		border-color: rgba(74, 222, 128, 0.3);
		color: var(--green-400);
		transform: translateY(-2px);
	}

	.narrative-section {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.narrative-content {
		max-width: 800px;
	}

	.narrative-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		margin-bottom: 1.5rem;
		color: var(--text-primary);
	}

	.narrative-text {
		font-size: clamp(1.1rem, 2vw, 1.25rem);
		line-height: 1.8;
		color: var(--text-secondary);
	}

	/* ============================================ */
	/* GAME TYPE FULL-SCREEN SECTIONS               */
	/* ============================================ */
	.game-type-fullscreen {
		position: relative;
		min-height: 80vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding: 80px 24px;
	}

	.gt-bg-glow {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 0;
	}

	.gt-grid-lines {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(74, 222, 128, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(74, 222, 128, 0.03) 1px, transparent 1px);
		background-size: 60px 60px;
		pointer-events: none;
		z-index: 0;
	}

	.gt-animation-canvas {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 800px;
		min-height: 200px;
		margin-bottom: 1rem;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid rgba(74, 222, 128, 0.1);
	}

	.gt-content {
		position: relative;
		z-index: 1;
		max-width: 800px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	.gt-icon {
		font-size: clamp(5rem, 12vw, 9rem);
		line-height: 1;
		filter: drop-shadow(0 0 30px currentColor);
		animation: gt-float 4s ease-in-out infinite;
	}

	@keyframes gt-float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-12px); }
	}

	.gt-label {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		opacity: 0.5;
	}

	.gt-title {
		font-size: clamp(3rem, 9vw, 7rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1;
		margin: 0;
	}

	.gt-desc {
		font-size: clamp(1rem, 1.8vw, 1.2rem);
		line-height: 1.7;
		max-width: 560px;
		opacity: 0.75;
	}

	.gt-score {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		opacity: 0.6;
		margin-top: 0.5rem;
	}

	.gt-score-label {
		letter-spacing: 0.15em;
		margin-right: 0.75rem;
		opacity: 0.5;
	}

	/* Game type fullscreen sections — follow theme */
	.game-type-fullscreen {
		background: var(--bg-primary);
	}

	.game-type-arcade {
		color: #86efac;
	}
	.game-type-arcade .gt-bg-glow {
		background: radial-gradient(ellipse 70% 60% at 50% 80%, rgba(74,222,128,0.12) 0%, transparent 70%);
	}
	.game-type-arcade .gt-title {
		background: linear-gradient(135deg, #86efac, #4ade80);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.game-type-arcade .gt-score-label { color: #4ade80; }

	.game-type-world {
		color: #86efac;
	}
	.game-type-world .gt-bg-glow {
		background: radial-gradient(ellipse 70% 60% at 30% 70%, rgba(34,197,94,0.12) 0%, transparent 70%);
	}
	.game-type-world .gt-title {
		background: linear-gradient(135deg, #86efac, #22c55e);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.game-type-world .gt-score-label { color: #22c55e; }

	.game-type-trading {
		color: #bbf7d0;
	}
	.game-type-trading .gt-bg-glow {
		background: radial-gradient(ellipse 70% 60% at 70% 40%, rgba(74,222,128,0.1) 0%, transparent 70%);
	}
	.game-type-trading .gt-title {
		background: linear-gradient(135deg, #bbf7d0, #4ade80);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.game-type-trading .gt-score-label { color: #4ade80; }

	.game-type-science {
		color: #a7f3d0;
	}
	.game-type-science .gt-bg-glow {
		background: radial-gradient(ellipse 70% 60% at 50% 30%, rgba(16,185,129,0.1) 0%, transparent 70%);
	}
	.game-type-science .gt-title {
		background: linear-gradient(135deg, #a7f3d0, #10b981);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.game-type-science .gt-score-label { color: #10b981; }

	/* Feature game-type sections */
	.game-type-poker {
		color: #bbf7d0;
	}
	.game-type-poker .gt-bg-glow {
		background: radial-gradient(ellipse 70% 60% at 40% 70%, rgba(74, 222, 128, 0.1) 0%, transparent 70%);
	}
	.game-type-poker .gt-title {
		background: linear-gradient(135deg, #bbf7d0, #4ade80);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.game-type-resource {
		color: #86efac;
	}
	.game-type-resource .gt-bg-glow {
		background: radial-gradient(ellipse 70% 60% at 60% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 70%);
	}
	.game-type-resource .gt-title {
		background: linear-gradient(135deg, #86efac, #22c55e);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.game-type-payattempt {
		color: #a7f3d0;
	}
	.game-type-payattempt .gt-bg-glow {
		background: radial-gradient(ellipse 70% 60% at 50% 60%, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
	}
	.game-type-payattempt .gt-title {
		background: linear-gradient(135deg, #a7f3d0, #10b981);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.game-type-multichain {
		color: #86efac;
	}
	.game-type-multichain .gt-bg-glow {
		background: radial-gradient(ellipse 70% 60% at 50% 40%, rgba(74, 222, 128, 0.12) 0%, transparent 70%);
	}
	.game-type-multichain .gt-title {
		background: linear-gradient(135deg, #86efac, #4ade80);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Bullet list for full-screen feature sections */
	.gt-bullets {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
		text-align: left;
		max-width: 560px;
	}

	.gt-bullets li {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--text-secondary);
		padding-left: 24px;
		position: relative;
		opacity: 0.7;
		line-height: 1.6;
	}

	.gt-bullets li::before {
		content: '>';
		position: absolute;
		left: 0;
		color: var(--green-400);
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 0.85rem;
		line-height: 1.6;
	}

	/* Light mode — game sections get light bg, need dark text overrides */
	:global([data-theme="light"]) .game-type-fullscreen,
	:global(:root:not([data-theme="dark"])) .game-type-fullscreen {
		background: var(--bg-primary) !important;
		color: var(--text-primary) !important;
	}

	:global([data-theme="light"]) .gt-desc,
	:global(:root:not([data-theme="dark"])) .gt-desc {
		color: var(--text-secondary) !important;
		opacity: 1 !important;
	}

	:global([data-theme="light"]) .gt-score,
	:global(:root:not([data-theme="dark"])) .gt-score {
		color: var(--text-secondary) !important;
		opacity: 1 !important;
	}

	:global([data-theme="light"]) .gt-label,
	:global(:root:not([data-theme="dark"])) .gt-label {
		color: var(--green-400) !important;
		opacity: 1 !important;
	}

	/* All gt-titles: dark green gradient in light mode */
	:global([data-theme="light"]) .gt-title,
	:global(:root:not([data-theme="dark"])) .gt-title {
		background: linear-gradient(135deg, #15803d, #166534) !important;
		-webkit-background-clip: text !important;
		-webkit-text-fill-color: transparent !important;
		background-clip: text !important;
	}

	:global([data-theme="light"]) .gt-score-label,
	:global(:root:not([data-theme="dark"])) .gt-score-label {
		color: var(--green-400) !important;
	}

	:global([data-theme="light"]) .feature-tag-status,
	:global(:root:not([data-theme="dark"])) .feature-tag-status {
		opacity: 0.85 !important;
	}

	:global([data-theme="light"]) .gt-grid-lines,
	:global(:root:not([data-theme="dark"])) .gt-grid-lines {
		opacity: 0.04 !important;
	}

	:global([data-theme="light"]) .gt-bullets li,
	:global(:root:not([data-theme="dark"])) .gt-bullets li {
		color: var(--text-secondary) !important;
	}

	/* Score Validation — light mode */
	:global([data-theme="light"]) .section-validation,
	:global(:root:not([data-theme="dark"])) .section-validation {
		background: var(--bg-primary);
	}

	:global([data-theme="light"]) .sv-title,
	:global(:root:not([data-theme="dark"])) .sv-title {
		background: linear-gradient(135deg, #15803d 0%, #166534 50%, #15803d 100%) !important;
		-webkit-background-clip: text !important;
		-webkit-text-fill-color: transparent !important;
		background-clip: text !important;
		color: #15803d !important;
	}

	:global([data-theme="light"]) .sv-subtitle,
	:global(:root:not([data-theme="dark"])) .sv-subtitle {
		color: var(--text-secondary) !important;
	}

	:global([data-theme="light"]) .validation-card,
	:global(:root:not([data-theme="dark"])) .validation-card {
		background: rgba(22, 163, 74, 0.04);
		border-color: rgba(22, 163, 74, 0.2);
	}

	:global([data-theme="light"]) .vc-title,
	:global(:root:not([data-theme="dark"])) .vc-title {
		color: var(--text-primary) !important;
		-webkit-text-fill-color: var(--text-primary) !important;
	}

	:global([data-theme="light"]) .vc-desc,
	:global(:root:not([data-theme="dark"])) .vc-desc {
		color: var(--text-secondary) !important;
	}

	:global([data-theme="light"]) .sv-subtitle,
	:global(:root:not([data-theme="dark"])) .sv-subtitle {
		color: var(--text-secondary) !important;
	}

	:global([data-theme="light"]) .vc-num,
	:global([data-theme="light"]) .vc-badge,
	:global(:root:not([data-theme="dark"])) .vc-num,
	:global(:root:not([data-theme="dark"])) .vc-badge {
		color: var(--green-400) !important;
		border-color: rgba(22, 163, 74, 0.25) !important;
		background: rgba(22, 163, 74, 0.06) !important;
	}

	:global([data-theme="light"]) .sv-cta-btn,
	:global(:root:not([data-theme="dark"])) .sv-cta-btn {
		color: var(--green-400);
		border-color: rgba(22, 163, 74, 0.4);
		background: rgba(22, 163, 74, 0.05);
	}
	/* ============================================ *//* HERO TITLE REDESIGN                          *//* ============================================ */

	@keyframes heroTitleGlow {
		0%, 100% { filter: drop-shadow(0 0 30px rgba(74, 222, 128, 0.5)); }
		50% { filter: drop-shadow(0 0 60px rgba(74, 222, 128, 0.8)); }
	}
	/* (old validation pipeline styles removed — replaced by .section-validation) *//* ============================================ *//* JUDGES                                       *//* ============================================ */

	/* ============================================ */
	/* FAQ                                          */
	/* ============================================ */
	.faq-container {
		margin-top: 3rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		max-width: 800px;
		width: 100%;
	}

	.faq-group-title {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--green-400);
		margin-bottom: 0.75rem;
		padding-left: 4px;
	}

	.faq-item {
		border: 1px solid rgba(74, 222, 128, 0.08);
		border-radius: var(--radius);
		background: var(--bg-card);
		overflow: hidden;
		transition: border-color 0.3s;
	}

	.faq-item:hover {
		border-color: rgba(74, 222, 128, 0.2);
	}

	.faq-item[open] {
		border-color: rgba(74, 222, 128, 0.25);
		background: var(--bg-card-hover);
	}

	.faq-question {
		cursor: pointer;
		padding: 16px 20px;
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-primary);
		list-style: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		user-select: none;
	}

	.faq-question::-webkit-details-marker {
		display: none;
	}

	.faq-question::after {
		content: '+';
		font-family: var(--font-mono);
		font-size: 1.2rem;
		font-weight: 400;
		color: var(--green-400);
		flex-shrink: 0;
		transition: transform 0.3s;
	}

	.faq-item[open] .faq-question::after {
		content: '−';
	}

	.faq-answer {
		padding: 0 20px 16px;
	}

	.faq-answer p {
		font-size: 0.9rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	.faq-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	/* FAQ Footer — AI Links + Telegram */
	.faq-footer {
		margin-top: 3rem;
		padding: 32px;
		background: var(--bg-card);
		border: 1px solid rgba(74, 222, 128, 0.1);
		border-radius: var(--radius-lg);
		text-align: center;
		max-width: 800px;
		width: 100%;
	}

	.faq-footer-title {
		font-size: 1.4rem;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.faq-footer-desc {
		font-size: 0.95rem;
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
	}

	.ai-links {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 1.5rem;
	}

	.ai-link-row {
		display: flex;
		align-items: center;
		gap: 8px;
		justify-content: center;
	}

	.btn-ai {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		border-radius: 10px;
		font-size: 0.95rem;
		font-weight: 600;
		background: linear-gradient(135deg, var(--green-500), var(--green-600));
		color: #000;
		box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
		text-decoration: none;
		transition: all 0.25s;
		min-width: 180px;
		justify-content: center;
	}

	.btn-ai:hover {
		box-shadow: 0 0 30px rgba(34, 197, 94, 0.5);
		transform: translateY(-2px);
		color: #000;
	}

	.copy-btn {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 8px 12px;
		border-radius: 8px;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--text-secondary);
		background: rgba(74, 222, 128, 0.06);
		border: 1px solid rgba(74, 222, 128, 0.15);
		cursor: pointer;
		transition: all 0.2s;
		user-select: none;
	}

	.copy-btn:hover {
		background: rgba(74, 222, 128, 0.12);
		border-color: rgba(74, 222, 128, 0.3);
		color: var(--green-400);
	}

	.copy-btn.copied {
		background: rgba(74, 222, 128, 0.15);
		border-color: var(--green-400);
		color: var(--green-400);
	}

	.telegram-link {
		padding-top: 1rem;
		border-top: 1px solid rgba(74, 222, 128, 0.08);
	}

	/* ===== FAQ FOOTER — PROMPT COPY ===== */
	.faq-copy-prompt {
		margin: 1.5rem 0 0.75rem;
		width: 100%;
		max-width: 680px;
	}

	.prompt-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 14px 18px;
		background: rgba(74, 222, 128, 0.04);
		border: 1px solid rgba(74, 222, 128, 0.2);
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.25s;
		width: 100%;
		text-align: left;
	}

	.prompt-box:hover {
		background: rgba(74, 222, 128, 0.08);
		border-color: rgba(74, 222, 128, 0.4);
		box-shadow: 0 0 20px rgba(74, 222, 128, 0.08);
	}

	.prompt-box.copied {
		border-color: var(--green-400);
		background: rgba(74, 222, 128, 0.1);
	}

	.prompt-text {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-secondary);
		line-height: 1.5;
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.prompt-copy-icon {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--green-400);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.faq-or-label {
		font-size: 0.8rem;
		color: var(--text-muted);
		margin: 0.5rem 0;
	}

	.ai-links-secondary {
		display: flex;
		gap: 12px;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.btn-ai-secondary {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text-secondary);
		text-decoration: none;
		padding: 6px 14px;
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 8px;
		transition: all 0.2s;
	}

	.btn-ai-secondary:hover {
		color: var(--green-400);
		border-color: rgba(74, 222, 128, 0.3);
		background: rgba(74, 222, 128, 0.05);
	}

	.faq-disclaimer {
		font-size: 0.78rem;
		color: var(--text-muted);
		margin-bottom: 1.25rem;
		opacity: 0.7;
	}

	.faq-disclaimer a {
		color: var(--green-400);
		text-decoration: none;
	}

	.faq-disclaimer a:hover {
		text-decoration: underline;
	}

	/* ============================================ */
	/* RESPONSIVE                                   */
	/* ============================================ */
	@media (max-width: 768px) {

		.foundations-grid {
			grid-template-columns: 1fr;
		}

		.flow-step {
			flex-direction: column;
			gap: 16px;
		}
	/* Validation cards — mobile stack */

		.games-grid {
			grid-template-columns: 1fr;
		}

		.features-grid {
			grid-template-columns: 1fr;
		}

		.cta-block {
			padding: 40px 24px;
		}

		.cta-steps {
			flex-direction: column;
		}

		.faq-footer {
			padding: 24px 16px;
		}

		.ai-link-row {
			flex-direction: column;
		}

		.btn-ai {
			min-width: unset;
			width: 100%;
		}}

	@media (max-width: 480px) {

		.cta-actions {
			flex-direction: column;
			align-items: center;
		}}</style>
