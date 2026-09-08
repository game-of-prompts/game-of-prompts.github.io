<script lang="ts">
	/*
	 * The theme switch.
	 *
	 * It used to position itself `fixed` in the bottom-right corner. It
	 * no longer does: it is now one of three controls inside
	 * FloatingControls, which owns the positioning for all of them, so
	 * this component is just a button. That is what lets a fourth
	 * control be added later without a fourth magic corner offset.
	 *
	 * The icon shows what pressing it would GIVE you (a sun while dark,
	 * a moon while light), which is the convention the previous version
	 * already used — kept, so returning readers aren't surprised.
	 */
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n/index.js';

	let theme = $state('dark');

	onMount(() => {
		const storedTheme = localStorage.getItem('theme');
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (storedTheme) {
			theme = storedTheme;
		} else {
			theme = systemPrefersDark ? 'dark' : 'light';
		}
		document.documentElement.setAttribute('data-theme', theme);
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
	}
</script>

<button
	onclick={toggleTheme}
	class="theme-toggle"
	aria-label={theme === 'light' ? $t('common.themeToDark') : $t('common.themeToLight')}
	title={theme === 'light' ? $t('common.themeToDark') : $t('common.themeToLight')}
>
	{#if theme === 'light'}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
	{/if}
</button>

<style>
	.theme-toggle {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: var(--accent-text);
		background: rgba(var(--surface-rgb), 0.82);
		border: 1px solid var(--border-strong);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		box-shadow: var(--shadow-sm);
		transition: background 0.25s ease, transform 0.2s ease, border-color 0.25s ease,
			color 0.25s ease;
	}

	.theme-toggle:hover {
		transform: scale(1.08);
		background: var(--surface);
		border-color: var(--accent);
	}

	.theme-toggle:focus-visible {
		outline: 2px solid var(--accent-text);
		outline-offset: 3px;
	}

	.theme-toggle svg {
		width: 22px;
		height: 22px;
	}

	@media (prefers-reduced-motion: reduce) {
		.theme-toggle {
			transition: none;
		}
		.theme-toggle:hover {
			transform: none;
		}
	}
</style>
