<script lang="ts">
	import { onMount } from 'svelte';

	let theme = 'dark';

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

<button on:click={toggleTheme} class="theme-toggle" aria-label="Toggle theme">
	{#if theme === 'light'}
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
	{/if}
</button>

<style>
	.theme-toggle {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 1000;
		background: var(--bg-card);
		border: 1px solid var(--border-card);
		border-radius: 50%;
		width: 48px;
		height: 48px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		color: var(--text-primary);
		transition: all 0.2s ease-in-out;
		box-shadow: 0 2px 8px rgba(0,0,0,0.15);
	}

	.theme-toggle:hover {
		background: var(--bg-card-hover);
		border-color: var(--green-400, #22c55e);
		transform: translateY(-2px);
	}
</style>
