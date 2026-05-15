import * as THREE from 'three';

export function initInkParticles(canvas: HTMLCanvasElement) {
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		alpha: true
	});

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
	camera.position.z = 5;

	const particleCount = 800;
	const positions = new Float32Array(particleCount * 3);
	const velocities = new Float32Array(particleCount * 3);
	const sizes = new Float32Array(particleCount);

	const getThemeColors = () => {
		const isDark = document.documentElement.classList.contains('dark');
		return {
			particle: isDark ? new THREE.Color('#f5e6c8') : new THREE.Color('#1a1a1a')
		};
	};

	let { particle: particleColor } = getThemeColors();

	for (let i = 0; i < particleCount; i++) {
		positions[i * 3] = (Math.random() - 0.5) * 10;
		positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
		positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

		velocities[i * 3] = (Math.random() - 0.5) * 0.01;
		velocities[i * 3 + 1] = Math.random() * 0.02 + 0.01;
		velocities[i * 3 + 2] = 0;

		sizes[i] = Math.random() * 0.05 + 0.02;
	}

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

	const material = new THREE.PointsMaterial({
		size: 0.05,
		color: particleColor,
		transparent: true,
		opacity: 0.6,
		blending: THREE.NormalBlending
	});

	const points = new THREE.Points(geometry, material);
	scene.add(points);

	let mouseX = 0;
	let mouseY = 0;
	let targetMouseX = 0;
	let targetMouseY = 0;

	const onMouseMove = (event: MouseEvent) => {
		const rect = canvas.getBoundingClientRect();
		targetMouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
		targetMouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
	};

	window.addEventListener('mousemove', onMouseMove);

	const onResize = () => {
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
	};

	window.addEventListener('resize', onResize);
	onResize();

	let animationId: number;
	const clock = new THREE.Clock();

	const animate = () => {
		animationId = requestAnimationFrame(animate);
		const delta = clock.getElapsedTime();

		// Update particle color based on theme
		const currentColors = getThemeColors();
		material.color.lerp(currentColors.particle, 0.05);

		// Smooth mouse movement
		mouseX += (targetMouseX - mouseX) * 0.1;
		mouseY += (targetMouseY - mouseY) * 0.1;

		const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
		const posArray = posAttr.array as Float32Array;

		for (let i = 0; i < particleCount; i++) {
			const ix = i * 3;
			const iy = i * 3 + 1;
			const iz = i * 3 + 2;

			// Base movement (floating up)
			posArray[ix] += velocities[ix] + Math.sin(delta * 0.5 + i) * 0.002;
			posArray[iy] += velocities[iy];

			// Mouse repulsion
			const dx = posArray[ix] - mouseX * 5;
			const dy = posArray[iy] - mouseY * 5;
			const dist = Math.sqrt(dx * dx + dy * dy);

			if (dist < 1.5) {
				const force = (1.5 - dist) * 0.02;
				posArray[ix] += dx * force;
				posArray[iy] += dy * force;
			}

			// Boundary check
			if (posArray[iy] > 5) {
				posArray[iy] = -5;
				posArray[ix] = (Math.random() - 0.5) * 10;
			}
			if (Math.abs(posArray[ix]) > 6) {
				posArray[ix] *= -0.9;
			}
		}

		posAttr.needsUpdate = true;
		renderer.render(scene, camera);
	};

	animate();

	return () => {
		cancelAnimationFrame(animationId);
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('resize', onResize);
		geometry.dispose();
		material.dispose();
		renderer.dispose();
	};
}
