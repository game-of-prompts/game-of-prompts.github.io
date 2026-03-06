<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		let animId: number;
		let renderer: import('three').WebGLRenderer;

		(async () => {
			const THREE = await import('three');

			// ── Scene ──────────────────────────────────────────────
			const scene = new THREE.Scene();

			const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
			camera.position.set(0, 0, 160);

			renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setSize(200, 200);
			renderer.setClearColor(0x000000, 0);

			// ── Lights ────────────────────────────────────────────
			const ambient = new THREE.AmbientLight(0xffffff, 0.6);
			scene.add(ambient);

			const frontLight = new THREE.DirectionalLight(0x22c55e, 3.0);
			frontLight.position.set(0, 0, 1);
			scene.add(frontLight);

			const topLight = new THREE.DirectionalLight(0x4ade80, 1.5);
			topLight.position.set(0.5, 1, 0.5);
			scene.add(topLight);

			const pointLight = new THREE.PointLight(0x22c55e, 60, 300);
			pointLight.position.set(0, 0, 80);
			scene.add(pointLight);

			// ── Logo as canvas texture on extruded shape ──────────
			// Draw the logo onto a 2D canvas, use as texture on a 3D extruded disc
			const texCanvas = document.createElement('canvas');
			texCanvas.width = 256;
			texCanvas.height = 256;
			const ctx = texCanvas.getContext('2d')!;

			// Load the logo image and draw it green-on-black
			const img = new Image();
			img.src = '/gop-logo.png';
			await new Promise<void>(res => { img.onload = () => res(); img.onerror = () => res(); });

			// Black background
			ctx.fillStyle = '#000000';
			ctx.fillRect(0, 0, 256, 256);

			// Draw logo tinted green using composite
			ctx.globalCompositeOperation = 'source-over';
			ctx.drawImage(img, 0, 0, 256, 256);

			// Tint to neon green
			ctx.globalCompositeOperation = 'multiply';
			ctx.fillStyle = '#00ff00';
			ctx.fillRect(0, 0, 256, 256);
			ctx.globalCompositeOperation = 'source-over';

			const logoTexture = new THREE.CanvasTexture(texCanvas);

			// ── Extruded hexagonal prism as the 3D base ───────────
			// Create a rounded octagon as the face shape
			const faceShape = new THREE.Shape();
			const r = 40; // radius
			const sides = 8;
			for (let i = 0; i < sides; i++) {
				const angle = (i / sides) * Math.PI * 2 - Math.PI / sides;
				const x = Math.cos(angle) * r;
				const y = Math.sin(angle) * r;
				if (i === 0) faceShape.moveTo(x, y);
				else faceShape.lineTo(x, y);
			}
			faceShape.closePath();

			const extrudeSettings = {
				depth: 10,
				bevelEnabled: true,
				bevelThickness: 2,
				bevelSize: 1.5,
				bevelSegments: 4
			};

			const prismGeo = new THREE.ExtrudeGeometry(faceShape, extrudeSettings);

			// Front face: logo texture; sides/back: neon green metallic
			const frontMat = new THREE.MeshStandardMaterial({
				map: logoTexture,
				emissiveMap: logoTexture,
				emissive: 0x22c55e,
				emissiveIntensity: 0.5,
				roughness: 0.3,
				metalness: 0.6
			});
			const sideMat = new THREE.MeshStandardMaterial({
				color: 0x22c55e,
				emissive: 0x0d4d24,
				emissiveIntensity: 0.6,
				roughness: 0.2,
				metalness: 0.8
			});

			// ExtrudeGeometry groups: 0 = face, 1 = side bevel, 2 = back face
			const prism = new THREE.Mesh(prismGeo, [frontMat, sideMat, sideMat]);
			// Centre the geometry (extrude goes +Z, move back half depth)
			prism.position.z = -(extrudeSettings.depth / 2);
			scene.add(prism);

			// ── Glowing edge ring ─────────────────────────────────
			const ringGeo = new THREE.TorusGeometry(r + 2, 0.8, 8, 64);
			const ringMat = new THREE.MeshBasicMaterial({
				color: 0x4ade80,
				transparent: true,
				opacity: 0.7
			});
			const ring = new THREE.Mesh(ringGeo, ringMat);
			ring.position.z = 0;
			scene.add(ring);

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

				// Rotate the 3D logo prism
				prism.rotation.y += 0.010;
				prism.rotation.x = Math.sin(t * 0.4) * 0.15;
				ring.rotation.y = prism.rotation.y;
				ring.rotation.x = prism.rotation.x;

				// Pulse light and ring
				pointLight.intensity = 50 + Math.sin(t * 1.5) * 20;
				ringMat.opacity = 0.5 + Math.sin(t * 2) * 0.2;

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
