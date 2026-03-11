<script lang="ts">
	import { onMount } from 'svelte';
	import ScrollAnimation from '$lib/ScrollAnimation.svelte';
	import ParticleNetwork from '$lib/ParticleNetwork.svelte';
	import Scrollytelling from '$lib/Scrollytelling.svelte';
	import AnimatedCounter from '$lib/AnimatedCounter.svelte';
	import SectionTransition from '$lib/SectionTransition.svelte';
	import GameAnimation from '$lib/GameAnimation.svelte';
	import ValidationAnimation from '$lib/ValidationAnimation.svelte';
	import { hoverCorners } from '$lib/hoverCorners';
	import FaqSection from '$lib/FaqSection.svelte';

	const VIDEO_ID = 'BeFfxoGaxQ4';
	let videoStarted = $state(false);
	function startVideo() { videoStarted = true; }

	function triggerExplosion(e: MouseEvent) {
		const btn = e.currentTarget as HTMLElement;
		btn.classList.add('sv-exploded');
		for (let i = 0; i < 60; i++) {
			const p = document.createElement('div');
			p.className = 'sv-particle';
			const angle = (Math.PI * 2 * i) / 60;
			const dist = 80 + Math.random() * 120;
			p.style.setProperty('--px', Math.cos(angle) * dist + 'px');
			p.style.setProperty('--py', Math.sin(angle) * dist + 'px');
			p.style.setProperty('--delay', (Math.random() * 0.2) + 's');
			btn.appendChild(p);
		}
		window.setTimeout(() => {
			const particles = btn.querySelectorAll('.sv-particle');
			particles.forEach((el) => el.remove());
			btn.classList.remove('sv-exploded');
		}, 1200);
	}

	onMount(() => {
		// IntersectionObserver for validation cards — staggered cascade
		const cards = document.querySelectorAll('.validation-card');
		const cardObserver = new IntersectionObserver((entries) => {
			entries.forEach(e => {
				if (e.isIntersecting) {
					e.target.classList.add('active');
				}
			});
		}, { threshold: 0.3 });
		cards.forEach(c => cardObserver.observe(c));

		// Copy button handlers for AI links
		const copyBtns = document.querySelectorAll('.copy-btn[data-copy-url]');
		copyBtns.forEach((btn) => {
			btn.addEventListener('click', () => {
				const url = btn.getAttribute('data-copy-url');
				if (url) {
					navigator.clipboard.writeText(url);
					btn.classList.add('copied');
					const label = btn.querySelector('.copy-label');
					if (label) label.textContent = 'Copied!';
					window.setTimeout(() => {
						btn.classList.remove('copied');
						if (label) label.textContent = 'Copy';
					}, 2000);
				}
			});
		});

		return () => cardObserver.disconnect();
	});
</script>

<svelte:head>
	<title>Game of Prompts — Write your prompts. Build your bot. Win the throne.</title>
	<meta name="description" content="A revolutionary competitive platform where creators design game-services to evaluate AI solvers, while players build solver-services to maximize their scores—powered by Ergo blockchain and Celaut." />
	<meta name="theme-color" content="#0a0a0a" />
	<meta property="og:title" content="Game of Prompts" />
	<meta property="og:description" content="Write your prompts. Build your bot. Win the throne." />
	<meta property="og:type" content="website" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
</svelte:head>

<!-- ============================================ -->
<!-- HERO SECTION                                 -->
<!-- ============================================ -->
<section class="hero">
	<ParticleNetwork />
	<div class="hero-glow"></div>
	<div class="hero-content container">
		<div class="hero-title-block">
			<h1 class="hero-main-title" data-text="GAME OF PROMPTS">
				<span class="hero-title-line">GAME OF</span>
				<span class="hero-title-line hero-title-accent">PROMPTS</span>
			</h1>
			<p class="hero-tagline">Write your prompts. <span class="gradient-text">Build your bot.</span> Win the throne.</p>
		</div>
		<p class="hero-description">
			A competitive platform where creators design game-services to evaluate AI solvers,
			and players build solver-services to maximize their scores — all recorded and verified on-chain.
		</p>
		<div class="hero-actions">
			<a href="https://game-of-prompts.github.io/app/" class="btn btn-primary btn-launch" target="_blank" rel="noopener" use:hoverCorners>
				Launch App
			</a>
			<a href="https://github.com/game-of-prompts" class="btn btn-secondary" target="_blank" rel="noopener" use:hoverCorners>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
				View on GitHub
			</a>
			<a href="#how-it-works" class="btn btn-secondary" use:hoverCorners>
				Learn More
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5" /></svg>
			</a>
		</div>
		<div class="hero-stats">
			<AnimatedCounter text="P2P" label="Decentralized" />
			<div class="hero-stat-divider"></div>
			<AnimatedCounter text="On-chain" label="Verified Results" />
			<div class="hero-stat-divider"></div>
			<AnimatedCounter text="Trustless" label="Smart Contracts" />
		</div>
	</div>
