<script lang="ts">
	import { itemComplete, itemsCompleteCount } from '$stores/collections.store';
	import { clsx } from 'clsx';
	import type { Requirements } from '$lib/data/types';
	import Tile from './Tile.svelte';

	export let img: string;
	export let name: string;
	export let items: string[];
	export let upcoming: boolean;
	export let complete: boolean;
	export let requirements: Requirements;
	export let onPress: (items: string[], img: string, name: string) => void;

	const maxItems = 5;

	$: slicedItems = items.slice(0, Math.min(maxItems, items.length));
</script>

<Tile
	htmlClass="break-inside-avoid-column mb-5 lg:mb-4 xl:mb-3"
	title={name}
	{complete}
	{img}
	{upcoming}
	{requirements}
	onPress={() => {
		onPress(items, img, name);
	}}
>
	<svelte:fragment slot="info">
		<span class="text-md">{itemsCompleteCount(name, items)}/{items.length}</span>
	</svelte:fragment>

	<ul class="flex flex-wrap my-2 list-none gap-2">
		{#each slicedItems as item}
			<li
				class={clsx(
					'text-md px-2 py-1 rounded-lg bg-birch-950',
					itemComplete(name, item) ? 'text-green-400' : 'text-gray-400'
				)}
			>
				{item}
			</li>
		{/each}
	</ul>
	{#if items.length > maxItems}
		<span class="text-md">and {items.length - maxItems} others...</span>
	{/if}
</Tile>
