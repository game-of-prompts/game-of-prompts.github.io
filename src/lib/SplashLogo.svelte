<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let container: HTMLDivElement;

	onMount(() => {
		const width = 200;
		const height = 200;

		// Scene
		const scene = new THREE.Scene();

		// Camera
		const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
		camera.position.z = 4;

		// Renderer
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor(0x000000, 0);
		container.appendChild(renderer.domElement);

		// Central geometry — Icosahedron wireframe + subtle filled mesh
		const icoGeom = new THREE.IcosahedronGeometry(1, 1);

		// Wireframe
		const wireMat = new THREE.MeshBasicMaterial({
			color: 0x22c55e,
			wireframe: true,
			transparent: true,
			opacity: 0.9
		});
		const wireMesh = new THREE.Mesh(icoGeom, wireMat);
		scene.add(wireMesh);

		// Subtle filled mesh inside
		const fillMat = new THREE.MeshPhongMaterial({
			color: 0x22c55e,
			transparent: true,
			opacity: 0.08,
			side: THREE.DoubleSide
		});
		const fillMesh = new THREE.Mesh(icoGeom, fillMat);
		fillMesh.scale.setScalar(0.98);
		scene.add(fillMesh);

		// Orbiting particles (50 small spheres)
		const particleCount = 50;
		const particleGeom = new THREE.SphereGeometry(0.03, 6, 6);
		const particles: { mesh: THREE.Mesh; angle: number; radius: number; speed: number; yOffset: number; ySpeed: number }[] = [];

		for (let i = 0; i < particleCount; i++) {
			const isAmber = Math.random() > 0.7;
			const mat = new THREE.MeshBasicMaterial({
				color: isAmber ? 0xf59e0b : 0x22c55e,
				transparent: true,
				opacity: 0.5 + Math.random() * 0.5
			});
			const mesh = new THREE.Mesh(particleGeom, mat);

			const angle = Math.random() * Math.PI * 2;
			const radius = 1.4 + Math.random() * 1.0;
			const speed = 0.003 + Math.random() * 0.008;
			const yOffset = (Math.random() - 0.5) * 2;
			const ySpeed = 0.001 + Math.random() * 0.003;

			mesh.position.set(
				Math.cos(angle) * radius,
				yOffset,
				Math.sin(angle) * radius
			);
			scene.add(mesh);
			particles.push({ mesh, angle, radius, speed, yOffset, ySpeed });
		}

		// Lights
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
		scene.add(ambientLight);

		// Pulsing green point light
		const pointLight = new THREE.PointLight(0x22c55e, 2, 10);
		pointLight.position.set(0, 0, 0);
		scene.add(pointLight);

		// Animation
		let animId: number;
		let time = 0;

		function animate() {
			animId = requestAnimationFrame(animate);
			time += 0.016;

			// Rotate central geometry
			wireMesh.rotation.y += 0.005;
			wireMesh.rotation.x += 0.002;
			fillMesh.rotation.y = wireMesh.rotation.y;
			fillMesh.rotation.x = wireMesh.rotation.x;

			// Pulse point light
			pointLight.intensity = 1.5 + Math.sin(time * 2) * 0.8;

			// Animate particles
			for (const p of particles) {
				p.angle += p.speed;
				p.yOffset += Math.sin(time * p.ySpeed * 100) * 0.002;
				p.mesh.position.x = Math.cos(p.angle) * p.radius;
				p.mesh.position.z = Math.sin(p.angle) * p.radius;
				p.mesh.position.y = p.yOffset;
			}

			renderer.render(scene, camera);
		}

		animate();

		// Cleanup
		return () => {
			cancelAnimationFrame(animId);
			renderer.dispose();
			scene.traverse((obj) => {
				if (obj instanceof THREE.Mesh) {
					obj.geometry.dispose();
					if (Array.isArray(obj.material)) {
						obj.material.forEach(m => m.dispose());
					} else {
						obj.material.dispose();
					}
				}
			});
			if (container && renderer.domElement.parentNode === container) {
				container.removeChild(renderer.domElement);
			}
		};
	});
</script>

<div bind:this={container} class="splash-logo-canvas"></div>

<style>
	.splash-logo-canvas {
		width: 200px;
		height: 200px;
		position: relative;
		z-index: 1;
	}

	.splash-logo-canvas :global(canvas) {
		display: block;
	}
</style>
