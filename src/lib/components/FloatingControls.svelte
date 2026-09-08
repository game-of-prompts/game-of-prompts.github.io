<script>
	/*
	 * The fixed control cluster: language, theme, then the glossary
	 * switch.
	 *
	 * TOP-LEFT, not top-right. The theme button used to be alone in the
	 * bottom-right corner, which is exactly where the "back to top"
	 * affordance and the mobile browser chrome want to be, and it left
	 * no room for two more controls. The top-left corner is empty on
	 * every scene of this page (the wordmark is centred, the pinned
	 * captions sit inboard) and is the first place a left-to-right
	 * reader looks.
	 *
	 * They share one positioned parent rather than each being
	 * `position: fixed` on its own, and publish their width as
	 * --floating-controls-w, so anything that has to keep clear of them
	 * can reserve exactly the right gap instead of hard-coding a magic
	 * number.
	 *
	 * All three are reading preferences rather than navigation — what
	 * language, which theme, and whether unfamiliar terms are explained
	 * — which is why they live together.
	 */
	import LanguageToggle from './LanguageToggle.svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import GlossaryToggle from './glossary/GlossaryToggle.svelte';
</script>

<div class="floating-controls">
	<LanguageToggle />
	<ThemeToggle />
	<GlossaryToggle />
</div>

<style>
	.floating-controls {
		position: fixed;
		top: 18px;
		inset-inline-start: 18px;
		z-index: 1000;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	@media (max-width: 560px) {
		.floating-controls {
			top: 12px;
			inset-inline-start: 12px;
			gap: 6px;
		}
	}
</style>
