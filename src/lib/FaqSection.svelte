<script lang="ts">
	import { onMount } from 'svelte';

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
			// Handle multi-line answers and nested content
			const itemRegex = /\*\s+\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=\n\*\s+\*\*|\n### |\n-----|\n$|$)/g;
			let itemMatch: RegExpExecArray | null;

			while ((itemMatch = itemRegex.exec(sectionText)) !== null) {
				const question = itemMatch[1].trim();
				let answer = itemMatch[2].trim();

				// Clean up answer: remove leading whitespace from each line, handle markdown
				answer = answer
					.split('\n')
					.map(line => line.replace(/^\s{4}/, '').trim())
					.filter(line => line.length > 0)
					.join(' ')
					// Convert markdown bold to <strong>
					.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
					// Convert markdown links to <a>
					.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
					// Convert > blockquotes to <em>
					.replace(/>\s*\*\*(.+?)\*\*/g, '<em><strong>$1</strong></em>')
					.replace(/>\s*(.+?)(?=\s*<|\s*$)/g, '<em>$1</em>')
					// Clean up backtick code
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
			<div class="faq-group">
				<div class="skeleton skeleton-title"></div>
				{#each [1, 2, 3] as __}
					<div class="skeleton skeleton-item"></div>
				{/each}
			</div>
		{/each}
	{:else}
		{#each groups as group}
			<div class="faq-group">
				<h4 class="faq-group-title">{group.title}</h4>
				{#each group.items as item}
					<details class="faq-item">
						<summary class="faq-question">{item.question}</summary>
						<div class="faq-answer"><p>{@html item.answer}</p></div>
					</details>
				{/each}
			</div>
		{/each}
	{/if}
</div>

<style>
	/* Skeleton loading */
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
		height: 48px;
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
</style>
