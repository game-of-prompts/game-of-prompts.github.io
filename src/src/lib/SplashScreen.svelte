<script lang="ts">
	import { onMount } from 'svelte';

	let show = true;
	let visible = true;

	onMount(() => {
		const timer = setTimeout(() => {
			visible = false;
		}, 2500);
		const timer2 = setTimeout(() => {
			show = false;
		}, 3000);
		return () => {
			clearTimeout(timer);
			clearTimeout(timer2);
		};
	});
</script>

{#if show}
	<div class="splash-screen" class:visible>
		<div class="splash-content">
			<img src="/gop-logo.png" alt="Game of Prompts" class="splash-logo" />
			<h1 class="splash-title">Game of Prompts</h1>
		</div>
	</div>
{/if}

<style>
	.splash-screen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #0d0d0d;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
		opacity: 1;
		transition: opacity 0.5s ease-in-out;
	}

	.splash-screen:not(.visible) {
		opacity: 0;
	}

	.splash-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
	}

	.splash-logo {
		width: 128px;
		height: 128px;
	}

	.splash-title {
		font-family: 'JetBrains Mono', monospace;
		font-size: 2rem;
		font-weight: 600;
		color: #f5f5f5;
		letter-spacing: -0.01em;
	}
</style>
