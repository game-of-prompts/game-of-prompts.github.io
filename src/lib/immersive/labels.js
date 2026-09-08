// Canvas captions reuse the same translated terminology as the article.
import { get } from 'svelte/store';
import { t, locale } from '$lib/i18n/index.js';
const keys = {
 'GAME': 'scenes.creator.beats.0.h', 'SERVICE': 'glossary.terms.5.title',
 'WINNER': 'steps.items.4.title', 'GAME SERVICE': 'glossary.terms.0.title',
 'SOLVER SERVICE': 'glossary.terms.1.title', 'creator': 'scenes.creator.label',
 'player': 'scenes.player.label', 'portal': 'glossary.terms.2.title',
 'DESIGN': 'scenes.creator.beats.0.h', 'PAPER': 'glossary.terms.16.title',
 'SECRET': 'glossary.terms.12.title', 'PUBLISH': 'scenes.creator.beats.3.h',
 'REVEAL': 'scenes.creator.beats.4.h', 'COMMITMENT': 'glossary.terms.10.title',
 'SOLVER': 'glossary.terms.1.title', 'SOLVER ID · GAS ONLY': 'scenes.player.beats.2.h',
 'SEED': 'glossary.terms.13.title', 'SCORE': 'common.scoring',
 '+ FEE': 'glossary.terms.18.title', 'PUBLISHED COMMITMENT': 'glossary.terms.10.title',
 'SOLVER ID': 'glossary.terms.15.title', 'HASHED LOGS': 'glossary.terms.11.title',
 'RECOMPUTED': 'steps.items.2.badge', 'THE POT': 'glossary.terms.17.title',
 'CREATOR': 'scenes.creator.label', 'JUDGES': 'faq.groups.2.title',
 'PLATFORM': 'glossary.terms.2.title', 'HIGHEST VALIDATED SCORE': 'steps.items.4.title',
 'CREATOR FEE': 'glossary.terms.19.title', 'HONEST JUDGE': 'glossary.terms.20.title',
 'PLAYERS UNAFFECTED': 'scenes.judges.beats.2.h'
};
export function localizedLabel(text) {
 return get(locale) === 'en' || !keys[text] ? text : get(t)(keys[text]);
}
