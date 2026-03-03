<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		// Skip on touch/mobile
		if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
		if (window.matchMedia('(max-width: 768px)').matches) return;

		const wrapper = document.createElement('div');
		wrapper.id = 'gop-cursor';
		wrapper.innerHTML = `
			<div class="gc-dot"></div>
			<div class="gc-corner gc-tl"></div>
			<div class="gc-corner gc-tr"></div>
			<div class="gc-corner gc-br"></div>
			<div class="gc-corner gc-bl"></div>
		`;
		wrapper.style.cssText = `
			position: fixed;
			top: 0; left: 0;
			width: 0; height: 0;
			pointer-events: none;
			z-index: 99999;
			transform: translate(-50%, -50%);
		`;

		// Inject styles
		const style = document.createElement('style');
		style.textContent = `
			body, body * { cursor: none !important; }
			#gop-cursor .gc-dot {
				position: absolute;
				left: 50%; top: 50%;
				width: 5px; height: 5px;
				background: #22c55e;
				border-radius: 50%;
				transform: translate(-50%, -50%);
				box-shadow: 0 0 10px rgba(34,197,94,0.8), 0 0 20px rgba(34,197,94,0.4);
			}
			#gop-cursor .gc-corner {
				position: absolute;
				left: 50%; top: 50%;
				width: 12px; height: 12px;
				border: 2px solid #22c55e;
				filter: drop-shadow(0 0 4px rgba(34,197,94,0.7));
				transition: width 0.15s, height 0.15s, transform 0.15s;
			}
			#gop-cursor .gc-tl { transform: translate(-150%, -150%); border-right: none; border-bottom: none; }
			#gop-cursor .gc-tr { transform: translate(50%, -150%); border-left: none; border-bottom: none; }
			#gop-cursor .gc-br { transform: translate(50%, 50%); border-left: none; border-top: none; }
			#gop-cursor .gc-bl { transform: translate(-150%, 50%); border-right: none; border-top: none; }
			#gop-cursor.hovering .gc-corner { width: 18px; height: 18px; }
			#gop-cursor.hovering .gc-tl { transform: translate(-175%, -175%); }
			#gop-cursor.hovering .gc-tr { transform: translate(75%, -175%); }
			#gop-cursor.hovering .gc-br { transform: translate(75%, 75%); }
			#gop-cursor.hovering .gc-bl { transform: translate(-175%, 75%); }
		`;

		document.head.appendChild(style);
		document.body.appendChild(wrapper);

		let raf: number;
		const onMove = (e: MouseEvent) => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				wrapper.style.left = e.clientX + 'px';
				wrapper.style.top = e.clientY + 'px';
			});
		};

		const onEnter = () => wrapper.classList.add('hovering');
		const onLeave = () => wrapper.classList.remove('hovering');

		document.addEventListener('mousemove', onMove, { passive: true });

		// Attach hover to interactive elements, re-scan on DOM changes
		const attachHover = () => {
			document.querySelectorAll('a, button, input, select, [role=button], .cursor-target').forEach(el => {
				el.addEventListener('mouseenter', onEnter);
				el.addEventListener('mouseleave', onLeave);
			});
		};
		attachHover();

		const obs = new MutationObserver(attachHover);
		obs.observe(document.body, { childList: true, subtree: true });

		return () => {
			cancelAnimationFrame(raf);
			document.removeEventListener('mousemove', onMove);
			obs.disconnect();
			wrapper.remove();
			style.remove();
		};
	});
</script>