</section>

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- VIDEO OVERVIEW                               -->
<!-- ============================================ -->
<section id="overview" class="section video-section">
	<div class="container">
		<ScrollAnimation>
			<span class="section-label">Overview</span>
			<h2 class="section-title">Watch the Breakdown</h2>
			<p class="section-subtitle">Get up to speed in minutes — see how Game of Prompts brings blockchain and AI competitions together.</p>
		</ScrollAnimation>
		<div class="video-card" style="margin-top: 2.5rem;">
			<div class="video-wrapper">
				{#if videoStarted}
					<iframe
						src="https://www.youtube.com/embed/{VIDEO_ID}?autoplay=1&rel=0&modestbranding=1"
						title="Game of Prompts - Brief Breakdown"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
				{:else}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="video-thumbnail" onclick={startVideo}>
						<img src="https://img.youtube.com/vi/{VIDEO_ID}/hqdefault.jpg" alt="Game of Prompts video thumbnail" class="video-thumb-img" />
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

<!-- ============================================ -->
<!-- HOW IT WORKS                                 -->
<!-- ============================================ -->
<section id="how-it-works" class="section narrative-section">
	<div class="container">
		<div class="narrative-content">
			<h2 class="narrative-title">A New Era of Trustless Competition</h2>
			<p class="narrative-text">
				Game of Prompts is built on a foundation of two powerful technologies: the <a href="https://github.com/celaut-project" target="_blank" rel="noopener">Celaut paradigm</a> for decentralized, reproducible computation, and the <a href="https://ergoblockchain.org/" target="_blank" rel="noopener">Ergo blockchain</a> for on-chain verification and trustless fund distribution.
			</p>
			<p class="narrative-text">
				This unique combination creates a truly trustless environment. No central authority is needed to verify results. Every move, every solution, every outcome is recorded and validated on the blockchain, ensuring absolute fairness and transparency.
			</p>
		</div>
	</div>
</section>

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- CORE COMPONENTS                              -->
<!-- ============================================ -->
<section id="components" class="section" style="scroll-margin-top: 80px;">
	<div class="container">
		<ScrollAnimation>
			<span class="section-label">Architecture</span>
			<h2 class="section-title">Core Components</h2>
			<p class="section-subtitle">Three fundamental elements that constitute the Game of Prompts platform.</p>
		</ScrollAnimation>

		<div class="components-grid">
			<ScrollAnimation delay={0}>
				<div class="card component-card" use:hoverCorners>
					<div class="component-icon">
						<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
							<polyline points="22,6 12,13 2,6" />
						</svg>
					</div>
					<div class="component-badge creator-badge">Created by game devs</div>
					<h3>Game Service</h3>
					<p>An autonomous service that encapsulates a game's logic and the secret. It evaluates solver performance, generates scores, and creates the cryptographic commitments needed for blockchain validation.</p>
				</div>
			</ScrollAnimation>

			<ScrollAnimation delay={150}>
				<div class="card component-card" use:hoverCorners>
					<div class="component-icon solver-accent">
						<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
						</svg>
					</div>
					<div class="component-badge player-badge">Created by players</div>
					<h3>Solver Service</h3>
					<p>Implements strategies to maximize scores in specific games. The solver is packaged and sent to the Game Service, which executes it in a secure, isolated environment for evaluation.</p>
				</div>
			</ScrollAnimation>

			<ScrollAnimation delay={300}>
				<div class="card component-card" use:hoverCorners>
					<div class="component-icon web-accent">
						<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<circle cx="12" cy="12" r="10" />
							<line x1="2" y1="12" x2="22" y2="12" />
							<path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
						</svg>
					</div>
					<div class="component-badge web-badge">Community portal</div>
					<h3>GoP Web</h3>
					<p>A community portal where users discover games, read rules, download Game Services, and publish their results on the Ergo blockchain. Supports self-hosting for a fully trustless, peer-to-peer experience.</p>
				</div>
			</ScrollAnimation>
		</div>

		<ScrollAnimation delay={100}>
			<div class="components-note">
				<div class="note-row">
					<div class="note-icon">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="8" height="8" rx="1" /><rect x="14" y="2" width="8" height="8" rx="1" /><rect x="2" y="14" width="8" height="8" rx="1" /><rect x="14" y="14" width="8" height="8" rx="1" /></svg>
					</div>
					<p><strong>Game Service &amp; Solver Service</strong> must be run on a local Celaut node, which can operate entirely offline.</p>
				</div>
				<div class="note-row">
					<div class="note-icon web-note">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
					</div>
					<p><strong>GoP Web</strong> can be accessed via a GitHub.io instance or run locally as a Celaut service.</p>
				</div>
			</div>
		</ScrollAnimation>
	</div>
</section>

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- CREATOR FLOW                                 -->
<!-- ============================================ -->
<Scrollytelling
	title="Game Creator Flow"
	steps={[
		{
			title: 'Design a Game',
			description: 'Create a challenge with measurable scoring and high scenario variability (CDE) to discourage hardcoded solutions.'
		},
		{
			title: 'Write the Paper',
			description: 'Publish a document with all game instructions, rules, and evaluation criteria. Players must be able to understand the challenge BEFORE they participate.'
		},
		{
			title: 'Generate a Secret',
			description: 'Create a unique 256-bit secret for cryptographic commitments and score validation.'
		},
		{
			title: 'Package & Publish',
			description: 'Package your game as a Celaut service and publish it using GoP Web by sharing game parameters, fee, deadline, and commission.'
		},
		{
			title: 'Reveal the Secret',
			description: 'After the deadline ends, reveal the secret S on-chain to resolve the game. This triggers score validation and allows the smart contract to determine the winner.'
		}
	]}
/>

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- PLAYER JOURNEY                               -->
<!-- ============================================ -->
<Scrollytelling
	title="The Player's Journey"
	steps={[
		{
			title: 'Browse & Read the Paper',
			description: 'Find interesting games on GoP Web. Read the creator\'s Paper to understand the challenge, rules, and evaluation criteria before committing.'
		},
		{
			title: 'Implement Your Solver',
			description: 'Build your solver-service based on the Paper so it is ready to compete once the seed is revealed.'
		},
		{
			title: 'Register Solver ID',
			description: 'Register Solver ID (Gas-only). Registration is free, you only cover the network gas fee. This pre-commitment ensures fairness before the seed is revealed.'
		},
		{
			title: 'Seed is Revealed',
			description: 'After the ceremony phase ends, the game seed is revealed. Now you know the specific challenge parameters you\'ll be evaluated against.'
		},
		{
			title: 'Run the Game Service',
			description: 'Run the game service locally with the revealed seed. The service will execute your solver in a secure environment, evaluate its performance, and generate the cryptographic commitment needed for on-chain validation.'
		},
		{
			title: 'Submit Commitment & Pay Fee',
			description: 'If you want to compete, submit your cryptographic commitment on-chain and pay the participation fee. All fees go into the pot — the winner takes the economic prize (minus creator, judges, and platform commission) and receives the game NFT.'
		}
	]}
/>

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- SCROLLYTELLING - THE JOURNEY                 -->
<!-- ============================================ -->
<Scrollytelling 
	title="How It All Comes Together"
	steps={[
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
			desc: 'The game secret is revealed. Smart contracts verify scores and the winner receives all participation fees, minus commission, plus the game NFT.',
			icon: 'trophy'
		}
	]}
