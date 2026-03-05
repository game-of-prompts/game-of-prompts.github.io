<script lang="ts">
	import { onMount } from 'svelte';

	interface Step {
		title: string;
		description?: string;
		desc?: string;
		icon?: string;
	}

	interface Props {
		title?: string;
		steps?: Step[];
	}

	let { title = 'How It All Comes Together', steps: propSteps }: Props = $props();

	let section: HTMLElement;
	let progress = $state(0);
	let prefersReducedMotion = $state(false);

	const defaultSteps: Step[] = [
		{
			title: 'A creator builds a game',
			desc: 'Design a challenge with measurable scoring. Package it as an immutable Celaut service.',
			icon: 'game'
		},
		{
			title: 'Solvers compete',
			desc: 'Players craft AI solver-services and race to find the highest-scoring strategy.',
			icon: 'solvers'
		},
		{
			title: 'Results sealed on Ergo',
			desc: 'Cryptographic commitments are published on the Ergo blockchain. No tampering possible.',
			icon: 'blockchain'
		},
		{
			title: 'Winner takes the pot',
			desc: 'The game secret is revealed. Smart contracts verify scores and the winner receives all participation fees, minus creator commission and judge fees.',
			icon: 'trophy'
		}
	];

	const steps = $derived(propSteps ?? defaultSteps);
	const currentStep = $derived(Math.min(Math.floor(progress * steps.length), steps.length - 1));

	onMount(() => {
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const onScroll = () => {
			if (!section) return;
			const rect = section.getBoundingClientRect();
			const sectionHeight = section.offsetHeight;
			const viewportHeight = window.innerHeight;
			// Progress: 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
			const rawProgress = -rect.top / (sectionHeight - viewportHeight);
			progress = Math.max(0, Math.min(1, rawProgress));
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<section bind:this={section} class="scrollytelling" class:reduced={prefersReducedMotion}>
	<div class="sticky-container">
		<div class="journey-header">
			<h2 class="section-title">{title}</h2>
		</div>

		<!-- Progress bar -->
		<div class="progress-track">
			{#each steps as step, i}
				<div class="progress-dot" class:active={i <= currentStep} class:current={i === currentStep}>
					<span class="dot-inner"></span>
				</div>
				{#if i < steps.length - 1}
					<div class="progress-line">
						<div
							class="progress-fill"
							style="transform: scaleX({i < currentStep ? 1 : i === currentStep ? Math.max(0, (progress * steps.length - i) % 1) : 0})"
						></div>
					</div>
				{/if}
			{/each}
		</div>

		<!-- Step content -->
		<div class="steps-viewport">
			{#each steps as step, i}
				<div class="step-panel" class:active={i === currentStep} class:past={i < currentStep} class:future={i > currentStep}>
					<div class="step-visual">
						{#if step.icon === 'game'}
							<div class="icon-container game-icon-visual">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<rect x="2" y="6" width="20" height="12" rx="2" />
									<path d="M6 12h4M8 10v4" />
									<circle cx="16" cy="10" r="1" fill="currentColor" />
									<circle cx="18" cy="12" r="1" fill="currentColor" />
								</svg>
							</div>
						{:else if step.icon === 'solvers'}
							<div class="icon-container solvers-icon-visual">
								<div class="solver-group">
									<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="solver s1">
										<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
									</svg>
									<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="solver s2">
										<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
									</svg>
									<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="solver s3">
										<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
									</svg>
								</div>
							</div>
						{:else if step.icon === 'blockchain'}
							<div class="icon-container blockchain-icon-visual">
								<div class="chain-blocks">
									<div class="chain-block b1"></div>
									<div class="chain-link"></div>
									<div class="chain-block b2"></div>
									<div class="chain-link"></div>
									<div class="chain-block b3"></div>
								</div>
							</div>
						{:else if step.icon === 'trophy'}
							<div class="icon-container trophy-icon-visual">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
									<path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
									<path d="M4 22h16" />
									<path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
									<path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
									<path d="M18 2H6v7a6 6 0 1012 0V2z" />
								</svg>
								{#if currentStep === 3}
									<div class="confetti-container">
										{#each Array(12) as _, ci}
											<div class="confetti-particle" style="--ci: {ci}; --cx: {Math.random() * 200 - 100}px; --cy: {Math.random() * -150 - 50}px; --cr: {Math.random() * 720}deg;"></div>
										{/each}
									</div>
								{/if}
							</div>
						{:else if step.title?.toLowerCase().includes('paper') || step.title?.toLowerCase().includes('write') || step.title?.toLowerCase().includes('document')}
							<!-- Writing paper / document icon -->
							<div class="icon-container dynamic-icon-visual">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
									<polyline points="14 2 14 8 20 8" />
									<line x1="16" y1="13" x2="8" y2="13" />
									<line x1="16" y1="17" x2="8" y2="17" />
									<polyline points="10 9 9 9 8 9" />
								</svg>
							</div>
						{:else if step.title?.toLowerCase().includes('reveal') || step.title?.toLowerCase().includes('seed')}
							<!-- Key reveal / unlock icon -->
							<div class="icon-container dynamic-icon-visual">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="8" cy="15" r="4" />
									<line x1="10.85" y1="12.15" x2="19" y2="4" />
									<line x1="18" y1="5" x2="20" y2="7" />
									<line x1="15" y1="8" x2="17" y2="10" />
								</svg>
							</div>
						{:else if step.title?.toLowerCase().includes('register') || step.title?.toLowerCase().includes('pre-commit') || step.title?.toLowerCase().includes('ceremony')}
							<!-- Chain/on-chain registration icon -->
							<div class="icon-container dynamic-icon-visual">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<rect x="2" y="7" width="6" height="6" rx="1" />
									<rect x="9" y="7" width="6" height="6" rx="1" />
									<rect x="16" y="7" width="6" height="6" rx="1" />
									<path d="M8 10h1M15 10h1" />
									<path d="M12 4v3M12 13v3M7 19h10" />
									<circle cx="12" cy="20" r="1" fill="currentColor" />
								</svg>
							</div>
						{:else if step.title?.toLowerCase().includes('run') || step.title?.toLowerCase().includes('game service')}
							<!-- Play/run terminal icon -->
							<div class="icon-container dynamic-icon-visual">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="4 17 10 11 4 5" />
									<line x1="12" y1="19" x2="20" y2="19" />
								</svg>
							</div>
						{:else if step.title?.toLowerCase().includes('design') || step.title?.toLowerCase().includes('create')}
							<div class="icon-container dynamic-icon-visual">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M12 20h9" />
									<path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
								</svg>
							</div>
						{:else if step.title?.toLowerCase().includes('generate') || step.title?.toLowerCase().includes('secret') || step.title?.toLowerCase().includes('rules')}
							<!-- Shield with lock — secret/security -->
							<div class="icon-container dynamic-icon-visual">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
									<rect x="9" y="10" width="6" height="5" rx="1" />
									<path d="M12 10V8a2 2 0 10-4 0v2" />
								</svg>
							</div>
						{:else if step.title?.toLowerCase().includes('publish') || step.title?.toLowerCase().includes('package')}
							<div class="icon-container dynamic-icon-visual">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
									<path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
									<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0" />
									<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3" />
								</svg>
							</div>
						{:else if step.title?.toLowerCase().includes('browse') || step.title?.toLowerCase().includes('discover') || step.title?.toLowerCase().includes('find')}
							<div class="icon-container dynamic-icon-visual">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="12" cy="12" r="10" />
									<polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
								</svg>
							</div>
						{:else if step.title?.toLowerCase().includes('solver') || step.title?.toLowerCase().includes('connect') || step.title?.toLowerCase().includes('wallet')}
							<div class="icon-container dynamic-icon-visual">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
									<path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
								</svg>
							</div>
						{:else if step.title?.toLowerCase().includes('compete')}
							<div class="icon-container dynamic-icon-visual">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
								</svg>
							</div>
						{:else if step.title?.toLowerCase().includes('result') || step.title?.toLowerCase().includes('earn') || step.title?.toLowerCase().includes('submit')}
							<!-- Coin/payment submit icon -->
							<div class="icon-container dynamic-icon-visual">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
									<circle cx="12" cy="12" r="10" />
									<path d="M12 6v6l4 2" />
									<path d="M9 16l2 2 4-4" />
								</svg>
							</div>
						{:else}
							<!-- Numbered step indicator for prop-driven steps without icons -->
							<div class="icon-container step-number-visual">
								<span class="step-number-display">{String(i + 1).padStart(2, '0')}</span>
							</div>
						{/if}
					</div>
					<div class="step-text">
						<span class="step-counter">Step {i + 1} of {steps.length}</span>
						<h3>{step.title}</h3>
						<p>{step.desc ?? step.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.scrollytelling {
		position: relative;
		height: 600vh;
		background: var(--bg-primary);
	}

	:global([data-theme="light"]) .scrollytelling {
		background: var(--bg-primary);
	}

	.scrollytelling.reduced {
		height: auto;
	}

	.scrollytelling.reduced .sticky-container {
		position: relative;
	}

	.sticky-container {
		position: sticky;
		top: 0;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 80px 24px 40px;
		overflow: hidden;
	}

	.journey-header {
		text-align: center;
		margin-bottom: 2.5rem;
	}

	.journey-header :global(.section-label) {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--green-400);
		margin-bottom: 1rem;
		padding: 4px 12px;
		background: var(--green-glow);
		border-radius: 100px;
		border: 1px solid rgba(74, 222, 128, 0.2);
	}

	.journey-header h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		color: var(--text-primary);
		letter-spacing: -0.02em;
		line-height: 1.15;
	}

	/* Progress track */
	.progress-track {
		display: flex;
		align-items: center;
		gap: 0;
		margin-bottom: 3rem;
		width: 100%;
		max-width: 400px;
	}

	.progress-dot {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.4s ease;
		flex-shrink: 0;
	}

	.progress-dot.active {
		border-color: var(--green-400);
	}

	.progress-dot.current {
		border-color: var(--green-400);
		box-shadow: 0 0 12px rgba(74, 222, 128, 0.4);
	}

	.dot-inner {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: transparent;
		transition: background 0.3s;
	}

	.progress-dot.active .dot-inner {
		background: var(--green-400);
	}

	.progress-line {
		flex: 1;
		height: 2px;
		background: rgba(255, 255, 255, 0.08);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--green-400);
		transform-origin: left;
		transition: transform 0.3s ease;
	}

	/* Steps */
	.steps-viewport {
		position: relative;
		width: 100%;
		max-width: 600px;
		height: 300px;
	}

	.step-panel {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1.5rem;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
		pointer-events: none;
	}

	.step-panel.active {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	.step-panel.past {
		opacity: 0;
		transform: translateY(-20px);
		transition: opacity 0.6s ease, transform 0.6s ease;
	}

	.step-visual {
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-container {
		position: relative;
	}

	/* Numbered indicator for prop-passed steps */
	.step-number-visual {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.step-number-display {
		font-family: 'JetBrains Mono', 'Courier New', monospace;
		font-size: 5rem;
		font-weight: 700;
		color: var(--green-400);
		line-height: 1;
		text-shadow: 0 0 30px rgba(74, 222, 128, 0.5), 0 0 60px rgba(74, 222, 128, 0.2);
		letter-spacing: -0.02em;
	}

	/* Dynamic icon for prop-driven steps */
	.dynamic-icon-visual {
		color: var(--green-400);
		animation: floatIcon 3s ease-in-out infinite;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 96px;
		height: 96px;
		border-radius: 24px;
		background: rgba(74, 222, 128, 0.08);
		border: 1px solid rgba(74, 222, 128, 0.15);
		box-shadow: 0 0 30px rgba(74, 222, 128, 0.15), 0 0 60px rgba(74, 222, 128, 0.05);
	}

	/* Game icon */
	.game-icon-visual {
		color: var(--green-400);
		animation: floatIcon 3s ease-in-out infinite;
	}

	/* Solvers */
	.solvers-icon-visual {
		color: var(--green-400);
	}

	.solver-group {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.solver {
		animation: racein 0.6s ease-out both;
	}

	.solver.s1 { animation-delay: 0s; color: #86efac; }
	.solver.s2 { animation-delay: 0.15s; color: var(--green-400); }
	.solver.s3 { animation-delay: 0.3s; color: #22c55e; }

	@keyframes racein {
		from { opacity: 0; transform: translateX(30px); }
		to { opacity: 1; transform: translateX(0); }
	}

	/* Blockchain */
	.chain-blocks {
		display: flex;
		align-items: center;
		gap: 0;
	}

	.chain-block {
		width: 40px;
		height: 40px;
		border-radius: 8px;
		border: 2px solid var(--green-400);
		background: rgba(74, 222, 128, 0.08);
		animation: blockPulse 2s ease-in-out infinite;
	}

	.chain-block.b1 { animation-delay: 0s; }
	.chain-block.b2 { animation-delay: 0.3s; }
	.chain-block.b3 { animation-delay: 0.6s; }

	.chain-link {
		width: 20px;
		height: 2px;
		background: var(--green-400);
		opacity: 0.5;
	}

	@keyframes blockPulse {
		0%, 100% { box-shadow: 0 0 0 rgba(74, 222, 128, 0); }
		50% { box-shadow: 0 0 15px rgba(74, 222, 128, 0.3); }
	}

	/* Trophy */
	.trophy-icon-visual {
		color: var(--green-400);
		animation: floatIcon 2.5s ease-in-out infinite;
	}

	.confetti-container {
		position: absolute;
		inset: -20px;
		pointer-events: none;
	}

	.confetti-particle {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 6px;
		height: 6px;
		border-radius: 2px;
		animation: confettiBurst 1.5s ease-out infinite;
		animation-delay: calc(var(--ci) * 0.08s);
	}

	.confetti-particle:nth-child(odd) { background: #4ade80; }
	.confetti-particle:nth-child(even) { background: #22c55e; }
	.confetti-particle:nth-child(3n) { background: #86efac; }

	@keyframes confettiBurst {
		0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
		100% { transform: translate(var(--cx), var(--cy)) rotate(var(--cr)); opacity: 0; }
	}

	@keyframes floatIcon {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-8px); }
	}

	/* Step text */
	.step-counter {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--green-400);
		opacity: 0.7;
	}

	.step-text h3 {
		font-size: 1.5rem;
		color: var(--text-primary);
		margin-bottom: 0.5rem;
	}

	.step-text p {
		color: var(--text-secondary);
		font-size: 1.05rem;
		max-width: 450px;
		line-height: 1.7;
	}

	/* Reduced motion: show all steps stacked */
	.scrollytelling.reduced .steps-viewport {
		height: auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.scrollytelling.reduced .step-panel {
		position: relative;
		opacity: 1;
		transform: none;
		pointer-events: auto;
	}

	@media (max-width: 768px) {
		.sticky-container {
			padding: 60px 16px 30px;
		}

		.steps-viewport {
			height: 280px;
		}
	}
</style>
