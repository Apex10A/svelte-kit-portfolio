<script lang="ts">
	import '../app.css';
	import Masthead from '$lib/components/Masthead.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col selection:bg-accent selection:text-white">
	<Masthead />
	<main class="flex-grow">
		{@render children()}
	</main>
	<Footer />
</div>
