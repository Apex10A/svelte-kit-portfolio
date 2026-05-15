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
		if (!isDark && localStorage.getItem('theme') === 'dark') {
			isDark = true;
			document.documentElement.classList.add('dark');
		}
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

<header class="w-full px-6 py-12">
	<div class="max-w-7xl mx-auto">
		<div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 border-b-2 newspaper-border pb-4 font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-80">
			<div class="flex flex-col gap-1">
				<span>{today}</span>
				<span class="text-accent">Live Updates: ☀️ Building in production</span>
			</div>
			<div class="text-center hidden lg:block">
				Established 2026 • Vol. 001 • No. 1
			</div>
			<div class="flex gap-6">
				<span>Edition: Web Edition</span>
				<a href="https://github.com" target="_blank" class="hover:text-accent transition-colors">Digital Archive</a>
			</div>
		</div>

		<div class="text-center py-8">
			<h1 class="text-hero-headline font-black tracking-tighter uppercase leading-[0.8] mb-4">
				The Dev Chronicle
			</h1>
			<p class="text-sm md:text-base font-bold italic opacity-60 tracking-[0.4em] uppercase">
				Independent Reporting on the Modern Web Ecosystem
			</p>
		</div>

		<div class="flex flex-col md:flex-row justify-between items-center py-6 border-y-4 newspaper-border mt-8 gap-4">
			<nav class="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-black uppercase tracking-[0.2em]">
				<a href="#hero" class="hover:text-accent transition-colors underline decoration-2 underline-offset-4">Front Page</a>
				<a href="#about" class="hover:text-accent transition-colors">Editorial</a>
				<a href="#projects" class="hover:text-accent transition-colors">Technology</a>
				<a href="#contact" class="hover:text-accent transition-colors">Correspondence</a>
			</nav>

			<button 
				onclick={toggleTheme}
				class="text-[10px] md:text-xs font-black uppercase tracking-widest bg-foreground text-background px-4 py-2 hover:bg-accent hover:text-white transition-all transform hover:-rotate-1"
			>
				{isDark ? 'Switch to Morning Edition' : 'Switch to Night Edition'}
			</button>
		</div>
	</div>
</header>
