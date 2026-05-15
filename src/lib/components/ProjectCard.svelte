<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project } = $props<{ project: Project }>();
</script>

<article class="project-card h-full flex flex-col border newspaper-border p-6 hover:bg-foreground/5 transition-all group">
	<div class="flex-grow">
		<h3 class="text-2xl md:text-3xl font-black mb-4 leading-tight group-hover:text-accent transition-colors uppercase">
			{project.title}
		</h3>
		
		<div class="mb-4 text-[10px] font-bold uppercase tracking-widest opacity-70 border-b newspaper-border pb-1">
			Reporter: {project.tags.join(', ')}
		</div>

		<p class="text-base leading-relaxed mb-6 opacity-90 text-justify">
			{project.description}
		</p>
	</div>

	<div class="flex flex-col gap-4 mt-auto">
		<div class="flex gap-4 text-xs font-bold uppercase tracking-widest">
			<a href={project.demoLink} target="_blank" class="hover:text-accent transition-colors">
				[Live Demo]
			</a>
			<a href={project.githubLink} target="_blank" class="hover:text-accent transition-colors">
				[Source Code]
			</a>
		</div>
		
		<div class="pt-4 border-t newspaper-border flex justify-between items-center text-[10px] font-bold opacity-50">
			<span>SECTION {project.section}</span>
			<span>{project.page}</span>
		</div>
	</div>
</article>
