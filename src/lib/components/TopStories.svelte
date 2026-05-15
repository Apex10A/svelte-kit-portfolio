<script lang="ts">
	import { DATA } from '$lib/data/portfolio';

	const stories = DATA.projects.slice(1, 4).map((p, index) => ({
		id: (index + 2).toString(),
		category: ['TECHNOLOGY', 'DESIGN', 'BUSINESS'][index % 3],
		categoryCode: `${String.fromCharCode(65 + (index % 3))}${index + 1}`,
		title: p.title,
		techStack: p.technologies.map(t => t.toUpperCase()),
		excerpt: p.description,
		tags: p.technologies.slice(0, 3)
	}));
</script>

<section class="top-stories dark py-20 px-4 md:px-8">
	<div class="max-w-7xl mx-auto">
		<!-- Top Divider -->
		<div class="h-px bg-gradient-to-r from-transparent via-current to-transparent mb-12"></div>

		<!-- Section Header -->
		<div class="relative mb-16">
			<div class="grid grid-cols-3 gap-2 mb-4">
				<div class="h-px bg-current/30"></div>
				<div class="h-px bg-current/30"></div>
				<div class="h-px bg-current/30"></div>
			</div>
			<h2 class="text-section-header font-headline font-bold text-center tracking-tight">
				TOP STORIES
			</h2>
			<div class="grid grid-cols-3 gap-2 mt-4">
				<div class="h-px bg-current/30"></div>
				<div class="h-px bg-current/30"></div>
				<div class="h-px bg-current/30"></div>
			</div>
		</div>

		<!-- Stories Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each stories as story (story.id)}
				<article
					class="relative border-2 border-current p-8 transition-all duration-500 hover:shadow-lg group"
					style="background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%); box-shadow: 8px 8px 0px var(--border-color);"
				>
					<!-- Category Badge -->
					<div class="mb-6">
						<span class="inline-block text-xs font-body font-bold tracking-wider opacity-70">
							{story.categoryCode}
							<span class="text-accent">|</span>
							{story.category}
						</span>
					</div>

					<!-- Title -->
					<h3 class="font-headline font-bold text-2xl md:text-3xl leading-tight mb-6 group-hover:text-accent transition-colors duration-300">
						{story.title}
					</h3>

					<!-- Tech Stack -->
					<div class="mb-6 text-xs font-body tracking-widest opacity-70">
						<p>TECH STACK:</p>
						<p class="mt-1">{story.techStack.join(' · ')}</p>
					</div>

					<!-- Excerpt -->
					<p class="font-body text-base leading-relaxed opacity-85">
						{story.excerpt}
					</p>

					<!-- Tags (optional) -->
					{#if story.tags}
						<div class="mt-8 flex flex-wrap gap-2">
							{#each story.tags as tag}
								<span class="inline-block px-3 py-1 border-px border-current/30 text-xs font-body tracking-wider opacity-60">
									{tag}
								</span>
							{/each}
						</div>
					{/if}

					<!-- Hover Effect -->
					<div
						class="absolute inset-0 border-2 border-current opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
					></div>
				</article>
			{/each}
		</div>

		<!-- Bottom Divider -->
		<div class="h-px bg-gradient-to-r from-transparent via-current to-transparent mt-16"></div>
	</div>
</section>

<style>
	:global(.top-stories) {
		background-color: var(--background);
		color: var(--foreground);
	}
</style>
