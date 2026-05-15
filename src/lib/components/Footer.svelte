<script lang="ts">
	import { DATA } from '$lib/data/portfolio';
	const year = new Date().getFullYear();
</script>

<footer class="w-full px-6 py-8 mt-12">
	<div class="max-w-7xl mx-auto">
		<div class="border-t-4 border-b-2 border-foreground h-2 mb-8"></div>
		
		<div class="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
			<div class="text-center md:text-left">
				© {year} {DATA.name}. All Rights Reserved.
			</div>
			
			<div class="italic">
				Printed on the Internet
			</div>
			
			<div class="flex gap-8">
				<a href={DATA.socials.github} target="_blank" class="hover:text-accent transition-colors">GitHub</a>
				<a href={DATA.socials.linkedin} target="_blank" class="hover:text-accent transition-colors">LinkedIn</a>
				<a href={DATA.socials.twitter} target="_blank" class="hover:text-accent transition-colors">Twitter</a>
			</div>
		</div>
	</div>
</footer>
