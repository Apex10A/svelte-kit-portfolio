<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let animationId: number;

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		life: number;
		maxLife: number;
		size: number;
	}

	let particles: Particle[] = [];

	function createParticle(x: number, y: number): Particle {
		const angle = Math.random() * Math.PI * 2;
		const velocity = Math.random() * 2 + 0.5;
		return {
			x,
			y,
			vx: Math.cos(angle) * velocity,
			vy: Math.sin(angle) * velocity,
			life: 1,
			maxLife: Math.random() * 1.5 + 1,
			size: Math.random() * 3 + 1
		};
	}

	function animate() {
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;

		// Clear canvas with semi-transparent background for trails
		ctx.fillStyle = 'rgba(26, 23, 16, 0.1)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Update and draw particles
		particles = particles.filter((p) => p.life > 0);

		particles.forEach((p, i) => {
			p.x += p.vx;
			p.y += p.vy;
			p.life -= 0.01;
			p.vy += 0.1; // Gravity

			const alpha = (p.life / p.maxLife) * 0.6;
			ctx.fillStyle = `rgba(218, 180, 105, ${alpha})`;
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.size * (p.life / p.maxLife), 0, Math.PI * 2);
			ctx.fill();
		});

		// Randomly create new particles
		if (Math.random() < 0.3) {
			particles.push(createParticle(Math.random() * canvas.width, 0));
		}

		animationId = requestAnimationFrame(animate);
	}

	onMount(() => {
		if (canvas) {
			const rect = canvas.getBoundingClientRect();
			canvas.width = rect.width;
			canvas.height = rect.height;
			animate();
		}

		return () => {
			if (animationId) cancelAnimationFrame(animationId);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="absolute inset-0 w-full h-full"
	style="background: linear-gradient(135deg, rgba(30, 27, 18, 0.5) 0%, rgba(50, 40, 20, 0.3) 100%);"
></canvas>

<style>
	canvas {
		display: block;
	}
</style>
