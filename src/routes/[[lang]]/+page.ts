import { LOCALES, DEFAULT_LOCALE } from '$lib/i18n/index.js';

/*
 * `[[lang]]` is optional, so the unprefixed route (English) needs no
 * entry of its own — SvelteKit generates that for free. This supplies
 * the rest: one prerendered `/xx` page per non-default locale, purely
 * so a specific language has a shareable, crawlable URL.
 *
 * SvelteKit only allows `entries` as an export of `+page.ts` itself
 * (not a `+layout.ts`, even though `[[lang]]` is defined at the layout
 * level), which is why it lives here.
 */
export function entries() {
	return LOCALES.filter((l) => l.code !== DEFAULT_LOCALE).map((l) => ({ lang: l.code }));
}
