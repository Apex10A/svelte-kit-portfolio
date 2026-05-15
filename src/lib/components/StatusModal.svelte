<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	let { 
		show = $bindable(false), 
		status = 'success', 
		message = '', 
		onClose 
	} = $props<{
		show: boolean;
		status: 'success' | 'error';
		message: string;
		onClose?: () => void;
	}>();

	function handleClose() {
		show = false;
		if (onClose) onClose();
	}

	// Close on Escape key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && show) {
			handleClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if show}
	<div 
		class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
		transition:fade={{ duration: 200 }}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div 
			class="absolute inset-0" 
			onclick={handleClose}
		></div>

		<div 
			class="relative w-full max-w-md bg-background border-4 border-foreground shadow-[12px_12px_0px_var(--border-color)] p-8 md:p-12 text-center overflow-hidden"
			transition:scale={{ duration: 300, start: 0.9 }}
		>
			<!-- Decorative corners -->
			<div class="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-foreground"></div>
			<div class="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-foreground"></div>
			<div class="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-foreground"></div>
			<div class="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-foreground"></div>

			<div class="mb-8">
				{#if status === 'success'}
					<div class="w-20 h-20 bg-accent text-white flex items-center justify-center mx-auto rounded-full mb-6">
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
					</div>
					<h3 class="text-3xl font-black uppercase tracking-tighter mb-4">Letter Received</h3>
				{:else}
					<div class="w-20 h-20 bg-accent text-white flex items-center justify-center mx-auto rounded-full mb-6">
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m18 6-12 12"/><path d="m6 6 12 12"/></svg>
					</div>
					<h3 class="text-3xl font-black uppercase tracking-tighter mb-4">Delivery Failed</h3>
				{/if}
				
				<p class="text-lg font-body italic opacity-80 leading-relaxed">
					{message}
				</p>
			</div>

			<button 
				onclick={handleClose}
				class="w-full py-4 bg-foreground text-background font-black uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all transform hover:-rotate-1 active:scale-95"
			>
				Back To Front Page
			</button>


		</div>
	</div>
{/if}

<style>
	:global(.dark) .bg-background {
		--border-color: rgba(255, 255, 255, 0.1);
	}
	.shadow-\[12px_12px_0px_var\(--border-color\)\Custom {
		box-shadow: 12px 12px 0px var(--foreground);
	}
</style>