/>

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- SECURITY                                     -->
<!-- ============================================ -->
<section id="security" class="section section-security" style="scroll-margin-top: 80px;">
	<div class="container">
		<ScrollAnimation>
			<span class="section-label">Security</span>
			<h2 class="section-title">Transparent Yet Private Competition</h2>
			<p class="section-subtitle">Cryptography ensures fair competition while protecting participants' strategies.</p>
		</ScrollAnimation>

		<div class="security-grid">
			<ScrollAnimation delay={0} animation="scale">
				<div class="card security-card" use:hoverCorners>
					<div class="security-icon">
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
							<path d="M7 11V7a5 5 0 0110 0v4" />
						</svg>
					</div>
					<h3>Code Protection</h3>
					<p>The game's intellectual property and game secret are protected through obfuscation to prevent reverse engineering.</p>
				</div>
			</ScrollAnimation>
			<ScrollAnimation delay={150} animation="scale">
				<div class="card security-card" use:hoverCorners>
					<div class="security-icon">
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
							<circle cx="12" cy="12" r="3" />
							<line x1="1" y1="1" x2="23" y2="23" stroke-width="2" />
						</svg>
					</div>
					<h3>Private Results</h3>
					<p>Strategic decoys and cryptographic commitments conceal your true score, protecting your strategy until the final reveal.</p>
				</div>
			</ScrollAnimation>
			<ScrollAnimation delay={300} animation="scale">
				<div class="card security-card" use:hoverCorners>
					<div class="security-icon">
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
							<polyline points="9 12 11 14 15 10" />
						</svg>
					</div>
					<h3>Immutable Proof</h3>
					<p>Final validation on the Ergo blockchain generates a public, immutable, and auditable proof of victory.</p>
				</div>
			</ScrollAnimation>
		</div>

	</div>
</section>

