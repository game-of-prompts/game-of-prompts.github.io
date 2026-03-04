<script lang="ts">
	import { onMount } from 'svelte';
	import ScrollAnimation from '$lib/ScrollAnimation.svelte';
	import ParticleNetwork from '$lib/ParticleNetwork.svelte';
	import Scrollytelling from '$lib/Scrollytelling.svelte';
	import AnimatedCounter from '$lib/AnimatedCounter.svelte';
	import SectionTransition from '$lib/SectionTransition.svelte';
	import GameAnimation from '$lib/GameAnimation.svelte';
	import { hoverCorners } from '$lib/hoverCorners';

	const VIDEO_ID = 'UCjDwDj2gGs';
	let videoStarted = $state(false);
	function startVideo() { videoStarted = true; }

	onMount(() => {
		// IntersectionObserver for validation pipeline steps
		const pipelineSteps = document.querySelectorAll('.vp-step');
		if (pipelineSteps.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('vp-active');
					}
				});
			},
			{ threshold: 0.4, rootMargin: '0px 0px -10% 0px' }
		);

		pipelineSteps.forEach((step) => observer.observe(step));

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Game of Prompts — Where Blockchain Meets AI Competitions</title>
	<meta name="description" content="A revolutionary competitive platform where creators design game-services to evaluate AI solvers, while players build solver-services to maximize their scores—powered by Ergo blockchain and Celaut." />
	<meta name="theme-color" content="#0a0a0a" />
	<meta property="og:title" content="Game of Prompts" />
	<meta property="og:description" content="Where Blockchain Meets AI Competitions" />
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
		<div class="hero-logo">
			<div class="hero-logo-mark">
				<img src="/gop-logo.png" alt="Game of Prompts" class="hero-logo-img" />
			</div>
			<span class="hero-logo-name">GAME OF PROMPTS</span>
		</div>
		<div class="hero-badge">
			<span class="badge-dot"></span>
			Powered by Ergo & Celaut
		</div>
		<h1>
			Where <span class="gradient-text">Blockchain</span> Meets<br /><span class="gradient-text">AI Competitions</span>
		</h1>
		<p class="hero-description">
			A revolutionary competitive platform where creators design game-services to evaluate AI solvers,
			while players build solver-services to maximize their scores—all powered by the Ergo blockchain
			and Celaut paradigm for transparent, decentralized competition.
		</p>
		<div class="hero-actions">
			<a href="https://github.com/game-of-prompts" class="btn btn-primary" target="_blank" rel="noopener" use:hoverCorners>
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
				Game of Prompts is built on a foundation of two powerful technologies: the <a href="https://github.com/celaut-project" target="_blank" rel="noopener">Celaut paradigm</a> for decentralized, reproducible computation, and the <a href="https://ergoblockchain.org/" target="_blank" rel="noopener">Ergo blockchain</a> for on-chain verification and prize distribution.
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
			title: 'Generate a Secret',
			description: 'Create a unique 256-bit secret for cryptographic commitments and score validation.'
		},
		{
			title: 'Package & Publish',
			description: 'Package your game as a Celaut service and publish it using GoP Web by sharing game parameters, fee, deadline, and commission.'
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
			title: 'Browse GoP Web',
			description: 'Find interesting games based on description, rules, participation fees, and creator reputation. Download the Game Service to explore mechanics.'
		},
		{
			title: 'Design a Solver Service',
			description: 'Implement strategies to maximize your score in the game.'
		},
		{
			title: 'Run the Game Service',
			description: 'Package and send your solver to generate the solver ID, score list, log hash, and cryptographic commitment.'
		},
		{
			title: 'Publish Your Results',
			description: 'Submit your results on the Ergo blockchain containing the game data and participation fee before the deadline.'
		}
	]}
/>

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- SCROLLYTELLING - THE JOURNEY                 -->
<!-- ============================================ -->
<Scrollytelling />

<SectionTransition height={100} />

