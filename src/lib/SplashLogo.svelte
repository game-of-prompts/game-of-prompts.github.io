<script lang="ts">
	// no JS needed
</script>

<div class="cyber-logo">
	<div class="scanline-overlay"></div>
	<div class="glitch-wrapper">
		<img src="/gop-logo-official.png" alt="Game of Prompts" class="logo-img" />
		<img src="/gop-logo-official.png" alt="" class="logo-img glitch-r" aria-hidden="true" />
		<img src="/gop-logo-official.png" alt="" class="logo-img glitch-b" aria-hidden="true" />
	</div>
	<div class="corner tl"></div>
	<div class="corner tr"></div>
	<div class="corner bl"></div>
	<div class="corner br"></div>
</div>

<style>
	.cyber-logo {
		position: relative;
		width: 300px;
		height: 300px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
		border-radius: 8px;
	}

	/* Invert + tint logo green for cyberpunk look */
	.logo-img {
		position: absolute;
		width: 260px;
		height: 260px;
		object-fit: contain;
		filter: invert(1) sepia(1) saturate(3) hue-rotate(95deg) brightness(1.1);
		mix-blend-mode: screen;
	}

	/* Glitch layers — offset RGB splits */
	.glitch-r {
		filter: invert(1) sepia(1) saturate(3) hue-rotate(95deg) brightness(1.1);
		mix-blend-mode: screen;
		opacity: 0.4;
		animation: glitch-r 4s infinite;
	}
	.glitch-b {
		filter: invert(1) sepia(1) saturate(2) hue-rotate(200deg) brightness(0.9);
		mix-blend-mode: screen;
		opacity: 0.25;
		animation: glitch-b 4s infinite;
	}

	@keyframes glitch-r {
		0%, 90%, 100% { transform: translate(0, 0); opacity: 0; }
		91% { transform: translate(-3px, 0); opacity: 0.4; }
		93% { transform: translate(3px, 1px); opacity: 0.35; }
		95% { transform: translate(0, 0); opacity: 0; }
	}
	@keyframes glitch-b {
		0%, 88%, 100% { transform: translate(0, 0); opacity: 0; }
		89% { transform: translate(3px, -1px); opacity: 0.25; }
		91% { transform: translate(-2px, 0); opacity: 0.2; }
		93% { transform: translate(0, 0); opacity: 0; }
	}

	/* Scanline overlay */
	.scanline-overlay {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 3px,
			rgba(0, 255, 100, 0.03) 3px,
			rgba(0, 255, 100, 0.03) 4px
		);
		pointer-events: none;
		z-index: 2;
		animation: scan 8s linear infinite;
	}
	@keyframes scan {
		0% { background-position: 0 0; }
		100% { background-position: 0 300px; }
	}

	/* HUD corner brackets */
	.corner {
		position: absolute;
		width: 16px;
		height: 16px;
		border-color: #22c55e;
		border-style: solid;
		opacity: 0.8;
	}
	.tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
	.tr { top: 8px; right: 8px; border-width: 2px 2px 0 0; }
	.bl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; }
	.br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

	/* Subtle pulse glow on the logo */
	.glitch-wrapper {
		position: relative;
		width: 260px;
		height: 260px;
		animation: logo-pulse 3s ease-in-out infinite;
		filter: drop-shadow(0 0 12px rgba(34, 197, 94, 0.6));
	}
	@keyframes logo-pulse {
		0%, 100% { filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.5)); }
		50% { filter: drop-shadow(0 0 22px rgba(34, 197, 94, 0.9)); }
	}
</style>
