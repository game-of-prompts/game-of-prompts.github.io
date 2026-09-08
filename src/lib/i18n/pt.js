/*
 * src/lib/i18n/en.js
 * ------------------------------------------------------------------
 * English — the source dictionary and the fallback for every other
 * locale. If a key is missing anywhere else, `$t` resolves it here, so
 * this file is the only one that must never have a hole in it.
 *
 * HOW TO WRITE THE COPY
 * ---------------------
 * Everything here is the landing page's actual voice: short sentences,
 * concrete nouns, no marketing adjectives. `<strong>` is used for the
 * one term a sentence is really about, never for emphasis in general —
 * the scene captions lean on it heavily and it stops meaning anything
 * if every clause has one.
 *
 * HOW TO WRITE THE GLOSSARY
 * -------------------------
 * The glossary explains the JARGON, not the project. A definition that
 * says "in Game of Prompts, a commitment is…" has failed: the reader
 * clicked because they don't know what a commitment IS. Explain the
 * word in plain language with an everyday comparison, then — only in
 * `more`, and only if it earns its place — say why it matters here.
 * Never write down to the reader. They are not stupid, they just
 * haven't met this word before.
 *
 * `match` is the list of trigger words IN THIS LANGUAGE. Translators
 * choose their own; nothing assumes English word order or that a term
 * is even one word in the target language.
 */