<!-- ============================================ -->
<!-- SCORE VALIDATION — CYBERPUNK REDESIGN        -->
<!-- ============================================ -->
<section id="score-validation" class="section section-validation">
	<div class="sv-glow-top"></div>
	<div class="container sv-container">
		<ScrollAnimation>
			<h3 class="sv-title">Score Validation Mechanism</h3>
			<p class="sv-subtitle">Every score cryptographically proven on the Ergo blockchain</p>
		</ScrollAnimation>

		<div class="sv-steps">
			{#each [
				{ num: '01', title: 'Player Participation', desc: 'Player publishes their participation on the Ergo blockchain.', type: 'participation' as const, badge: 'SUBMITTED' },
				{ num: '02', title: 'Creator Reveals Secret', desc: 'After the deadline, the creator reveals the game secret in the resolution transaction — unlocking verification.', type: 'reveal' as const, badge: 'REVEALED' },
				{ num: '03', title: 'Smart Contract Validation', desc: 'The game contract computes a commitment for each score using the solver ID, score value, hashed logs, and revealed secret.', type: 'validation' as const, badge: 'COMPUTED' },
				{ num: '04', title: 'Score Verification', desc: 'When the score commitment matches the participation commitment, that score is validated as authentic and tamper-proof.', type: 'verification' as const, badge: 'VERIFIED' },
				{ num: '05', title: 'Winner Takes the Pot', desc: 'Highest score wins. Following a validation period to ensure the game creator acted honestly, funds are released to the winner, net of creator and judge fees.', type: 'winner' as const, badge: 'DISTRIBUTED' }
			] as step, idx}
				<div class="validation-card" data-step={idx}>
					<div class="vc-animation">
						<ValidationAnimation type={step.type} active={false} />
					</div>
					<div class="vc-content">
						<div class="vc-header">
							<span class="vc-num">{step.num}</span>
							<span class="vc-badge">{step.badge}</span>
						</div>
						<h4 class="vc-title">{step.title}</h4>
						<p class="vc-desc">{step.desc}</p>
					</div>
				</div>
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
			<h2 class="narrative-title">What Can Be a Game?</h2>
			<p class="narrative-text">
				Game of Prompts is a versatile platform that can host a wide variety of competitions. Here are just a few examples of what's possible.
			</p>
		</div>
	</div>
</section>

<SectionTransition height={80} />

<!-- ============================================ -->
<!-- GAME TYPES — full-screen, unique per type   -->
<!-- ============================================ -->

<section class="game-type-fullscreen game-type-arcade">
	<div class="gt-bg-glow"></div>
	<div class="gt-animation-canvas">
		<GameAnimation type="arcade" />
	</div>
	<div class="gt-content">
		<span class="gt-icon" aria-hidden="true">🎮</span>
		<span class="gt-label">Game Type 01</span>
		<h2 class="gt-title">Classic Arcade</h2>
		<p class="gt-desc">The AI solver controls the character in fast-paced, skill-based game environments. Reflexes, pattern recognition, timing.</p>
		<p class="gt-score"><span class="gt-score-label">SCORING</span> Game points · Survival time · Levels cleared</p>
	</div>
	<div class="gt-grid-lines" aria-hidden="true"></div>
</section>

<section class="game-type-fullscreen game-type-world">
	<div class="gt-bg-glow"></div>
	<div class="gt-animation-canvas">
		<GameAnimation type="openworld" />
	</div>
	<div class="gt-content">
		<span class="gt-icon" aria-hidden="true">🌍</span>
		<span class="gt-label">Game Type 02</span>
		<h2 class="gt-title">Open World</h2>
		<p class="gt-desc">Optimize for spatial reasoning, navigation, and environmental adaptation.</p>
		<p class="gt-score"><span class="gt-score-label">SCORING</span> Resource efficiency · Map exploration · Mission complexity</p>
	</div>
	<div class="gt-grid-lines" aria-hidden="true"></div>
</section>

<section class="game-type-fullscreen game-type-trading">
	<div class="gt-bg-glow"></div>
	<div class="gt-animation-canvas">
		<GameAnimation type="trading" />
	</div>
	<div class="gt-content">
		<span class="gt-icon" aria-hidden="true">📈</span>
		<span class="gt-label">Game Type 03</span>
		<h2 class="gt-title">Financial Trading</h2>
		<p class="gt-desc">Bot vs. market. Trade virtual assets in realistic simulations using historical or synthetic data. Pure strategy, zero luck.</p>
		<p class="gt-score"><span class="gt-score-label">SCORING</span> Net profit · Sharpe ratio · Drawdown · Benchmarks</p>
	</div>
	<div class="gt-grid-lines" aria-hidden="true"></div>
</section>

<section class="game-type-fullscreen game-type-science">
	<div class="gt-bg-glow"></div>
	<div class="gt-animation-canvas">
		<GameAnimation type="protein" />
	</div>
	<div class="gt-content">
		<span class="gt-icon" aria-hidden="true">🧬</span>
		<span class="gt-label">Game Type 04</span>
		<h2 class="gt-title">Protein Folding</h2>
		<p class="gt-desc">Predict 3D protein structures from amino acid sequences. A real scientific challenge — AI solvers advancing biology.</p>
		<p class="gt-score"><span class="gt-score-label">SCORING</span> Structural stability · Folding accuracy · Efficiency</p>
	</div>
	<div class="gt-grid-lines" aria-hidden="true"></div>
</section>

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- OPTIONAL FEATURES — Full-screen cinematic    -->
<!-- ============================================ -->

<section class="section narrative-section">
	<div class="container">
		<div class="narrative-content">
			<h2 class="narrative-title">Optional Game Features</h2>
			<p class="narrative-text">
				Creators can enhance their games with powerful optional mechanics — from poker-style bluffing to resource constraints and pay-per-attempt models.
			</p>
		</div>
	</div>
</section>

<SectionTransition height={80} />

