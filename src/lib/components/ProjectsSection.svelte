<script lang="ts">
	import { onMount } from 'svelte';
	import { projects } from '$lib/data/projects';
	import ProjectCard from './ProjectCard.svelte';
	import { animateSectionBanner, animateCards } from '$lib/animations/gsap';

	let banner = $state<HTMLElement | null>(null);

	onMount(() => {
		if (banner) animateSectionBanner(banner);
		animateCards('.project-card');
	});
</script>

<section id="projects" class="w-full px-6 py-12">
	<div class="max-w-7xl mx-auto">
		<div bind:this={banner} class="section-banner">
			Top Stories
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>
