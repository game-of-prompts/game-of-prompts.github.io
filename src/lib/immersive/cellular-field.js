/** A quiet Conway field, like the Celaut hero. No DOM or WebGL dependency. */
export function createCellularField() {
	let cols = 0;
	let rows = 0;
	let cells = new Uint8Array(0);
	let next = new Uint8Array(0);
	let lastStep = 0;
	const size = 22;

	return {
		/** @param {CanvasRenderingContext2D} ctx @param {number} width @param {number} height @param {string} color @param {number} now */
		draw(ctx, width, height, color, now) {
			const c = Math.ceil(width / size);
			const r = Math.ceil(height / size);
			if (c !== cols || r !== rows) {
				cols = c;
				rows = r;
				cells = new Uint8Array(cols * rows);
				next = new Uint8Array(cells.length);
				// Repeatable seed prevents random flashes when the theme changes.
				let seed = 173;
				for (let i = 0; i < cells.length; i++) {
					seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
					cells[i] = seed / 4294967296 < 0.27 ? 1 : 0;
				}
				lastStep = now;
			}
			if (now && now - lastStep >= 240) {
				for (let y = 0; y < rows; y++) {
					for (let x = 0; x < cols; x++) {
						let neighbors = 0;
						for (let dy = -1; dy <= 1; dy++) {
							for (let dx = -1; dx <= 1; dx++) {
								if (!dx && !dy) continue;
								const nx = x + dx, ny = y + dy;
								if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) neighbors += cells[ny * cols + nx];
							}
						}
						const i = y * cols + x;
						next[i] = neighbors === 3 || (cells[i] === 1 && neighbors === 2) ? 1 : 0;
					}
				}
				[cells, next] = [next, cells];
				lastStep = now;
			}
			ctx.save();
			ctx.fillStyle = color;
			ctx.globalAlpha = 0.13;
			for (let i = 0; i < cells.length; i++) {
				if (cells[i]) ctx.fillRect((i % cols) * size, Math.floor(i / cols) * size, size - 2, size - 2);
			}
			ctx.restore();
		}
	};
}
