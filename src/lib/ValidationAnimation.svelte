<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		type: 'participation' | 'reveal' | 'validation' | 'verification' | 'winner';
		active?: boolean;
	}

	let { type }: Props = $props();

	let canvas: HTMLCanvasElement;
	let destroyed = false;
	let animationId: number;
	let started = false;

	onMount(() => {
		// Start animation when the canvas becomes visible
		const obs = new IntersectionObserver((entries) => {
			entries.forEach(e => {
				if (e.isIntersecting && !started) {
					started = true;
					startAnimation();
				}
			});
		}, { threshold: 0.2 });
		obs.observe(canvas);

		return () => {
			destroyed = true;
			if (animationId) cancelAnimationFrame(animationId);
			obs.disconnect();
		};
	});

	function startAnimation() {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

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

		if (type === 'participation') {
			initParticipation(ctx, w, h, isMobile);
		} else if (type === 'reveal') {
			initReveal(ctx, w, h, isMobile);
		} else if (type === 'validation') {
			initValidation(ctx, w, h, isMobile);
		} else if (type === 'verification') {
			initVerification(ctx, w, h, isMobile);
		} else if (type === 'winner') {
			initWinner(ctx, w, h, isMobile);
		}
	}

	/* ─── PARTICIPATION: Network nodes connecting with pulse ripples ─── */
	function initParticipation(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean
	) {
		const nodeCount = isMobile ? 12 : 20;
		interface Node { x: number; y: number; vx: number; vy: number; r: number; pulse: number; connected: boolean; connectTime: number; }
		interface Ripple { x: number; y: number; radius: number; alpha: number; }
		const nodes: Node[] = [];
		const ripples: Ripple[] = [];
		let time = 0;

		for (let i = 0; i < nodeCount; i++) {
			nodes.push({
				x: Math.random(),
				y: Math.random(),
				vx: (Math.random() - 0.5) * 0.001,
				vy: (Math.random() - 0.5) * 0.001,
				r: isMobile ? 3 : 4,
				pulse: Math.random() * Math.PI * 2,
				connected: false,
				connectTime: 30 + Math.random() * 120
			});
		}

		function animate() {
			if (destroyed) return;
			animationId = requestAnimationFrame(animate);
			time++;

			const cw = w();
			const ch = h();
			ctx.clearRect(0, 0, cw, ch);

			// Update nodes
			for (const n of nodes) {
				n.x += n.vx;
				n.y += n.vy;
				if (n.x < 0.05 || n.x > 0.95) n.vx *= -1;
				if (n.y < 0.05 || n.y > 0.95) n.vy *= -1;
				n.pulse += 0.03;

				if (!n.connected && time > n.connectTime) {
					n.connected = true;
					ripples.push({ x: n.x * cw, y: n.y * ch, radius: 3, alpha: 0.8 });
				}
			}

			// Draw connections between nearby connected nodes
			const connDist = isMobile ? 0.35 : 0.3;
			for (let i = 0; i < nodes.length; i++) {
				if (!nodes[i].connected) continue;
				for (let j = i + 1; j < nodes.length; j++) {
					if (!nodes[j].connected) continue;
					const dx = nodes[i].x - nodes[j].x;
					const dy = nodes[i].y - nodes[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < connDist) {
						const alpha = (1 - dist / connDist) * 0.4;
						ctx.beginPath();
						ctx.moveTo(nodes[i].x * cw, nodes[i].y * ch);
						ctx.lineTo(nodes[j].x * cw, nodes[j].y * ch);
						ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
						ctx.lineWidth = 1;
						ctx.stroke();
					}
				}
			}

			// Draw ripples
			for (let i = ripples.length - 1; i >= 0; i--) {
				const r = ripples[i];
				r.radius += 1.5;
				r.alpha -= 0.012;
				if (r.alpha <= 0) { ripples.splice(i, 1); continue; }
				ctx.beginPath();
				ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
				ctx.strokeStyle = `rgba(0, 255, 136, ${r.alpha})`;
				ctx.lineWidth = 1.5;
				ctx.stroke();
			}

			// Periodically spawn new ripples
			if (time % 60 === 0) {
				const n = nodes[Math.floor(Math.random() * nodes.length)];
				if (n.connected) {
					ripples.push({ x: n.x * cw, y: n.y * ch, radius: 3, alpha: 0.6 });
				}
			}

			// Draw nodes
			for (const n of nodes) {
				const nx = n.x * cw;
				const ny = n.y * ch;
				const pulseR = n.r + Math.sin(n.pulse) * 1.5;

				if (n.connected) {
					// Glow
					ctx.beginPath();
					ctx.arc(nx, ny, pulseR * 3, 0, Math.PI * 2);
					ctx.fillStyle = 'rgba(0, 255, 136, 0.06)';
					ctx.fill();

					// Node
					ctx.beginPath();
					ctx.arc(nx, ny, pulseR, 0, Math.PI * 2);
					ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
					ctx.shadowColor = '#00ff88';
					ctx.shadowBlur = 10;
					ctx.fill();
					ctx.shadowBlur = 0;
				} else {
					// Dim node
					ctx.beginPath();
					ctx.arc(nx, ny, n.r * 0.7, 0, Math.PI * 2);
					ctx.fillStyle = 'rgba(0, 255, 136, 0.15)';
					ctx.fill();
				}
			}
		}

		animate();
	}

	/* ─── REVEAL: Golden key rotating, lock opening ─── */
	function initReveal(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean
	) {
		let time = 0;
		interface Particle { x: number; y: number; vx: number; vy: number; alpha: number; r: number; }
		const particles: Particle[] = [];
		let unlocked = false;
		let unlockTime = 0;
		const cycleLength = 300; // frames per full cycle

		function drawKey(cx: number, cy: number, size: number, angle: number) {
			ctx.save();
			ctx.translate(cx, cy);
			ctx.rotate(angle);

			const s = size;
			// Key head (circle with hole)
			ctx.beginPath();
			ctx.arc(0, -s * 0.6, s * 0.35, 0, Math.PI * 2);
			ctx.strokeStyle = '#ffd700';
			ctx.lineWidth = 3;
			ctx.shadowColor = '#ffd700';
			ctx.shadowBlur = 15;
			ctx.stroke();
			ctx.shadowBlur = 0;

			// Inner hole
			ctx.beginPath();
			ctx.arc(0, -s * 0.6, s * 0.12, 0, Math.PI * 2);
			ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
			ctx.lineWidth = 1.5;
			ctx.stroke();

			// Key shaft
			ctx.beginPath();
			ctx.moveTo(0, -s * 0.25);
			ctx.lineTo(0, s * 0.5);
			ctx.strokeStyle = '#ffd700';
			ctx.lineWidth = 3;
			ctx.shadowColor = '#ffd700';
			ctx.shadowBlur = 8;
			ctx.stroke();
			ctx.shadowBlur = 0;

			// Key teeth
			ctx.beginPath();
			ctx.moveTo(0, s * 0.2);
			ctx.lineTo(s * 0.15, s * 0.2);
			ctx.moveTo(0, s * 0.35);
			ctx.lineTo(s * 0.12, s * 0.35);
			ctx.moveTo(0, s * 0.5);
			ctx.lineTo(s * 0.15, s * 0.5);
			ctx.strokeStyle = '#ffd700';
			ctx.lineWidth = 2.5;
			ctx.stroke();

			ctx.restore();
		}

		function drawLock(cx: number, cy: number, size: number, openAmount: number) {
			const s = size;
			// Lock body
			ctx.fillStyle = 'rgba(0, 255, 136, 0.08)';
			ctx.strokeStyle = `rgba(0, 255, 136, ${0.3 + openAmount * 0.4})`;
			ctx.lineWidth = 2;

			// Left half
			ctx.save();
			ctx.translate(-openAmount * s * 0.3, 0);
			ctx.beginPath();
			ctx.rect(cx - s * 0.3, cy - s * 0.15, s * 0.3, s * 0.4);
			ctx.fill();
			ctx.stroke();
			ctx.restore();

			// Right half
			ctx.save();
			ctx.translate(openAmount * s * 0.3, 0);
			ctx.beginPath();
			ctx.rect(cx, cy - s * 0.15, s * 0.3, s * 0.4);
			ctx.fill();
			ctx.stroke();
			ctx.restore();

			// Shackle (U shape)
			if (openAmount < 0.5) {
				ctx.beginPath();
				ctx.arc(cx, cy - s * 0.15, s * 0.18, Math.PI, 0);
				ctx.strokeStyle = 'rgba(0, 255, 136, 0.4)';
				ctx.lineWidth = 2.5;
				ctx.stroke();
			}
		}

		function animate() {
			if (destroyed) return;
			animationId = requestAnimationFrame(animate);
			time++;

			const cw = w();
			const ch = h();
			const cx = cw / 2;
			const cy = ch / 2;
			ctx.clearRect(0, 0, cw, ch);

			const cycleTime = time % cycleLength;
			const keySize = isMobile ? 30 : 45;

			if (cycleTime < 180) {
				// Phase 1: Key rotates
				const angle = (cycleTime / 180) * Math.PI * 2;
				drawKey(cx, cy, keySize, angle);

				// Subtle lock in background
				drawLock(cx, cy + keySize * 0.8, keySize, 0);
			} else if (cycleTime < 240) {
				// Phase 2: Lock opens
				const openProgress = (cycleTime - 180) / 60;
				drawKey(cx, cy - keySize * 0.3, keySize, 0);
				drawLock(cx, cy + keySize * 0.5, keySize, openProgress);

				if (!unlocked) {
					unlocked = true;
					unlockTime = time;
					// Burst of particles
					for (let i = 0; i < (isMobile ? 15 : 25); i++) {
						const angle = (Math.PI * 2 * i) / (isMobile ? 15 : 25);
						particles.push({
							x: cx,
							y: cy + keySize * 0.5,
							vx: Math.cos(angle) * (2 + Math.random() * 3),
							vy: Math.sin(angle) * (2 + Math.random() * 3),
							alpha: 1,
							r: 2 + Math.random() * 2
						});
					}
				}
			} else {
				// Phase 3: Show open state with particles fading
				drawKey(cx, cy - keySize * 0.3, keySize, 0);
				drawLock(cx, cy + keySize * 0.5, keySize, 1);

				if (cycleTime >= cycleLength - 1) {
					unlocked = false;
				}
			}

			// Update and draw particles
			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				p.x += p.vx;
				p.y += p.vy;
				p.vx *= 0.97;
				p.vy *= 0.97;
				p.alpha -= 0.015;
				if (p.alpha <= 0) { particles.splice(i, 1); continue; }

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
				ctx.shadowColor = '#ffd700';
				ctx.shadowBlur = 6;
				ctx.fill();
				ctx.shadowBlur = 0;
			}
		}

		animate();
	}

	/* ─── VALIDATION: Matrix code + green seal stamp ─── */
	function initValidation(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean
	) {
		let time = 0;
		const hexChars = '0123456789abcdef';
		const colCount = isMobile ? 12 : 20;
		interface Column { chars: string[]; y: number; speed: number; }
		const columns: Column[] = [];
		let sealScale = 0;
		let sealActive = false;
		const cycleLength = 360;

		for (let i = 0; i < colCount; i++) {
			const charCount = 8 + Math.floor(Math.random() * 8);
			const chars: string[] = [];
			for (let j = 0; j < charCount; j++) {
				chars.push(hexChars[Math.floor(Math.random() * hexChars.length)]);
			}
			columns.push({
				chars,
				y: -Math.random() * 200,
				speed: 0.8 + Math.random() * 1.5
			});
		}

		function animate() {
			if (destroyed) return;
			animationId = requestAnimationFrame(animate);
			time++;

			const cw = w();
			const ch = h();
			ctx.clearRect(0, 0, cw, ch);

			const cycleTime = time % cycleLength;
			const fontSize = isMobile ? 10 : 13;

			// Matrix rain
			ctx.font = `${fontSize}px monospace`;
			const colW = cw / colCount;

			for (const col of columns) {
				col.y += col.speed;
				const totalH = col.chars.length * fontSize;
				if (col.y > ch + totalH) {
					col.y = -totalH;
					// Refresh chars
					for (let j = 0; j < col.chars.length; j++) {
						col.chars[j] = hexChars[Math.floor(Math.random() * hexChars.length)];
					}
				}
			}

			for (let ci = 0; ci < columns.length; ci++) {
				const col = columns[ci];
				const x = ci * colW + colW / 2;

				for (let j = 0; j < col.chars.length; j++) {
					const y = col.y + j * fontSize;
					if (y < -fontSize || y > ch + fontSize) continue;

					// Randomly change some chars
					if (Math.random() < 0.02) {
						col.chars[j] = hexChars[Math.floor(Math.random() * hexChars.length)];
					}

					const isHead = j === col.chars.length - 1;
					const fade = j / col.chars.length;
					const alpha = isHead ? 0.9 : fade * 0.5;

					ctx.fillStyle = isHead
						? `rgba(0, 255, 136, ${alpha})`
						: `rgba(0, 255, 136, ${alpha * 0.6})`;
					ctx.fillText(col.chars[j], x, y);
				}
			}

			// Seal animation (appears every cycle)
			if (cycleTime > 200) {
				sealActive = true;
				const sealProgress = Math.min(1, (cycleTime - 200) / 40);
				sealScale = sealProgress;

				const cx = cw / 2;
				const cy = ch / 2;
				const sealR = (isMobile ? 35 : 55) * sealScale;

				// Scale bounce
				const bounce = sealProgress < 1 ? 1 + Math.sin(sealProgress * Math.PI) * 0.15 : 1;
				const finalR = sealR * bounce;

				// Outer ring
				ctx.beginPath();
				ctx.arc(cx, cy, finalR, 0, Math.PI * 2);
				ctx.strokeStyle = `rgba(0, 255, 136, ${0.8 * sealScale})`;
				ctx.lineWidth = 3;
				ctx.shadowColor = '#00ff88';
				ctx.shadowBlur = 20 * sealScale;
				ctx.stroke();
				ctx.shadowBlur = 0;

				// Inner ring
				ctx.beginPath();
				ctx.arc(cx, cy, finalR * 0.7, 0, Math.PI * 2);
				ctx.strokeStyle = `rgba(0, 255, 136, ${0.4 * sealScale})`;
				ctx.lineWidth = 1.5;
				ctx.stroke();

				// Checkmark inside
				if (sealScale > 0.5) {
					const checkAlpha = (sealScale - 0.5) * 2;
					const checkSize = finalR * 0.35;
					ctx.beginPath();
					ctx.moveTo(cx - checkSize, cy);
					ctx.lineTo(cx - checkSize * 0.2, cy + checkSize * 0.7);
					ctx.lineTo(cx + checkSize, cy - checkSize * 0.5);
					ctx.strokeStyle = `rgba(0, 255, 136, ${checkAlpha})`;
					ctx.lineWidth = 3;
					ctx.shadowColor = '#00ff88';
					ctx.shadowBlur = 12;
					ctx.stroke();
					ctx.shadowBlur = 0;
				}

				// "VALID" text
				if (sealScale > 0.8) {
					const textAlpha = (sealScale - 0.8) * 5;
					ctx.fillStyle = `rgba(0, 255, 136, ${Math.min(0.6, textAlpha)})`;
					ctx.font = `bold ${isMobile ? 8 : 10}px monospace`;
					ctx.textAlign = 'center';
					ctx.fillText('VALIDATED', cx, cy + finalR + 16);
				}
			} else {
				sealActive = false;
				sealScale = 0;
			}
		}

		animate();
	}

	/* ─── VERIFICATION: Shield drawing + checkmark burst ─── */
	function initVerification(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean
	) {
		let time = 0;
		interface Particle { x: number; y: number; vx: number; vy: number; alpha: number; r: number; color: string; }
		const particles: Particle[] = [];
		const cycleLength = 300;
		let burstTriggered = false;

		function drawShieldPath(cx: number, cy: number, size: number): Path2D {
			const path = new Path2D();
			path.moveTo(cx, cy - size);
			path.bezierCurveTo(cx + size * 0.8, cy - size * 0.7, cx + size, cy - size * 0.2, cx + size * 0.85, cy + size * 0.3);
			path.bezierCurveTo(cx + size * 0.6, cy + size * 0.7, cx, cy + size, cx, cy + size);
			path.bezierCurveTo(cx, cy + size, cx - size * 0.6, cy + size * 0.7, cx - size * 0.85, cy + size * 0.3);
			path.bezierCurveTo(cx - size, cy - size * 0.2, cx - size * 0.8, cy - size * 0.7, cx, cy - size);
			return path;
		}

		function animate() {
			if (destroyed) return;
			animationId = requestAnimationFrame(animate);
			time++;

			const cw = w();
			const ch = h();
			const cx = cw / 2;
			const cy = ch / 2;
			ctx.clearRect(0, 0, cw, ch);

			const cycleTime = time % cycleLength;
			const shieldSize = isMobile ? 40 : 60;

			// Phase 1: Shield draws in stroke-by-stroke (0-150)
			if (cycleTime < 150) {
				burstTriggered = false;
				const drawProgress = Math.min(1, cycleTime / 120);

				ctx.save();
				const shieldPath = drawShieldPath(cx, cy, shieldSize);

				// Draw shield with dash animation
				ctx.setLineDash([500]);
				ctx.lineDashOffset = 500 - drawProgress * 500;
				ctx.strokeStyle = `rgba(0, 255, 136, ${0.6 * drawProgress})`;
				ctx.lineWidth = 2.5;
				ctx.shadowColor = '#00ff88';
				ctx.shadowBlur = 10 * drawProgress;
				ctx.stroke(shieldPath);
				ctx.shadowBlur = 0;
				ctx.setLineDash([]);

				// Fill with low alpha
				if (drawProgress > 0.5) {
					ctx.fillStyle = `rgba(0, 255, 136, ${(drawProgress - 0.5) * 0.1})`;
					ctx.fill(shieldPath);
				}
				ctx.restore();
			}
			// Phase 2: Checkmark draws in (150-210)
			else if (cycleTime < 210) {
				const shieldPath = drawShieldPath(cx, cy, shieldSize);
				ctx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
				ctx.lineWidth = 2.5;
				ctx.shadowColor = '#00ff88';
				ctx.shadowBlur = 10;
				ctx.stroke(shieldPath);
				ctx.fillStyle = 'rgba(0, 255, 136, 0.05)';
				ctx.fill(shieldPath);
				ctx.shadowBlur = 0;

				// Checkmark
				const checkProgress = (cycleTime - 150) / 60;
				const checkSize = shieldSize * 0.4;
				ctx.beginPath();

				if (checkProgress < 0.4) {
					// First stroke of check
					const p = checkProgress / 0.4;
					ctx.moveTo(cx - checkSize, cy);
					ctx.lineTo(
						cx - checkSize + (checkSize * 0.6) * p,
						cy + (checkSize * 0.6) * p
					);
				} else {
					// Full check
					const p = Math.min(1, (checkProgress - 0.4) / 0.6);
					ctx.moveTo(cx - checkSize, cy);
					ctx.lineTo(cx - checkSize * 0.4, cy + checkSize * 0.6);
					ctx.lineTo(
						cx - checkSize * 0.4 + (checkSize * 1.4) * p,
						cy + checkSize * 0.6 - (checkSize * 1.1) * p
					);
				}

				ctx.strokeStyle = `rgba(0, 255, 136, 0.9)`;
				ctx.lineWidth = 3;
				ctx.shadowColor = '#00ff88';
				ctx.shadowBlur = 15;
				ctx.stroke();
				ctx.shadowBlur = 0;

				// Burst at end
				if (checkProgress > 0.95 && !burstTriggered) {
					burstTriggered = true;
					for (let i = 0; i < (isMobile ? 20 : 35); i++) {
						const angle = (Math.PI * 2 * i) / (isMobile ? 20 : 35);
						particles.push({
							x: cx,
							y: cy,
							vx: Math.cos(angle) * (2 + Math.random() * 4),
							vy: Math.sin(angle) * (2 + Math.random() * 4),
							alpha: 1,
							r: 1.5 + Math.random() * 2,
							color: Math.random() > 0.5 ? '#00ff88' : '#7c3aed'
						});
					}
				}
			}
			// Phase 3: Show complete with particles fading
			else {
				const shieldPath = drawShieldPath(cx, cy, shieldSize);
				const pulse = Math.sin(time * 0.05) * 0.1 + 0.6;
				ctx.strokeStyle = `rgba(0, 255, 136, ${pulse})`;
				ctx.lineWidth = 2.5;
				ctx.shadowColor = '#00ff88';
				ctx.shadowBlur = 10;
				ctx.stroke(shieldPath);
				ctx.fillStyle = 'rgba(0, 255, 136, 0.05)';
				ctx.fill(shieldPath);
				ctx.shadowBlur = 0;

				// Full checkmark
				const checkSize = shieldSize * 0.4;
				ctx.beginPath();
				ctx.moveTo(cx - checkSize, cy);
				ctx.lineTo(cx - checkSize * 0.4, cy + checkSize * 0.6);
				ctx.lineTo(cx + checkSize, cy - checkSize * 0.5);
				ctx.strokeStyle = `rgba(0, 255, 136, 0.9)`;
				ctx.lineWidth = 3;
				ctx.shadowColor = '#00ff88';
				ctx.shadowBlur = 15;
				ctx.stroke();
				ctx.shadowBlur = 0;
			}

			// Update and draw particles
			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				p.x += p.vx;
				p.y += p.vy;
				p.vx *= 0.96;
				p.vy *= 0.96;
				p.alpha -= 0.02;
				if (p.alpha <= 0) { particles.splice(i, 1); continue; }

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fillStyle = p.color === '#00ff88'
					? `rgba(0, 255, 136, ${p.alpha})`
					: `rgba(124, 58, 237, ${p.alpha})`;
				ctx.fill();
			}
		}

		animate();
	}

	/* ─── WINNER: Coin explosion + trophy + confetti ─── */
	function initWinner(
		ctx: CanvasRenderingContext2D,
		w: () => number, h: () => number,
		isMobile: boolean
	) {
		let time = 0;
		interface Coin { x: number; y: number; vx: number; vy: number; r: number; alpha: number; rotation: number; rotSpeed: number; }
		interface Confetti { x: number; y: number; vx: number; vy: number; alpha: number; w: number; h: number; color: string; rotation: number; rotSpeed: number; }
		const coins: Coin[] = [];
		const confetti: Confetti[] = [];
		let trophyScale = 0;
		let explosionTriggered = false;
		const cycleLength = 360;
		const confettiColors = ['#00ff88', '#7c3aed', '#ffd700', '#00cc6e', '#9f67ff'];

		function drawTrophy(cx: number, cy: number, size: number, scale: number) {
			ctx.save();
			ctx.translate(cx, cy);
			ctx.scale(scale, scale);

			const s = size;

			// Cup body
			ctx.beginPath();
			ctx.moveTo(-s * 0.4, -s * 0.3);
			ctx.bezierCurveTo(-s * 0.45, s * 0.1, -s * 0.2, s * 0.35, 0, s * 0.35);
			ctx.bezierCurveTo(s * 0.2, s * 0.35, s * 0.45, s * 0.1, s * 0.4, -s * 0.3);
			ctx.lineTo(-s * 0.4, -s * 0.3);
			ctx.strokeStyle = '#ffd700';
			ctx.lineWidth = 2.5;
			ctx.shadowColor = '#ffd700';
			ctx.shadowBlur = 12;
			ctx.stroke();
			ctx.fillStyle = 'rgba(255, 215, 0, 0.08)';
			ctx.fill();
			ctx.shadowBlur = 0;

			// Handles
			ctx.beginPath();
			ctx.arc(-s * 0.5, -s * 0.05, s * 0.15, Math.PI * 0.5, -Math.PI * 0.5, true);
			ctx.strokeStyle = 'rgba(255, 215, 0, 0.7)';
			ctx.lineWidth = 2;
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(s * 0.5, -s * 0.05, s * 0.15, -Math.PI * 0.5, Math.PI * 0.5, true);
			ctx.stroke();

			// Base
			ctx.beginPath();
			ctx.moveTo(-s * 0.05, s * 0.35);
			ctx.lineTo(-s * 0.05, s * 0.5);
			ctx.lineTo(-s * 0.2, s * 0.55);
			ctx.lineTo(s * 0.2, s * 0.55);
			ctx.lineTo(s * 0.05, s * 0.5);
			ctx.lineTo(s * 0.05, s * 0.35);
			ctx.strokeStyle = '#ffd700';
			ctx.lineWidth = 2;
			ctx.stroke();

			// Star on cup
			ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
			ctx.font = `${s * 0.25}px serif`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText('★', 0, 0);

			ctx.restore();
		}

		function animate() {
			if (destroyed) return;
			animationId = requestAnimationFrame(animate);
			time++;

			const cw = w();
			const ch = h();
			const cx = cw / 2;
			const cy = ch / 2;
			ctx.clearRect(0, 0, cw, ch);

			const cycleTime = time % cycleLength;
			const trophySize = isMobile ? 35 : 55;

			// Phase 1: Coin explosion (0-60)
			if (cycleTime === 1) {
				explosionTriggered = false;
				coins.length = 0;
				confetti.length = 0;
				trophyScale = 0;
			}

			if (cycleTime < 60) {
				if (!explosionTriggered) {
					explosionTriggered = true;
					const coinCount = isMobile ? 15 : 25;
					for (let i = 0; i < coinCount; i++) {
						const angle = (Math.PI * 2 * i) / coinCount + (Math.random() - 0.5) * 0.3;
						coins.push({
							x: cx,
							y: cy,
							vx: Math.cos(angle) * (3 + Math.random() * 5),
							vy: Math.sin(angle) * (3 + Math.random() * 5) - 2,
							r: 4 + Math.random() * 4,
							alpha: 1,
							rotation: 0,
							rotSpeed: (Math.random() - 0.5) * 0.2
						});
					}
				}
			}

			// Phase 2: Trophy materializes (60-180)
			if (cycleTime >= 60 && cycleTime < 180) {
				trophyScale = Math.min(1, (cycleTime - 60) / 60);

				// Confetti burst at trophy appear
				if (cycleTime === 80) {
					for (let i = 0; i < (isMobile ? 20 : 40); i++) {
						const angle = Math.random() * Math.PI * 2;
						const speed = 1 + Math.random() * 4;
						confetti.push({
							x: cx,
							y: cy,
							vx: Math.cos(angle) * speed,
							vy: Math.sin(angle) * speed - 2,
							alpha: 1,
							w: 3 + Math.random() * 4,
							h: 2 + Math.random() * 3,
							color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
							rotation: Math.random() * Math.PI * 2,
							rotSpeed: (Math.random() - 0.5) * 0.15
						});
					}
				}
			}

			// Phase 3: Trophy stays with gentle pulse (180-360)
			if (cycleTime >= 180) {
				trophyScale = 1 + Math.sin(time * 0.04) * 0.03;
			}

			// Draw trophy
			if (trophyScale > 0) {
				drawTrophy(cx, cy, trophySize, trophyScale);
			}

			// Update and draw coins
			for (let i = coins.length - 1; i >= 0; i--) {
				const c = coins[i];
				c.x += c.vx;
				c.y += c.vy;
				c.vy += 0.12; // gravity
				c.vx *= 0.98;
				c.rotation += c.rotSpeed;
				c.alpha -= 0.008;
				if (c.alpha <= 0 || c.y > ch + 20) { coins.splice(i, 1); continue; }

				ctx.save();
				ctx.translate(c.x, c.y);
				ctx.rotate(c.rotation);
				const scaleX = Math.abs(Math.cos(time * 0.08 + i));

				ctx.beginPath();
				ctx.ellipse(0, 0, c.r * Math.max(0.3, scaleX), c.r, 0, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255, 215, 0, ${c.alpha * 0.8})`;
				ctx.shadowColor = '#ffd700';
				ctx.shadowBlur = 6;
				ctx.fill();
				ctx.shadowBlur = 0;

				// Ergo symbol
				if (scaleX > 0.5) {
					ctx.fillStyle = `rgba(20, 20, 20, ${c.alpha})`;
					ctx.font = `bold ${Math.floor(c.r * 0.8)}px monospace`;
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillText('Σ', 0, 0);
				}
				ctx.restore();
			}

			// Update and draw confetti
			for (let i = confetti.length - 1; i >= 0; i--) {
				const c = confetti[i];
				c.x += c.vx;
				c.y += c.vy;
				c.vy += 0.05;
				c.rotation += c.rotSpeed;
				c.alpha -= 0.008;
				if (c.alpha <= 0 || c.y > ch + 20) { confetti.splice(i, 1); continue; }

				ctx.save();
				ctx.translate(c.x, c.y);
				ctx.rotate(c.rotation);
				ctx.fillStyle = c.color.startsWith('#00ff')
					? `rgba(0, 255, 136, ${c.alpha})`
					: c.color.startsWith('#7c3a')
					? `rgba(124, 58, 237, ${c.alpha})`
					: c.color.startsWith('#ffd')
					? `rgba(255, 215, 0, ${c.alpha})`
					: c.color.startsWith('#00cc')
					? `rgba(0, 204, 110, ${c.alpha})`
					: `rgba(159, 103, 255, ${c.alpha})`;
				ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
				ctx.restore();
			}
		}

		animate();
	}
</script>

<div class="validation-animation">
	<canvas bind:this={canvas} class="validation-canvas"></canvas>
</div>

<style>
	.validation-animation {
		width: 100%;
		height: 250px;
		position: relative;
		overflow: hidden;
		border-radius: 12px;
	}

	.validation-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		background: transparent;
	}

	@media (min-width: 768px) {
		.validation-animation {
			height: 350px;
		}
	}
</style>
