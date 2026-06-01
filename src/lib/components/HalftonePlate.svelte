<script lang="ts">
	import { onMount } from 'svelte';

	let canvasElement = $state<HTMLCanvasElement | null>(null);

	onMount(() => {
		if (!canvasElement) return;

		let cleanup: (() => void) | undefined;
		import('$lib/canvas/halftone').then(({ initHalftonePlate }) => {
			if (canvasElement) cleanup = initHalftonePlate(canvasElement);
		});

		return () => cleanup?.();
	});
</script>

<div class="halftone-plate relative w-full h-full flex flex-col">
	<!-- Registration marks -->
	<div class="absolute top-3 left-3 w-4 h-4 pointer-events-none opacity-40">
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-current"></div>
		<div class="absolute left-0 top-1/2 -translate-y-1/2 h-px w-full bg-current"></div>
	</div>
	<div class="absolute top-3 right-3 w-4 h-4 pointer-events-none opacity-40">
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-current"></div>
		<div class="absolute left-0 top-1/2 -translate-y-1/2 h-px w-full bg-current"></div>
	</div>
	<div class="absolute bottom-12 left-3 w-4 h-4 pointer-events-none opacity-40">
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-current"></div>
		<div class="absolute left-0 top-1/2 -translate-y-1/2 h-px w-full bg-current"></div>
	</div>
	<div class="absolute bottom-12 right-3 w-4 h-4 pointer-events-none opacity-40">
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-current"></div>
		<div class="absolute left-0 top-1/2 -translate-y-1/2 h-px w-full bg-current"></div>
	</div>

	<div class="flex-1 relative border-2 newspaper-border m-3 mb-0 bg-paper/50 dark:bg-dark-paper/30">
		<canvas bind:this={canvasElement} class="absolute inset-0 w-full h-full"></canvas>

		<!-- Plate label -->
		<div class="absolute top-3 left-0 right-0 text-center pointer-events-none">
			<span class="text-[8px] font-bold uppercase tracking-[0.35em] opacity-40">
				Halftone Plate No. 1
			</span>
		</div>

		<!-- Misregistration accent — classic print artifact -->
		<div
			class="absolute inset-0 pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-[0.04] dark:opacity-[0.06]"
			style="background: repeating-linear-gradient(
				0deg,
				transparent,
				transparent 3px,
				var(--color-accent) 3px,
				var(--color-accent) 4px
			); transform: translate(1px, -1px);"
		></div>
	</div>

	<!-- Caption -->
	<div class="px-3 py-3 text-center border-x-2 border-b-2 newspaper-border mx-3 bg-paper/30 dark:bg-dark-paper/20">
		<p class="text-[10px] font-bold uppercase tracking-widest opacity-50 italic leading-relaxed">
			Fig. 1 — Halftone Portrait Study
		</p>
		<p class="text-[8px] uppercase tracking-[0.25em] opacity-35 mt-1">
			Engraved for The Dev Chronicle · Vol. I
		</p>
	</div>
</div>
