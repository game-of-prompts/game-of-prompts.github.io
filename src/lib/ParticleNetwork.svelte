<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		let destroyed = false;

		// Lazy-load Three.js (selective imports for tree-shaking)
		Promise.all([
			import('three/src/scenes/Scene.js'),
			import('three/src/cameras/PerspectiveCamera.js'),
			import('three/src/renderers/WebGLRenderer.js'),
			import('three/src/core/BufferGeometry.js'),
			import('three/src/core/BufferAttribute.js'),
			import('three/src/materials/PointsMaterial.js'),
			import('three/src/objects/Points.js'),
			import('three/src/materials/LineBasicMaterial.js'),
			import('three/src/objects/LineSegments.js')
		]).then(([
			{ Scene },
			{ PerspectiveCamera },
			{ WebGLRenderer },
			{ BufferGeometry },
			{ BufferAttribute, Float32BufferAttribute },
			{ PointsMaterial },
			{ Points },
			{ LineBasicMaterial },
			{ LineSegments }
		]) => {
			if (destroyed) return;

			const scene = new Scene();
			const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
			camera.position.z = 50;

			const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
			renderer.setClearColor(0x000000, 0);

			// Particles — reduced count for performance
			const particleCount = 70;
			const positions = new Float32Array(particleCount * 3);
			const colors = new Float32Array(particleCount * 3);
			const velocities = new Float32Array(particleCount * 3);
			const spread = 80;

			// Green monochromatic palette
			const greenLight = { r: 134 / 255, g: 239 / 255, b: 172 / 255 }; // #86efac
			const greenDark = { r: 34 / 255, g: 197 / 255, b: 94 / 255 };   // #22c55e

			for (let i = 0; i < particleCount; i++) {
				const i3 = i * 3;
				positions[i3] = (Math.random() - 0.5) * spread;
				positions[i3 + 1] = (Math.random() - 0.5) * spread;
				positions[i3 + 2] = (Math.random() - 0.5) * spread * 0.5;

				velocities[i3] = (Math.random() - 0.5) * 0.015;
				velocities[i3 + 1] = (Math.random() - 0.5) * 0.015;
				velocities[i3 + 2] = (Math.random() - 0.5) * 0.008;

				// Mix between green shades
				const t = Math.random();
				colors[i3] = greenDark.r + (greenLight.r - greenDark.r) * t;
				colors[i3 + 1] = greenDark.g + (greenLight.g - greenDark.g) * t;
				colors[i3 + 2] = greenDark.b + (greenLight.b - greenDark.b) * t;
			}

			const particleGeometry = new BufferGeometry();
			particleGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
			particleGeometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

			const particleMaterial = new PointsMaterial({
				size: 0.6,
				vertexColors: true,
				transparent: true,
				opacity: 0.7,
				sizeAttenuation: true
			});

			const particles = new Points(particleGeometry, particleMaterial);
			scene.add(particles);

			// Lines (connections)
			const maxConnections = particleCount * 4;
			const linePositions = new Float32Array(maxConnections * 6);
			const lineColors = new Float32Array(maxConnections * 6);
			const lineGeometry = new BufferGeometry();
			lineGeometry.setAttribute('position', new BufferAttribute(linePositions, 3));
			lineGeometry.setAttribute('color', new BufferAttribute(lineColors, 3));

			const lineMaterial = new LineBasicMaterial({
				vertexColors: true,
				transparent: true,
				opacity: 0.25
			});

			const lines = new LineSegments(lineGeometry, lineMaterial);
			scene.add(lines);

			const connectionDistance = 15;

			let mouseX = 0, mouseY = 0;
			const onMouseMove = (e: MouseEvent) => {
				mouseX = (e.clientX / window.innerWidth) * 2 - 1;
				mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
			};
			window.addEventListener('mousemove', onMouseMove, { passive: true });

			const onResize = () => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			};
			window.addEventListener('resize', onResize, { passive: true });

			let animationId: number;
			let frameCount = 0;
			const animate = () => {
				if (destroyed) return;
				animationId = requestAnimationFrame(animate);
				frameCount++;

				const posArr = particleGeometry.attributes.position.array as Float32Array;

				// Move particles
				for (let i = 0; i < particleCount; i++) {
					const i3 = i * 3;
					posArr[i3] += velocities[i3];
					posArr[i3 + 1] += velocities[i3 + 1];
					posArr[i3 + 2] += velocities[i3 + 2];

					// Wrap around
					const halfSpread = spread / 2;
					if (posArr[i3] > halfSpread) posArr[i3] = -halfSpread;
					if (posArr[i3] < -halfSpread) posArr[i3] = halfSpread;
					if (posArr[i3 + 1] > halfSpread) posArr[i3 + 1] = -halfSpread;
					if (posArr[i3 + 1] < -halfSpread) posArr[i3 + 1] = halfSpread;
					if (posArr[i3 + 2] > halfSpread * 0.5) posArr[i3 + 2] = -halfSpread * 0.5;
					if (posArr[i3 + 2] < -halfSpread * 0.5) posArr[i3 + 2] = halfSpread * 0.5;
				}

				particleGeometry.attributes.position.needsUpdate = true;

				// Update connections — only every 3rd frame (O(n²) is expensive)
				if (frameCount % 3 !== 0) {
					renderer.render(scene, camera);
					return;
				}
				let lineIndex = 0;
				const lp = lineGeometry.attributes.position.array as Float32Array;
				const lc = lineGeometry.attributes.color.array as Float32Array;

				for (let i = 0; i < particleCount; i++) {
					const i3 = i * 3;
					for (let j = i + 1; j < particleCount; j++) {
						if (lineIndex >= maxConnections) break;
						const j3 = j * 3;
						const dx = posArr[i3] - posArr[j3];
						const dy = posArr[i3 + 1] - posArr[j3 + 1];
						const dz = posArr[i3 + 2] - posArr[j3 + 2];
						const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

						if (dist < connectionDistance) {
							const alpha = 1 - dist / connectionDistance;
							const li = lineIndex * 6;

							lp[li] = posArr[i3];
							lp[li + 1] = posArr[i3 + 1];
							lp[li + 2] = posArr[i3 + 2];
							lp[li + 3] = posArr[j3];
							lp[li + 4] = posArr[j3 + 1];
							lp[li + 5] = posArr[j3 + 2];

							const g = 74 / 255 * alpha;
							const gb = 222 / 255 * alpha;
							const bb = 128 / 255 * alpha;
							lc[li] = g; lc[li + 1] = gb; lc[li + 2] = bb;
							lc[li + 3] = g; lc[li + 4] = gb; lc[li + 5] = bb;

							lineIndex++;
						}
					}
				}

				// Zero out remaining
				for (let i = lineIndex * 6; i < lp.length; i++) {
					lp[i] = 0;
					lc[i] = 0;
				}

				lineGeometry.attributes.position.needsUpdate = true;
				lineGeometry.attributes.color.needsUpdate = true;
				lineGeometry.setDrawRange(0, lineIndex * 2);

				// Subtle camera follow mouse
				camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
				camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
				camera.lookAt(0, 0, 0);

				renderer.render(scene, camera);
			};

			animate();

			// Cleanup on unmount is handled by destroyed flag
			return () => {
				destroyed = true;
				cancelAnimationFrame(animationId);
				window.removeEventListener('mousemove', onMouseMove);
				window.removeEventListener('resize', onResize);
				renderer.dispose();
				particleGeometry.dispose();
				particleMaterial.dispose();
				lineGeometry.dispose();
				lineMaterial.dispose();
			};
		});

		return () => { destroyed = true; };
	});
</script>

<canvas bind:this={canvas} class="particle-canvas"></canvas>

<style>
	.particle-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
	}
</style>
