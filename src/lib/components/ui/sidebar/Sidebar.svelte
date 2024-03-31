<script lang="ts">
	import Bars from './Bars.svelte';
	import Numerals from './Numerals.svelte';
</script>

<section class="container mx-auto flex flex-col h-full p-5 overflow-y-scroll">
	<div class="flex flex-row items-center">
		<img class="me-3 w-8 h-8" src="$lib/assets/icons/progress.png" alt="Progress icon" />
		<h2 class="font-medium text-3xl">Progress</h2>
	</div>
	<div
		class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-none mt-5 gap-5 lg:gap-4 xl:gap-3"
	>
		<Numerals />
		<Bars />
	</div>
	<div class="grow mt-5 items-end hidden lg:flex">
		<span class="text-birch-800 font-light">Lovingly crafted by Sequenter v1.0.2</span>
	</div>
</section>
