<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	let { children } = $props();

	let scrolled = $state(false);
	let menuOpen = $state(false);

	onMount(() => {
		const handler = () => { scrolled = window.scrollY > 40; };
		window.addEventListener('scroll', handler, { passive: true });
		return () => window.removeEventListener('scroll', handler);
	});
</script>

<nav class="navbar" class:scrolled>
	<div class="nav-inner">
		<a href="/" class="nav-logo">
			<span class="logo-bracket">[</span>GoP<span class="logo-bracket">]</span>
		</a>
		<div class="nav-links" class:open={menuOpen}>
			<a href="#how-it-works" onclick={() => menuOpen = false}>Foundations</a>
			<a href="#components" onclick={() => menuOpen = false}>Architecture</a>
			<a href="#security" onclick={() => menuOpen = false}>Security</a>
			<a href="#games" onclick={() => menuOpen = false}>Games</a>
			<a href="#get-started" class="nav-cta" onclick={() => menuOpen = false}>Get Started</a>
		</div>
		<button class="nav-burger" onclick={() => menuOpen = !menuOpen} aria-label="Toggle menu">
			<span></span><span></span><span></span>
		</button>
	</div>
</nav>

{@render children()}

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 16px 24px;
		transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.navbar.scrolled {
		background: rgba(10, 10, 10, 0.85);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-bottom: 1px solid rgba(255,255,255,0.06);
		padding: 12px 24px;
	}

	.nav-inner {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-logo {
		font-family: 'JetBrains Mono', monospace;
		font-size: 1.2rem;
		font-weight: 700;
		color: #f5f5f5;
		text-decoration: none;
		letter-spacing: -0.02em;
	}

	.logo-bracket {
		color: #4ade80;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 32px;
	}

	.nav-links a {
		font-size: 0.9rem;
		font-weight: 500;
		color: #a3a3a3;
		text-decoration: none;
		transition: color 0.2s;
	}

	.nav-links a:hover {
		color: #f5f5f5;
	}

	.nav-cta {
		background: rgba(74, 222, 128, 0.1);
		color: #4ade80 !important;
		border: 1px solid rgba(74, 222, 128, 0.25);
		padding: 8px 18px;
		border-radius: 8px;
		transition: all 0.2s !important;
	}

	.nav-cta:hover {
		background: rgba(74, 222, 128, 0.18) !important;
		color: #4ade80 !important;
		border-color: rgba(74, 222, 128, 0.5) !important;
	}

	.nav-burger {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
	}

	.nav-burger span {
		display: block;
		width: 22px;
		height: 2px;
		background: #a3a3a3;
		border-radius: 2px;
		transition: all 0.2s;
	}

	@media (max-width: 768px) {
		.nav-burger { display: flex; }

		.nav-links {
			display: none;
			position: fixed;
			top: 60px;
			left: 0;
			right: 0;
			background: rgba(10, 10, 10, 0.97);
			backdrop-filter: blur(16px);
			flex-direction: column;
			padding: 24px;
			gap: 20px;
			border-bottom: 1px solid rgba(255,255,255,0.06);
		}

		.nav-links.open { display: flex; }
	}
</style>
