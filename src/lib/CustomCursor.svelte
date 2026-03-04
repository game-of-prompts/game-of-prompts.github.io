<script lang="ts">
	import { onMount } from 'svelte';

	let wrapper: HTMLDivElement;

	onMount(() => {
		const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		if (isTouch || window.matchMedia('(max-width:768px)').matches) return;

		document.body.classList.add('has-custom-cursor');
		document.documentElement.classList.add('has-custom-cursor');

		const corners = {
			tl: wrapper.querySelector('.tl') as HTMLElement,
			tr: wrapper.querySelector('.tr') as HTMLElement,
			br: wrapper.querySelector('.br') as HTMLElement,
			bl: wrapper.querySelector('.bl') as HTMLElement,
		};
		const dot = wrapper.querySelector('.tcd') as HTMLElement;

		let raf: number;
		let curX = window.innerWidth / 2;
		let curY = window.innerHeight / 2;
		let cornersHidden = false;

		const CORNER_SIZE = 13;
		const PAD = CORNER_SIZE * 1.5;

		function setDefaultCorners(dur = '0.25s') {
			Object.values(corners).forEach(c => { c.style.transition = `all ${dur} cubic-bezier(0.16,1,0.3,1)`; });
			corners.tl.style.transform = `translate(-${PAD}px, -${PAD}px)`;
			corners.tr.style.transform = `translate(${PAD - CORNER_SIZE}px, -${PAD}px)`;
			corners.br.style.transform = `translate(${PAD - CORNER_SIZE}px, ${PAD - CORNER_SIZE}px)`;
			corners.bl.style.transform = `translate(-${PAD}px, ${PAD - CORNER_SIZE}px)`;
		}

		function showCursorCorners() {
			cornersHidden = false;
			Object.values(corners).forEach(c => { c.style.opacity = '1'; });
			dot.style.opacity = '1';
			setDefaultCorners();
		}

		function hideCursorCorners() {
			cornersHidden = true;
			Object.values(corners).forEach(c => { c.style.opacity = '0'; });
			dot.style.opacity = '0';
		}

		// Listen for hover corner transfer events
		const onHoverEnter = () => hideCursorCorners();
		const onHoverLeave = () => showCursorCorners();

		window.addEventListener('hoverCornerEnter', onHoverEnter);
		window.addEventListener('hoverCornerLeave', onHoverLeave);

		const onMove = (e: MouseEvent) => {
			cancelAnimationFrame(raf);
			curX = e.clientX;
			curY = e.clientY;
			raf = requestAnimationFrame(() => {
				wrapper.style.left = curX + 'px';
				wrapper.style.top = curY + 'px';
				wrapper.style.opacity = '1';
			});
		};

		document.addEventListener('mousemove', onMove, { passive: true });
		setDefaultCorners('0s');

		return () => {
			cancelAnimationFrame(raf);
			document.body.classList.remove('has-custom-cursor');
			document.documentElement.classList.remove('has-custom-cursor');
			document.removeEventListener('mousemove', onMove);
			window.removeEventListener('hoverCornerEnter', onHoverEnter);
			window.removeEventListener('hoverCornerLeave', onHoverLeave);
		};
	});
</script>

<div bind:this={wrapper} class="tcw" aria-hidden="true">
	<div class="tcd"></div>
	<div class="tcc tl"></div>
	<div class="tcc tr"></div>
	<div class="tcc br"></div>
	<div class="tcc bl"></div>
</div>

<style>
	:global(html.has-custom-cursor),
	:global(html.has-custom-cursor *),
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

	.tcc {
		position: absolute;
		left: 50%; top: 50%;
		width: 13px; height: 13px;
		border: 2px solid #22c55e;
		filter: drop-shadow(0 0 3px rgba(34,197,94,.6));
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* Default small bracket positions */
	.tl { transform: translate(-19.5px, -19.5px); border-right: none; border-bottom: none; }
	.tr { transform: translate(6.5px,  -19.5px);  border-left:  none; border-bottom: none; }
	.br { transform: translate(6.5px,   6.5px);   border-left:  none; border-top:    none; }
	.bl { transform: translate(-19.5px, 6.5px);   border-right: none; border-top:    none; }
</style>
