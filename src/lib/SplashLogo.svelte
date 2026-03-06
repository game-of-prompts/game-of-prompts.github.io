<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		let animId: number;
		let renderer: import('three').WebGLRenderer;
		let handleMouseMove: ((e: MouseEvent) => void) | null = null;

		(async () => {
			const THREE = await import('three');

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1000);
			camera.position.set(65, -8, 155);
			camera.lookAt(0, 15, 0);

			renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
			const pixelRatio = Math.min(window.devicePixelRatio, 2);
			renderer.setPixelRatio(pixelRatio);
			renderer.setSize(300, 300);
			renderer.setClearColor(0x000000, 0);
			renderer.toneMapping = THREE.ACESFilmicToneMapping;
			renderer.toneMappingExposure = 1.2;

			// ── LIGHTS ────────────────────────────────────────────
			scene.add(new THREE.AmbientLight(0x113322, 1.0));

			const keyLight = new THREE.DirectionalLight(0x4ade80, 4.5);
			keyLight.position.set(5, 2, 1).normalize();
			scene.add(keyLight);

			const rimLight = new THREE.DirectionalLight(0x86efac, 2.5);
			rimLight.position.set(-4, 3, -4).normalize();
			scene.add(rimLight);

			const fillLight = new THREE.DirectionalLight(0x22c55e, 1.5);
			fillLight.position.set(0, 0, 5).normalize();
			scene.add(fillLight);

			const topLight = new THREE.PointLight(0x86efac, 20, 150);
			topLight.position.set(0, 95, 10);
			scene.add(topLight);

			const underLight = new THREE.PointLight(0x22c55e, 15, 120);
			underLight.position.set(0, -50, 0);
			scene.add(underLight);

			const pulse = new THREE.PointLight(0x22c55e, 5, 200);
			pulse.position.set(0, 30, 80);
			scene.add(pulse);

			// ── ENVIRONMENT MAP ───────────────────────────────────
			const pmremScene = new THREE.Scene();
			pmremScene.add(new THREE.Mesh(
				new THREE.SphereGeometry(400, 32, 32),
				new THREE.ShaderMaterial({
					vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
					fragmentShader: `varying vec2 vUv; void main() { vec3 top = vec3(0.02, 0.25, 0.12); vec3 mid = vec3(0.0, 0.06, 0.03); vec3 bot = vec3(0.0, 0.02, 0.01); float t = vUv.y; vec3 col = t > 0.5 ? mix(mid, top, (t-0.5)*2.0) : mix(bot, mid, t*2.0); gl_FragColor = vec4(col, 1.0); }`,
					side: THREE.BackSide
				})
			));
			const pmrem = new THREE.PMREMGenerator(renderer);
			pmrem.compileCubemapShader();
			const envRT = pmrem.fromScene(pmremScene, 0, 0.1, 1000);
			scene.environment = envRT.texture;
			pmrem.dispose();

			// ── MATERIALS ─────────────────────────────────────────
			const mat = new THREE.MeshStandardMaterial({
				color: 0x22c55e,
				emissive: 0x0a3015,
				emissiveIntensity: 0.25,
				roughness: 0.15,
				metalness: 0.95,
				side: THREE.FrontSide,
				envMapIntensity: 2.0
			});

			const spikeMat = new THREE.MeshStandardMaterial({
				color: 0xbbf7d0,
				emissive: 0x86efac,
				emissiveIntensity: 3.5,
				roughness: 0.05,
				metalness: 0.95,
				side: THREE.FrontSide,
				envMapIntensity: 2.0
			});

			const edgeLineMat = new THREE.LineBasicMaterial({
				color: 0x86efac, transparent: true, opacity: 0.25
			});

			const throne = new THREE.Group();
			function add(geo: import('three').BufferGeometry, useMat?: import('three').Material) {
				throne.add(new THREE.Mesh(geo, useMat || mat));
				throne.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 30), edgeLineMat));
			}

			// ── THRONE GEOMETRY ───────────────────────────────────
			const seat = new THREE.BoxGeometry(42, 7, 16); seat.translate(0, 0, 0); add(seat);
			const cushion = new THREE.BoxGeometry(38, 3, 14); cushion.translate(0, 5, 0); add(cushion);
			const lArm = new THREE.BoxGeometry(4.5, 12, 16); lArm.translate(-21, 6, 0); add(lArm);
			const rArm = new THREE.BoxGeometry(4.5, 12, 16); rArm.translate(21, 6, 0); add(rArm);
			const lCap = new THREE.BoxGeometry(6, 2, 18); lCap.translate(-21, 13, 0); add(lCap);
			const rCap = new THREE.BoxGeometry(6, 2, 18); rCap.translate(21, 13, 0); add(rCap);
			const backSlab = new THREE.BoxGeometry(42, 60, 6); backSlab.translate(0, 33, -5); add(backSlab);
			const inner = new THREE.BoxGeometry(36, 50, 2); inner.translate(0, 30, -1.5); add(inner);
			const arch = new THREE.CylinderGeometry(11, 11, 6, 20, 1, false, 0, Math.PI);
			arch.rotateZ(Math.PI / 2); arch.translate(0, 63, -5); add(arch);

			for (const [sx, sh] of [[-16, 15], [-8, 20], [0, 25], [8, 20], [16, 15]] as [number, number][]) {
				const s = new THREE.ConeGeometry(2.5, sh, 4); s.translate(sx, 63 + sh / 2 + 2, -5); add(s, spikeMat);
			}
			for (const tx of [-13, -4.5, 4.5, 13]) {
				const tool = new THREE.CylinderGeometry(1.0, 1.0, 20, 6);
				tool.rotateZ(tx > 0 ? 0.2 : -0.2); tool.translate(tx, 32, -2.5); add(tool);
			}
			const e1 = new THREE.BoxGeometry(10, 2, 1.5); e1.translate(0, 23, -1.8); add(e1);
			const e2 = new THREE.BoxGeometry(10, 2, 1.5); e2.translate(0, 18, -1.8); add(e2);
			for (const [lx, lz] of [[-16, -14], [-16, 6], [16, -14], [16, 6]] as [number, number][]) {
				const lg = new THREE.BoxGeometry(4, 11, 4); lg.translate(lx, -9, lz); add(lg);
			}
			for (const lz of [-14, 6]) {
				const b = new THREE.BoxGeometry(28, 2, 2); b.translate(0, -12, lz); add(b);
			}

			throne.position.set(0, -22, 0);
			scene.add(throne);

			// ── GLOW SPRITES behind crown spikes ──────────────────
			// Additive-blended sprite planes that simulate bloom
			const glowTex = (() => {
				const size = 128;
				const c = document.createElement('canvas');
				c.width = size; c.height = size;
				const ctx = c.getContext('2d')!;
				const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
				grad.addColorStop(0, 'rgba(187, 247, 208, 1.0)');
				grad.addColorStop(0.15, 'rgba(134, 239, 172, 0.7)');
				grad.addColorStop(0.4, 'rgba(34, 197, 94, 0.25)');
				grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
				ctx.fillStyle = grad;
				ctx.fillRect(0, 0, size, size);
				const tex = new THREE.CanvasTexture(c);
				return tex;
			})();

			// Crown glow — large sprite behind the spikes for bloom-like effect
			const crownGlowMat = new THREE.SpriteMaterial({
				map: glowTex, color: 0x86efac, transparent: true,
				opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false
			});
			const crownGlow = new THREE.Sprite(crownGlowMat);
			crownGlow.position.set(0, 58, -10);
			crownGlow.scale.set(75, 50, 1);
			throne.add(crownGlow);

			// Individual spike tip glows — bright points at each spike tip
			for (const [sx, sh] of [[-16, 15], [-8, 20], [0, 25], [8, 20], [16, 15]] as [number, number][]) {
				const tipGlowMat = new THREE.SpriteMaterial({
					map: glowTex, color: 0xbbf7d0, transparent: true,
					opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false
				});
				const tipGlow = new THREE.Sprite(tipGlowMat);
				tipGlow.position.set(sx, 63 + sh + 2, -5);
				const tipScale = sx === 0 ? 20 : 14; // center spike biggest
				tipGlow.scale.set(tipScale, tipScale, 1);
				throne.add(tipGlow);
			}

			// Under-glow sprite
			const underGlowMat = new THREE.SpriteMaterial({
				map: glowTex, color: 0x22c55e, transparent: true,
				opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false
			});
			const underGlow = new THREE.Sprite(underGlowMat);
			underGlow.position.set(0, -15, 0);
			underGlow.scale.set(40, 30, 1);
			throne.add(underGlow);

			// ── VOLUMETRIC CONE ───────────────────────────────────
			const coneMat = new THREE.ShaderMaterial({
				vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
				fragmentShader: `uniform float uTime; varying vec2 vUv; void main() { float a = (1.0 - vUv.y) * 0.35 * (0.8 + 0.2 * sin(uTime * 2.0)); gl_FragColor = vec4(0.13, 0.9, 0.45, a); }`,
				uniforms: { uTime: { value: 0.0 } },
				transparent: true, side: THREE.DoubleSide, depthWrite: false
			});
			const cone = new THREE.Mesh(new THREE.ConeGeometry(18, 80, 32, 1, true), coneMat);
			cone.position.set(0, -22, 0);
			cone.rotateX(Math.PI);
			scene.add(cone);

			// ── PARTICLES ─────────────────────────────────────────
			const N = 120;
			const pp = new Float32Array(N * 3), ps = new Float32Array(N), psd = new Float32Array(N), pa = new Float32Array(N);
			for (let i = 0; i < N; i++) {
				const a = Math.random() * Math.PI * 2, r = 30 + Math.random() * 25;
				pp[i*3] = Math.cos(a)*r; pp[i*3+1] = -20+Math.random()*100; pp[i*3+2] = Math.sin(a)*r;
				ps[i] = 1.5+Math.random()*3.5; psd[i] = Math.random(); pa[i] = Math.random() < 0.3 ? 1.0 : 0.0;
			}
			const pGeo = new THREE.BufferGeometry();
			pGeo.setAttribute('position', new THREE.BufferAttribute(pp, 3));
			pGeo.setAttribute('aSize', new THREE.BufferAttribute(ps, 1));
			pGeo.setAttribute('aSeed', new THREE.BufferAttribute(psd, 1));
			pGeo.setAttribute('aAmber', new THREE.BufferAttribute(pa, 1));

			const pMat = new THREE.ShaderMaterial({
				vertexShader: `
					attribute float aSize; attribute float aSeed; attribute float aAmber;
					uniform float uTime; varying float vAmber; varying float vAlpha;
					void main() {
						vAmber = aAmber;
						float y = mod(position.y + uTime * 12.0 * (0.5 + aSeed * 0.5), 100.0) - 20.0;
						float sway = sin(uTime * 0.8 + aSeed * 6.28) * 3.0;
						vec3 pos = vec3(position.x + sway, y, position.z);
						vAlpha = 0.4 + 0.6 * sin(uTime * 2.0 + aSeed * 6.28);
						vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
						gl_PointSize = aSize * (200.0 / -mvPos.z);
						gl_Position = projectionMatrix * mvPos;
					}`,
				fragmentShader: `
					varying float vAmber; varying float vAlpha;
					void main() {
						float d = length(gl_PointCoord - 0.5);
						if (d > 0.5) discard;
						vec3 col = mix(vec3(0.13,0.9,0.45), vec3(0.98,0.75,0.14), vAmber);
						gl_FragColor = vec4(col, vAlpha * (1.0 - d * 2.0));
					}`,
				uniforms: { uTime: { value: 0.0 } },
				transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
			});
			scene.add(new THREE.Points(pGeo, pMat));

			// ── MOUSE PARALLAX ────────────────────────────────────
			let mx = 0, my = 0;
			const bx = camera.position.x, by = camera.position.y;
			handleMouseMove = (ev: MouseEvent) => {
				const r = canvas.getBoundingClientRect();
				mx = ((ev.clientX - r.left) / r.width - 0.5) * 2;
				my = -((ev.clientY - r.top) / r.height - 0.5) * 2;
			};
			canvas.addEventListener('mousemove', handleMouseMove);

			// ── ANIMATE ───────────────────────────────────────────
			let t = 0;
			const animate = () => {
				animId = requestAnimationFrame(animate);
				t += 0.016;
				throne.rotation.y = Math.sin(t * 0.25) * 0.6;
				throne.position.y = -22 + Math.sin(t * 0.4) * 4;
				throne.rotation.x = Math.sin(t * 0.3) * 0.08;
				pulse.intensity = 5 + Math.sin(t * 1.5) * 2;
				crownGlowMat.opacity = 0.65 + Math.sin(t * 1.2) * 0.2;
				coneMat.uniforms.uTime.value = t;
				pMat.uniforms.uTime.value = t;
				camera.position.x += (mx * 15 + bx - camera.position.x) * 0.05;
				camera.position.y += (my * 10 + by - camera.position.y) * 0.05;
				camera.lookAt(0, 12, 0);
				renderer.render(scene, camera);
			};
			animate();
		})();

		return () => {
			cancelAnimationFrame(animId);
			if (handleMouseMove) canvas.removeEventListener('mousemove', handleMouseMove);
			renderer?.dispose();
		};
	});
</script>

<canvas bind:this={canvas} width="300" height="300"></canvas>

<style>
	canvas {
		display: block;
		background: transparent;
		border: none;
		outline: none;
	}
</style>
