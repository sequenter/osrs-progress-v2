<script lang="ts">
	import CollectionItem from './CollectionItem.svelte';
	import { Collections } from '$stores/collections.store';
	import Dialog from '../Dialog.svelte';

	let dialog: HTMLDialogElement;
	let items: string[] = [];
	let img: string = '';
	let name: string = '';

	export function show(collectionItems: string[], collectionImg: string, collectionName: string) {
		items = collectionItems;
		img = collectionImg;
		name = collectionName;

		dialog.showModal();
	}

	const handleClick = () => {
		if (name && items) {
			$Collections[name].items = items;
		}
	};
</script>

<Dialog bind:dialog title={name} {img}>
	<ul class="flex flex-col p-5 list-none gap-2 overflow-scroll">
		{#each items as item}
			<CollectionItem {name} {item} />
		{/each}
	</ul>
	<div class="flex justify-end px-5 py-3 gap-2">
		<button
			class="bg-yellow-400 hover:bg-yellow-300 outline-none text-birch-950 py-1 px-4 rounded-lg"
			on:click={handleClick}>Complete All</button
		>
	</div>
</Dialog>
