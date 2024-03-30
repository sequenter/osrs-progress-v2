<script lang="ts">
	import { collectionCompleteCount, Collections, isComplete } from '$stores/collections.store';
	import { CollectionDialog, Controls, Section } from '$lib/components';
	import type { Collection } from '$lib/data/types';
	import { COLLECTIONS } from '$lib/data';
	import { CollectionTile } from '$lib/components/ui/tiles';
	import { getCollections } from '$lib/utils/get.utils';
	import { Quests } from '$stores/quests.store';
	import { Settings } from '$stores/settings.store';
	import { Skills } from '$stores/skills.store';

	let collectionDialog: CollectionDialog;
	let complete: number;
	let collections: (Collection & { upcoming: boolean })[];

	$: $Collections,
		(() => {
			collections = getCollections(COLLECTIONS as Collection[], $Skills, $Settings, $Quests).sort(
				compare
			);
			complete = collectionCompleteCount();
		})();

	const onPress = (items: string[], img: string, name: string) => {
		collectionDialog.show(items, img, name);
	};

	const compare = (a: Collection, b: Collection) => {
		return +isComplete(a.name) - +isComplete(b.name) || a.name.localeCompare(b.name);
	};

	const canShow = (name: string) => {
		return $Settings.show__completed || !isComplete(name);
	};
</script>

<Section title="Collections" htmlClass="columns-1 md:columns-2 xl:columns-3">
	<img
		slot="icon"
		class="me-3 w-8 h-8"
		src="$lib/assets/icons/Collections.png"
		alt="Collections icon"
	/>

	<svelte:fragment slot="controls">
		<Controls {complete} total={collections.length} bind:show={$Settings.show.collections} />
	</svelte:fragment>

	{#if $Settings.show.collections}
		{#each collections as collection}
			{#if canShow(collection.name)}
				<CollectionTile
					img={collection.img}
					items={collection.items}
					name={collection.name}
					upcoming={collection.upcoming}
					complete={isComplete(collection.name)}
					requirements={collection.requirements}
					{onPress}
				/>
			{/if}
		{/each}
	{/if}
</Section>

<CollectionDialog bind:this={collectionDialog} />
