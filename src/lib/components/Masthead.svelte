<script lang="ts">
	import { onMount } from 'svelte';

	let isDark = $state(false);
	let today = $state('');

	onMount(() => {
		const options: Intl.DateTimeFormatOptions = { 
			weekday: 'long', 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		};
		today = new Date().toLocaleDateString('en-US', options).toUpperCase();
		
		isDark = document.documentElement.classList.contains('dark');
	});

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}
</script>

<header class="w-full px-6 pt-8 pb-4">
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mb-6">
			<!-- Left: Info -->
			<div class="flex flex-col text-[10px] md:text-xs font-medium tracking-widest uppercase opacity-80 gap-1">
				<span>{today}</span>
				<span>Edition: Web Edition</span>
				<span>Weather: ☀️ Building in production</span>
			</div>

			<!-- Center: Title -->
			<div class="text-center">
				<h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none">
					The Dev <br class="md:hidden" /> Chronicle
				</h1>
			</div>

			<!-- Right: Controls & Social -->
			<div class="flex flex-col items-center md:items-end gap-2">
				<button 
					onclick={toggleTheme}
					class="text-[10px] md:text-xs font-bold uppercase tracking-widest border border-foreground px-3 py-1 hover:bg-foreground hover:text-background transition-colors"
				>
					{isDark ? 'Switch to Morning Edition' : 'Switch to Night Edition'}
				</button>
				<div class="flex gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest">
					<a href="https://github.com" target="_blank" class="hover:text-accent transition-colors">GitHub</a>
					<a href="https://linkedin.com" target="_blank" class="hover:text-accent transition-colors">LinkedIn</a>
				</div>
			</div>
		</div>
		
		<!-- Thick double border -->
		<div class="w-full border-t-4 border-b-2 border-foreground h-2 mt-4"></div>
	</div>
</header>
