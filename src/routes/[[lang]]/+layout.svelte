<script lang="ts">
	import '../../app.css';
	import { browser } from '$app/environment';
	import CustomCursor from '$lib/CustomCursor.svelte';
	import FloatingControls from '$lib/components/FloatingControls.svelte';
	import GlossaryLayer from '$lib/components/glossary/GlossaryLayer.svelte';
	import { locale, applyLocale, commitLocale, detectLocale, setLocale } from '$lib/i18n/index.js';

	let { data, children } = $props();

	// Static prerendering must select its dictionary before children render.
	if (!browser) commitLocale(data.lang);

	/*
	 * `data.lang` comes from +layout.ts's load(), which already awaited
	 * this locale's dictionary — so it's safe to switch synchronously.
	 *
	 * A prefixed route (/es) is authoritative: whatever the visitor had
	 * saved before, the URL they followed wins for this page. The
	 * unprefixed route has no locale of its own to be authoritative
	 * about, so it falls back to the client-side bootstrap (saved
	 * choice, else browser languages, else English).
	 *
	 * Read inside $effect so Svelte 5 doesn't warn that we captured the
	 * initial `data` snapshot; a locale-only navigation still re-runs
	 * this because `data` is the effect's dependency.
	 */
	$effect(() => {
		if (data.isPrefixed) {
			commitLocale(data.lang);
		} else if (browser) {
			const initial = detectLocale();
			if (initial !== data.lang) setLocale(initial);
		}
	});

	// Keep <html lang>/<html dir> in sync with the store.
	$effect(() => {
		applyLocale($locale);
	});
</script>

<CustomCursor />
<FloatingControls />

<main>
	{@render children()}
</main>

<!--
	The glossary layer annotates whatever <main> rendered, so it mounts
	after it. It renders nothing of its own except the definition
	popover — everything else it does is to the existing DOM, which is
	what keeps the prose (and all seventeen dictionaries) untouched.
-->
<GlossaryLayer />
