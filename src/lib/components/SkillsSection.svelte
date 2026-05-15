<script lang="ts">
	import { onMount } from 'svelte';
	import { animateSkills } from '$lib/animations/gsap';
	import { DATA } from '$lib/data/portfolio';

	const skills = [
		...DATA.skills.languages,
		...DATA.skills.frameworks,
		...DATA.skills.stateManagement
	];

	onMount(() => {
		animateSkills('.skill-beat');
	});
</script>

<div class="pt-8">
	<h3 class="text-xs font-bold uppercase tracking-[0.3em] mb-4 opacity-70 border-b newspaper-border pb-2">
		Journalistic Beats & Expertise
	</h3>
	<div class="flex flex-wrap gap-x-4 gap-y-2">
		{#each skills as skill}
			<span class="skill-beat text-sm font-bold uppercase tracking-widest text-accent hover:underline cursor-default">
				[{skill}]
			</span>
		{/each}
	</div>
</div>
