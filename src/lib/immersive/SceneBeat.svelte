<script>
	/*
	 * SceneBeat — one caption "beat" inside a PinnedScene.
	 *
	 * Given the scene's scroll `progress`, a beat fades and lifts into
	 * view across [from, to], holds, then fades out again as the next
	 * beat takes over. That's what turns a pinned section into a short
	 * narrated sequence instead of a wall of text sitting on a canvas.
	 *
	 * When `isStatic` is true (reduced motion, or before GSAP loads)
	 * every beat is rendered at full opacity, stacked, so the section
	 * still reads as an ordinary article.
	 */

	/** Scene progress, 0–1, forwarded from PinnedScene's slot props. */
	export let progress = 0;
	/** Progress at which this beat starts appearing. */
	export let from = 0;
	/** Progress at which this beat has fully faded out. */
	export let to = 1;
	/** Render all beats at once (reduced motion / no-JS). */
	export let isStatic = false;
	/** Keep the beat on screen once shown (used for the final beat). */
	export let hold = false;

	const clamp = (v) => Math.min(1, Math.max(0, v));

	/*
	 * Beat windows are authored STRICTLY ABUTTING (…0.2 / 0.2…0.4 / …),
	 * and the crossfade straddles each boundary: the outgoing beat fades
	 * out over [to - fade, to] while the incoming one fades in over
	 * [from - fade, from]. Since one beat's `to` is the next one's
	 * `from`, those two windows are exactly complementary — a clean
	 * handover with no dead frame and, crucially, no long stretch where
	 * two half-transparent captions sit on top of each other.
	 *
	 * The fade is capped in ABSOLUTE progress rather than as a fraction
	 * of the beat, so a six-beat scene hands over just as crisply as a
	 * three-beat one.
	 */
	const MAX_FADE = 0.04;
	$: span = Math.max(0.0001, to - from);
	$: fade = Math.min(span * 0.34, MAX_FADE);
	$: fadeIn = from <= 0 ? 1 : clamp((progress - (from - fade)) / fade);
	$: fadeOut = hold ? 1 : 1 - clamp((progress - (to - fade)) / fade);
	$: opacity = isStatic ? 1 : clamp(Math.min(fadeIn, fadeOut));
	$: shift = isStatic ? 0 : (1 - fadeIn) * 26 - (1 - fadeOut) * 18;
</script>

<div
	class="beat"
	class:stacked={!isStatic}
	class:inactive={!isStatic && opacity < 0.02}
	style={`opacity:${opacity}; transform: translateY(${shift}px);`}
	aria-hidden={!isStatic && opacity < 0.02 ? 'true' : undefined}
>
	<slot />
</div>

<style>
	.beat {
		will-change: opacity, transform;
	}

	/* In motion mode the beats occupy the same box and cross-fade. The
	   wrapper (.beats in the page) reserves the height via grid. */
	.stacked {
		grid-area: 1 / 1;
	}

	.inactive {
		pointer-events: none;
	}

	.beat :global(h2) {
		font-size: clamp(1.85rem, 4.2vw, 3rem);
		line-height: 1.12;
		letter-spacing: -0.02em;
		margin: 0 0 18px;
		color: var(--on-surface);
	}

	.beat :global(h3) {
		font-size: clamp(1.15rem, 2.4vw, 1.45rem);
		margin: 0 0 12px;
		color: var(--on-surface);
	}

	.beat :global(p) {
		margin: 0 0 14px;
		font-size: clamp(1rem, 1.4vw, 1.1rem);
		line-height: 1.68;
		color: var(--on-surface-muted);
	}

	.beat :global(p:last-child) {
		margin-bottom: 0;
	}

	.beat :global(strong) {
		color: var(--accent-text);
		font-weight: 700;
	}

	.beat :global(code) {
		font-family: var(--font-mono);
		font-size: 0.92em;
		color: var(--accent-text);
	}

	.beat :global(.beat-note) {
		display: inline-block;
		margin-top: 8px;
		padding: 7px 14px;
		border-radius: 999px;
		border: 1px solid var(--border-strong);
		background: rgba(var(--on-surface-rgb), 0.05);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--on-surface-muted);
	}

	@media (prefers-reduced-motion: reduce) {
		.beat {
			opacity: 1 !important;
			transform: none !important;
		}
	}
</style>
