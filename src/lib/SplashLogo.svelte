<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		let animId: number;
		let renderer: import('three').WebGLRenderer;

		(async () => {
			const THREE = await import('three');

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1000);
			camera.position.set(0, 0, 200);

			renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setSize(300, 300);
			renderer.setClearColor(0x000000, 0);

			// ── Lights ────────────────────────────────────────────
			scene.add(new THREE.AmbientLight(0xffffff, 1.0));
			const keyLight = new THREE.DirectionalLight(0x22c55e, 3.5);
			keyLight.position.set(0.3, 0.5, 1);
			scene.add(keyLight);
			const rimLight = new THREE.DirectionalLight(0x86efac, 1.8);
			rimLight.position.set(-1, 1, 0.3);
			scene.add(rimLight);
			const pulse = new THREE.PointLight(0x22c55e, 90, 400);
			pulse.position.set(0, 10, 80);
			scene.add(pulse);

			// ── Materials ─────────────────────────────────────────
			const mat = new THREE.MeshStandardMaterial({
				color: 0x22c55e,
				emissive: 0x22c55e,
				emissiveIntensity: 0.55,
				roughness: 0.15,
				metalness: 0.85,
				side: THREE.DoubleSide
			});
			const wireMat = new THREE.MeshBasicMaterial({
				color: 0x86efac,
				wireframe: true,
				transparent: true,
				opacity: 0.20,
				side: THREE.DoubleSide
			});

			const throne = new THREE.Group();

			function add(geo: import('three').BufferGeometry) {
				throne.add(new THREE.Mesh(geo, mat));
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

			// Crown spikes — 5 spikes
			const spikes = [
				[-16, 15], [-8, 20], [0, 25], [8, 20], [16, 15]
			] as [number, number][];
			for (const [sx, sh] of spikes) {
				const spike = new THREE.ConeGeometry(2.5, sh, 4);
				spike.translate(sx, 63 + sh / 2 + 2, -5);
				add(spike);
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
			for (const [lx, lz] of [[-16, -14], [-16, 6], [16, -14], [16, 6]] as [number,number][]) {
				const leg = new THREE.BoxGeometry(4, 11, 4);
				leg.translate(lx, -9, lz);
				add(leg);
			}

			throne.position.set(0, -22, 0);
			scene.add(throne);

			// ── Orbiting particles ────────────────────────────────
			const particles = new THREE.Group();
			const pGeo = new THREE.SphereGeometry(1.3, 6, 6);
			for (let i = 0; i < 44; i++) {
				const pMat = new THREE.MeshBasicMaterial({
					color: i % 5 === 0 ? 0xfbbf24 : 0x4ade80,
					transparent: true,
					opacity: 0.65 + Math.random() * 0.35
				});
				const p = new THREE.Mesh(pGeo, pMat);
				const angle = (i / 44) * Math.PI * 2;
				const r = 72 + Math.random() * 20;
				p.position.set(Math.cos(angle) * r, (Math.random() - 0.5) * 50, Math.sin(angle) * r);
				p.userData = { angle, r, yOff: p.position.y, speed: 0.003 + Math.random() * 0.004, yPhase: Math.random() * Math.PI * 2 };
				particles.add(p);
			}
			scene.add(particles);

			// ── Animate ───────────────────────────────────────────
			let t = 0;
			const animate = () => {
				animId = requestAnimationFrame(animate);
				t += 0.016;
				throne.rotation.y += 0.008;
				throne.rotation.x = Math.sin(t * 0.3) * 0.10;
				pulse.intensity = 70 + Math.sin(t * 1.5) * 25;
				for (const child of particles.children) {
					const d = child.userData;
					d.angle += d.speed;
					child.position.x = Math.cos(d.angle) * d.r;
					child.position.z = Math.sin(d.angle) * d.r;
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

<canvas bind:this={canvas} width="300" height="300" style="display:block;"></canvas>
