<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	interface FaqItem {
		question: string;
		answer: string;
	}

	interface FaqGroup {
		title: string;
		items: FaqItem[];
	}

	let groups: FaqGroup[] = $state([]);
	let loading = $state(true);
	let error = $state(false);
	let openItems: Set<string> = $state(new Set());

	function toggleItem(key: string) {
		const next = new Set(openItems);
		if (next.has(key)) {
			next.delete(key);
		} else {
			next.add(key);
		}
		openItems = next;
	}

	const FALLBACK_GROUPS: FaqGroup[] = [
		{
			title: 'General',
			items: [
				{ question: 'What is Game of Prompts?', answer: 'A bot competition audited by blockchain. Creators design game-services to evaluate AI solvers, while players build solver-services to maximize their scores — all verified on the Ergo blockchain.' },
				{ question: 'What is the "Ceremony Phase"?', answer: 'The initial period where players register their Solver IDs to add randomness to the seed. This prevents the Creator from pre-calculating solutions and ensures fair competition.' },
				{ question: 'What do I need to play?', answer: 'An Ergo Wallet (with some ERG for participation fees) and a Celaut Node to run game and solver services locally.' },
			]
		},
		{
			title: 'Security',
			items: [
				{ question: 'How do I know the game is fair?', answer: 'The game rules and hashS are registered on-chain from the start. They are immutable — no one can change them after publication.' },
				{ question: 'Can the Creator steal the funds?', answer: 'No. Funds are locked in a Smart Contract, not the Creator\'s wallet. Distribution is handled atomically by the contract when the game resolves.' },
				{ question: 'What if the Creator disappears?', answer: 'After a Grace Period, players can trigger a Refund Action to recover their participation fees from the smart contract.' },
			]
		},
		{
			title: 'Judges',
			items: [
				{ question: 'Who are the Judges?', answer: 'Entities nominated by the Creator who audit the resolution phase. They verify that the game service generated valid proofs.' },
				{ question: 'Why do Judges earn money for invalidating a participation?', answer: 'They detect Creator fraud — their incentive is to catch faulty game services. When they find issues, they receive the Creator\'s commission as reward.' },
				{ question: 'Can I be penalized as a player?', answer: 'The system penalizes the Creator/Game Service, not honest players. Judges audit the Creator, not you.' },
			]
		},
		{
			title: 'Economy',
			items: [
				{ question: 'How is the winner calculated?', answer: 'Highest Time-Weighted Score: Score × (TimeWeight + RemainingTime). Submit early and score high for the best result.' },
				{ question: 'When do I receive my winnings?', answer: 'Immediately upon the End Game action. The Smart Contract atomically distributes all funds — the winner receives all participation fees minus creator commission and judge fees.' },
			]
		}
	];

	function parseFaqFromMarkdown(md: string): FaqGroup[] {
		// Find the FAQ section: starts with "## 1. FAQ"
		const faqStart = md.indexOf('## 1. FAQ');
		if (faqStart === -1) return [];

		// Find the end of FAQ section (next ## that's not ### or the ----- separator)
		const afterFaq = md.substring(faqStart + 10);
		const faqEndMatch = afterFaq.search(/\n-----|\n## [^#]/);
		const faqContent = faqEndMatch === -1 ? afterFaq : afterFaq.substring(0, faqEndMatch);

		const result: FaqGroup[] = [];

		// Split by ### headings (sub-sections like ### 1.1. General FAQ)
		const sectionRegex = /### \d+\.\d+\.\s+(.+?)(?:\s+FAQ)?\s*\n/g;
		let match: RegExpExecArray | null;
		const sections: { title: string; startIndex: number }[] = [];

		while ((match = sectionRegex.exec(faqContent)) !== null) {
			sections.push({
				title: match[1].replace(/\s+FAQ$/i, '').trim(),
				startIndex: match.index + match[0].length
			});
		}

		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			const endIndex = i + 1 < sections.length ? sections[i + 1].startIndex - (sections[i + 1].title.length + 20) : faqContent.length;
			const sectionText = faqContent.substring(section.startIndex, endIndex);

			const items: FaqItem[] = [];

			// Parse FAQ items: * **Question?**\n    Answer text.
			const itemRegex = /\*\s+\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=\n\*\s+\*\*|\n### |\n-----|\n$|$)/g;
			let itemMatch: RegExpExecArray | null;

			while ((itemMatch = itemRegex.exec(sectionText)) !== null) {
				const question = itemMatch[1].trim();
				let answer = itemMatch[2].trim();

				answer = answer
					.split('\n')
					.map(line => line.replace(/^\s{4}/, '').trim())
					.filter(line => line.length > 0)
					.join(' ')
					.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
					.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
					.replace(/>\s*\*\*(.+?)\*\*/g, '<em><strong>$1</strong></em>')
					.replace(/>\s*(.+?)(?=\s*<|\s*$)/g, '<em>$1</em>')
					.replace(/`(.+?)`/g, '<code>$1</code>');

				if (question && answer) {
					items.push({ question, answer });
				}
			}

			if (items.length > 0) {
				result.push({ title: section.title, items });
			}
		}

		return result;
	}

	onMount(async () => {
		try {
			const res = await fetch(
				'https://raw.githubusercontent.com/game-of-prompts/.github/refs/heads/main/profile/README.md'
			);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const md = await res.text();
			const parsed = parseFaqFromMarkdown(md);
			if (parsed.length > 0) {
				groups = parsed;
			} else {
				groups = FALLBACK_GROUPS;
			}
		} catch {
			error = true;
			groups = FALLBACK_GROUPS;
		} finally {
			loading = false;
		}
	});
