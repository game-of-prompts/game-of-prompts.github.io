<script lang="ts">
	import '../app.css';
	import CustomCursor from '$lib/CustomCursor.svelte';
	import SplashScreen from '$lib/SplashScreen.svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';

	let { children } = $props();
</script>

<SplashScreen />
<CustomCursor />
<ThemeToggle />

{@render children()}
