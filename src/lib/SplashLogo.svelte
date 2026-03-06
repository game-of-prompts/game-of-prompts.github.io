<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		let animId: number;
		let renderer: import('three').WebGLRenderer;
		let composer: import('three/examples/jsm/postprocessing/EffectComposer.js').EffectComposer;
		let handleMouseMove: ((e: MouseEvent) => void) | null = null;

		(async () => {
			const THREE = await import('three');
			const { EffectComposer } = await import('three/examples/jsm/postprocessing/EffectComposer.js');
			const { RenderPass } = await import('three/examples/jsm/postprocessing/RenderPass.js');
			const { UnrealBloomPass } = await import('three/examples/jsm/postprocessing/UnrealBloomPass.js');
			const { OutputPass } = await import('three/examples/jsm/postprocessing/OutputPass.js');

			const scene = new THREE.Scene();
			// Slight low angle for drama — looking up at the throne
			const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1000);
			camera.position.set(0, -20, 180);
			camera.lookAt(0, 15, 0);

			// ── Renderer ──────────────────────────────────────────
			renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
			const pixelRatio = Math.min(window.devicePixelRatio, 2);
			renderer.setPixelRatio(pixelRatio);
			renderer.setSize(300, 300);
			renderer.setClearColor(0x000000, 0);
			renderer.toneMapping = THREE.ACESFilmicToneMapping;
			renderer.toneMappingExposure = 1.3;

			// ── Post-processing ───────────────────────────────────
			composer = new EffectComposer(renderer);
			composer.setPixelRatio(pixelRatio);
			composer.setSize(300, 300);

			const renderPass = new RenderPass(scene, camera);
			renderPass.clearAlpha = 0;
			composer.addPass(renderPass);

			const bloomPass = new UnrealBloomPass(
				new THREE.Vector2(300, 300),
				0.55,  // strength
				0.4,   // radius
				0.75   // threshold
			);
			composer.addPass(bloomPass);

			const outputPass = new OutputPass();
			composer.addPass(outputPass);

			// ── Lights — dramatic cinematic setup ─────────────────
			// Low ambient — keeps shadows deep
			scene.add(new THREE.AmbientLight(0x0a2814, 0.8));

			// Key light — main green from upper-right-front
			const keyLight = new THREE.DirectionalLight(0x22c55e, 4.0);
			keyLight.position.set(3, 4, 5).normalize();
			scene.add(keyLight);

			// Strong rim light — bright edge definition from behind-left
			const rimLight = new THREE.DirectionalLight(0x86efac, 5.0);
			rimLight.position.set(-3, 1, -4).normalize();
			scene.add(rimLight);

			// Top-down accent for crown spikes
			const topLight = new THREE.DirectionalLight(0x86efac, 2.0);
			topLight.position.set(0, 5, 1).normalize();
			scene.add(topLight);

			// Under-light for volumetric cone effect
			const underLight = new THREE.PointLight(0x22c55e, 25, 200);
			underLight.position.set(0, -40, 0);
			scene.add(underLight);

			// Front light for face visibility
			const frontLight = new THREE.PointLight(0x4ade80, 20, 300);
			frontLight.position.set(0, 0, 120);
			scene.add(frontLight);

			const pulse = new THREE.PointLight(0x22c55e, 12, 300);
			pulse.position.set(0, 30, 60);
			scene.add(pulse);

			// ── Procedural environment map (fake IBL) ─────────────
			const pmremScene = new THREE.Scene();
			// Brighter env for metallic reflections
			pmremScene.add(new THREE.Mesh(
				new THREE.SphereGeometry(400, 32, 32),
				new THREE.ShaderMaterial({
					vertexShader: `
						varying vec2 vUv;
						void main() {
							vUv = uv;
							gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
						}
					`,
					fragmentShader: `
						varying vec2 vUv;
						void main() {
							vec3 top = vec3(0.02, 0.25, 0.12);
							vec3 mid = vec3(0.0, 0.08, 0.04);
							vec3 bottom = vec3(0.0, 0.03, 0.01);
							float t = vUv.y;
							vec3 col = t > 0.5 ? mix(mid, top, (t - 0.5) * 2.0) : mix(bottom, mid, t * 2.0);
							gl_FragColor = vec4(col, 1.0);
						}
					`,
					side: THREE.BackSide
				})
			));
			const pmrem = new THREE.PMREMGenerator(renderer);
			pmrem.compileCubemapShader();
			const envRT = pmrem.fromScene(pmremScene, 0, 0.1, 1000);
			scene.environment = envRT.texture;
			pmrem.dispose();

			// ── Materials ─────────────────────────────────────────
			// Throne body — bright enough metallic green to show 3D form on transparent bg
			const mat = new THREE.MeshStandardMaterial({
				color: 0x22c55e,       // bright green
				emissive: 0x0d4a1f,    // subtle dark green emission
				emissiveIntensity: 0.3,
				roughness: 0.2,
				metalness: 0.9,
				side: THREE.DoubleSide,
				envMapIntensity: 3.0
			});

			// Spike tips — bright emissive for selective bloom
			const spikeMat = new THREE.MeshStandardMaterial({
				color: 0x4ade80,
				emissive: 0x86efac,
				emissiveIntensity: 2.5,
				roughness: 0.05,
				metalness: 0.95,
				side: THREE.DoubleSide,
				envMapIntensity: 3.0
			});

			const wireMat = new THREE.MeshBasicMaterial({
				color: 0x86efac,
				wireframe: true,
				transparent: true,
				opacity: 0.12,
				side: THREE.DoubleSide
			});

			const throne = new THREE.Group();

			function add(geo: import('three').BufferGeometry, useMat?: import('three').Material) {
				throne.add(new THREE.Mesh(geo, useMat || mat));
				throne.add(new THREE.Mesh(geo.clone(), wireMat));
			}

			// ── Throne geometry ───────────────────────────────────

			// Seat base
			const seat = new THREE.BoxGeometry(42, 7, 16);
			seat.translate(0, 0, 0);
			add(seat);

			// Seat cushion
			const cushion = new THREE.BoxGeometry(38, 3, 14);
			cushion.translate(0, 5, 0);
			add(cushion);

			// Arms (left + right)
			const lArm = new THREE.BoxGeometry(4.5, 12, 16);
			lArm.translate(-21, 6, 0);
			add(lArm);
			const rArm = new THREE.BoxGeometry(4.5, 12, 16);
			rArm.translate(21, 6, 0);
			add(rArm);

			// Back slab
			const backSlab = new THREE.BoxGeometry(42, 60, 6);
			backSlab.translate(0, 33, -5);
			add(backSlab);

			// Arch top
			const arch = new THREE.CylinderGeometry(11, 11, 6, 20, 1, false, 0, Math.PI);
			arch.rotateZ(Math.PI / 2);
			arch.translate(0, 63, -5);
			add(arch);

			// Crown spikes — 5 spikes with bright emissive tips
			const spikes = [
				[-16, 15], [-8, 20], [0, 25], [8, 20], [16, 15]
			] as [number, number][];
			for (const [sx, sh] of spikes) {
				const spike = new THREE.ConeGeometry(2.5, sh, 4);
				spike.translate(sx, 63 + sh / 2 + 2, -5);
				add(spike, spikeMat);
			}

			// Decorative tools on back (pencils/brushes as thin cylinders)
			for (const tx of [-13, -4.5, 4.5, 13]) {
				const tool = new THREE.CylinderGeometry(1.0, 1.0, 20, 6);
				tool.rotateZ(tx > 0 ? 0.2 : -0.2);
				tool.translate(tx, 32, -2.5);
				add(tool);
			}

			// Code `</>` block emblem on back
			const emblem = new THREE.BoxGeometry(10, 2, 1.5);
			emblem.translate(0, 23, -1.8);
			add(emblem);
			const emblem2 = new THREE.BoxGeometry(10, 2, 1.5);
			emblem2.translate(0, 18, -1.8);
			add(emblem2);

			// Legs — 4 corners
			for (const [lx, lz] of [[-16, -14], [-16, 6], [16, -14], [16, 6]] as [number, number][]) {
				const leg = new THREE.BoxGeometry(4, 11, 4);
				leg.translate(lx, -9, lz);
				add(leg);
			}

			throne.position.set(0, -22, 0);
			// Start with slight rotation so 3D depth is visible
			throne.rotation.y = 0.3;
			scene.add(throne);

			// ── Volumetric light cone beneath throne ──────────────
			const coneMat = new THREE.ShaderMaterial({
				vertexShader: `
					varying vec2 vUv;
					void main() {
						vUv = uv;
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					}
				`,
				fragmentShader: `
					uniform float uTime;
					varying vec2 vUv;
					void main() {
						float alpha = (1.0 - vUv.y) * 0.35 * (0.8 + 0.2 * sin(uTime * 2.0));
						gl_FragColor = vec4(0.13, 0.9, 0.45, alpha);
					}
				`,
				uniforms: {
					uTime: { value: 0.0 }
				},
				transparent: true,
				side: THREE.DoubleSide,
				depthWrite: false
			});
			const coneGeo = new THREE.ConeGeometry(8, 60, 16, 1, true);
			const cone = new THREE.Mesh(coneGeo, coneMat);
			cone.position.set(0, -30, 0);
			cone.rotateX(Math.PI);
			scene.add(cone);

			// ── Upward-drifting ash/ember particles ───────────────
			const PARTICLE_COUNT = 120;
			const pPositions = new Float32Array(PARTICLE_COUNT * 3);
			const pSizes = new Float32Array(PARTICLE_COUNT);
			const pSeeds = new Float32Array(PARTICLE_COUNT);
			const pAmbers = new Float32Array(PARTICLE_COUNT);

			for (let i = 0; i < PARTICLE_COUNT; i++) {
				const angle = Math.random() * Math.PI * 2;
				const r = 30 + Math.random() * 25;
				pPositions[i * 3] = Math.cos(angle) * r;
				pPositions[i * 3 + 1] = -20 + Math.random() * 100;
				pPositions[i * 3 + 2] = Math.sin(angle) * r;
				pSizes[i] = 1.5 + Math.random() * 3.5;
				pSeeds[i] = Math.random();
				pAmbers[i] = Math.random() < 0.3 ? 1.0 : 0.0;
			}

			const particleGeo = new THREE.BufferGeometry();
			particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
			particleGeo.setAttribute('aSize', new THREE.BufferAttribute(pSizes, 1));
			particleGeo.setAttribute('aSeed', new THREE.BufferAttribute(pSeeds, 1));
			particleGeo.setAttribute('aAmber', new THREE.BufferAttribute(pAmbers, 1));

			const particleMat = new THREE.ShaderMaterial({
				vertexShader: `
					attribute float aSize;
					attribute float aSeed;
					attribute float aAmber;
					uniform float uTime;
					varying float vAmber;
					varying float vAlpha;
					void main() {
						vAmber = aAmber;
						float y = mod(position.y + uTime * 12.0 * (0.5 + aSeed * 0.5), 100.0) - 20.0;
						float sway = sin(uTime * 0.8 + aSeed * 6.28) * 3.0;
						vec3 pos = vec3(position.x + sway, y, position.z);
						vAlpha = 0.4 + 0.6 * sin(uTime * 2.0 + aSeed * 6.28);
						vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
						gl_PointSize = aSize * (200.0 / -mvPos.z);
						gl_Position = projectionMatrix * mvPos;
					}
				`,
				fragmentShader: `
					varying float vAmber;
					varying float vAlpha;
					void main() {
						float d = length(gl_PointCoord - 0.5);
						if (d > 0.5) discard;
						vec3 green = vec3(0.13, 0.9, 0.45);
						vec3 amber = vec3(0.98, 0.75, 0.14);
						vec3 col = mix(green, amber, vAmber);
						gl_FragColor = vec4(col, vAlpha * (1.0 - d * 2.0));
					}
				`,
				uniforms: {
					uTime: { value: 0.0 }
				},
				transparent: true,
				depthWrite: false,
				blending: THREE.AdditiveBlending
			});

			const particles = new THREE.Points(particleGeo, particleMat);
			scene.add(particles);

			// ── Mouse parallax ────────────────────────────────────
			let mouseX = 0;
			let mouseY = 0;
			const baseCamX = camera.position.x;
			const baseCamY = camera.position.y;
			handleMouseMove = (e: MouseEvent) => {
				const rect = canvas.getBoundingClientRect();
				mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
				mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
			};
			canvas.addEventListener('mousemove', handleMouseMove);

			// ── Animate ───────────────────────────────────────────
			let t = 0;
			const animate = () => {
				animId = requestAnimationFrame(animate);
				t += 0.016;

				// Throne animation — cinematic sway, gentle rocking
				throne.rotation.y = Math.sin(t * 0.25) * 0.6;
				throne.position.y = -22 + Math.sin(t * 0.4) * 4;
				throne.rotation.x = Math.sin(t * 0.3) * 0.08;

				// Pulsing light
				pulse.intensity = 10 + Math.sin(t * 1.5) * 4;

				// Update shader uniforms
				coneMat.uniforms.uTime.value = t;
				particleMat.uniforms.uTime.value = t;

				// Camera mouse parallax
				camera.position.x += (mouseX * 15 + baseCamX - camera.position.x) * 0.05;
				camera.position.y += (mouseY * 10 + baseCamY - camera.position.y) * 0.05;
				camera.lookAt(0, 15, 0);

				composer.render();
			};
			animate();
		})();

		return () => {
			cancelAnimationFrame(animId);
			if (handleMouseMove) canvas.removeEventListener('mousemove', handleMouseMove);
			composer?.dispose();
			renderer?.dispose();
		};
	});
</script>

<canvas bind:this={canvas} width="300" height="300" style="display:block;"></canvas>
