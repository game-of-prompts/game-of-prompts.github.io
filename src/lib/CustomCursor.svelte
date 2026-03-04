<script lang="ts">
	import { onMount } from 'svelte';

	let wrapper: HTMLDivElement;

	onMount(() => {
		const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		if (isTouch || window.matchMedia('(max-width:768px)').matches) return;

		document.body.classList.add('has-custom-cursor');

		const tl = wrapper.querySelector('.tl') as HTMLElement;
		const tr = wrapper.querySelector('.tr') as HTMLElement;
		const br = wrapper.querySelector('.br') as HTMLElement;
		const bl = wrapper.querySelector('.bl') as HTMLElement;
		const dot = wrapper.querySelector('.tcd') as HTMLElement;

		let raf: number;
		let currentX = window.innerWidth / 2;
		let currentY = window.innerHeight / 2;
		let expandedEl: Element | null = null;

		// Default corner offsets (small bracket)
		const CORNER_SIZE = 13;
		const CORNER_OFFSET = CORNER_SIZE * 1.5; // ~19.5px

		function resetCorners(animate = true) {
			const dur = animate ? '0.25s' : '0s';
			[tl, tr, br, bl].forEach(c => c.style.transition = `all ${dur} cubic-bezier(0.16,1,0.3,1)`);
			tl.style.transform = `translate(-${CORNER_OFFSET}px, -${CORNER_OFFSET}px)`;
			tr.style.transform = `translate(${CORNER_OFFSET - CORNER_SIZE}px, -${CORNER_OFFSET}px)`;
			br.style.transform = `translate(${CORNER_OFFSET - CORNER_SIZE}px, ${CORNER_OFFSET - CORNER_SIZE}px)`;
			bl.style.transform = `translate(-${CORNER_OFFSET}px, ${CORNER_OFFSET - CORNER_SIZE}px)`;
			wrapper.classList.remove('expanded');
			dot.style.opacity = '1';
		}

		function expandToElement(el: Element) {
			const rect = el.getBoundingClientRect();
			const wRect = wrapper.getBoundingClientRect(); // wrapper is 0x0 at cursor pos
			// wrapper position = currentX, currentY (via left/top style)
			const cx = currentX;
			const cy = currentY;
			const pad = 6;

			const dTL_x = rect.left - cx - pad;
			const dTL_y = rect.top - cy - pad;
			const dTR_x = rect.right - cx + pad - CORNER_SIZE;
			const dTR_y = rect.top - cy - pad;
			const dBR_x = rect.right - cx + pad - CORNER_SIZE;
			const dBR_y = rect.bottom - cy + pad - CORNER_SIZE;
			const dBL_x = rect.left - cx - pad;
			const dBL_y = rect.bottom - cy + pad - CORNER_SIZE;

			[tl, tr, br, bl].forEach(c => c.style.transition = 'all 0.3s cubic-bezier(0.16,1,0.3,1)');
			tl.style.transform = `translate(${dTL_x}px, ${dTL_y}px)`;
			tr.style.transform = `translate(${dTR_x}px, ${dTR_y}px)`;
			br.style.transform = `translate(${dBR_x}px, ${dBR_y}px)`;
			bl.style.transform = `translate(${dBL_x}px, ${dBL_y}px)`;

			wrapper.classList.add('expanded');
			dot.style.opacity = '0';
		}

		const move = (e: MouseEvent) => {
			cancelAnimationFrame(raf);
			currentX = e.clientX;
			currentY = e.clientY;
			raf = requestAnimationFrame(() => {
				wrapper.style.left = currentX + 'px';
				wrapper.style.top = currentY + 'px';
				wrapper.style.opacity = '1';
				// If expanded, re-calc corners as cursor moves within element
				if (expandedEl) expandToElement(expandedEl);
			});
		};

		// Large interactive targets that get the expand effect
		const LARGE_SELECTORS = 'iframe, video, .video-card, .game-type-fullscreen, .hero, section, .card, .foundation-card';
		const SMALL_SELECTORS = 'a, button, [role=button], input, select';

		const onEnterLarge = (e: Event) => {
			const el = e.currentTarget as Element;
			expandedEl = el;
			expandToElement(el);
		};

		const onLeaveLarge = () => {
			expandedEl = null;
			resetCorners(true);
		};

		const onEnterSmall = () => {
			if (expandedEl) return; // large takes priority
			wrapper.classList.add('hovering');
		};

		const onLeaveSmall = () => {
			wrapper.classList.remove('hovering');
		};

		// Attach listeners
		document.querySelectorAll(LARGE_SELECTORS).forEach(el => {
			el.addEventListener('mouseenter', onEnterLarge);
			el.addEventListener('mouseleave', onLeaveLarge);
		});

		document.querySelectorAll(SMALL_SELECTORS).forEach(el => {
			el.addEventListener('mouseenter', onEnterSmall);
			el.addEventListener('mouseleave', onLeaveSmall);
		});

		document.addEventListener('mousemove', move, { passive: true });

		resetCorners(false);

		return () => {
			cancelAnimationFrame(raf);
			document.body.classList.remove('has-custom-cursor');
			document.removeEventListener('mousemove', move);
		};
	});
</script>

<div bind:this={wrapper} class="tcw" aria-hidden="true">
	<div class="tcd"></div>
	<div class="tcc tl"></div>
	<div class="tcc tr"></div>
	<div class="tcc br"></div>
	<div class="tcc bl"></div>
	<div class="expand-glow"></div>
</div>

<style>
	:global(body.has-custom-cursor),
	:global(body.has-custom-cursor *) { cursor: none !important; }

	.tcw {
		position: fixed;
		top: 0; left: 0;
		width: 0; height: 0;
		pointer-events: none;
		z-index: 99999;
		transform: translate(-50%, -50%);
		opacity: 0;
	}

	/* Center dot */
	.tcd {
		position: absolute;
		left: 50%; top: 50%;
		width: 5px; height: 5px;
		background: #22c55e;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 10px #22c55ecc, 0 0 20px #22c55e66;
		transition: opacity 0.2s ease;
	}

	/* Corner brackets */
	.tcc {
		position: absolute;
		left: 50%; top: 50%;
		width: 13px; height: 13px;
		border: 2px solid #22c55e;
		filter: drop-shadow(0 0 3px rgba(34,197,94,.7));
		transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.tl { transform: translate(-19.5px, -19.5px); border-right: none; border-bottom: none; }
	.tr { transform: translate(6.5px, -19.5px);  border-left: none;  border-bottom: none; }
	.br { transform: translate(6.5px, 6.5px);    border-left: none;  border-top: none; }
	.bl { transform: translate(-19.5px, 6.5px);  border-right: none; border-top: none; }

	/* Small hover (buttons/links) */
	.tcw.hovering .tcc { width: 18px; height: 18px; }
	.tcw.hovering .tl { transform: translate(-22px, -22px); }
	.tcw.hovering .tr { transform: translate(4px, -22px); }
	.tcw.hovering .br { transform: translate(4px, 4px); }
	.tcw.hovering .bl { transform: translate(-22px, 4px); }

	/* Expand glow — visible when framing a large element */
	.expand-glow {
		position: absolute;
		left: 50%; top: 50%;
		transform: translate(-50%, -50%);
		width: 0; height: 0;
		background: radial-gradient(ellipse at center, rgba(34,197,94,0.06) 0%, transparent 70%);
		border-radius: 8px;
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.tcw.expanded .expand-glow {
		opacity: 1;
		/* Size is set dynamically via JS if needed, but the glow radiates from center */
		width: 300px;
		height: 300px;
	}
</style>
