<script lang="ts">
	import { onMount } from 'svelte';
	import { initInkParticles } from '$lib/three/inkParticles';
	import { animateHero } from '$lib/animations/gsap';

	let canvasElement = $state<HTMLCanvasElement | null>(null);
	let headline = $state<HTMLElement | null>(null);
	let breakingTag = $state<HTMLElement | null>(null);
	let dropCap = $state<HTMLElement | null>(null);
	let subheadline = $state<HTMLElement | null>(null);
	let ctas = $state<HTMLElement | null>(null);

	onMount(() => {
		let cleanupInk: (() => void) | undefined;
		if (canvasElement) {
			cleanupInk = initInkParticles(canvasElement);
		}

		animateHero({
			headline,
			breakingTag,
			dropCap,
			subheadline,
			ctas
		});

		return () => {
			if (cleanupInk) cleanupInk();
		};
	});
</script>

<section id="hero" class="w-full px-6 py-12">
	<div class="max-w-7xl mx-auto">
		<div class="flex flex-col lg:flex-row gap-12">
			<!-- Main Story (65%) -->
			<div class="lg:w-[65%] column-divider pr-0 lg:pr-12">
				<div class="mb-4">
					<span 
						bind:this={breakingTag}
						class="bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]"
					>
						Breaking
					</span>
				</div>

				<h2 
					bind:this={headline}
					class="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight uppercase"
				>
					Full-Stack Developer Ships Products That Actually Work
				</h2>

				<div class="mb-8 border-y-2 newspaper-border py-2 flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
					<span>By Zencoder | Frontend + Backend Engineer</span>
					<span>3 MIN READ</span>
				</div>

				<div class="space-y-6">
					<p bind:this={subheadline} class="text-xl md:text-2xl font-bold leading-relaxed">
						In a world of flickering pixels and broken deployments, one developer rises to bring stability, performance, and exceptional design to the modern web ecosystem.
					</p>

					<p class="text-base md:text-lg leading-loose opacity-90 text-justify drop-cap" bind:this={dropCap}>
						The digital landscape is evolving at a breakneck pace, leaving many products behind in a wake of technical debt and uninspired user experiences. However, the emergence of production-grade engineering practices, combined with a keen eye for aesthetic detail, is setting a new standard for what users should expect from their digital interactions. This report explores the intersection of cutting-edge technology and timeless design principles.
					</p>

					<div bind:this={ctas} class="flex flex-wrap gap-6 pt-4">
						<a 
							href="#about" 
							class="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-foreground hover:text-accent hover:border-accent transition-all"
						>
							Read Full Story <span class="group-hover:translate-x-1 transition-transform">→</span>
						</a>
						<a 
							href="#projects" 
							class="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-foreground hover:text-accent hover:border-accent transition-all"
						>
							View Portfolio <span class="group-hover:translate-x-1 transition-transform">→</span>
						</a>
					</div>
				</div>
			</div>

			<!-- Ink Particles (35%) -->
			<div class="lg:w-[35%] h-[400px] lg:h-auto min-h-[300px] relative">
				<canvas bind:this={canvasElement} class="w-full h-full"></canvas>
				<div class="absolute inset-0 pointer-events-none border-2 newspaper-border opacity-20"></div>
				<div class="absolute bottom-4 left-0 w-full text-center">
					<span class="text-[10px] font-bold uppercase tracking-widest opacity-50 italic">Fig 1. Digital Ink Dispersion Pattern</span>
				</div>
			</div>
		</div>

		<!-- Page Footer -->
		<div class="mt-16 text-right border-t newspaper-border pt-4">
			<a href="#projects" class="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors">
				Continued on Page 2 <span class="inline-block animate-bounce-x">→</span>
			</a>
		</div>
	</div>
</section>

<style>
	@keyframes bounce-x {
		0%, 100% { transform: translateX(0); }
		50% { transform: translateX(5px); }
	}
	.animate-bounce-x {
		animation: bounce-x 1s infinite;
	}
</style>
