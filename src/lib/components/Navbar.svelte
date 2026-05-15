<script lang="ts">
	import { onMount } from 'svelte';

	let isDark = $state(true);
	let isMenuOpen = $state(false);
	let scrolled = $state(false);

	const navItems = [
		{ name: 'About', href: '#about' },
		{ name: 'Projects', href: '#projects' },
		{ name: 'Contact', href: '#contact' }
	];

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			isDark = savedTheme === 'dark';
		} else {
			isDark = true;
		}
		applyTheme();

		const handleScroll = () => {
			scrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleTheme() {
		isDark = !isDark;
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
		applyTheme();
	}

	function applyTheme() {
		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<nav
	class="fixed top-0 left-0 w-full z-50 transition-all duration-300 {scrolled
		? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md py-4 shadow-lg'
		: 'bg-transparent py-6'}"
>
	<div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
		<a href="#hero" class="text-2xl font-bold text-brand tracking-tighter">
			DEV<span class="text-foreground">PORTFOLIO</span>
		</a>

		<!-- Desktop Nav -->
		<div class="hidden md:flex items-center space-x-8">
			{#each navItems as item}
				<a
					href={item.href}
					class="text-sm font-medium hover:text-brand transition-colors uppercase tracking-widest"
				>
					{item.name}
				</a>
			{/each}

			<button
				onclick={toggleTheme}
				class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
				aria-label="Toggle theme"
			>
				{#if isDark}
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-foreground"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
				{/if}
			</button>
		</div>

		<!-- Mobile Toggle -->
		<div class="flex items-center space-x-4 md:hidden">
			<button
				onclick={toggleTheme}
				class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
				aria-label="Toggle theme"
			>
				{#if isDark}
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-foreground"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
				{/if}
			</button>

			<button
				onclick={toggleMenu}
				class="text-foreground p-1"
				aria-label="Toggle menu"
			>
				{#if isMenuOpen}
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Menu Overlay -->
	{#if isMenuOpen}
		<div
			class="fixed inset-0 top-[72px] bg-white dark:bg-dark-bg z-40 md:hidden flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-top duration-300"
		>
			{#each navItems as item}
				<a
					href={item.href}
					onclick={closeMenu}
					class="text-2xl font-bold hover:text-brand transition-colors uppercase tracking-widest"
				>
					{item.name}
				</a>
			{/each}
		</div>
	{/if}
</nav>
