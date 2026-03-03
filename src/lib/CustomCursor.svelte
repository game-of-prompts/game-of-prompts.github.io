<script lang="ts">
	import { onMount } from 'svelte';

	let cursorX = $state(0);
	let cursorY = $state(0);
	let visible = $state(false);
	let isMobile = $state(true);

	onMount(() => {
		// Only enable on desktop + non-reduced-motion
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		if (prefersReducedMotion || isTouch) return;
		isMobile = false;

		let targetX = 0, targetY = 0;

		const onMouseMove = (e: MouseEvent) => {
			targetX = e.clientX;
			targetY = e.clientY;
			if (!visible) visible = true;
		};

		const onMouseLeave = () => { visible = false; };
		const onMouseEnter = () => { visible = true; };

		document.addEventListener('mousemove', onMouseMove, { passive: true });
		document.addEventListener('mouseleave', onMouseLeave);
		document.addEventListener('mouseenter', onMouseEnter);

		let animId: number;
		const lerp = () => {
			cursorX += (targetX - cursorX) * 0.15;
			cursorY += (targetY - cursorY) * 0.15;
			animId = requestAnimationFrame(lerp);
		};
		lerp();

		return () => {
			cancelAnimationFrame(animId);
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseleave', onMouseLeave);
			document.removeEventListener('mouseenter', onMouseEnter);
		};
	});
</script>

{#if !isMobile}
	<div
		class="custom-cursor"
		class:visible
		style="transform: translate({cursorX}px, {cursorY}px)"
	></div>
{/if}

<style>
	.custom-cursor {
		position: fixed;
		top: -10px;
		left: -10px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(74, 222, 128, 0.4) 0%, rgba(74, 222, 128, 0.1) 50%, transparent 70%);
		pointer-events: none;
		z-index: 9999;
		opacity: 0;
		transition: opacity 0.3s;
		mix-blend-mode: screen;
		will-change: transform;
	}

	.custom-cursor.visible {
		opacity: 1;
	}
</style>
