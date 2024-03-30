<script lang="ts">
	import type { Section } from '$lib/data/types';

	export let title: Section | 'Skills';
	export let htmlClass = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5';
</script>

<section class="px-5 mb-5">
	<div class="flex py-5 justify-between items-center sticky top-0 z-10 bg-birch-800">
		<div class="flex items-center">
			<slot name="icon" />
			<h2 class="font-medium text-3xl">{title}</h2>
		</div>
		<div class="flex items-center">
			<slot name="controls" />
		</div>
	</div>
	<div class="{htmlClass} pt-1 px-1 gap-5 lg:gap-4 xl:gap-3">
		<slot />
	</div>
</section>
