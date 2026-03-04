<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		type: 'trading' | 'protein' | 'openworld' | 'arcade';
	}

	let { type }: Props = $props();

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let destroyed = false;
		let animationId: number;
		const isMobile = window.innerWidth < 768;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio, 2);
			canvas.width = canvas.offsetWidth * dpr;
			canvas.height = canvas.offsetHeight * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		resize();
		window.addEventListener('resize', resize, { passive: true });

		const w = () => canvas.offsetWidth;
		const h = () => canvas.offsetHeight;

		if (type === 'trading') {
			initTrading(ctx, w, h, isMobile, () => destroyed, (id: number) => { animationId = id; });
		} else if (type === 'protein') {
			initProtein(ctx, w, h, isMobile, () => destroyed, (id: number) => { animationId = id; });
		} else if (type === 'openworld') {
			initOpenWorld(ctx, w, h, isMobile, () => destroyed, (id: number) => { animationId = id; });
		} else if (type === 'arcade') {
			initArcade(ctx, w, h, isMobile, () => destroyed, (id: number) => { animationId = id; });
		}

		return () => {
			destroyed = true;
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', resize);
		};
	});

	function initTrading(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean,
		isDestroyed: () => boolean,
		setId: (id: number) => void
	) {
		const dataPoints: number[] = [];
		const maxPoints = isMobile ? 60 : 120;
		let time = 0;
		const particles: { x: number; y: number; vy: number; alpha: number; }[] = [];

		// Seed initial data with bigger swings
		let val = 0.5;
		for (let i = 0; i < maxPoints; i++) {
			val += (Math.random() - 0.48) * 0.08;
			val = Math.max(0.05, Math.min(0.95, val));
			dataPoints.push(val);
		}

		function animate() {
			if (isDestroyed()) return;
			setId(requestAnimationFrame(animate));
			time++;

			const cw = w();
			const ch = h();
			ctx.clearRect(0, 0, cw, ch);

			// Update price — much bigger amplitude swings
			const prevVal = dataPoints[dataPoints.length - 1];
			let newVal = prevVal + (Math.random() - 0.48) * 0.08;
			newVal = Math.max(0.05, Math.min(0.95, newVal));
			dataPoints.push(newVal);
			if (dataPoints.length > maxPoints) dataPoints.shift();

			// Spawn particles on peaks
			if (newVal > prevVal + 0.02) {
				const pCount = isMobile ? 2 : 4;
				for (let j = 0; j < pCount; j++) {
					particles.push({
						x: cw,
						y: (1 - newVal) * ch,
						vy: -Math.random() * 2 - 0.5,
						alpha: 1
					});
				}
			}

			// Draw candlestick-like bars
			const barWidth = cw / maxPoints;
			for (let i = 1; i < dataPoints.length; i++) {
				const x = i * barWidth;
				const open = dataPoints[i - 1];
				const close = dataPoints[i];
				const top = Math.min(open, close);
				const bottom = Math.max(open, close);
				const isUp = close >= open;

				ctx.fillStyle = isUp ? 'rgba(74, 222, 128, 0.15)' : 'rgba(74, 222, 128, 0.08)';
				ctx.fillRect(x - barWidth * 0.3, (1 - bottom) * ch, barWidth * 0.6, (bottom - top) * ch + 1);
			}

			// Draw line
			ctx.beginPath();
			ctx.strokeStyle = '#4ade80';
			ctx.lineWidth = 2;
			ctx.shadowColor = '#4ade80';
			ctx.shadowBlur = 8;
			for (let i = 0; i < dataPoints.length; i++) {
				const x = (i / (maxPoints - 1)) * cw;
				const y = (1 - dataPoints[i]) * ch;
				if (i === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.stroke();
			ctx.shadowBlur = 0;

			// Fill under line
			ctx.lineTo(cw, ch);
			ctx.lineTo(0, ch);
			ctx.closePath();
			ctx.fillStyle = 'rgba(74, 222, 128, 0.05)';
			ctx.fill();

			// Particles
			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				p.y += p.vy;
				p.alpha -= 0.02;
				if (p.alpha <= 0) { particles.splice(i, 1); continue; }
				ctx.beginPath();
				ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(74, 222, 128, ${p.alpha})`;
				ctx.fill();
			}
		}

		animate();
	}

	function initProtein(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean,
		isDestroyed: () => boolean,
		setId: (id: number) => void
	) {
		const nodeCount = isMobile ? 16 : 24;
		let angle = 0;

		function animate() {
			if (isDestroyed()) return;
			setId(requestAnimationFrame(animate));
			angle += 0.012;

			const cw = w();
			const ch = h();
			const cx = cw / 2;
			const cy = ch / 2;
			ctx.clearRect(0, 0, cw, ch);

			const helixRadius = Math.min(cw, ch) * 0.18;
			const helixLength = cw * 0.7;
			const startX = (cw - helixLength) / 2;
			const baseR = isMobile ? 4 : 6;

			interface HelixNode { x: number; y: number; z: number; r: number; strand: number; index: number; }
			const allNodes: HelixNode[] = [];

			// Generate two strands offset by π
			for (let strand = 0; strand < 2; strand++) {
				const phaseOffset = strand * Math.PI;
				for (let i = 0; i < nodeCount; i++) {
					const t = (i / nodeCount) * Math.PI * 4 + angle + phaseOffset;
					const xPos = startX + (i / nodeCount) * helixLength;
					const yOffset = Math.cos(t) * helixRadius;
					const zVal = Math.sin(t) * helixRadius;

					const perspective = 1 + zVal / (helixRadius * 3);
					const screenY = cy + yOffset * perspective;

					allNodes.push({
						x: xPos,
						y: screenY,
						z: zVal,
						r: baseR * perspective,
						strand,
						index: i
					});
				}
			}

			// Draw rungs (base pairs) connecting the two strands
			for (let i = 0; i < nodeCount; i++) {
				const n1 = allNodes[i]; // strand 0
				const n2 = allNodes[nodeCount + i]; // strand 1
				const avgZ = (n1.z + n2.z) / 2;
				const alpha = 0.15 + (avgZ / helixRadius + 1) * 0.15;
				ctx.beginPath();
				ctx.moveTo(n1.x, n1.y);
				ctx.lineTo(n2.x, n2.y);
				ctx.strokeStyle = `rgba(74, 222, 128, ${Math.max(0.05, alpha)})`;
				ctx.lineWidth = 1;
				ctx.stroke();
			}

			// Draw strand connections and nodes, sorted by z for depth
			for (let strand = 0; strand < 2; strand++) {
				const offset = strand * nodeCount;
				const strandColor = strand === 0 ? [74, 222, 128] : [134, 239, 172]; // #4ade80 vs #86efac

				// Draw connections between consecutive nodes on this strand
				for (let i = 0; i < nodeCount - 1; i++) {
					const a = allNodes[offset + i];
					const b = allNodes[offset + i + 1];
					const avgZ = (a.z + b.z) / 2;
					const alpha = 0.3 + (avgZ / helixRadius + 1) * 0.25;
					ctx.beginPath();
					ctx.moveTo(a.x, a.y);
					ctx.lineTo(b.x, b.y);
					ctx.strokeStyle = `rgba(${strandColor[0]}, ${strandColor[1]}, ${strandColor[2]}, ${Math.max(0.1, alpha)})`;
					ctx.lineWidth = 2;
					ctx.stroke();
				}
			}

			// Sort all nodes by z for proper depth rendering
			const sortedNodes = [...allNodes].sort((a, b) => a.z - b.z);

			// Draw nodes
			for (const node of sortedNodes) {
				const strandColor = node.strand === 0 ? [74, 222, 128] : [134, 239, 172];
				const alpha = 0.4 + (node.z / helixRadius + 1) * 0.3;
				ctx.beginPath();
				ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${strandColor[0]}, ${strandColor[1]}, ${strandColor[2]}, ${Math.max(0.2, Math.min(1, alpha))})`;
				ctx.fill();

				// Glow on foreground nodes
				if (node.z > 0) {
					ctx.shadowColor = `rgba(${strandColor[0]}, ${strandColor[1]}, ${strandColor[2]}, 0.5)`;
					ctx.shadowBlur = 6;
					ctx.fill();
					ctx.shadowBlur = 0;
				}
			}
		}

		animate();
	}

	function initOpenWorld(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean,
		isDestroyed: () => boolean,
		setId: (id: number) => void
	) {
		let time = 0;
		const cols = isMobile ? 10 : 16;
		const rows = isMobile ? 10 : 14;

		// Pre-generate terrain heights for a larger map
		const mapSize = 64;
		const terrainMap: number[][] = [];
		for (let r = 0; r < mapSize; r++) {
			terrainMap[r] = [];
			for (let c = 0; c < mapSize; c++) {
				const base = Math.sin(r * 0.3 + c * 0.5) * 0.4 +
							 Math.sin(c * 0.7 + r * 0.2) * 0.3 +
							 Math.sin(r * 0.1 + c * 0.1) * 0.3;
				// Some tall structures (trees/buildings)
				const isTall = Math.sin(r * 2.7 + c * 3.1) > 0.7;
				terrainMap[r][c] = base + (isTall ? 2.5 : 0);
			}
		}

		function animate() {
			if (isDestroyed()) return;
			setId(requestAnimationFrame(animate));
			time += 0.015;

			const cw = w();
			const ch = h();
			ctx.clearRect(0, 0, cw, ch);

			// Sky gradient at top
			const skyH = ch * 0.25;
			const skyGrad = ctx.createLinearGradient(0, 0, 0, skyH);
			skyGrad.addColorStop(0, 'rgba(22, 163, 74, 0.12)');
			skyGrad.addColorStop(0.5, 'rgba(74, 222, 128, 0.06)');
			skyGrad.addColorStop(1, 'transparent');
			ctx.fillStyle = skyGrad;
			ctx.fillRect(0, 0, cw, skyH);

			// Horizon line
			const horizonY = ch * 0.3;
			ctx.strokeStyle = 'rgba(74, 222, 128, 0.15)';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(0, horizonY);
			ctx.lineTo(cw, horizonY);
			ctx.stroke();

			// Perspective ground plane — blocks scroll toward viewer
			const vanishX = cw / 2;
			const vanishY = horizonY;
			const scrollOffset = time * 2;

			// Draw from far to near (back to front)
			for (let r = 0; r < rows; r++) {
				const depth = r / rows; // 0 = far, 1 = near
				const perspFactor = 0.05 + depth * 0.95; // Far rows are tiny, near rows are large

				// Y position: interpolate from horizon to bottom
				const rowY = vanishY + (ch - vanishY) * depth;
				const rowH = ((ch - vanishY) / rows) * perspFactor * 1.2;

				// Width narrows toward vanishing point
				const rowWidth = cw * perspFactor;
				const rowStartX = vanishX - rowWidth / 2;
				const cellW = rowWidth / cols;

				for (let c = 0; c < cols; c++) {
					// Scrolling: offset the map lookup
					const mapR = Math.floor((r + scrollOffset) % mapSize);
					const mapC = (c + Math.floor(Math.sin(time * 0.2) * 2) + mapSize) % mapSize;
					const terrainH = terrainMap[Math.abs(mapR) % mapSize][Math.abs(mapC) % mapSize];

					const blockH = terrainH * rowH * 0.5;
					const brightness = 0.15 + depth * 0.35;
					const noise = (terrainH + 1) * 0.3;
					const alpha = brightness * noise;

					const x = rowStartX + c * cellW;
					const y = rowY - blockH;

					// Draw voxel top face
					ctx.fillStyle = `rgba(74, 222, 128, ${Math.max(0.04, Math.min(0.55, alpha))})`;
					ctx.fillRect(x + 1, y, cellW - 2, rowH + blockH);

					// Border
					ctx.strokeStyle = `rgba(74, 222, 128, ${Math.max(0.03, alpha * 0.3)})`;
					ctx.lineWidth = 0.5;
					ctx.strokeRect(x + 1, y, cellW - 2, rowH + blockH);

					// Highlight tall structures
					if (terrainH > 2) {
						ctx.fillStyle = `rgba(134, 239, 172, ${alpha * 0.3})`;
						ctx.fillRect(x + cellW * 0.2, y, cellW * 0.6, blockH * 0.4);
					}
				}
			}
		}

		animate();
	}

	function initArcade(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean,
		isDestroyed: () => boolean,
		setId: (id: number) => void
	) {
		let time = 0;
		const dotCount = isMobile ? 15 : 30;
		interface Dot {
			x: number; y: number; vx: number; vy: number; size: number;
		}
		const dots: Dot[] = [];
		for (let i = 0; i < dotCount; i++) {
			dots.push({
				x: Math.random() * 400,
				y: Math.random() * 200,
				vx: (Math.random() - 0.5) * 2,
				vy: (Math.random() - 0.5) * 2,
				size: Math.random() * 3 + 2
			});
		}

		// Pac-man style character
		let pacX = 50;
		let pacDir = 1;

		function animate() {
			if (isDestroyed()) return;
			setId(requestAnimationFrame(animate));
			time += 0.03;

			const cw = w();
			const ch = h();
			ctx.clearRect(0, 0, cw, ch);

			// Move pac
			pacX += pacDir * 1.5;
			if (pacX > cw - 20) pacDir = -1;
			if (pacX < 20) pacDir = 1;

			const mouthAngle = Math.abs(Math.sin(time * 3)) * 0.4;

			// Draw pac-man
			ctx.beginPath();
			ctx.arc(pacX, ch / 2, 14, mouthAngle + (pacDir < 0 ? Math.PI : 0), Math.PI * 2 - mouthAngle + (pacDir < 0 ? Math.PI : 0));
			ctx.lineTo(pacX, ch / 2);
			ctx.closePath();
			ctx.fillStyle = '#4ade80';
			ctx.shadowColor = '#4ade80';
			ctx.shadowBlur = 12;
			ctx.fill();
			ctx.shadowBlur = 0;

			// Draw dots
			for (const d of dots) {
				ctx.beginPath();
				ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(74, 222, 128, ${0.3 + Math.sin(time + d.x) * 0.2})`;
				ctx.fill();
			}

			// Grid lines
			ctx.strokeStyle = 'rgba(74, 222, 128, 0.04)';
			ctx.lineWidth = 0.5;
			for (let x = 0; x < cw; x += 30) {
				ctx.beginPath();
				ctx.moveTo(x, 0);
				ctx.lineTo(x, ch);
				ctx.stroke();
			}
			for (let y = 0; y < ch; y += 30) {
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(cw, y);
				ctx.stroke();
			}
		}

		animate();
	}
</script>

<div class="game-animation">
	<canvas bind:this={canvas} class="game-canvas"></canvas>
</div>

<style>
	.game-animation {
		width: 100%;
		height: 200px;
		position: relative;
		overflow: hidden;
		border-radius: 12px 12px 0 0;
	}

	.game-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		background: transparent;
	}
</style>
