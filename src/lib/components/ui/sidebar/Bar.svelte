<script lang="ts">
	import type { Section } from '$lib/data/types';
	import { SECTION_COLOUR } from '$constant/Mapper';

	export let title: Section;
	export let complete = 0;
	export let total = 0;

	$: remaining = total - complete;
	$: width = total > 0 ? (complete / total) * 100 : 0;
</script>

<div class="p-3 rounded-lg text-center bg-birch-800 drop-shadow-lg">
	<h3 class="text-2xl mb-2">{title}</h3>
	<div class="w-full h-4 mb-3 bg-birch-950 rounded-full">
		<div
			class="h-4 rounded-full transition-width {SECTION_COLOUR[title].background}"
			style="width: {width}%"
		></div>
	</div>
	<div class="w-full flex gap-1">
		<span class="w-1/3 text-xl {SECTION_COLOUR[title].text} rounded-l-lg bg-birch-950"
			>{complete}</span
		>
		<span class="w-1/3 text-xl bg-birch-950">{total}</span>
		<span class="w-1/3 text-xl text-red-700 rounded-r-lg bg-birch-950">{remaining}</span>
	</div>
</div>
