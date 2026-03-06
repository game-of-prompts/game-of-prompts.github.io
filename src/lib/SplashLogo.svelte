<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		let animId: number;
		let renderer: import('three').WebGLRenderer;

		(async () => {
			const THREE = await import('three');
			const { SVGLoader } = await import('three/examples/jsm/loaders/SVGLoader.js');

			// ── Scene ──────────────────────────────────────────────
			const scene = new THREE.Scene();

			const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);
			camera.position.set(0, 0, 180);

			renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setSize(200, 200);
			renderer.setClearColor(0x000000, 0);

			// ── Lights ────────────────────────────────────────────
			const ambient = new THREE.AmbientLight(0xffffff, 1.0);
			scene.add(ambient);

			const frontLight = new THREE.DirectionalLight(0x22c55e, 2.5);
			frontLight.position.set(0, 0, 1);
			scene.add(frontLight);

			const topLight = new THREE.DirectionalLight(0x4ade80, 1.2);
			topLight.position.set(1, 1, 0.5);
			scene.add(topLight);

			const pointLight = new THREE.PointLight(0x22c55e, 80, 300);
			pointLight.position.set(0, 0, 60);
			scene.add(pointLight);

			// ── Materials ─────────────────────────────────────────
			const mainMat = new THREE.MeshStandardMaterial({
				color: 0x22c55e,
				emissive: 0x22c55e,
				emissiveIntensity: 0.6,
				roughness: 0.15,
				metalness: 0.7,
				side: THREE.DoubleSide
			});

			const wireMat = new THREE.MeshBasicMaterial({
				color: 0x86efac,
				wireframe: true,
				transparent: true,
				opacity: 0.2,
				side: THREE.DoubleSide
			});

			// ── SVG Loading & Extrusion ───────────────────────────
			const logoGroup = new THREE.Group();
			let usedFallback = false;

			try {
				const loader = new SVGLoader();
				const svgData = await new Promise<import('three/examples/jsm/loaders/SVGLoader.js').SVGResult>((resolve, reject) => {
					loader.load('/gop-logo.svg', resolve, undefined, reject);
				});

				const paths = svgData.paths;
				console.log(`[SplashLogo] SVG loaded: ${paths.length} paths`);

				let totalShapes = 0;
				const extrudeSettings = {
					depth: 12,
					bevelEnabled: true,
					bevelThickness: 2,
					bevelSize: 1,
					bevelSegments: 3
				};

				// Skip path 0 (background rectangle), process remaining paths
				for (let i = 1; i < paths.length; i++) {
					const path = paths[i];
					const shapes = SVGLoader.createShapes(path);

					for (const shape of shapes) {
						totalShapes++;
						const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
						const mesh = new THREE.Mesh(geo, mainMat);
						logoGroup.add(mesh);

						// Wireframe overlay
						const wireMesh = new THREE.Mesh(geo, wireMat);
						logoGroup.add(wireMesh);
					}
				}

				console.log(`[SplashLogo] Total shapes extruded: ${totalShapes}`);

				if (totalShapes === 0) {
					throw new Error('No shapes produced from SVG');
				}

				// Compute bounding box and scale
				const bbox = new THREE.Box3().setFromObject(logoGroup);
				const size = new THREE.Vector3();
				bbox.getSize(size);
				console.log(`[SplashLogo] Bbox size: ${size.x.toFixed(1)} x ${size.y.toFixed(1)} x ${size.z.toFixed(1)}`);

				const maxDim = Math.max(size.x, size.y, size.z);
				const targetSize = 90;
				const s = targetSize / maxDim;
				console.log(`[SplashLogo] Scale factor: ${s.toFixed(6)}`);

				// Test which scale puts shape in positive Y space
				// Try scale(s, s, s) first
				logoGroup.scale.set(s, s, s);
				const testBox = new THREE.Box3().setFromObject(logoGroup);
				const testCenter = new THREE.Vector3();
				testBox.getCenter(testCenter);

				if (testCenter.y < 0) {
					// Flip Y if center is in negative Y
					logoGroup.scale.set(s, -s, s);
					console.log('[SplashLogo] Using scale(s, -s, s) for positive Y');
				} else {
					console.log('[SplashLogo] Using scale(s, s, s) - already positive Y');
				}

				// Re-compute bbox after scaling and center at origin
				const finalBox = new THREE.Box3().setFromObject(logoGroup);
				const center = new THREE.Vector3();
				finalBox.getCenter(center);
				logoGroup.position.sub(center);

			} catch (err) {
				console.warn('[SplashLogo] SVG load failed, using fallback:', err);
				usedFallback = true;

				// Fallback: IcosahedronGeometry
				const fallbackGeo = new THREE.IcosahedronGeometry(40, 1);
				const fallbackMesh = new THREE.Mesh(fallbackGeo, mainMat);
				logoGroup.add(fallbackMesh);
				const fallbackWire = new THREE.Mesh(fallbackGeo, wireMat);
				logoGroup.add(fallbackWire);
			}

			scene.add(logoGroup);

			// ── Orbiting particles ────────────────────────────────
			const particleGroup = new THREE.Group();
			const particleCount = 40;
			const pGeo = new THREE.SphereGeometry(1.2, 6, 6);

			for (let i = 0; i < particleCount; i++) {
				const isAmber = i % 5 === 0;
				const pMat = new THREE.MeshBasicMaterial({
					color: isAmber ? 0xfbbf24 : 0x4ade80,
					transparent: true,
					opacity: 0.6 + Math.random() * 0.4
				});
				const p = new THREE.Mesh(pGeo, pMat);
				const angle = (i / particleCount) * Math.PI * 2;
				const radius = 55 + Math.random() * 20;
				const yOff = (Math.random() - 0.5) * 30;
				p.position.set(Math.cos(angle) * radius, yOff, Math.sin(angle) * radius);
				p.userData = {
					angle, radius, yOff,
					speed: 0.004 + Math.random() * 0.004,
					yPhase: Math.random() * Math.PI * 2
				};
				particleGroup.add(p);
			}
			scene.add(particleGroup);

			// ── Animation ─────────────────────────────────────────
			let t = 0;
			const animate = () => {
				animId = requestAnimationFrame(animate);
				t += 0.016;

				// Rotate the logo group
				logoGroup.rotation.y += 0.007;
				logoGroup.rotation.x = Math.sin(t * 0.3) * 0.12;

				// Pulse point light
				pointLight.intensity = 60 + Math.sin(t * 1.5) * 25;

				// Orbit particles
				for (const child of particleGroup.children) {
					const d = child.userData;
					d.angle += d.speed;
					child.position.x = Math.cos(d.angle) * d.radius;
					child.position.z = Math.sin(d.angle) * d.radius;
					child.position.y = d.yOff + Math.sin(t + d.yPhase) * 6;
				}

				renderer.render(scene, camera);
			};
			animate();
		})();

		return () => {
			cancelAnimationFrame(animId);
			renderer?.dispose();
		};
	});
</script>

<canvas bind:this={canvas} width="200" height="200" style="display:block;"></canvas>