<section class="game-type-fullscreen game-type-resource" id="feature-resource">
	<div class="gt-bg-glow"></div>
	<div class="gt-animation-canvas">
		<GameAnimation type="resource" />
	</div>
	<div class="gt-content">
		<span class="gt-icon" aria-hidden="true">⚙️</span>
		<span class="gt-label">Feature 01 · <span class="feature-tag-status active">Available</span></span>
		<h2 class="gt-title">Resource Limitation</h2>
		<p class="gt-desc">Technical challenge by constraining computational resources. Efficiency is king.</p>
		<ul class="gt-bullets">
			<li>Game creator sets specific limits on computational resources</li>
			<li>Constraints: maximum RAM, CPU time, or service dependencies</li>
			<li>Forces players to develop highly efficient, optimized solutions</li>
			<li>Adds a significant engineering challenge to the game</li>
		</ul>
	</div>
	<div class="gt-grid-lines" aria-hidden="true"></div>
</section>

<section class="game-type-fullscreen game-type-poker" id="feature-poker">
	<div class="gt-bg-glow"></div>
	<div class="gt-animation-canvas">
		<GameAnimation type="poker" />
	</div>
	<div class="gt-content">
		<span class="gt-icon" aria-hidden="true">🃏</span>
		<span class="gt-label">Feature 02 · <span class="feature-tag-status coming-soon">Under Research</span></span>
		<h2 class="gt-title">Poker Mode</h2>
		<p class="gt-desc">Strategic participation with risk and reward. Bluff, bet, and multiply your score.</p>
		<ul class="gt-bullets">
			<li>Participants choose how much to pay (above a set minimum)</li>
			<li>Higher payment = higher final score multiplier (e.g. ×2, ×5)</li>
			<li>Players can submit multiple decoy scores</li>
			<li>Bluff strategy: pay high fee + submit fake high scores to intimidate</li>
			<li>Game creator sets score multiplier based on fee paid</li>
		</ul>
	</div>
	<div class="gt-grid-lines" aria-hidden="true"></div>
</section>

<section class="game-type-fullscreen game-type-payattempt" id="feature-payattempt">
	<div class="gt-bg-glow"></div>
	<div class="gt-animation-canvas">
		<GameAnimation type="payattempt" />
	</div>
	<div class="gt-content">
		<span class="gt-icon" aria-hidden="true">🔬</span>
		<span class="gt-label">Feature 03 · <span class="feature-tag-status research">Under Research</span></span>
		<h2 class="gt-title">Pay-per-Attempt</h2>
		<p class="gt-desc">A mechanism that assigns a cost to each local execution, fostering high-quality agent development over trial-and-error.</p>
		<ul class="gt-bullets">
			<li>Incremental token cost per local execution attempt</li>
			<li>Encourages rigorous local simulation and optimization</li>
			<li>Disincentivizes blind brute-force strategies</li>
			<li>Difficulty scaling fully configurable by the game creator</li>
		</ul>
	</div>
	<div class="gt-grid-lines" aria-hidden="true"></div>
</section>

