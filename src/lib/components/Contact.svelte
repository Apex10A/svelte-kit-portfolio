<script lang="ts">
	import { onMount } from 'svelte';
	import { revealOnScroll } from '$lib/animations/gsap';

	let section = $state<HTMLElement | null>(null);
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	onMount(() => {
		if (section) revealOnScroll(section);
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		
		status = 'loading';

		try {
			const response = await fetch('https://formspree.io/f/placeholder', {
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
				const data = await response.json();
				errorMessage = data.error || 'Something went wrong. Please try again.';
				status = 'error';
			}
		} catch (e) {
			errorMessage = 'Network error. Please check your connection.';
			status = 'error';
		}
	}
</script>

<section id="contact" class="section-padding bg-slate-50 dark:bg-black/20" bind:this={section}>
	<div class="max-w-7xl mx-auto">
		<div class="max-w-3xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
					Get In <span class="text-brand">Touch</span>
				</h2>
				<p class="text-foreground/60 text-lg">
					Have a project in mind or just want to say hi? Drop me a message below!
				</p>
			</div>

			<form 
				onsubmit={handleSubmit}
				class="bg-white dark:bg-card-bg p-8 md:p-12 rounded-3xl shadow-2xl border border-transparent hover:border-brand/10 transition-all"
			>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
					<div>
						<label for="name" class="block text-sm font-bold uppercase tracking-widest mb-2 opacity-70">Name</label>
						<input 
							type="text" 
							id="name" 
							name="name" 
							required 
							placeholder="John Doe"
							class="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-transparent focus:border-brand outline-none transition-all"
						/>
					</div>
					<div>
						<label for="email" class="block text-sm font-bold uppercase tracking-widest mb-2 opacity-70">Email</label>
						<input 
							type="email" 
							id="email" 
							name="email" 
							required 
							placeholder="john@example.com"
							class="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-transparent focus:border-brand outline-none transition-all"
						/>
					</div>
				</div>

				<div class="mb-8">
					<label for="message" class="block text-sm font-bold uppercase tracking-widest mb-2 opacity-70">Message</label>
					<textarea 
						id="message" 
						name="message" 
						rows="5" 
						required 
						placeholder="Your message here..."
						class="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-transparent focus:border-brand outline-none transition-all resize-none"
					></textarea>
				</div>

				<button 
					type="submit" 
					disabled={status === 'loading'}
					class="w-full py-4 bg-brand text-dark-bg font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 uppercase tracking-widest shadow-lg shadow-brand/20"
				>
					{#if status === 'loading'}
						Sending...
					{:else}
						Send Message
					{/if}
				</button>

				{#if status === 'success'}
					<div class="mt-6 p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl text-center font-bold animate-in fade-in zoom-in duration-300">
						Message sent successfully! I'll get back to you soon.
					</div>
				{:else if status === 'error'}
					<div class="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-center font-bold animate-in fade-in zoom-in duration-300">
						{errorMessage}
					</div>
				{/if}
			</form>
		</div>
	</div>
</section>
