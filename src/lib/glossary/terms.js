/*
 * src/lib/glossary/terms.js
 * ------------------------------------------------------------------
 * The glossary's STRUCTURE: which terms exist, and in what order.
 *
 * Words live in the dictionaries (`glossary.terms` in en.js and its
 * sixteen siblings), paired with this list positionally — the same
 * convention every other card list on the site already uses. Ids are
 * not copy: they never change between languages, they are what the
 * popover and the `data-gloss` attribute key off. So they live here,
 * with the code, and not in seventeen files where a key checker would
 * report every one of them as "identical to English".
 *
 * Each dictionary entry supplies:
 *   match — the strings that trigger this term IN THAT LANGUAGE. An
 *           array, longest-wins, matched case-insensitively and only
 *           on whole words (see annotate.js). Translators choose their
 *           own trigger words; nothing here assumes English word order
 *           or that a term is even one word in the target language.
 *   title — the term as it appears at the top of the popover.
 *   body  — one or two plain sentences. The rule for writing these is
 *           in en.js and it is worth keeping to: explain the word, do
 *           not re-explain Game of Prompts, and never write down to
 *           the reader.
 *   more  — optional second paragraph: why the word matters HERE.
 *
 * ORDER MATTERS ONLY FOR PAIRING, not for matching: annotate.js sorts
 * every alias by length before building its regex, so "game service"
 * always beats "service" regardless of where either sits in this list.
 *
 * Adding a term: append its id here, and append its object to `terms`
 * in EVERY dictionary, in the same position.
 */

/** @type {string[]} Ids, paired by index with `glossary.terms`. */
export const GLOSSARY_IDS = [
	'game-service',
	'solver-service',
	'gop-web',
	'celaut',
	'node',
	'service',
	'blockchain',
	'ergo',
	'smart-contract',
	'on-chain',
	'commitment',
	'hash',
	'secret',
	'seed',
	'ceremony-phase',
	'solver-id',
	'paper',
	'pot',
	'participation-fee',
	'commission',
	'judge',
	'nft',
	'wallet',
	'gas-fee',
	'deterministic',
	'isolation',
	'obfuscation',
	'peer-to-peer',
	'self-hosting',
	'decoy',
	'time-weighted-score',
	'grace-period',
	'cde'
];

/**
 * Elements whose text is eligible for annotation. Prose only: headings
 * are deliberately absent, because a dotted underline inside a display
 * heading reads as damage rather than as an affordance, and every
 * heading on this site is followed by the paragraph that repeats its
 * key term anyway.
 */
export const ANNOTATABLE =
	'p, li, dd, figcaption, .beat-note, .gt-desc, .gt-score, .lede, .stat-label, .section-subtitle, .narrative-text, .faq-answer';

/**
 * Never descend into these while walking text. Links and buttons
 * already own the click; code and abbreviations are quoting a literal;
 * canvases and SVGs have no text nodes worth touching.
 */
export const SKIP_TAGS = new Set([
	'A',
	'BUTTON',
	'CODE',
	'KBD',
	'PRE',
	'SAMP',
	'ABBR',
	'SCRIPT',
	'STYLE',
	'NOSCRIPT',
	'CANVAS',
	'SVG',
	'H1',
	'H2',
	'H3',
	'H4',
	'H5',
	'H6'
]);

/**
 * How often a single term may be marked.
 *
 * This is the whole difference between a helpful page and a page that
 * looks like it has been vandalised with dotted underlines. "Solver"
 * and "score" appear dozens of times here; marking every one of them
 * would make the prose unreadable and would teach the reader to ignore
 * the underline — which is the failure mode that matters, because then
 * the ONE word they actually didn't know goes unnoticed.
 *
 * So: at most once per section, and at most twice per page.
 */
export const MAX_PER_SECTION = 1;
export const MAX_PER_PAGE = 2;

/** The containers that count as "a section" for MAX_PER_SECTION. */
export const SECTION_SCOPE =
	'section, .beats, .immersive-hero, .hero, .cta-block, .faq-group, .ground, footer';
