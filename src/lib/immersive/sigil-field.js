/** Quiet orbital geometry: an arena/sigil, not a cellular simulation. */
export function createSigilField() {
	return {
		/** @param {CanvasRenderingContext2D} ctx @param {number} width @param {number} height @param {string} color @param {number} now */
		draw(ctx, width, height, color, now) {
			const t = now / 1000;
			const compact = width < 820;
			const radius = Math.min(width * (compact ? 0.68 : 0.29), 380);
			const cx = width * (compact ? 0.77 : 0.77);
			const cy = Math.min(height * 0.35, 310);
			ctx.save();
			ctx.translate(cx, cy);
			ctx.strokeStyle = color;
			ctx.fillStyle = color;
			ctx.lineWidth = 1;
			// Fine concentric tracks and counter-rotating engraved marks.
			for (let ring = 0; ring < 3; ring++) {
				const r = radius * (1 - ring * 0.22);
				ctx.globalAlpha = 0.12;
				ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
				ctx.save();
				ctx.rotate(t * (ring % 2 ? -0.016 : 0.012) + ring);
				const count = 48 - ring * 12;
				for (let mark = 0; mark < count; mark++) {
					const a = mark * Math.PI * 2 / count;
					const length = mark % 4 === 0 ? 12 : 4;
					ctx.globalAlpha = mark % 4 === 0 ? 0.23 : 0.1;
					ctx.beginPath();
					ctx.moveTo(Math.cos(a) * (r - length), Math.sin(a) * (r - length));
					ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);ctx.stroke();
				}
				// A pair of slow-moving signals on each track.
				for (let point = 0; point < 2; point++) {
					const a = point * Math.PI + ring * 1.4;
					const x = Math.cos(a) * r, y = Math.sin(a) * r;
					ctx.globalAlpha = 0.06;
					ctx.beginPath();ctx.arc(x, y, 10, 0, Math.PI * 2);ctx.fill();
					ctx.globalAlpha = 0.5;
					ctx.beginPath();ctx.arc(x, y, 2, 0, Math.PI * 2);ctx.fill();
				}
				ctx.restore();
			}
			// Sparse drifting motes, deterministic and low-contrast.
			for (let i = 0; i < 22; i++) {
				const x = Math.sin(i * 127.1) * width * 0.6;
				const y = ((i * 79 + t * (2 + i % 3)) % (height + 80)) - cy - 40;
				ctx.globalAlpha = 0.1 + 0.06 * Math.sin(t * 0.4 + i);
				ctx.beginPath();ctx.arc(x, y, i % 3 === 0 ? 1.5 : 0.7, 0, Math.PI * 2);ctx.fill();
			}
			ctx.restore();
		}
	};
}
