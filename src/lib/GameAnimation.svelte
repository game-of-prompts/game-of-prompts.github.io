<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		type: 'trading' | 'protein' | 'openworld' | 'arcade' | 'poker' | 'resource' | 'payattempt' | 'multichain';
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
		} else if (type === 'poker') {
			initPoker(ctx, w, h, isMobile, () => destroyed, (id: number) => { animationId = id; });
		} else if (type === 'resource') {
			initResource(ctx, w, h, isMobile, () => destroyed, (id: number) => { animationId = id; });
		} else if (type === 'payattempt') {
			initPayAttempt(ctx, w, h, isMobile, () => destroyed, (id: number) => { animationId = id; });
		} else if (type === 'multichain') {
			initMultichain(ctx, w, h, isMobile, () => destroyed, (id: number) => { animationId = id; });
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
		let lastUpdate = 0;
		const TARGET_INTERVAL = 33; // ~30fps cap for consistent speed
		const particles: { x: number; y: number; vy: number; alpha: number; }[] = [];

		// Seed initial data with bigger swings
		let val = 0.5;
		for (let i = 0; i < maxPoints; i++) {
			val += (Math.random() - 0.48) * 0.12;
			val = Math.max(0.05, Math.min(0.95, val));
			dataPoints.push(val);
		}

		function animate(timestamp?: number) {
			if (isDestroyed()) return;
			setId(requestAnimationFrame(animate));

			// Time accumulator: only update when 33ms have passed (consistent 30fps)
			const now = timestamp || performance.now();
			if (now - lastUpdate < TARGET_INTERVAL) return;
			lastUpdate = now;
			time++;

			const cw = w();
			const ch = h();
			ctx.clearRect(0, 0, cw, ch);

			// Update price — slow dramatic market swings
			const prevVal = dataPoints[dataPoints.length - 1];
			let newVal = prevVal + (Math.random() - 0.48) * 0.12;
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

	function initPoker(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean,
		isDestroyed: () => boolean,
		setId: (id: number) => void
	) {
		let time = 0;
		const cardCount = isMobile ? 4 : 7;
		interface Card { x: number; targetX: number; y: number; targetY: number; rotation: number; targetRotation: number; width: number; height: number; delay: number; flipped: boolean; flipProgress: number; suit: string; value: string; }
		const suits = ['♠', '♥', '♦', '♣'];
		const values = ['A', 'K', 'Q', 'J', '10', '9'];
		const cards: Card[] = [];
		interface Chip { x: number; y: number; r: number; color: string; offsetY: number; speed: number; }
		const chips: Chip[] = [];

		// Cards will be positioned relative to canvas width on first frame
		let cardsInitialized = false;

		const chipColors = ['rgba(74, 222, 128, 0.6)', 'rgba(34, 197, 94, 0.5)', 'rgba(134, 239, 172, 0.4)'];
		for (let i = 0; i < (isMobile ? 6 : 12); i++) {
			chips.push({ x: Math.random() * 0.85 + 0.05, y: Math.random() * 0.2 + 0.7, r: Math.random() * 6 + 4, color: chipColors[i % 3], offsetY: 0, speed: Math.random() * 0.02 + 0.01 });
		}

		let allFlipped = false;

		function animate() {
			if (isDestroyed()) return;
			setId(requestAnimationFrame(animate));
			time++;

			const cw = w();
			const ch = h();
			ctx.clearRect(0, 0, cw, ch);

			// Initialize cards on first frame when we know canvas size
			if (!cardsInitialized) {
				cardsInitialized = true;
				for (let i = 0; i < cardCount; i++) {
					const spread = cw * 0.8 / cardCount;
					cards.push({
						x: cw * 0.75, targetX: cw * 0.1 + i * spread,
						y: -60, targetY: ch * 0.25 + Math.sin(i * 0.8) * 20,
						rotation: (Math.random() - 0.5) * 0.3, targetRotation: (Math.random() - 0.5) * 0.2,
						width: isMobile ? 42 : 55, height: isMobile ? 62 : 80,
						delay: i * 30, flipped: false, flipProgress: 0,
						suit: suits[Math.floor(Math.random() * suits.length)],
						value: values[Math.floor(Math.random() * values.length)]
					});
				}
			}

			// Green felt background gradient
			const feltGrad = ctx.createRadialGradient(cw / 2, ch / 2, 0, cw / 2, ch / 2, cw * 0.6);
			feltGrad.addColorStop(0, 'rgba(22, 101, 52, 0.15)');
			feltGrad.addColorStop(1, 'rgba(5, 46, 22, 0.08)');
			ctx.fillStyle = feltGrad;
			ctx.fillRect(0, 0, cw, ch);

			// Felt border
			ctx.strokeStyle = 'rgba(74, 222, 128, 0.1)';
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.roundRect(20, 10, cw - 40, ch - 20, 20);
			ctx.stroke();

			// Check if all cards are flipped
			if (!allFlipped && cards.length > 0 && cards.every(c => c.flipProgress >= 1)) {
				allFlipped = true;
			}

			// Animate and draw cards
			for (let ci = 0; ci < cards.length; ci++) {
				const card = cards[ci];
				if (time < card.delay) continue;
				const t = Math.min(1, (time - card.delay) / 40);
				card.x += (card.targetX - card.x) * 0.08;
				card.y += (card.targetY - card.y) * 0.08;
				card.rotation += (card.targetRotation - card.rotation) * 0.05;

				if (t > 0.8 && !card.flipped) card.flipped = true;
				if (card.flipped && card.flipProgress < 1) card.flipProgress = Math.min(1, card.flipProgress + 0.03);

				// Pulse glow on last card (best card) after all flipped
				const isLastCard = ci === cards.length - 1;
				if (allFlipped && isLastCard) {
					const glowPulse = Math.sin(time * 0.06) * 0.3 + 0.5;
					ctx.save();
					ctx.shadowColor = `rgba(74, 222, 128, ${glowPulse})`;
					ctx.shadowBlur = 20 + glowPulse * 15;
					ctx.fillStyle = 'rgba(74, 222, 128, 0.02)';
					ctx.beginPath();
					ctx.roundRect(card.x - 2, card.y - 2, card.width + 4, card.height + 4, 6);
					ctx.fill();
					ctx.restore();
				}

				ctx.save();
				ctx.translate(card.x + card.width / 2, card.y + card.height / 2);
				ctx.rotate(card.rotation);
				const scaleX = Math.abs(Math.cos(card.flipProgress * Math.PI));

				ctx.scale(Math.max(0.01, scaleX), 1);

				// Card body
				ctx.fillStyle = card.flipProgress > 0.5 ? 'rgba(20, 20, 20, 0.9)' : 'rgba(74, 222, 128, 0.15)';
				ctx.strokeStyle = 'rgba(74, 222, 128, 0.3)';
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.roundRect(-card.width / 2, -card.height / 2, card.width, card.height, 4);
				ctx.fill();
				ctx.stroke();

				if (card.flipProgress > 0.5) {
					ctx.fillStyle = card.suit === '♥' || card.suit === '♦' ? 'rgba(74, 222, 128, 0.9)' : 'rgba(134, 239, 172, 0.8)';
					ctx.font = `bold ${isMobile ? 10 : 13}px var(--font-mono), monospace`;
					ctx.textAlign = 'center';
					ctx.fillText(card.value, 0, -8);
					ctx.font = `${isMobile ? 14 : 18}px serif`;
					ctx.fillText(card.suit, 0, 14);
				}
				ctx.restore();
			}

			// Chips — positioned relative to canvas
			for (const chip of chips) {
				chip.offsetY = Math.sin(time * chip.speed) * 3;
				ctx.beginPath();
				ctx.arc(chip.x * cw, chip.y * ch + chip.offsetY, chip.r, 0, Math.PI * 2);
				ctx.fillStyle = chip.color;
				ctx.fill();
				ctx.strokeStyle = 'rgba(74, 222, 128, 0.3)';
				ctx.lineWidth = 1;
				ctx.stroke();
			}
		}

		animate();
	}

	function initResource(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean,
		isDestroyed: () => boolean,
		setId: (id: number) => void
	) {
		let time = 0;
		const gaugeCount = isMobile ? 3 : 5;
		const labels = ['CPU', 'RAM', 'GPU', 'NET', 'DISK'];
		const gaugeValues: number[] = Array(gaugeCount).fill(0);
		const gaugeTargets: number[] = Array(gaugeCount).fill(0);
		let throttled = false;
		let throttleTimer = 0;

		function animate() {
			if (isDestroyed()) return;
			setId(requestAnimationFrame(animate));
			time++;

			const cw = w();
			const ch = h();
			ctx.clearRect(0, 0, cw, ch);

			// Update targets periodically
			if (time % 60 === 0) {
				for (let i = 0; i < gaugeCount; i++) {
					gaugeTargets[i] = Math.random() * 0.9 + 0.1;
				}
				// Occasionally throttle (value > 0.85)
				const maxVal = Math.max(...gaugeTargets);
				if (maxVal > 0.8) { throttled = true; throttleTimer = 90; }
			}
			if (throttled) {
				throttleTimer--;
				if (throttleTimer <= 0) { throttled = false; for (let i = 0; i < gaugeCount; i++) gaugeTargets[i] *= 0.5; }
			}

			// Lerp gauge values
			for (let i = 0; i < gaugeCount; i++) {
				gaugeValues[i] += (gaugeTargets[i] - gaugeValues[i]) * 0.04;
			}

			const gaugeWidth = (cw - 60) / gaugeCount;
			const gaugeH = ch * 0.55;
			const baseY = ch * 0.85;

			for (let i = 0; i < gaugeCount; i++) {
				const x = 30 + i * gaugeWidth + gaugeWidth * 0.15;
				const bw = gaugeWidth * 0.7;
				const fillH = gaugeH * gaugeValues[i];
				const isHot = gaugeValues[i] > 0.75;

				// Background bar
				ctx.fillStyle = 'rgba(74, 222, 128, 0.05)';
				ctx.fillRect(x, baseY - gaugeH, bw, gaugeH);

				// Fill bar
				const grad = ctx.createLinearGradient(0, baseY, 0, baseY - fillH);
				if (isHot) {
					const pulse = Math.sin(time * 0.1) * 0.15 + 0.85;
					grad.addColorStop(0, `rgba(74, 222, 128, ${0.6 * pulse})`);
					grad.addColorStop(1, `rgba(134, 239, 172, ${0.9 * pulse})`);
				} else {
					grad.addColorStop(0, 'rgba(74, 222, 128, 0.3)');
					grad.addColorStop(1, 'rgba(74, 222, 128, 0.6)');
				}
				ctx.fillStyle = grad;
				ctx.fillRect(x, baseY - fillH, bw, fillH);

				// Border
				ctx.strokeStyle = 'rgba(74, 222, 128, 0.15)';
				ctx.lineWidth = 1;
				ctx.strokeRect(x, baseY - gaugeH, bw, gaugeH);

				// Label
				ctx.fillStyle = 'rgba(74, 222, 128, 0.6)';
				ctx.font = `${isMobile ? 9 : 11}px monospace`;
				ctx.textAlign = 'center';
				ctx.fillText(labels[i], x + bw / 2, baseY + 14);

				// Percentage
				ctx.fillStyle = isHot ? 'rgba(134, 239, 172, 0.9)' : 'rgba(74, 222, 128, 0.7)';
				ctx.font = `bold ${isMobile ? 10 : 12}px monospace`;
				ctx.fillText(`${Math.round(gaugeValues[i] * 100)}%`, x + bw / 2, baseY - gaugeH - 8);

				// Threshold line at 80%
				const threshY = baseY - gaugeH * 0.8;
				ctx.strokeStyle = 'rgba(134, 239, 172, 0.2)';
				ctx.setLineDash([3, 3]);
				ctx.beginPath();
				ctx.moveTo(x, threshY);
				ctx.lineTo(x + bw, threshY);
				ctx.stroke();
				ctx.setLineDash([]);
			}

			// Horizontal scan lines (terminal/monitor feel)
			for (let sy = 0; sy < ch; sy += 4) {
				ctx.fillStyle = 'rgba(74, 222, 128, 0.03)';
				ctx.fillRect(0, sy, cw, 1);
			}

			// Throttle warning
			if (throttled) {
				const flash = Math.sin(time * 0.15) > 0;
				if (flash) {
					ctx.fillStyle = 'rgba(134, 239, 172, 0.9)';
					ctx.font = `bold ${isMobile ? 14 : 18}px monospace`;
					ctx.textAlign = 'center';
					ctx.fillText('! THROTTLING !', cw / 2, 22);
				}
			}
		}

		animate();
	}

	function initPayAttempt(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean,
		isDestroyed: () => boolean,
		setId: (id: number) => void
	) {
		let time = 0;
		interface Coin { x: number; y: number; vy: number; vx: number; r: number; alpha: number; rotation: number; rotSpeed: number; }
		const coins: Coin[] = [];
		interface Ripple { x: number; y: number; radius: number; maxRadius: number; alpha: number; }
		const ripples: Ripple[] = [];
		let spawnTimer = 0;
		let attemptCount = 0;
		const slotX = 0.5; // center of screen ratio
		const slotWidth = isMobile ? 60 : 80;

		function spawnCoin(cw: number) {
			const startX = cw * 0.2 + Math.random() * cw * 0.6;
			coins.push({
				x: startX, y: -10,
				vy: 1.5 + Math.random(), vx: (cw * slotX - startX) * 0.01,
				r: isMobile ? 6 : 9,
				alpha: 1, rotation: 0,
				rotSpeed: (Math.random() - 0.5) * 0.1
			});
			attemptCount++;
		}

		function animate() {
			if (isDestroyed()) return;
			setId(requestAnimationFrame(animate));
			time++;

			const cw = w();
			const ch = h();
			ctx.clearRect(0, 0, cw, ch);

			// Spawn coins periodically
			spawnTimer++;
			if (spawnTimer > 45) { spawnCoin(cw); spawnTimer = 0; }

			// Slot machine / deposit area
			const sx = cw * slotX - slotWidth / 2;
			const sy = ch * 0.6;
			ctx.strokeStyle = 'rgba(74, 222, 128, 0.3)';
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.roundRect(sx, sy, slotWidth, 30, 6);
			ctx.stroke();
			ctx.fillStyle = 'rgba(74, 222, 128, 0.05)';
			ctx.fill();

			// Label
			ctx.fillStyle = 'rgba(74, 222, 128, 0.5)';
			ctx.font = `${isMobile ? 8 : 10}px monospace`;
			ctx.textAlign = 'center';
			ctx.fillText('DEPOSIT', cw * slotX, sy + 20);

			// Attempt counter
			ctx.fillStyle = 'rgba(134, 239, 172, 0.7)';
			ctx.font = `bold ${isMobile ? 12 : 15}px monospace`;
			ctx.fillText(`Attempts: ${attemptCount}`, cw * slotX, ch * 0.9);

			// Token cost display
			ctx.fillStyle = 'rgba(74, 222, 128, 0.4)';
			ctx.font = `${isMobile ? 9 : 11}px monospace`;
			ctx.fillText('1 ERG / attempt', cw * slotX, ch * 0.9 + 18);

			// Draw ripples
			for (let i = ripples.length - 1; i >= 0; i--) {
				const r = ripples[i];
				r.radius += 1.5;
				r.alpha -= 0.02;
				if (r.alpha <= 0 || r.radius > r.maxRadius) { ripples.splice(i, 1); continue; }
				ctx.beginPath();
				ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
				ctx.strokeStyle = `rgba(74, 222, 128, ${r.alpha})`;
				ctx.lineWidth = 1.5;
				ctx.stroke();
			}

			// Update & draw coins
			for (let i = coins.length - 1; i >= 0; i--) {
				const c = coins[i];
				c.vy += 0.05;
				c.y += c.vy;
				c.x += c.vx;
				c.rotation += c.rotSpeed;

				// Check if coin reached deposit
				if (c.y > sy && Math.abs(c.x - cw * slotX) < slotWidth / 2) {
					// Spawn ripple on first contact
					if (c.alpha >= 0.95) {
						ripples.push({ x: c.x, y: sy + 15, radius: 4, maxRadius: 35, alpha: 0.6 });
					}
					c.alpha -= 0.05;
					c.vy *= 0.8;
				}

				if (c.alpha <= 0 || c.y > ch + 20) { coins.splice(i, 1); continue; }

				ctx.save();
				ctx.translate(c.x, c.y);
				ctx.rotate(c.rotation);
				const scaleX = Math.abs(Math.cos(time * 0.05 + i));

				// Coin body (ellipse for 3D effect)
				ctx.beginPath();
				ctx.ellipse(0, 0, c.r * Math.max(0.3, scaleX), c.r, 0, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(74, 222, 128, ${c.alpha * 0.7})`;
				ctx.fill();
				ctx.strokeStyle = `rgba(134, 239, 172, ${c.alpha * 0.5})`;
				ctx.lineWidth = 1;
				ctx.stroke();

				// Coin symbol — E for Ergo
				if (scaleX > 0.5) {
					ctx.fillStyle = `rgba(5, 5, 5, ${c.alpha * 0.8})`;
					ctx.font = `bold ${isMobile ? 7 : 9}px monospace`;
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillText('E', 0, 0);
				}
				ctx.restore();
			}
		}

		animate();
	}

	function initMultichain(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean,
		isDestroyed: () => boolean,
		setId: (id: number) => void
	) {
		let time = 0;
		const nodeCount = isMobile ? 5 : 8;
		interface ChainNode { x: number; y: number; r: number; label: string; pulseOffset: number; connections: number[]; }
		const chainLabels = ['ERGO', 'ETH', 'ADA', 'BTC', 'DOT', 'SOL', 'AVAX', 'MATIC'];
		const nodes: ChainNode[] = [];

		// Position nodes in a rough circle
		for (let i = 0; i < nodeCount; i++) {
			const angle = (i / nodeCount) * Math.PI * 2 - Math.PI / 2;
			const rx = isMobile ? 100 : 160;
			const ry = isMobile ? 55 : 70;
			nodes.push({
				x: 0.5 + Math.cos(angle) * rx / 400, // ratio of width
				y: 0.5 + Math.sin(angle) * ry / 200, // ratio of height
				r: i === 0 ? (isMobile ? 16 : 22) : (isMobile ? 10 : 14), // Ergo is bigger
				label: chainLabels[i],
				pulseOffset: Math.random() * Math.PI * 2,
				connections: []
			});
		}

		// Connect all nodes to Ergo (index 0) and some random peer connections
		for (let i = 1; i < nodeCount; i++) {
			nodes[0].connections.push(i);
			nodes[i].connections.push(0);
		}
		// A few peer connections
		for (let i = 1; i < nodeCount; i++) {
			const peer = 1 + Math.floor(Math.random() * (nodeCount - 1));
			if (peer !== i && !nodes[i].connections.includes(peer)) {
				nodes[i].connections.push(peer);
			}
		}

		interface Packet { fromIdx: number; toIdx: number; progress: number; speed: number; }
		const packets: Packet[] = [];

		function animate() {
			if (isDestroyed()) return;
			setId(requestAnimationFrame(animate));
			time++;

			const cw = w();
			const ch = h();
			ctx.clearRect(0, 0, cw, ch);

			// Spawn packets occasionally
			if (time % 30 === 0) {
				const fromIdx = Math.floor(Math.random() * nodeCount);
				const conns = nodes[fromIdx].connections;
				if (conns.length > 0) {
					const toIdx = conns[Math.floor(Math.random() * conns.length)];
					packets.push({ fromIdx, toIdx, progress: 0, speed: 0.015 + Math.random() * 0.01 });
				}
			}

			// Draw connections
			const drawnEdges = new Set<string>();
			for (let i = 0; i < nodeCount; i++) {
				const n = nodes[i];
				for (const j of n.connections) {
					const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
					if (drawnEdges.has(key)) continue;
					drawnEdges.add(key);
					const m = nodes[j];
					ctx.beginPath();
					ctx.moveTo(n.x * cw, n.y * ch);
					ctx.lineTo(m.x * cw, m.y * ch);
					ctx.strokeStyle = 'rgba(74, 222, 128, 0.1)';
					ctx.lineWidth = 1;
					ctx.stroke();
				}
			}

			// Draw packets
			for (let i = packets.length - 1; i >= 0; i--) {
				const p = packets[i];
				p.progress += p.speed;
				if (p.progress >= 1) { packets.splice(i, 1); continue; }
				const from = nodes[p.fromIdx];
				const to = nodes[p.toIdx];
				const px = (from.x + (to.x - from.x) * p.progress) * cw;
				const py = (from.y + (to.y - from.y) * p.progress) * ch;
				ctx.beginPath();
				ctx.arc(px, py, 3, 0, Math.PI * 2);
				ctx.fillStyle = 'rgba(134, 239, 172, 0.9)';
				ctx.shadowColor = 'rgba(134, 239, 172, 0.6)';
				ctx.shadowBlur = 8;
				ctx.fill();
				ctx.shadowBlur = 0;
			}

			// Draw nodes
			for (let i = 0; i < nodeCount; i++) {
				const n = nodes[i];
				const pulse = Math.sin(time * 0.04 + n.pulseOffset) * 0.2 + 0.8;
				const nx = n.x * cw;
				const ny = n.y * ch;
				const isErgo = i === 0;

				// Glow
				if (isErgo) {
					ctx.beginPath();
					ctx.arc(nx, ny, n.r * 2, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(74, 222, 128, ${0.06 * pulse})`;
					ctx.fill();
				}

				// Node circle
				ctx.beginPath();
				ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
				ctx.fillStyle = isErgo
					? `rgba(74, 222, 128, ${0.3 * pulse})`
					: `rgba(74, 222, 128, ${0.15 * pulse})`;
				ctx.fill();
				ctx.strokeStyle = isErgo
					? `rgba(134, 239, 172, ${0.6 * pulse})`
					: `rgba(74, 222, 128, ${0.3 * pulse})`;
				ctx.lineWidth = isErgo ? 2 : 1;
				ctx.stroke();

				// Label
				ctx.fillStyle = `rgba(134, 239, 172, ${isErgo ? 0.9 : 0.6})`;
				ctx.font = `bold ${isErgo ? (isMobile ? 8 : 10) : (isMobile ? 6 : 8)}px monospace`;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(n.label, nx, ny);
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
