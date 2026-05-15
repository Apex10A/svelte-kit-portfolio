<script lang="ts">
	import { onMount } from 'svelte';
	import { animateSectionBanner } from '$lib/animations/gsap';
	import { DATA } from '$lib/data/portfolio';
	import SkillsSection from './SkillsSection.svelte';

	let banner = $state<HTMLElement | null>(null);

	onMount(() => {
		if (banner) animateSectionBanner(banner);
	});
</script>

<section id="about" class="w-full px-6">
	<div class="max-w-7xl mx-auto">
		<div bind:this={banner} class="section-banner">
			About The Author
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
			<!-- Left: Pull Quote -->
			<div class="flex items-center">
				<blockquote class="text-3xl md:text-4xl lg:text-5xl font-headline font-black italic text-accent leading-tight border-l-8 border-accent pl-8 py-4">
					"Code is not just logic; it is a narrative of human intent, etched into the digital fabric of our modern society."
				</blockquote>
			</div>

			<!-- Right: Bio -->
			<div class="space-y-6 text-lg leading-relaxed text-justify">
				{#each DATA.about.split('\n\n') as paragraph}
					<p>{@html paragraph}</p>
				{/each}
				
				<SkillsSection />
			</div>
		</div>
	</div>
</section>
