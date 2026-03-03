<script lang="ts">
	import { onMount } from 'svelte';
	let isMobile = $state(true);
	let initialized = $state(false);

	onMount(() => {
		const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		const isSmall = window.matchMedia('(max-width: 768px)').matches;
		if (isTouch || isSmall) return;
		isMobile = false;
		document.body.classList.add('has-custom-cursor');
		const wrapper = document.getElementById('target-cursor-wrapper');
		if (!wrapper) return;

		// Start hidden, only show after first real mouse position
		wrapper.style.opacity = '0';
		let raf: number;

		const onMouseMove = (e: MouseEvent) => {
			if (!initialized) {
				initialized = true;
				wrapper.style.opacity = '1';
			}
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				wrapper.style.left = e.clientX + 'px';
				wrapper.style.top = e.clientY + 'px';
			});
		};

		const setHovering = (h: boolean) => {
			if (h) wrapper.classList.add('hovering');
			else wrapper.classList.remove('hovering');
		};

		document.addEventListener('mousemove', onMouseMove, { passive: true });
		document.querySelectorAll('a, button, [role=button]').forEach(el => {
			el.addEventListener('mouseenter', () => setHovering(true));
			el.addEventListener('mouseleave', () => setHovering(false));
		});

		return () => {
			cancelAnimationFrame(raf);
			document.body.classList.remove('has-custom-cursor');
			document.removeEventListener('mousemove', onMouseMove);
		};
	});
</script>

{#if !isMobile}
	<div id="target-cursor-wrapper" class="target-cursor-wrapper" aria-hidden="true">
		<div class="target-cursor-dot"></div>
		<div class="target-cursor-corner corner-tl"></div>
		<div class="target-cursor-corner corner-tr"></div>
		<div class="target-cursor-corner corner-br"></div>
		<div class="target-cursor-corner corner-bl"></div>
	</div>
{/if}

<style>
	:global(body.has-custom-cursor),
	:global(body.has-custom-cursor *) { cursor: none !important; }

	.target-cursor-wrapper {
		position: fixed;
		top: 0; left: 0;
		width: 0; height: 0;
		pointer-events: none;
		z-index: 99999;
		transform: translate(-50%, -50%);
		transition: opacity 0.2s;
	}
	.target-cursor-dot {
		position: absolute;
		left: 50%; top: 50%;
		width: 5px; height: 5px;
		background: #22c55e;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 10px #22c55ecc, 0 0 20px #22c55e66;
	}
	.target-cursor-corner {
		position: absolute;
		left: 50%; top: 50%;
		width: 13px; height: 13px;
		border: 2px solid #22c55e;
		filter: drop-shadow(0 0 3px rgba(34,197,94,.6));
		transition: all 0.12s ease;
	}
	.corner-tl { transform: translate(-150%,-150%); border-right:none; border-bottom:none; }
	.corner-tr { transform: translate(50%,-150%); border-left:none; border-bottom:none; }
	.corner-br { transform: translate(50%,50%); border-left:none; border-top:none; }
	.corner-bl { transform: translate(-150%,50%); border-right:none; border-top:none; }

	.target-cursor-wrapper.hovering .target-cursor-corner { width:18px; height:18px; }
	.target-cursor-wrapper.hovering .corner-tl { transform: translate(-180%,-180%); }
	.target-cursor-wrapper.hovering .corner-tr { transform: translate(80%,-180%); }
	.target-cursor-wrapper.hovering .corner-br { transform: translate(80%,80%); }
	.target-cursor-wrapper.hovering .corner-bl { transform: translate(-180%,80%); }
</style>
