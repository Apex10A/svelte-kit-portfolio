<script lang="ts">
	import { onMount } from 'svelte';
	import { animateSectionBanner } from '$lib/animations/gsap';
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
				<p>
					Specializing in high-performance web architecture and immersive user interfaces, I have spent years refining the art of digital craftsmanship. My journey began with a curiosity about how data flows across the globe, eventually leading to a mastery of the tools that power the contemporary internet.
				</p>
				<p>
					From the intricate dance of frontend frameworks like SvelteKit and React to the robust reliability of backend systems using Node.js and PostgreSQL, my work is defined by a relentless pursuit of technical excellence. I believe that every product should tell a story of quality, stability, and thoughtful design.
				</p>
				
				<SkillsSection />
			</div>
		</div>
	</div>
</section>
