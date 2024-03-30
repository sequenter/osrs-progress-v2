<script lang="ts">
	import { clsx } from 'clsx';

	export let checked: boolean;
	export let disabled = false;
</script>

<label class={clsx('inline-flex items-center', !disabled && 'cursor-pointer')}>
	<input type="checkbox" class="sr-only peer" bind:checked {disabled} />
	<div
		class="relative w-12 h-6 bg-birch-950 rounded-full peer peer-focus:ring-2 peer-focus:ring-carrot-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-carrot-600"
	></div>
</label>
