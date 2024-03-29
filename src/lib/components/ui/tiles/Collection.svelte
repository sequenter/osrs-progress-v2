<script lang="ts">
	import { clsx } from 'clsx';
	import Tile from './Tile.svelte';
	import { Collections } from '$stores/collections.store';

	export let img: string;
	export let name: string;
	export let items: string[];
	export let upcoming: boolean;
	export let complete: boolean;

	const maxItems = 5;

	let slicedItems = items.slice(0, Math.min(maxItems, items.length));
	const onPress = () => {};

	const itemComplete = (value: string) => {
		const collection = $Collections.find((item) => item.name === name);

		return !!collection && collection.items.includes(value);
	};
</script>

<Tile
	{complete}
	{img}
	{onPress}
	{upcoming}
	title={name}
	htmlClass="break-inside-avoid-column mb-5 lg:mb-4 xl:mb-3"
>
	<ul class="flex flex-wrap my-2 list-none gap-2">
		{#each slicedItems as item}
			<li
				class={clsx(
					'text-md px-2 py-1 rounded-lg bg-birch-950',
					itemComplete(item) && 'text-green-400'
				)}
			>
				{item}
			</li>
		{/each}
	</ul>
	{#if items.length > maxItems}
		<span class="text-md">and {items.length - maxItems} others...</span>
	{/if}
	<hr class="h-px my-2 bg-birch-800 border-0" />
</Tile>
