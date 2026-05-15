<script lang="ts">
	import { onMount } from 'svelte';
	import { animateSectionBanner } from '$lib/animations/gsap';
	import { DATA } from '$lib/data/portfolio';

	let banner = $state<HTMLElement | null>(null);
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');

	onMount(() => {
		if (banner) animateSectionBanner(banner);
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		
		status = 'loading';

		try {
			const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
				method: 'POST',
				body: formData,
				headers: {
					'Accept': 'application/json'
				}
			});

			if (response.ok) {
				status = 'success';
				form.reset();
			} else {
				status = 'error';
			}
		} catch (e) {
			status = 'error';
		}
	}
</script>

<section id="contact" class="w-full px-6 py-12">
	<div class="max-w-7xl mx-auto">
		<div bind:this={banner} class="section-banner">
			Letters To The Editor
		</div>

		<div class="max-w-4xl mx-auto border-x newspaper-border px-8 py-12">
			<div class="mb-12 text-center">
				<p class="text-xl md:text-2xl font-bold leading-relaxed italic opacity-90">
					"Have a story tip, job opportunity, or collaboration proposal? The editorial desk is open."
				</p>
			</div>

			<form onsubmit={handleSubmit} class="space-y-12">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
					<div class="relative">
						<label for="name" class="block text-xs font-bold uppercase tracking-[0.2em] mb-2">Your Name:</label>
						<input 
							type="text" 
							id="name" 
							name="name" 
							required 
							class="w-full bg-transparent border-b-2 newspaper-border py-2 focus:border-accent outline-none transition-colors font-body text-lg"
						/>
					</div>
					<div class="relative">
						<label for="email" class="block text-xs font-bold uppercase tracking-[0.2em] mb-2">Your Contact:</label>
						<input 
							type="email" 
							id="email" 
							name="email" 
							required 
							class="w-full bg-transparent border-b-2 newspaper-border py-2 focus:border-accent outline-none transition-colors font-body text-lg"
						/>
					</div>
				</div>

				<div class="relative">
					<label for="message" class="block text-xs font-bold uppercase tracking-[0.2em] mb-2">Your Letter:</label>
					<textarea 
						id="message" 
						name="message" 
						rows="4" 
						required 
						class="w-full bg-transparent border-b-2 newspaper-border py-2 focus:border-accent outline-none transition-colors font-body text-lg resize-none"
					></textarea>
				</div>

				<div class="text-center pt-8">
					<button 
						type="submit" 
						disabled={status === 'loading'}
						class="px-12 py-4 bg-accent text-white font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-accent/20"
					>
						{#if status === 'loading'}
							Sending...
						{:else}
							Submit To Editorial Desk →
						{/if}
					</button>
				</div>

				{#if status === 'success'}
					<div class="p-6 border-2 border-accent text-accent text-center font-bold uppercase tracking-widest animate-in fade-in zoom-in">
						Letter Received — Thank you for writing to The Dev Chronicle. We will be in touch shortly.
					</div>
				{:else if status === 'error'}
					<div class="p-6 border-2 border-accent text-accent text-center font-bold uppercase tracking-widest animate-in fade-in zoom-in">
						Transmission failed. Please try again.
					</div>
				{/if}
			</form>
		</div>
	</div>
</section>
