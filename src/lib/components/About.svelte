<script lang="ts">
	import { onMount } from 'svelte';
	import { revealOnScroll, staggerReveal } from '$lib/animations/gsap';

	let section = $state<HTMLElement | null>(null);
	let skillsGrid = $state<HTMLElement | null>(null);

	const skills = [
		'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 
		'Next.js', 'SvelteKit', 'Node.js', 'TailwindCSS', 'Three.js'
	];

	onMount(() => {
		if (section) revealOnScroll(section);
		if (skillsGrid) staggerReveal('.skill-tag');
	});
</script>

<section id="about" class="section-padding bg-slate-50 dark:bg-black/20" bind:this={section}>
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<div>
				<h2 class="text-4xl md:text-5xl font-black mb-8 tracking-tighter uppercase">
					About <span class="text-brand">Me</span>
				</h2>
				<p class="text-lg text-foreground/70 leading-relaxed mb-6">
					I am a passionate Full-Stack Developer with a deep love for creating interactive and visually stunning web experiences. With expertise in both frontend and backend technologies, I bridge the gap between design and functionality.
				</p>
				<p class="text-lg text-foreground/70 leading-relaxed">
					My approach focuses on writing clean, maintainable code while pushing the boundaries of what's possible in the browser. Whether it's a complex 3D scene or a high-traffic API, I strive for excellence in every pixel and every line of code.
				</p>
			</div>

			<div>
				<h3 class="text-2xl font-bold mb-8 uppercase tracking-widest text-brand">Tech Stack</h3>
				<div bind:this={skillsGrid} class="flex flex-wrap gap-4">
					{#each skills as skill}
						<span class="skill-tag px-6 py-3 bg-white dark:bg-card-bg border border-brand/20 rounded-xl font-medium shadow-sm hover:border-brand transition-colors">
							{skill}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
