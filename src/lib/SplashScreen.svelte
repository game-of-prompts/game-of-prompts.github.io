<script lang="ts">
	import { onMount } from 'svelte';
	import SplashLogo from '$lib/SplashLogo.svelte';

	let el: HTMLDivElement;

	onMount(() => {
		// Belt-and-suspenders: use both bind:this ref AND getElementById fallback
		const dismiss = () => {
			const target = el ?? document.getElementById('gop-splash');
			if (!target) return;
			target.style.transition = 'opacity 0.75s ease';
			target.style.opacity = '0';
			window.setTimeout(() => {
				if (target) target.style.display = 'none';
			}, 800);
		};

		const t1 = window.setTimeout(dismiss, 2800);
		return () => window.clearTimeout(t1);
	});
</script>

<div bind:this={el} id="gop-splash" class="splash" aria-hidden="true">
		<div class="scanline"></div>
		<div class="content">
			<div class="logo-wrap">
				<SplashLogo />
				<div class="logo-glow"></div>
			</div>
			<div class="title-wrap">
				<h1 class="title" data-text="GAME OF PROMPTS">GAME OF PROMPTS</h1>
			</div>
			<p class="subtitle">WHERE AI MEETS BLOCKCHAIN COMPETITION</p>
			<div class="progress-bar">
				<div class="progress-fill"></div>
			</div>
		</div>
		<div class="corner-tl"></div>
		<div class="corner-tr"></div>
		<div class="corner-bl"></div>
		<div class="corner-br"></div>
	</div>

<style>
	.splash {
		position: fixed;
		inset: 0;
		background: #000;
		z-index: 99998;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		opacity: 1;
		transition: opacity 0.75s ease;
	}

	/* Scan line sweep */
	.scanline {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, #22c55e, transparent);
		animation: scan 2s linear infinite;
		opacity: 0.6;
	}

	@keyframes scan {
		0% { top: 0; }
		100% { top: 100%; }
	}

	/* Corner brackets */
	.corner-tl, .corner-tr, .corner-bl, .corner-br {
		position: absolute;
		width: 50px;
		height: 50px;
		border-color: rgba(34, 197, 94, 0.5);
		border-style: solid;
	}
	.corner-tl { top: 24px; left: 24px; border-width: 2px 0 0 2px; }
	.corner-tr { top: 24px; right: 24px; border-width: 2px 2px 0 0; }
	.corner-bl { bottom: 24px; left: 24px; border-width: 0 0 2px 2px; }
	.corner-br { bottom: 24px; right: 24px; border-width: 0 2px 2px 0; }

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		text-align: center;
		padding: 2rem;
	}

	/* BIGGER LOGO — 220px container, 200px image */
	.logo-wrap {
		position: relative;
		width: 220px;
		height: 220px;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: logoReveal 0.6s ease forwards;
	}

	.logo-glow {
		position: absolute;
		inset: -40px;
		background: radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes logoReveal {
		from { opacity: 0; transform: scale(0.8); }
		to { opacity: 1; transform: scale(1); }
	}

	@keyframes pulse {
		0%, 100% { opacity: 0.5; transform: scale(1); }
		50% { opacity: 1; transform: scale(1.15); }
	}

	.title-wrap {
		animation: titleReveal 0.5s ease 0.3s both;
	}

	@keyframes titleReveal {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	/* BIGGER TITLE */
	.title {
		font-family: 'JetBrains Mono', 'Courier New', monospace;
		font-size: clamp(2.5rem, 8vw, 5rem);
		font-weight: 700;
		letter-spacing: 0.12em;
		color: #22c55e;
		text-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.3), 0 0 80px rgba(34, 197, 94, 0.15);
		margin: 0;
		position: relative;
		animation: glitch 4s steps(20) infinite;
	}

	.title::before,
	.title::after {
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
	}

	.title::before {
		animation: glitch-before 2.5s steps(20) infinite;
		color: #22c55e;
		text-shadow: -2px 0 #0f0;
		opacity: 0.7;
		mix-blend-mode: screen;
	}

	.title::after {
		animation: glitch-after 3.5s steps(20) reverse infinite;
		color: #16a34a;
		text-shadow: 2px 0 #0a0;
		opacity: 0.6;
		mix-blend-mode: screen;
	}

	@keyframes glitch-before {
		0%   { clip-path: inset(0 0 90% 0); transform: translate(2px, 0); }
		20%  { clip-path: inset(30% 0 50% 0); transform: translate(-2px, 0); }
		40%  { clip-path: inset(60% 0 10% 0); transform: translate(1px, 0); }
		60%  { clip-path: inset(10% 0 80% 0); transform: translate(-1px, 0); }
		80%  { clip-path: inset(50% 0 30% 0); transform: translate(2px, 0); }
		100% { clip-path: inset(0 0 90% 0); transform: translate(0, 0); }
	}

	@keyframes glitch-after {
		0%   { clip-path: inset(80% 0 0 0); transform: translate(-2px, 0); }
		20%  { clip-path: inset(40% 0 40% 0); transform: translate(2px, 0); }
		40%  { clip-path: inset(0 0 70% 0); transform: translate(-1px, 0); }
		60%  { clip-path: inset(70% 0 0 0); transform: translate(1px, 0); }
		80%  { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 0); }
		100% { clip-path: inset(80% 0 0 0); transform: translate(0, 0); }
	}

	/* BIGGER SUBTITLE */
	.subtitle {
		font-family: 'JetBrains Mono', 'Courier New', monospace;
		font-size: clamp(0.75rem, 2vw, 1rem);
		letter-spacing: 0.25em;
		color: rgba(34, 197, 94, 0.6);
		text-transform: uppercase;
		margin: 0;
		animation: fadeIn 0.6s ease 0.7s both;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.progress-bar {
		width: 240px;
		height: 2px;
		background: rgba(34, 197, 94, 0.15);
		border-radius: 2px;
		overflow: hidden;
		animation: fadeIn 0.3s ease 1s both;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #22c55e, #4ade80);
		box-shadow: 0 0 8px #22c55e;
		animation: progress 2.8s ease forwards;
		animation-delay: 0.2s;
	}

	@keyframes progress {
		from { width: 0%; }
		to { width: 100%; }
	}
</style>