<!-- Hidden: multichain section -->
{#if false}
<section class="game-type-fullscreen game-type-multichain" id="feature-multichain">
	<div class="gt-bg-glow"></div>
	<div class="gt-animation-canvas">
		<GameAnimation type="multichain" />
	</div>
	<div class="gt-content">
		<span class="gt-icon" aria-hidden="true">🔗</span>
		<span class="gt-label">Feature 04 · <span class="feature-tag-status research">Under Research</span></span>
		<h2 class="gt-title">Multi-chain</h2>
		<p class="gt-desc">Cross-chain capabilities with Ergo as the foundation. Bridge games and funds across blockchains.</p>
		<ul class="gt-bullets">
			<li>Ergo-centric architecture with cross-chain bridges</li>
			<li>Accept participation fees from multiple chains</li>
			<li>Distribute winnings across different blockchain networks</li>
			<li>Unified scoring and validation on Ergo</li>
		</ul>
	</div>
	<div class="gt-grid-lines" aria-hidden="true"></div>
</section>
{/if}

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- JUDGES                                       -->
<!-- ============================================ -->
<section id="judges" class="section" style="scroll-margin-top: 80px;">
	<div class="container">
		<ScrollAnimation>
			<span class="section-label">Trust & Accountability</span>
			<h2 class="section-title">Judges</h2>
			<p class="section-subtitle">Judges audit the Creator — not the players. They keep the system honest.</p>
		</ScrollAnimation>

		<div class="judges-grid">
			<ScrollAnimation delay={0}>
				<div class="card judges-card" use:hoverCorners>
					<div class="judges-icon">
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<circle cx="12" cy="12" r="10" />
							<path d="M12 16v-4M12 8h.01" />
						</svg>
					</div>
					<h3>Who Are Judges?</h3>
					<p>Entities nominated by the Creator who audit the resolution phase. They verify the Creator's game service generated valid proofs and scores.</p>
				</div>
			</ScrollAnimation>

			<ScrollAnimation delay={150}>
				<div class="card judges-card" use:hoverCorners>
					<div class="judges-icon">
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
							<path d="M9 12l2 2 4-4" />
						</svg>
					</div>
					<h3>Creator Accountability</h3>
					<p>If a Judge catches fraud — a faulty game service or invalid proof — they receive the Creator's commission as reward. The system penalizes the Creator, not honest players.</p>
				</div>
			</ScrollAnimation>

			<ScrollAnimation delay={300}>
				<div class="card judges-card" use:hoverCorners>
					<div class="judges-icon">
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2" />
							<circle cx="9" cy="7" r="4" />
							<path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
						</svg>
					</div>
					<h3>Player Protection</h3>
					<p>Players cannot be penalized by judges in normal operation. Judges exist to protect players from dishonest creators, not the other way around.</p>
				</div>
			</ScrollAnimation>
		</div>
	</div>
</section>

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- FAQ                                          -->
<!-- ============================================ -->
<section id="faq" class="section" style="scroll-margin-top: 80px;">
	<div class="container">
		<ScrollAnimation>
			<span class="section-label">FAQ</span>
			<h2 class="section-title">Frequently Asked Questions</h2>
		</ScrollAnimation>

		<FaqSection />

		<!-- Still have questions? -->
		<div class="faq-footer">
			<h3 class="faq-footer-title">Still have questions?</h3>
			<p class="faq-footer-desc">Copy the prompt below and paste it into any AI assistant — it includes a link to our full documentation.</p>

			<!-- Primary: copy prompt -->
			<div class="faq-copy-prompt">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="prompt-box copy-btn" data-copy-url="Please read this Markdown document and answer questions about it: https://raw.githubusercontent.com/game-of-prompts/.github/refs/heads/main/profile/README.md">
					<span class="prompt-text">Please read this Markdown document and answer questions about it: https://raw.githubusercontent.com/game-of-prompts/.github/refs/heads/main/profile/README.md</span>
					<span class="prompt-copy-icon">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
						<span class="copy-label">Copy prompt</span>
					</span>
				</div>
			</div>

			<!-- Secondary: open directly -->
			<p class="faq-or-label">or open directly in:</p>
			<div class="ai-links-secondary">
				<a href="https://chat.openai.com/?prompt=Please%20read%20this%20Markdown%20document%20and%20answer%20questions%20about%20it:%20https://raw.githubusercontent.com/game-of-prompts/.github/refs/heads/main/profile/README.md" class="btn-ai-secondary" target="_blank" rel="noopener">
					ChatGPT ↗
				</a>
				<a href="https://claude.ai/new?q=Please%20read%20this%20Markdown%20document%20and%20answer%20questions%20about%20it:%20https://raw.githubusercontent.com/game-of-prompts/.github/refs/heads/main/profile/README.md" class="btn-ai-secondary" target="_blank" rel="noopener">
					Claude ↗
				</a>
			</div>

			<!-- Disclaimer -->
			<p class="faq-disclaimer">
				⚠️ AI responses may not be fully accurate. Always refer to the <a href="https://github.com/game-of-prompts/.github/blob/main/profile/README.md" target="_blank" rel="noopener">official documentation</a> for authoritative information.
			</p>

			<div class="telegram-link">
				<a href="https://t.me/unstop_bots" class="btn btn-secondary" target="_blank" rel="noopener" use:hoverCorners>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
					Join Telegram Community
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
				<span class="section-label">Get Started</span>
				<h2>Get Started with Game of Prompts</h2>
				<div class="cta-steps">
					<div class="cta-step">
						<div class="cta-step-number">1</div>
						<p>Install the <strong>Celaut node</strong> software to run Game and Solver Services in a secure, deterministic environment.</p>
					</div>
					<div class="cta-step">
						<div class="cta-step-number">2</div>
						<p>Set up an <strong>Ergo blockchain wallet</strong> to participate in games and receive winnings.</p>
					</div>
					<div class="cta-step">
						<div class="cta-step-number">3</div>
						<p>Browse available games on <strong>GoP Web</strong> and start developing your own solvers or create challenging games for others.</p>
					</div>
				</div>
				<div class="cta-actions">
					<a href="https://github.com/game-of-prompts" class="btn btn-primary" target="_blank" rel="noopener" use:hoverCorners>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
						GitHub Repository
					</a>
					<a href="https://celaut-project.github.io" class="btn btn-secondary" target="_blank" rel="noopener" use:hoverCorners>
						Celaut Project
					</a>
					<a href="https://ergoblockchain.org" class="btn btn-secondary" target="_blank" rel="noopener" use:hoverCorners>
						Ergo Platform
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
			<a href="/" class="footer-logo">
				<img src="/gop-logo.png" alt="GoP" class="footer-logo-img" />
			</a>
			<p>Write your prompts. Build your bot. Win the throne.</p>
			<p class="footer-links">
				<a href="https://github.com/game-of-prompts" target="_blank" rel="noopener">GitHub</a>
				· <a href="https://ergoblockchain.org" target="_blank" rel="noopener">Ergo</a>
				· <a href="https://celaut-project.github.io" target="_blank" rel="noopener">Celaut</a>
			</p>
		</div>
		<!-- svelte-ignore a11y_invalid_attribute -->
		<a href="#" class="back-to-top" aria-label="Back to top" use:hoverCorners>↑</a>
	</div>
</footer>

<style>
	/* ============================================ */
	/* HERO                                         */
	/* ============================================ */
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding: 120px 24px 80px;
	}

	.hero-glow {
		position: absolute;
		width: 800px;
		height: 800px;
		background: radial-gradient(circle, rgba(74, 222, 128, 0.15) 0%, rgba(34, 197, 94, 0.06) 40%, transparent 70%);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		animation: glowPulse 6s ease-in-out infinite;
	}

	@keyframes glowPulse {
		0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
		50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
	}

	.hero-content {
		position: relative;
		text-align: center;
		z-index: 1;
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

	.hero h1 {
		margin-bottom: 1.5rem;
	}

	.hero-description {
		max-width: 720px;
		margin: 0 auto 2.5rem;
		font-size: 1.15rem;
		line-height: 1.8;
	}

	.hero-actions {
		display: flex;
		gap: 16px;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 3.5rem;
	}

	.btn-launch {
		font-size: 1.1rem;
		padding: 14px 32px;
		box-shadow: 0 0 24px rgba(34, 197, 94, 0.4), 0 0 48px rgba(34, 197, 94, 0.15);
		animation: launchPulse 2.5s ease-in-out infinite;
	}

	.btn-launch:hover {
		box-shadow: 0 0 36px rgba(34, 197, 94, 0.6), 0 0 72px rgba(34, 197, 94, 0.25);
		transform: translateY(-2px);
	}

	@keyframes launchPulse {
		0%, 100% { box-shadow: 0 0 24px rgba(34, 197, 94, 0.4), 0 0 48px rgba(34, 197, 94, 0.15); }
		50% { box-shadow: 0 0 32px rgba(34, 197, 94, 0.55), 0 0 64px rgba(34, 197, 94, 0.2); }
	}

	.hero-stats {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		flex-wrap: wrap;
		padding-top: 2rem;
		border-top: 1px solid rgba(74, 222, 128, 0.06);
		margin-top: 0.5rem;
	}

	.hero-stat-divider {
		width: 1px;
		height: 32px;
		background: rgba(74, 222, 128, 0.1);
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

	/* ============================================ */
	/* CORE COMPONENTS                              */
	/* ============================================ */
	.components-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 24px;
		margin-top: 3rem;
		align-items: stretch;
	}

	.components-grid :global(.scroll-animation) {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.component-card {
		position: relative;
		text-align: center;
		padding-top: 40px;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.component-icon {
		width: 64px;
		height: 64px;
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1.25rem;
		background: var(--green-glow);
		color: var(--green-400);
	}

	.solver-accent {
		background: rgba(74, 222, 128, 0.1) !important;
		color: #86efac !important;
	}

	.web-accent {
		background: rgba(74, 222, 128, 0.08) !important;
		color: #4ade80 !important;
	}

	.component-badge {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 3px 10px;
		border-radius: 100px;
		margin-bottom: 0.75rem;
		display: inline-block;
	}

	.creator-badge {
		background: rgba(74, 222, 128, 0.1);
		color: var(--green-400);
		border: 1px solid rgba(74, 222, 128, 0.2);
	}

	.player-badge {
		background: rgba(34, 197, 94, 0.1);
		color: #86efac;
		border: 1px solid rgba(34, 197, 94, 0.2);
	}

	.web-badge {
		background: rgba(74, 222, 128, 0.08);
		color: #4ade80;
		border: 1px solid rgba(74, 222, 128, 0.15);
	}

	.components-note {
		margin-top: 2.5rem;
		padding: 20px 28px;
		background: var(--bg-card);
		border: 1px solid rgba(74, 222, 128, 0.08);
		border-radius: var(--radius);
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.note-row {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}

	.note-icon {
		flex-shrink: 0;
		color: var(--green-400);
		margin-top: 2px;
	}

	.note-icon.web-note {
		color: #4ade80;
	}

	.note-row p {
		font-size: 0.95rem;
	}

	.note-row strong {
		color: var(--text-primary);
	}

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

	/* ============================================ */
	/* SCORE VALIDATION — CYBERPUNK SECTION         */
	/* ============================================ */
	.section-validation {
		background: var(--bg-primary);
		position: relative;
		overflow: hidden;
		padding: 6rem 0 4rem;
	}

	.sv-glow-top {
		position: absolute;
		top: -200px;
		left: 50%;
		transform: translateX(-50%);
		width: 800px;
		height: 500px;
		background: radial-gradient(ellipse, rgba(124, 58, 237, 0.12) 0%, transparent 70%);
		pointer-events: none;
	}

	.sv-container {
		position: relative;
		z-index: 1;
	}

	.sv-title {
		font-family: var(--font-mono), 'JetBrains Mono', monospace;
		font-size: clamp(1.8rem, 4vw, 2.8rem);
		font-weight: 700;
		text-align: center;
		color: #00ff88;
		background: linear-gradient(135deg, #00ff88 0%, #00cc6e 50%, #00ff88 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.75rem;
		letter-spacing: -0.02em;
	}

	.sv-subtitle {
		text-align: center;
		color: rgba(255, 255, 255, 0.6) !important;
		font-size: 1.05rem;
		margin-bottom: 3.5rem;
		font-family: var(--font-mono), monospace;
	}

	.sv-steps {
		display: flex;
		flex-direction: column;
		gap: 24px;
		max-width: 900px;
		margin: 0 auto;
	}

	/* Glassmorphism card */
	.validation-card {
		background: rgba(0, 255, 136, 0.03);
		border: 1px solid rgba(0, 255, 136, 0.15);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-radius: 16px;
		padding: 24px 32px;
		display: flex;
		gap: 32px;
		align-items: center;
		transition: all 0.4s ease;
		position: relative;
		overflow: hidden;
		opacity: 0;
		transform: translateY(20px);
	}

	.validation-card::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: #00ff88;
		transform: scaleY(0);
		transform-origin: top;
		transition: transform 0.6s ease;
	}

	:global(.validation-card.active) {
		opacity: 1 !important;
		transform: translateY(0) !important;
	}

	:global(.validation-card.active)::before {
		transform: scaleY(1) !important;
	}

	.validation-card:hover {
		box-shadow: 0 0 40px rgba(0, 255, 136, 0.12), 0 0 80px rgba(0, 255, 136, 0.05);
		transform: translateY(-2px);
		border-color: rgba(0, 255, 136, 0.3);
	}

	.vc-animation {
		flex: 0 0 40%;
		min-width: 0;
	}

	.vc-content {
		flex: 1;
		min-width: 0;
	}

	.vc-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 12px;
	}

	.vc-num {
		font-family: var(--font-mono), 'JetBrains Mono', monospace;
		font-size: 0.8rem;
		font-weight: 700;
		color: #00ff88;
		opacity: 0.6;
		letter-spacing: 0.1em;
	}

	.vc-badge {
		font-family: var(--font-mono), monospace;
		font-size: 0.65rem;
		font-weight: 600;
		color: #00ff88;
		background: rgba(0, 255, 136, 0.08);
		border: 1px solid rgba(0, 255, 136, 0.2);
		padding: 2px 10px;
		border-radius: 100px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.vc-title {
		font-size: 1.15rem;
		font-weight: 600;
		color: #ffffff !important;
		margin-bottom: 8px;
	}

	.vc-desc {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.55) !important;
		line-height: 1.6;
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
	
	.narrative-text a {
		color: var(--green-400);
		text-decoration: underline;
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

	/* ============================================ */
	/* HERO TITLE REDESIGN                          */
	/* ============================================ */
	.hero-title-block {
		text-align: center;
		margin-bottom: 2rem;
	}

	.hero-main-title {
		font-family: var(--font-mono);
		font-size: clamp(3rem, 10vw, 7rem) !important;
		font-weight: 800;
		letter-spacing: 0.08em;
		line-height: 1.05;
		margin-bottom: 1rem;
		position: relative;
	}

	.hero-title-line {
		display: block;
		color: var(--text-primary);
		text-shadow: 0 0 40px rgba(74, 222, 128, 0.2);
	}

	.hero-title-accent {
		background: linear-gradient(135deg, #4ade80, #22c55e, #86efac);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		filter: drop-shadow(0 0 30px rgba(74, 222, 128, 0.5));
		animation: heroTitleGlow 4s ease-in-out infinite;
	}

	@keyframes heroTitleGlow {
		0%, 100% { filter: drop-shadow(0 0 30px rgba(74, 222, 128, 0.5)); }
		50% { filter: drop-shadow(0 0 60px rgba(74, 222, 128, 0.8)); }
	}

	.hero-tagline {
		font-size: clamp(1rem, 2.5vw, 1.4rem);
		font-weight: 500;
		color: var(--text-secondary);
		letter-spacing: 0.02em;
	}

	/* (old validation pipeline styles removed — replaced by .section-validation) */

	/* ============================================ */
	/* JUDGES                                       */
	/* ============================================ */
	.judges-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 24px;
		margin-top: 3rem;
		align-items: stretch;
	}

	.judges-card {
		text-align: center;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.judges-icon {
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
		.hero {
			padding: 100px 16px 60px;
		}

		.hero h1 {
			font-size: 2.2rem;
		}

		.hero-description {
			font-size: 1rem;
		}

		.hero-stats {
			gap: 1rem;
		}

		.hero-stat-divider {
			display: none;
		}

		.foundations-grid {
			grid-template-columns: 1fr;
		}

		.components-grid {
			grid-template-columns: 1fr;
		}

		.flow-step {
			flex-direction: column;
			gap: 16px;
		}

		/* Validation cards — mobile stack */
		.validation-card {
			flex-direction: column;
			padding: 20px;
			gap: 16px;
		}

		.vc-animation {
			flex: none;
			width: 100%;
		}

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

		.judges-grid {
			grid-template-columns: 1fr;
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
		}
	}

	@media (max-width: 480px) {
		.hero h1 {
			font-size: 1.8rem;
		}

		.hero-actions {
			flex-direction: column;
			align-items: center;
		}

		.cta-actions {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