<!-- ============================================ -->
<!-- SECURITY                                     -->
<!-- ============================================ -->
<section id="security" class="section section-security" style="scroll-margin-top: 80px;">
	<div class="container">
		<ScrollAnimation>
			<span class="section-label">Security</span>
			<h2 class="section-title">Transparent Yet Private Competition</h2>
			<p class="section-subtitle">Advanced cryptography ensures fair competition while protecting participants' strategies.</p>
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
					<p>The game's intellectual property and solution are protected through obfuscation to prevent reverse engineering.</p>
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
					<p>Results are concealed using cryptographic commitments, ensuring a private and unbiased competition.</p>
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

		<!-- Score Validation Mechanism — Visual Pipeline -->
		<ScrollAnimation>
			<h3 class="validation-title">Score Validation Mechanism</h3>
		</ScrollAnimation>

		<div class="validation-pipeline" id="validation-pipeline">
			{#each [
				{ num: 1, title: 'Player Participation', desc: 'Player publishes their participation on the Ergo blockchain.', icon: 'chain' },
				{ num: 2, title: 'Creator Reveals Secret', desc: 'After the deadline, the creator reveals the game secret in the resolution transaction.', icon: 'key' },
				{ num: 3, title: 'Smart Contract Validation', desc: 'The game contract computes a commitment for each score using the solver ID, score value, hashed logs, and revealed secret.', icon: 'contract' },
				{ num: 4, title: 'Score Verification', desc: 'When the score commitment matches the participation commitment, that score is validated as authentic. The highest validated score wins.', icon: 'shield' },
				{ num: 5, title: 'Winner Revealed', desc: 'The highest validated score wins. This deterministic on-chain process ensures transparency while preventing manipulation.', icon: 'trophy' }
			] as step, idx}
				<div class="vp-step" data-vp-step={idx}>
					<div class="vp-node-col">
						<div class="vp-node" data-vp-node={idx}>
							<span class="vp-node-num">{step.num}</span>
							<div class="vp-icon">
								{#if step.icon === 'chain'}
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
								{:else if step.icon === 'key'}
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>
								{:else if step.icon === 'contract'}
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="14" y1="4" x2="10" y2="20" /></svg>
								{:else if step.icon === 'shield'}
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
								{:else if step.icon === 'trophy'}
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9H4.5a2.5 2.5 0 010-5H6" /><path d="M18 9h1.5a2.5 2.5 0 000-5H18" /><path d="M4 22h16" /><path d="M10 22V17" /><path d="M14 22V17" /><path d="M6 2h12v7a6 6 0 01-12 0V2z" /></svg>
								{/if}
							</div>
						</div>
						{#if idx < 4}
							<div class="vp-connector">
								<div class="vp-line"></div>
								<div class="vp-pulse"></div>
							</div>
						{/if}
					</div>
					<div class="vp-content">
						<h4>{step.title}</h4>
						<p>{step.desc}</p>
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
		<p class="gt-desc">Explore, build, and adapt in rich voxel-based worlds. Reuse the same world seed into thousands of unique challenges.</p>
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
				Creators can enhance their games with powerful optional mechanics — from poker-style bluffing to resource constraints and multi-chain support.
			</p>
		</div>
	</div>
</section>

<section class="game-type-fullscreen game-type-poker">
	<div class="gt-bg-glow"></div>
	<div class="gt-animation-canvas">
		<GameAnimation type="poker" />
	</div>
	<div class="gt-content">
		<span class="gt-icon" aria-hidden="true">🃏</span>
		<span class="gt-label">Feature 01 · Coming Soon</span>
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

<section class="game-type-fullscreen game-type-resource">
	<div class="gt-bg-glow"></div>
	<div class="gt-animation-canvas">
		<GameAnimation type="resource" />
	</div>
	<div class="gt-content">
		<span class="gt-icon" aria-hidden="true">⚙️</span>
		<span class="gt-label">Feature 02 · Available</span>
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

<section class="game-type-fullscreen game-type-payattempt">
	<div class="gt-bg-glow"></div>
	<div class="gt-animation-canvas">
		<GameAnimation type="payattempt" />
	</div>
	<div class="gt-content">
		<span class="gt-icon" aria-hidden="true">🔬</span>
		<span class="gt-label">Feature 03 · Under Research</span>
		<h2 class="gt-title">Pay-per-attempt</h2>
		<p class="gt-desc">Upcoming payment model where each game attempt costs tokens. Strategic resource allocation meets skill.</p>
		<ul class="gt-bullets">
			<li>Each attempt requires a token deposit</li>
			<li>Encourages thoughtful, high-quality submissions</li>
			<li>Prevents brute-force spam of solutions</li>
			<li>Token costs configurable by game creator</li>
		</ul>
	</div>
	<div class="gt-grid-lines" aria-hidden="true"></div>
</section>

<section class="game-type-fullscreen game-type-multichain">
	<div class="gt-bg-glow"></div>
	<div class="gt-animation-canvas">
		<GameAnimation type="multichain" />
	</div>
	<div class="gt-content">
		<span class="gt-icon" aria-hidden="true">🔗</span>
		<span class="gt-label">Feature 04 · Under Research</span>
		<h2 class="gt-title">Multi-chain</h2>
		<p class="gt-desc">Cross-chain capabilities with Ergo as the foundation. Bridge games and prizes across blockchains.</p>
		<ul class="gt-bullets">
			<li>Ergo-centric architecture with cross-chain bridges</li>
			<li>Accept participation fees from multiple chains</li>
			<li>Distribute prizes across different blockchain networks</li>
			<li>Unified scoring and validation on Ergo</li>
		</ul>
	</div>
	<div class="gt-grid-lines" aria-hidden="true"></div>
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
						<p>Set up an <strong>Ergo blockchain wallet</strong> to participate in games and receive prizes.</p>
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
					<a href="https://github.com/celaut-project" class="btn btn-secondary" target="_blank" rel="noopener" use:hoverCorners>
						Celaut Project
					</a>
					<a href="https://ergoplatform.org" class="btn btn-secondary" target="_blank" rel="noopener" use:hoverCorners>
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
			<p>Where Blockchain Meets AI Competitions</p>
			<p class="footer-links">
				Powered by <a href="https://ergoplatform.org" target="_blank" rel="noopener">Ergo</a> &amp; <a href="https://github.com/celaut-project" target="_blank" rel="noopener">Celaut</a>
				· <a href="https://github.com/game-of-prompts" target="_blank" rel="noopener">GitHub</a>
			</p>
		</div>
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
		margin: 2.5rem auto 0;
		border-radius: 16px;
		padding: 4px;
		background: linear-gradient(135deg, rgba(74, 222, 128, 0.4), rgba(34, 197, 94, 0.3), rgba(74, 222, 128, 0.2));
		box-shadow: 0 0 40px rgba(74, 222, 128, 0.08), 0 0 80px rgba(34, 197, 94, 0.04);
	}

	.video-wrapper {
		width: 100%;
		aspect-ratio: 16 / 9;
		min-height: 400px;
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

	.validation-title {
		margin-top: 4rem;
		margin-bottom: 0.5rem;
		font-size: 1.4rem;
		color: var(--text-primary);
	}

	/* ============================================ */
	/* VALIDATION PIPELINE (Visual)                 */
	/* ============================================ */
	.validation-pipeline {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0;
		max-width: 700px;
		width: 100%;
	}

	.vp-step {
		display: flex;
		gap: 24px;
		align-items: flex-start;
		opacity: 0.4;
		transition: opacity 0.6s ease;
	}

	.vp-step.vp-active {
		opacity: 1;
	}

	.vp-node-col {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		width: 52px;
	}

	.vp-node {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: rgba(74, 222, 128, 0.06);
		border: 2px solid rgba(74, 222, 128, 0.15);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		transition: all 0.6s ease;
	}

	.vp-active .vp-node {
		background: rgba(74, 222, 128, 0.15);
		border-color: rgba(74, 222, 128, 0.5);
		box-shadow: 0 0 20px rgba(74, 222, 128, 0.3), 0 0 40px rgba(74, 222, 128, 0.1);
		animation: vpNodePulse 2s ease-in-out infinite;
	}

	@keyframes vpNodePulse {
		0%, 100% { box-shadow: 0 0 20px rgba(74, 222, 128, 0.3), 0 0 40px rgba(74, 222, 128, 0.1); }
		50% { box-shadow: 0 0 30px rgba(74, 222, 128, 0.5), 0 0 60px rgba(74, 222, 128, 0.2); }
	}

	.vp-node-num {
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 0.7rem;
		color: var(--green-400);
		line-height: 1;
	}

	.vp-icon {
		color: var(--green-400);
		line-height: 0;
		margin-top: 2px;
	}

	.vp-icon svg {
		width: 14px;
		height: 14px;
	}

	.vp-connector {
		position: relative;
		width: 2px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.vp-line {
		width: 2px;
		height: 100%;
		background: rgba(74, 222, 128, 0.12);
	}

	.vp-active .vp-line {
		background: rgba(74, 222, 128, 0.3);
	}

	.vp-pulse {
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: rgba(134, 239, 172, 0.8);
		box-shadow: 0 0 8px rgba(134, 239, 172, 0.6);
		opacity: 0;
	}

	.vp-active .vp-pulse {
		opacity: 1;
		animation: vpTravelDown 1.8s ease-in-out infinite;
	}

	@keyframes vpTravelDown {
		0% { top: 0; opacity: 0; }
		10% { opacity: 1; }
		90% { opacity: 1; }
		100% { top: 100%; opacity: 0; }
	}

	.vp-content {
		padding: 12px 20px;
		background: var(--bg-card);
		border: 1px solid rgba(74, 222, 128, 0.08);
		border-radius: var(--radius);
		flex: 1;
		transition: border-color 0.6s, background 0.6s;
	}

	.vp-active .vp-content {
		border-color: rgba(74, 222, 128, 0.2);
		background: var(--bg-card-hover);
	}

	.vp-content h4 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.vp-content p {
		font-size: 0.9rem;
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

	/* Game type colors — follow theme */
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
		font-size: 0.9rem;
		color: var(--text-secondary);
		padding-left: 20px;
		position: relative;
		opacity: 0.8;
	}

	.gt-bullets li::before {
		content: '›';
		position: absolute;
		left: 0;
		color: var(--green-400);
		font-weight: 700;
		font-size: 1.1rem;
		line-height: 1.4;
	}

	/* Light mode overrides for game sections */
	:global([data-theme="light"]) .game-type-arcade,
	:global([data-theme="light"]) .game-type-world,
	:global([data-theme="light"]) .game-type-trading,
	:global([data-theme="light"]) .game-type-science {
		color: var(--text-primary);
	}

	:global([data-theme="light"]) .game-type-arcade .gt-title {
		background: linear-gradient(135deg, #16a34a, #15803d);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	:global([data-theme="light"]) .game-type-world .gt-title {
		background: linear-gradient(135deg, #16a34a, #166534);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	:global([data-theme="light"]) .game-type-trading .gt-title {
		background: linear-gradient(135deg, #15803d, #14532d);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	:global([data-theme="light"]) .game-type-science .gt-title {
		background: linear-gradient(135deg, #059669, #065f46);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	:global([data-theme="light"]) .game-type-arcade .gt-score-label,
	:global([data-theme="light"]) .game-type-world .gt-score-label,
	:global([data-theme="light"]) .game-type-trading .gt-score-label,
	:global([data-theme="light"]) .game-type-science .gt-score-label {
		color: #16a34a;
	}

	:global([data-theme="light"]) .gt-label {
		color: #16a34a;
	}

	/* Also handle prefers-color-scheme: light for users without manual toggle */
	@media (prefers-color-scheme: light) {
		:root:not([data-theme="dark"]) .game-type-arcade,
		:root:not([data-theme="dark"]) .game-type-world,
		:root:not([data-theme="dark"]) .game-type-trading,
		:root:not([data-theme="dark"]) .game-type-science {
			color: #0f172a;
		}
		:root:not([data-theme="dark"]) .game-type-arcade .gt-title,
		:root:not([data-theme="dark"]) .game-type-world .gt-title,
		:root:not([data-theme="dark"]) .game-type-trading .gt-title {
			background: linear-gradient(135deg, #16a34a, #15803d);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}
		:root:not([data-theme="dark"]) .game-type-science .gt-title {
			background: linear-gradient(135deg, #059669, #065f46);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}
		:root:not([data-theme="dark"]) .game-type-arcade .gt-score-label,
		:root:not([data-theme="dark"]) .game-type-world .gt-score-label,
		:root:not([data-theme="dark"]) .game-type-trading .gt-score-label,
		:root:not([data-theme="dark"]) .game-type-science .gt-score-label,
		:root:not([data-theme="dark"]) .gt-label {
			color: #16a34a;
		}
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

		.vp-step {
			gap: 12px;
		}

		.vp-connector {
			height: 40px;
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
