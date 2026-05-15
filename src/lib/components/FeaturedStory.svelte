<script lang="ts">
	import InkParticles from './InkParticles.svelte';
	import { DATA } from '$lib/data/portfolio';

	const firstProject = DATA.projects[0];
	const story = {
		title: firstProject.title,
		subtitle: firstProject.description,
		author: DATA.name,
		role: DATA.role,
		techStack: firstProject.technologies.join(', ').toUpperCase(),
		breakingTag: 'BREAKING',
		primaryCTA: 'VIEW PROJECT',
		primaryLink: firstProject.external,
		secondaryCTA: 'GITHUB',
		secondaryLink: firstProject.github
	};
</script>

<section class="featured-story dark py-20 px-4 md:px-8">
	<div class="max-w-7xl mx-auto">
		<!-- Top Divider -->
		<div class="h-px bg-gradient-to-r from-transparent via-current to-transparent mb-12"></div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
			<!-- Content Column -->
			<div class="lg:col-span-2 space-y-8">
				<!-- Breaking Tag -->
				<div class="inline-block">
					<span class="inline-block px-4 py-2 bg-accent text-white font-headline font-bold text-sm tracking-wider">
						{story.breakingTag}
					</span>
				</div>

				<!-- Headline -->
				<h1 class="text-hero-headline font-headline font-bold leading-tight">
					{story.title}
				</h1>

				<!-- Subtitle -->
				<p class="text-lg md:text-xl font-body italic opacity-90 max-w-2xl leading-relaxed">
					{story.subtitle}
				</p>

				<!-- Author Info -->
				<div class="flex flex-col gap-2 border-l-2 border-accent pl-4">
					<p class="font-body font-bold">
						<span class="text-accent">|</span> BY {story.author} | {story.role}
					</p>
					<p class="font-body text-sm tracking-wide opacity-75">
						{story.techStack}
					</p>
				</div>

				<!-- CTAs -->
				<div class="flex flex-col sm:flex-row gap-4 pt-4">
					<a
						href={story.primaryLink}
						class="px-6 py-3 border-2 border-current font-headline font-bold text-sm tracking-wider hover:bg-white/5 transition-all duration-300"
					>
						{story.primaryCTA} →
					</a>
					<a
						href={story.secondaryLink}
						class="px-6 py-3 bg-accent text-white font-headline font-bold text-sm tracking-wider hover:opacity-90 transition-all duration-300"
					>
						{story.secondaryCTA} →
					</a>
				</div>
			</div>

			<!-- Visual Column -->
			<div class="lg:col-span-1 flex justify-center lg:justify-end">
				<div class="relative w-full max-w-sm h-96 border-2 border-current/50 bg-dark-ink/30">
					<InkParticles />
					<div class="absolute inset-0 flex items-center justify-center text-center text-sm opacity-50">
						<div>
							<svg
								class="w-12 h-12 mx-auto mb-3 opacity-60"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
							>
								<path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
								<path d="M12 7v5l3.5 3.5" />
							</svg>
							Ink particle effect
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Excerpt Text -->
		<div class="mt-16 border-t-2 border-current/30 pt-8">
			<div class="max-w-3xl">
				<p class="font-body text-base leading-relaxed">
					<span class="text-3xl font-headline font-bold text-accent mr-2">T</span>
					his portfolio showcases a decade of building web experiences that solve real problems. Specializing in React, Node.js, and TypeScript, this full-stack engineer has shipped products that scale, from startups to enterprise platforms.
				</p>
			</div>
		</div>

		<!-- Bottom Divider -->
		<div class="h-px bg-gradient-to-r from-transparent via-current to-transparent mt-12"></div>
	</div>
</section>

<style>
	:global(.featured-story) {
		background-color: var(--background);
		color: var(--foreground);
	}

	.featured-story :global(a) {
		color: var(--foreground);
	}

	.featured-story :global(a:hover) {
		color: var(--foreground);
	}
</style>
