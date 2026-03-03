<script lang="ts">
	import { onMount } from 'svelte';

	let cursorX = $state(0);
	let cursorY = $state(0);
	let scale = $state(1);
	let visible = $state(false);
	let isMobile = $state(true);

	onMount(() => {
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

		const handleMouseEnter = () => { scale = 1.5; };
		const handleMouseLeave = () => { scale = 1; };

		document.addEventListener('mousemove', onMouseMove, { passive: true });
		document.body.addEventListener('mouseleave', handleMouseLeave);

		const interactiveElements = document.querySelectorAll('a, button, input, [onclick]');
		interactiveElements.forEach(el => {
			el.addEventListener('mouseenter', handleMouseEnter);
			el.addEventListener('mouseleave', handleMouseLeave);
		});

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
			document.body.removeEventListener('mouseleave', handleMouseLeave);
			interactiveElements.forEach(el => {
				el.removeEventListener('mouseenter', handleMouseEnter);
				el.removeEventListener('mouseleave', handleMouseLeave);
			});
		};
	});
</script>

{#if !isMobile}
	<div
		class="custom-cursor"
		class:visible
		style="transform: translate({cursorX}px, {cursorY}px) scale({scale})"
	></div>
{/if}

<style>
	:global(body) {
		cursor: none;
	}

	.custom-cursor {
		position: fixed;
		top: -10px;
		left: -10px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: radial-gradient(circle, var(--accent-color-trans) 0%, var(--accent-color-trans-2) 50%, transparent 70%);
		pointer-events: none;
		z-index: 9999;
		opacity: 0;
		transition: opacity 0.3s, transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		mix-blend-mode: screen;
		will-change: transform;
	}

	.custom-cursor.visible {
		opacity: 1;
	}
</style>
