<script lang="ts">
	import { onMount } from 'svelte';
	import { projects } from '$lib/data/projects';
	import ProjectCard from './ProjectCard.svelte';
	import { revealOnScroll, staggerReveal } from '$lib/animations/gsap';

	let section = $state<HTMLElement | null>(null);

	onMount(() => {
		if (section) revealOnScroll(section);
		staggerReveal('.project-card');
	});
</script>

<section id="projects" class="section-padding" bind:this={section}>
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
				Featured <span class="text-brand">Projects</span>
			</h2>
			<div class="w-20 h-2 bg-brand mx-auto rounded-full"></div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>
