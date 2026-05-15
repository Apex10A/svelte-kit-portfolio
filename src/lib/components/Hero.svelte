<script lang="ts">
	import { onMount } from 'svelte';
	import { HeroScene } from '$lib/three/scene';
	import { heroEntrance } from '$lib/animations/gsap';

	let canvasContainer = $state<HTMLElement | null>(null);
	let title = $state<HTMLElement | null>(null);
	let subtitle = $state<HTMLElement | null>(null);
	let cta = $state<HTMLElement | null>(null);
	let scene: HeroScene | null = null;

	onMount(() => {
		if (canvasContainer) {
			scene = new HeroScene(canvasContainer);
		}

		heroEntrance({ title, subtitle, cta });

		return () => {
			if (scene) scene.dispose();
		};
	});
</script>

<section id="hero" class="relative h-screen w-full flex items-center justify-center overflow-hidden">
	<!-- Three.js Background -->
	<div bind:this={canvasContainer} class="absolute inset-0 z-0 opacity-60"></div>

	<!-- Content -->
	<div class="relative z-10 text-center px-6 max-w-4xl">
		<h1 
			bind:this={title}
			class="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter"
		>
			Frontend + <span class="text-brand">Backend</span> Developer
		</h1>
		
		<p 
			bind:this={subtitle}
			class="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed"
		>
			I build scalable, high-performance web applications with modern technologies 
			and exceptional user experiences.
		</p>
		
		<div bind:this={cta} class="flex flex-col sm:flex-row items-center justify-center gap-4">
			<a 
				href="#projects" 
				class="w-full sm:w-auto px-8 py-4 bg-brand text-dark-bg font-bold rounded-full hover:scale-105 transition-transform text-center"
			>
				View Projects
			</a>
			<a 
				href="/resume.pdf" 
				class="w-full sm:w-auto px-8 py-4 border-2 border-brand text-brand font-bold rounded-full hover:bg-brand hover:text-dark-bg transition-all text-center"
			>
				Download Resume
			</a>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand/50"><path d="m7 13 5 5 5-5"/><path d="m7 6 5 5 5-5"/></svg>
	</div>
</section>
