<script lang="ts">
	import { Check, Cross, SVG } from '$lib/assets';
	import { clsx } from 'clsx';

	export let fulfilled: boolean;
	export let value: boolean | number | undefined;
	export let title: string;

	let display = typeof value === 'boolean' ? 'Enabled' : value;
</script>

<div class="flex flex-col items-center pb-2">
	<h2 class="text-lg font-medium">{title}</h2>
	{#if value}
		<div class="flex justify-between items-center w-full px-3">
			<span class={clsx('text-md', fulfilled ? 'text-lime-400' : 'text-red-400')}>{display}</span>
			<SVG htmlClass="w-4 h-4">
				{#if fulfilled}
					<Check />
				{:else}
					<Cross />
				{/if}
			</SVG>
		</div>
	{/if}
</div>