export default {
	/* ============================================================== *
	 * Chrome shared by every control in the corner cluster
	 * ============================================================== */
	common: {
		languageLabel: 'Language',
		switchLanguage: 'Change language',
		themeToLight: 'Switch to light theme',
		themeToDark: 'Switch to dark theme',
		backToTop: 'Back to top',
		scoring: 'SCORING'
	},

	/* ============================================================== *
	 * The glossary
	 * Ids and ordering live in src/lib/glossary/terms.js, paired with
	 * this array by position.
	 * ============================================================== */
	glossary: {
		/* Chrome */
		toggleOn: 'Explain technical terms',
		toggleOff: 'Hide term explanations',
		toggleLabel: 'Explanations',
		close: 'Close',
		// {term} is replaced with the marked word.
		explain: 'What does "{term}" mean?',
		// Shown once, on a reader's first visit, near the first mark.
		hintTitle: 'Some words are underlined.',
		hintBody:
			'Tap any underlined word for a plain-language explanation. Turn them off any time with the button in the corner.',
		hintDismiss: 'Got it',

		terms: [
			{
				match: ['game-service', 'game service', 'game-services', 'game services'],
				title: 'Game service',
				body: 'The challenge itself, packaged as a sealed program anyone can download and run. It holds the rules, the scoring, and the creator\u2019s hidden secret \u2014 like a sealed exam paper that also marks itself.',
				more: 'You run it on your own machine. It scores your bot and produces the cryptographic receipt that the blockchain later checks.'
			},
			{
				match: ['solver-service', 'solver service', 'solver-services', 'solver services', 'solver', 'solvers'],
				title: 'Solver service',
				body: 'Your entry. The bot you build to play the game, packaged the same sealed way so it runs identically on any machine \u2014 your strategy as a single, portable box.',
				more: 'It is handed to the game service, which runs it in isolation and scores what it did. Nobody sees your code but you.'
			},
			{
				match: ['GoP Web', 'GoP web portal', 'the portal'],
				title: 'GoP Web',
				body: 'The website where games are listed: read the rules, download a game, publish your result. It is a directory and a signing tool, not a referee \u2014 nothing it shows you has to be taken on trust.',
				more: 'You can run your own copy of it. That is the point: if the public one vanished, the games would carry on.'
			},
			{
				match: ['Celaut', 'Celaut node', 'Celaut nodes'],
				title: 'Celaut',
				body: 'The system that actually runs the sealed programs. You install it once, and from then on any game or solver package can be handed to your machine and executed in its own locked room.',
				more: 'It is what makes "run it yourself" realistic rather than a slogan: the same package behaves the same way on every machine that opens it.'
			},
			{
				match: ['node', 'nodes'],
				title: 'Node',
				body: 'One computer taking part in a network. Your laptop, a spare desktop, a server in a rack \u2014 once it runs the software and starts talking to other machines, it is a node.',
				more: 'Here it is simply the machine that runs the games and the solvers. Yours, not somebody\u2019s data centre.'
			},
			{
				match: ['service', 'services'],
				title: 'Service',
				body: 'A self-contained piece of software that does one job and can be handed to any machine to run \u2014 closer to a single appliance than to a whole program you install.',
				more: 'Both halves of a competition here are services: the game and the bot playing it.'
			},
			{
				match: ['blockchain', 'blockchains', 'ledger', 'ledgers'],
				title: 'Blockchain',
				body: 'A shared record book that thousands of computers keep copies of at once. Adding an entry requires the others to agree it is valid, and past entries cannot be rewritten \u2014 so no single participant controls the history.',
				more: 'Used here for two narrow jobs: recording who claimed what score, and paying out the winner. Nothing more.'
			},
			{
				match: ['Ergo', 'ERG'],
				title: 'Ergo',
				body: 'The particular blockchain this platform records results on and settles payments through. ERG is its unit of currency.',
				more: 'It is a choice, not a foundation: the platform has no coin of its own.'
			},
			{
				match: ['smart contract', 'smart contracts', 'contract', 'contracts', 'game contract'],
				title: 'Smart contract',
				body: 'A program that lives on the blockchain and holds money under rules written down in advance. When the conditions are met it pays out by itself \u2014 nobody signs a cheque, and nobody can decide not to.',
				more: 'It is why the prize is safe before anyone has won it: the funds are held by the rules, not by the person who wrote them.'
			},
			{
				match: ['on-chain', 'on chain', 'onchain'],
				title: 'On-chain',
				body: 'Written into the blockchain itself, where everyone can see it and nobody can quietly change it later \u2014 as opposed to sitting in a company\u2019s private database.'
			},
			{
				match: ['commitment', 'commitments', 'score commitment', 'cryptographic commitment', 'pre-commitment'],
				title: 'Commitment',
				body: 'A sealed envelope. You publish something that proves what you chose, without revealing what it was \u2014 and later, when the envelope is opened, everyone can check you didn\u2019t swap the contents.',
				more: 'It is what lets a score be locked in publicly while the game is still running, without telling your rivals how well you did.'
			},
			{
				match: ['hash', 'hashes', 'hashed', 'digest', 'hashed logs'],
				title: 'Hash',
				body: 'A short fingerprint calculated from a piece of data. The same data always gives the same fingerprint, a single changed byte gives a completely different one, and you cannot work backwards from the fingerprint to the data.',
				more: 'That one-way property is the whole trick: it lets you prove something matches without showing what it is.'
			},
			{
				match: ['secret', 'game secret', '256-bit secret'],
				title: 'Secret',
				body: 'A large random number the creator generates and keeps hidden while the game is open. Every score is sealed using it, so no score can be verified \u2014 or forged \u2014 until the creator publishes it.',
				more: 'Publishing it at the end is what makes everyone\u2019s results checkable at the same moment, rather than one at a time.'
			},
			{
				match: ['seed', 'game seed', 'seeds'],
				title: 'Seed',
				body: 'The starting number that decides exactly which version of a challenge you face \u2014 which board, which market data, which puzzle. Same seed, same challenge, for everyone.',
				more: 'It is revealed only after entries close, so nobody can tune a bot for the specific run in advance.'
			},
			{
				match: ['ceremony phase', 'ceremony', 'ceremony period'],
				title: 'Ceremony phase',
				body: 'The window at the start of a game when players sign up and each one\u2019s registration stirs a little unpredictability into the final seed. Like everyone throwing a die into the same cup before the lid comes off.',
				more: 'It exists so the creator cannot know the challenge in advance either \u2014 the players collectively decide it without meaning to.'
			},
			{
				match: ['Solver ID', 'Solver IDs', 'solver identifier'],
				title: 'Solver ID',
				body: 'The unique fingerprint of the exact bot you registered. It names one specific version of your code, so a bot cannot be quietly swapped for a different one after the seed is revealed.'
			},
			{
				match: ['Paper', 'the Paper', 'game paper'],
				title: 'Paper',
				body: 'The written rules: what the challenge is, how it is scored, what counts as a valid entry. Published before anyone can play, so the terms cannot change once people have committed.',
				more: 'You are meant to be able to build your entry from this document alone.'
			},
			{
				match: ['pot', 'the pot', 'prize pool'],
				title: 'Pot',
				body: 'All the entry fees, pooled together and held by the contract until the game resolves. Everyone who competes pays in; the winner takes what is left after the agreed cuts.'
			},
			{
				match: ['participation fee', 'participation fees', 'entry fee', 'entry fees'],
				title: 'Participation fee',
				body: 'What it costs to submit a result you want counted. It goes into the pot rather than to the organisers, so every entry makes the prize bigger.',
				more: 'You only pay it if you decide your run was worth entering \u2014 running the game locally is free.'
			},
			{
				match: ['commission', 'commissions', 'creator commission', 'platform commission'],
				title: 'Commission',
				body: 'The agreed slice of the pot that goes to the game\u2019s creator, its judges and the platform. Set in the open when the game is published, and taken automatically \u2014 not negotiated afterwards.'
			},
			{
				match: ['judge', 'judges'],
				title: 'Judge',
				body: 'Someone whose job is to check the creator, not the players: did the game actually score honestly, and are its receipts valid? If they catch a cheat, they are paid out of the creator\u2019s cut.',
				more: 'Being paid for finding fraud, rather than for approving things, is what makes the role worth having.'
			},
			{
				match: ['NFT', 'NFTs', 'game NFT'],
				title: 'NFT',
				body: 'A one-of-a-kind token recorded on the blockchain, which can be owned and transferred but not duplicated. Here it is the trophy: permanent, public proof of who won a particular game.'
			},
			{
				match: ['wallet', 'wallets', 'Ergo wallet'],
				title: 'Wallet',
				body: 'The app that holds the keys to your funds and signs your actions on the blockchain. Not an account with a company \u2014 nobody can freeze it, and nobody can recover it for you.'
			},
			{
				match: ['gas fee', 'gas fees', 'network gas fee', 'network fee'],
				title: 'Gas fee',
				body: 'The small charge for having the network record your transaction. It pays the computers doing the recording, not the platform \u2014 like postage rather than a ticket price.'
			},
			{
				match: ['deterministic', 'determinism', 'reproducible', 'reproducibility'],
				title: 'Deterministic',
				body: 'Same input, same output, every time \u2014 like a recipe that produces an identical cake in any kitchen, rather than one that depends on the cook. Nothing about the machine, the day or the location changes the result.',
				more: 'It is what makes a score checkable by somebody else: they can re-run it and must get your number.'
			},
			{
				match: ['isolation', 'isolated', 'sealed', 'sandboxed', 'secure isolated environment', 'isolated environment'],
				title: 'Isolation',
				body: 'Keeping a running program inside a boundary it cannot reach past \u2014 it sees only what it was given, and nothing of the machine around it or of anything else running there.',
				more: 'It is what lets a game run a stranger\u2019s bot safely, and lets you run a stranger\u2019s game safely.'
			},
			{
				match: ['obfuscation', 'obfuscated', 'obfuscate'],
				title: 'Obfuscation',
				body: 'Deliberately scrambling a program so that it still runs perfectly but is painful to read \u2014 the software equivalent of a document printed without spaces or line breaks.',
				more: 'Used here to keep a game\u2019s hidden secret hidden, even though everyone has a copy of the program that contains it.'
			},
			{
				match: ['peer-to-peer', 'peer to peer', 'P2P'],
				title: 'Peer-to-peer',
				body: 'Two computers dealing with each other directly, the way two people have a phone call \u2014 instead of both sending everything through a company in the middle, the way email or a marketplace works. Each computer is a "peer": equal, no one in charge.',
				more: 'It matters here because the company in the middle is usually the one that sets the price, takes a cut, and can remove you.'
			},
			{
				match: ['self-hosting', 'self-hosted', 'self-host', 'run locally', 'runs locally'],
				title: 'Self-hosting',
				body: 'Running your own copy of a service on your own machine instead of using somebody else\u2019s. The thing keeps working even if the public version is switched off, censored, or simply having a bad day.'
			},
			{
				match: ['decoy', 'decoys', 'decoy score', 'decoy scores', 'fake high scores'],
				title: 'Decoy',
				body: 'A deliberately misleading entry \u2014 a score you publish that isn\u2019t your real one \u2014 submitted to make rivals guess wrong about how well you actually did. Bluffing, made possible because nobody can read a sealed score.'
			},
			{
				match: ['Time-Weighted Score', 'time-weighted score', 'time weighted score', 'TimeWeight'],
				title: 'Time-weighted score',
				body: 'A score adjusted for how early you submitted it. Two identical results do not tie: the one entered sooner counts for more, so sitting on a good answer until the deadline costs you.'
			},
			{
				match: ['Grace Period', 'grace period', 'validation period', 'refund'],
				title: 'Grace period',
				body: 'A waiting window built into the rules before money moves \u2014 time for judges to object, and time for players to claim their fees back if the creator never resolves the game at all.',
				more: 'It is the answer to "what if the organiser just disappears": the contract lets everyone walk away with their money.'
			},
			{
				match: ['CDE', 'scenario variability', 'high scenario variability'],
				title: 'Scenario variability (CDE)',
				body: 'How different each run of a game can be from the last. High variability means a bot has to actually play well, because there is no single fixed answer to memorise and hardcode.'
			}
		]
	},

	/* ============================================================== *
	 * Splash screen
	 * ============================================================== */
	splash: {
		title: 'GAME OF PROMPTS',
		subtitle: 'WRITE YOUR PROMPTS. BUILD YOUR BOT. WIN THE THRONE.'
	},

	/* ============================================================== *
	 * <head>
	 * ============================================================== */
	meta: {
		title: 'Game of Prompts — Write your prompts. Build your bot. Win the throne.',
		description:
			'A competitive platform where creators design game-services to evaluate AI solvers, while players build solver-services to maximize their scores — powered by the Ergo blockchain and Celaut.',
		ogTitle: 'Game of Prompts',
		ogDescription: 'Write your prompts. Build your bot. Win the throne.'
	},

	/* ============================================================== *
	 * Hero
	 * ============================================================== */
	hero: {
		titleTop: 'GAME OF',
		titleBottom: 'PROMPTS',
		// `<span class="hero-grad">` is the accent gradient. Keep the tag
		// around whichever clause deserves the emphasis in this language;
		// it does not have to be the middle one.
		tagline: 'Write your prompts. <span class="hero-grad">Build your bot.</span> Win the throne.',
		lede: 'A competitive platform where creators design game-services to evaluate AI solvers, and players build solver-services to maximize their scores — all recorded and verified on-chain.',
		actions: {
			launch: 'Launch App',
			github: 'View on GitHub',
			how: 'See how it works'
		},
		stats: [
			{ value: 'P2P', label: 'Decentralized — services run on your own Celaut node' },
			{ value: 'On-chain', label: 'Results committed and verified on Ergo' },
			{ value: 'Trustless', label: 'Smart contracts settle the pot, not a company' }
		],
		scroll: 'Scroll'
	},

	/* ============================================================== *
	 * The seven pinned scenes
	 * Each `beats` array is positional: one entry per SceneBeat in
	 * +page.svelte, in order. `note` is the closing line of a scene.
	 * ============================================================== */
	scenes: {
		arena: {
			label: 'The idea',
			beats: [
				{
					h: 'Someone posts a challenge.',
					p: 'A creator designs a game with measurable scoring — and packages it as a <strong>game-service</strong>: an immutable Celaut service that holds the game\u2019s logic and its secret.'
				},
				{
					h: 'Everyone else builds a bot to beat it.',
					p: 'Players write <strong>solver-services</strong> — their strategy, packaged the same way. The game-service runs each solver in a secure, isolated environment and scores what it did.'
				},
				{
					h: 'The highest score wins the throne.',
					p: 'No leaderboard you have to trust. Every score is committed cryptographically and <strong>settled on the Ergo blockchain</strong>, where anyone can check the maths.',
					note: 'Write your prompts. Build your bot. Win the throne.'
				}
			]
		},

		components: {
			label: 'Architecture',
			beats: [
				{
					h: 'Game Service',
					p: 'Built by game devs. An autonomous service that encapsulates a game\u2019s logic and the secret. It evaluates solver performance, generates scores, and creates the <strong>cryptographic commitments</strong> needed for blockchain validation.'
				},
				{
					h: 'Solver Service',
					p: 'Built by players. It implements strategies to maximize the score in a specific game. The solver is packaged and sent to the game-service, which <strong>executes it in a secure, isolated environment</strong> for evaluation.'
				},
				{
					h: 'GoP Web',
					p: 'The community portal. Discover games, read the rules, download game-services, and publish your results on the Ergo blockchain. It <strong>supports self-hosting</strong> for a fully trustless, peer-to-peer experience.'
				},
				{
					h: 'Everything runs on your machine.',
					p: 'Game and solver services both run on a <strong>local Celaut node</strong>, which can operate entirely offline. GoP Web can be used via its GitHub.io instance or run locally as a Celaut service.',
					note: 'Two technologies: Celaut for computation, Ergo for settlement.'
				}
			]
		},

		creator: {
			label: 'Game creator flow',
			beats: [
				{
					h: 'Design a game.',
					p: 'Create a challenge with measurable scoring and high scenario variability (CDE), so hardcoded solutions don\u2019t work.'
				},
				{
					h: 'Write the Paper.',
					p: 'Publish a document with all instructions, rules and evaluation criteria. Players must be able to understand the challenge <strong>before</strong> they participate.'
				},
				{
					h: 'Generate a secret.',
					p: 'A unique <strong>256-bit secret</strong> underwrites the cryptographic commitments and the later score validation. Nobody can see it while the game is open.'
				},
				{
					h: 'Package and publish.',
					p: 'Ship the game as a Celaut service and publish it through GoP Web with its parameters: fee, deadline, and commission.'
				},
				{
					h: 'Reveal the secret.',
					p: 'When the deadline passes, the creator <strong>reveals the secret on-chain</strong>. That resolves the game: score validation becomes possible and the smart contract can determine the winner.',
					note: 'Commit first, reveal later. That\u2019s what makes it fair.'
				}
			]
		},

		player: {
			label: 'The player\u2019s journey',
			beats: [
				{
					h: 'Browse and read the Paper.',
					p: 'Find a game on GoP Web. Read the creator\u2019s Paper to understand the challenge, the rules and the evaluation criteria before committing to anything.'
				},
				{
					h: 'Implement your solver.',
					p: 'Build your solver-service from the Paper alone, so it\u2019s ready to compete the moment the seed drops.'
				},
				{
					h: 'Register your Solver ID.',
					p: 'Registration is free — you only cover the network gas fee. This <strong>pre-commitment</strong> is what guarantees fairness before the seed is revealed.'
				},
				{
					h: 'The seed is revealed.',
					p: 'Once the ceremony phase ends, the game seed goes public. Now — and only now — you know the exact challenge parameters you\u2019ll be evaluated against.'
				},
				{
					h: 'Run the game service locally.',
					p: 'The service executes your solver in a secure environment with the revealed seed, evaluates its performance, and generates the <strong>cryptographic commitment</strong> needed for on-chain validation.'
				},
				{
					h: 'Submit your commitment and pay the fee.',
					p: 'If the score is worth competing with, publish the commitment on-chain and pay the participation fee. <strong>All fees go into the pot</strong> — the winner takes the economic prize, minus creator, judge and platform commission, and receives the game NFT.',
					note: 'You decide whether your run is worth submitting.'
				}
			]
		},

		validation: {
			label: 'Score validation',
			beats: [
				{
					h: 'Your score is a hash, not a claim.',
					p: 'When you participate, what goes on-chain is a <strong>commitment</strong> — a digest. Nobody, including the creator, can read your score off the blockchain while the game is still open.'
				},
				{
					h: 'Then the secret comes out.',
					p: 'After the deadline, the creator reveals the game secret in the resolution transaction. That\u2019s the missing ingredient — and it <strong>unlocks verification for everyone at once</strong>.'
				},
				{
					h: 'The contract recomputes it.',
					p: 'The game contract builds a commitment for each score from the <strong>solver ID, the score value, the hashed logs and the revealed secret</strong>. No trusted party is involved; it\u2019s arithmetic.'
				},
				{
					h: 'If they match, the score is real.',
					p: 'A recomputed commitment that equals the published one proves the score is authentic and tamper-proof. Anything that doesn\u2019t match simply isn\u2019t a score.',
					note: 'Transparent yet private: proven without being exposed.'
				}
			]
		},

		pot: {
			label: 'Economics',
			beats: [
				{
					h: 'Every entry feeds the pot.',
					p: 'Participation fees from everyone who submits a commitment accumulate in a single on-chain pot for that game.'
				},
				{
					h: 'Commissions come off the top.',
					p: 'The creator, the judges and the platform take their agreed commission — all of it set in the open when the game was published, and <strong>enforced by the smart contract</strong> rather than by anyone\u2019s goodwill.'
				},
				{
					h: 'The rest goes to the winner.',
					p: 'The highest validated score takes the remaining pot — plus the <strong>game NFT</strong>, a permanent, public, auditable proof of victory. Funds are released after a validation period that gives judges time to check the creator acted honestly.',
					note: 'Nobody approves the payout. The contract does it.'
				}
			]
		},

		judges: {
			label: 'Trust & accountability',
			beats: [
				{
					h: 'Who watches the creator?',
					p: 'Judges are entities nominated by the creator who audit the resolution phase. They verify that the creator\u2019s game service generated <strong>valid proofs and valid scores</strong>.'
				},
				{
					h: 'Fraud costs the creator, not you.',
					p: 'If a judge catches a faulty game service or an invalid proof, that judge <strong>receives the creator\u2019s commission</strong> as the reward. The incentive to look closely is built in.'
				},
				{
					h: 'Players stay out of the blast radius.',
					p: 'In normal operation players cannot be penalised by judges. Judges exist to <strong>protect players from dishonest creators</strong>, never the other way around.',
					note: 'Audit the house, not the guests.'
				}
			]
		}
	},

	/* ============================================================== *
	 * The readable reference list under the validation scene
	 * ============================================================== */
	steps: {
		title: 'The five steps, in order',
		items: [
			{
				badge: 'SUBMITTED',
				title: 'Player Participation',
				desc: 'Player publishes their participation on the Ergo blockchain.'
			},
			{
				badge: 'REVEALED',
				title: 'Creator Reveals Secret',
				desc: 'After the deadline, the creator reveals the game secret in the resolution transaction — unlocking verification.'
			},
			{
				badge: 'COMPUTED',
				title: 'Smart Contract Validation',
				desc: 'The game contract computes a commitment for each score using the solver ID, score value, hashed logs, and revealed secret.'
			},
			{
				badge: 'VERIFIED',
				title: 'Score Verification',
				desc: 'When the score commitment matches the participation commitment, that score is validated as authentic and tamper-proof.'
			},
			{
				badge: 'DISTRIBUTED',
				title: 'Winner Takes the Pot',
				desc: 'Highest score wins. Following a validation period to ensure the game creator acted honestly, funds are released to the winner, net of creator and judge fees.'
			}
		]
	},

	/* ============================================================== *
	 * Video
	 * ============================================================== */
	video: {
		label: 'Overview',
		title: 'Watch the Breakdown',
		subtitle:
			'Get up to speed in minutes — see how Game of Prompts brings blockchain and AI competitions together.',
		thumbAlt: 'Game of Prompts video thumbnail',
		iframeTitle: 'Game of Prompts — Brief Breakdown'
	},

	/* ============================================================== *
	 * Security
	 * ============================================================== */
	security: {
		label: 'Security',
		title: 'Transparent Yet Private Competition',
		subtitle:
			'Cryptography ensures fair competition while protecting participants\u2019 strategies.',
		cards: [
			{
				title: 'Code Protection',
				desc: 'The game\u2019s intellectual property and game secret are protected through obfuscation to prevent reverse engineering.'
			},
			{
				title: 'Private Results',
				desc: 'Strategic decoys and cryptographic commitments conceal your true score, protecting your strategy until the final reveal.'
			},
			{
				title: 'Immutable Proof',
				desc: 'Final validation on the Ergo blockchain generates a public, immutable, and auditable proof of victory.'
			}
		]
	},

	/* ============================================================== *
	 * Game types
	 * ============================================================== */
	gameTypes: {
		title: 'What Can Be a Game?',
		text: 'Game of Prompts is a versatile platform that can host a wide variety of competitions. Here are just a few examples of what\u2019s possible.',
		// `label` is the "Game Type 01" eyebrow; {n} is the number.
		eyebrow: 'Game Type {n}',
		items: [
			{
				title: 'Classic Arcade',
				desc: 'The AI solver controls the character in fast-paced, skill-based game environments. Reflexes, pattern recognition, timing.',
				score: 'Game points · Survival time · Levels cleared'
			},
			{
				title: 'Open World',
				desc: 'Optimize for spatial reasoning, navigation, and environmental adaptation.',
				score: 'Resource efficiency · Map exploration · Mission complexity'
			},
			{
				title: 'Financial Trading',
				desc: 'Bot vs. market. Trade virtual assets in realistic simulations using historical or synthetic data. Pure strategy, zero luck.',
				score: 'Net profit · Sharpe ratio · Drawdown · Benchmarks'
			},
			{
				title: 'Protein Folding',
				desc: 'Predict 3D protein structures from amino acid sequences. A real scientific challenge — AI solvers advancing biology.',
				score: 'Structural stability · Folding accuracy · Efficiency'
			}
		]
	},

	/* ============================================================== *
	 * Optional features
	 * ============================================================== */
	features: {
		title: 'Optional Game Features',
		text: 'Creators can enhance their games with powerful optional mechanics — from poker-style bluffing to resource constraints and pay-per-attempt models.',
		// {n} is the number; {status} is one of `status` below.
		eyebrow: 'Feature {n}',
		status: {
			available: 'Available',
			research: 'Under Research'
		},
		items: [
			{
				title: 'Resource Limitation',
				desc: 'Technical challenge by constraining computational resources. Efficiency is king.',
				bullets: [
					'Game creator sets specific limits on computational resources',
					'Constraints: maximum RAM, CPU time, or service dependencies',
					'Forces players to develop highly efficient, optimized solutions',
					'Adds a significant engineering challenge to the game'
				]
			},
			{
				title: 'Poker Mode',
				desc: 'Strategic participation with risk and reward. Bluff, bet, and multiply your score.',
				bullets: [
					'Participants choose how much to pay (above a set minimum)',
					'Higher payment = higher final score multiplier (e.g. ×2, ×5)',
					'Players can submit multiple decoy scores',
					'Bluff strategy: pay high fee + submit fake high scores to intimidate',
					'Game creator sets score multiplier based on fee paid'
				]
			},
			{
				title: 'Pay-per-Attempt',
				desc: 'A mechanism that assigns a cost to each local execution, fostering high-quality agent development over trial-and-error.',
				bullets: [
					'Incremental token cost per local execution attempt',
					'Encourages rigorous local simulation and optimization',
					'Disincentivizes blind brute-force strategies',
					'Difficulty scaling fully configurable by the game creator'
				]
			}
		]
	},

	/* ============================================================== *
	 * FAQ
	 *
	 * The live questions are fetched from the project README at
	 * runtime and are English-only at source, so they are NOT
	 * translated here. What IS translated is the chrome around them
	 * and the offline fallback set, which is what a reader sees when
	 * the fetch fails.
	 * ============================================================== */
	faq: {
		label: 'FAQ',
		title: 'Frequently Asked Questions',
		footerTitle: 'Still have questions?',
		footerDesc:
			'Copy the prompt below and paste it into any AI assistant — it includes a link to our full documentation.',
		copyPrompt: 'Copy prompt',
		copied: 'Copied!',
		orLabel: 'or open directly in:',
		disclaimerBefore: '⚠️ AI responses may not be fully accurate. Always refer to the ',
		disclaimerLink: 'official documentation',
		disclaimerAfter: ' for authoritative information.',
		telegram: 'Join Telegram Community',
		groups: [
			{
				title: 'General',
				items: [
					{
						q: 'What is Game of Prompts?',
						a: 'A bot competition audited by blockchain. Creators design game-services to evaluate AI solvers, while players build solver-services to maximize their scores — all verified on the Ergo blockchain.'
					},
					{
						q: 'What is the "Ceremony Phase"?',
						a: 'The initial period where players register their Solver IDs to add randomness to the seed. This prevents the Creator from pre-calculating solutions and ensures fair competition.'
					},
					{
						q: 'What do I need to play?',
						a: 'An Ergo Wallet (with some ERG for participation fees) and a Celaut Node to run game and solver services locally.'
					}
				]
			},
			{
				title: 'Security',
				items: [
					{
						q: 'How do I know the game is fair?',
						a: 'The game rules and hashS are registered on-chain from the start. They are immutable — no one can change them after publication.'
					},
					{
						q: 'Can the Creator steal the funds?',
						a: 'No. Funds are locked in a Smart Contract, not the Creator\u2019s wallet. Distribution is handled atomically by the contract when the game resolves.'
					},
					{
						q: 'What if the Creator disappears?',
						a: 'After a Grace Period, players can trigger a Refund Action to recover their participation fees from the smart contract.'
					}
				]
			},
			{
				title: 'Judges',
				items: [
					{
						q: 'Who are the Judges?',
						a: 'Entities nominated by the Creator who audit the resolution phase. They verify that the game service generated valid proofs.'
					},
					{
						q: 'Why do Judges earn money for invalidating a participation?',
						a: 'They detect Creator fraud — their incentive is to catch faulty game services. When they find issues, they receive the Creator\u2019s commission as reward.'
					},
					{
						q: 'Can I be penalized as a player?',
						a: 'The system penalizes the Creator/Game Service, not honest players. Judges audit the Creator, not you.'
					}
				]
			},
			{
				title: 'Economy',
				items: [
					{
						q: 'How is the winner calculated?',
						a: 'Highest Time-Weighted Score: Score × (TimeWeight + RemainingTime). Submit early and score high for the best result.'
					},
					{
						q: 'When do I receive my winnings?',
						a: 'Immediately upon the End Game action. The Smart Contract atomically distributes all funds — the winner receives all participation fees minus creator commission and judge fees.'
					}
				]
			}
		]
	},

	/* ============================================================== *
	 * Call to action + footer
	 * ============================================================== */
	cta: {
		label: 'Get Started',
		title: 'Get Started with Game of Prompts',
		steps: [
			'Install the <strong>Celaut node</strong> software to run Game and Solver Services in a secure, deterministic environment.',
			'Set up an <strong>Ergo blockchain wallet</strong> to participate in games and receive winnings.',
			'Browse available games on <strong>GoP Web</strong> and start developing your own solvers or create challenging games for others.'
		],
		github: 'GitHub Repository',
		celaut: 'Celaut Project',
		ergo: 'Ergo Platform'
	},

	footer: {
		tagline: 'Write your prompts. Build your bot. Win the throne.',
		github: 'GitHub',
		ergo: 'Ergo',
		celaut: 'Celaut'
	}
};
