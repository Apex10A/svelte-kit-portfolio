<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project } = $props<{ project: Project }>();
	
	const getCategoryClass = (section: string) => {
		switch (section) {
			case 'TECHNOLOGY': return 'cat-tech';
			case 'DESIGN': return 'cat-design';
			case 'BUSINESS': return 'cat-business';
			default: return '';
		}
	};
</script>

<article class="article-card flex flex-col h-full group">
	<div class="mb-6 flex justify-between items-start">
		<span class="text-[10px] font-black tracking-[0.2em] uppercase px-2 py-1 border-2 {getCategoryClass(project.section)}">
			{project.section}
		</span>
		<span class="text-[10px] font-bold opacity-40 uppercase tracking-widest">{project.page}</span>
	</div>

	<div class="flex-grow">
		<h3 class="text-3xl font-black mb-4 leading-none group-hover:text-accent transition-colors uppercase tracking-tight">
			{project.title}
		</h3>
		
		<div class="mb-6 italic text-xs opacity-70 border-l-4 border-accent pl-4">
			Reported by the Engineering Desk • {project.tags.slice(0, 3).join(', ')}
		</div>

		<p class="text-sm md:text-base leading-relaxed mb-8 text-justify opacity-80">
			{project.description}
		</p>
	</div>

	<div class="mt-auto pt-6 border-t-2 border-foreground/10 flex items-center justify-between">
		<div class="flex gap-4">
			<a href={project.demoLink} target="_blank" class="text-[10px] font-black uppercase tracking-widest border-b-2 border-accent pb-1 hover:text-accent transition-colors">
				View Story
			</a>
			<a href={project.githubLink} target="_blank" class="text-[10px] font-black uppercase tracking-widest border-b-2 border-foreground pb-1 hover:text-accent hover:border-accent transition-colors">
				Source
			</a>
		</div>
		
		<div class="w-12 h-12 flex items-center justify-center border-2 border-foreground/20 rounded-full group-hover:border-accent group-hover:rotate-45 transition-all">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="group-hover:text-accent"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
		</div>
	</div>
</article>