</script>

<div class="faq-container">
	{#if loading}
		<!-- Skeleton loading state -->
		{#each [1, 2, 3] as _}
			<div class="faq-group-skeleton">
				<div class="skeleton skeleton-title"></div>
				{#each [1, 2, 3] as __}
					<div class="skeleton skeleton-item"></div>
				{/each}
			</div>
		{/each}
	{:else}
		{#each groups as group, gi}
			<div class="faq-group">
				<h4 class="faq-group-title">
					<span class="faq-group-title-text">{group.title}</span>
				</h4>
				<div class="faq-items-card">
					{#each group.items as item, ii}
						{@const key = `${gi}-${ii}`}
						{@const isOpen = openItems.has(key)}
						<div class="faq-item" class:faq-item-open={isOpen}>
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div class="faq-question" onclick={() => toggleItem(key)}>
								<span class="faq-question-text">{item.question}</span>
								<span class="faq-toggle-icon" class:faq-toggle-open={isOpen}>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
										<line x1="10" y1="4" x2="10" y2="16" />
										<line x1="4" y1="10" x2="16" y2="10" />
									</svg>
								</span>
							</div>
							{#if isOpen}
								<div class="faq-answer" transition:slide={{ duration: 250 }}>
									<p>{@html item.answer}</p>
								</div>
							{/if}
						</div>
						{#if ii < group.items.length - 1}
							<div class="faq-divider"></div>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	/* ===== FAQ CONTAINER ===== */
	.faq-container {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
		max-width: 800px;
		width: 100%;
	}

	/* ===== SKELETON ===== */
	.faq-group-skeleton {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.skeleton {
		background: linear-gradient(90deg, rgba(34, 197, 94, 0.05) 25%, rgba(34, 197, 94, 0.12) 50%, rgba(34, 197, 94, 0.05) 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: 8px;
	}

	.skeleton-title {
		height: 24px;
		width: 120px;
		margin-bottom: 1rem;
	}

	.skeleton-item {
		height: 52px;
		width: 100%;
		margin-bottom: 0.5rem;
	}

	@keyframes shimmer {
		0% { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}

	:global([data-theme="light"]) .skeleton {
		background: linear-gradient(90deg, rgba(0, 0, 0, 0.05) 25%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.05) 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}

	/* ===== GROUP TITLE ===== */
	.faq-group {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.faq-group-title {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--green-400);
		margin-bottom: 0.75rem;
		padding-left: 4px;
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.faq-group-title-text {
		position: relative;
		padding-bottom: 4px;
	}

	.faq-group-title-text::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, var(--green-400), transparent);
		border-radius: 1px;
		opacity: 0.5;
	}

	/* ===== CARD WRAPPER ===== */
	.faq-items-card {
		background: var(--bg-card);
		border: 1px solid rgba(74, 222, 128, 0.1);
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
		transition: box-shadow 0.3s;
	}

	.faq-items-card:hover {
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
	}

	:global([data-theme="light"]) .faq-items-card {
		background: #ffffff;
		border-color: rgba(34, 197, 94, 0.15);
		box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
	}

	:global([data-theme="light"]) .faq-items-card:hover {
		box-shadow: 0 4px 28px rgba(0, 0, 0, 0.1);
	}

	/* ===== DIVIDER ===== */
	.faq-divider {
		height: 1px;
		background: rgba(74, 222, 128, 0.08);
		margin: 0 20px;
	}

	:global([data-theme="light"]) .faq-divider {
		background: rgba(34, 197, 94, 0.12);
	}

	/* ===== FAQ ITEM ===== */
	.faq-item {
		transition: background 0.2s;
	}

	.faq-item-open {
		background: rgba(74, 222, 128, 0.03);
	}

	:global([data-theme="light"]) .faq-item-open {
		background: rgba(34, 197, 94, 0.04);
	}

	/* ===== QUESTION ===== */
	.faq-question {
		cursor: pointer;
		padding: 18px 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		user-select: none;
		transition: color 0.2s;
	}

	.faq-question:hover .faq-question-text {
		color: var(--green-400);
	}

	.faq-question-text {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.5;
		transition: color 0.2s;
	}

	:global([data-theme="light"]) .faq-question:hover .faq-question-text {
		color: #15803d;
	}

	/* ===== TOGGLE ICON ===== */
	.faq-toggle-icon {
		flex-shrink: 0;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		background: rgba(74, 222, 128, 0.08);
		color: var(--green-400);
		transition: transform 0.3s ease, background 0.2s;
	}

	.faq-toggle-open {
		transform: rotate(45deg);
		background: rgba(74, 222, 128, 0.15);
	}

	:global([data-theme="light"]) .faq-toggle-icon {
		background: rgba(34, 197, 94, 0.1);
		color: #15803d;
	}

	:global([data-theme="light"]) .faq-toggle-open {
		background: rgba(34, 197, 94, 0.18);
	}

	/* ===== ANSWER ===== */
	.faq-answer {
		padding: 0 24px 20px;
	}

	.faq-answer p {
		font-size: 0.92rem;
		line-height: 1.75;
		color: var(--text-secondary);
	}

	.faq-answer :global(a) {
		color: var(--green-400);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.faq-answer :global(code) {
		font-family: var(--font-mono);
		font-size: 0.85em;
		background: rgba(74, 222, 128, 0.08);
		padding: 2px 6px;
		border-radius: 4px;
	}

	.faq-answer :global(strong) {
		color: var(--text-primary);
		font-weight: 600;
	}
</style>
