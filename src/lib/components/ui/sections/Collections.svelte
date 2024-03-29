<script lang="ts">
	import { Controls, Section } from '$lib/components';
	import type { Collection } from '$lib/data/types';
	import { Collections } from '$stores/collections.store';
	import { COLLECTIONS } from '$lib/data';
	import { CollectionTile } from '$lib/components/ui/tiles';
	import { getCollections } from '$lib/utils/get.utils';
	import { Quests } from '$stores/quests.store';
	import { Settings } from '$stores/settings.store';
	import { Skills } from '$stores/skills.store';

	let collections: (Collection & { upcoming: boolean })[];

	$: $Collections,
		(collections = getCollections(COLLECTIONS as Collection[], $Skills, $Settings, $Quests).sort(
			compare
		));

	const compare = (a: Collection, b: Collection) => {
		return +isComplete(a.name) - +isComplete(b.name) || a.name.localeCompare(b.name);
	};

	const isComplete = (name: string) => {
		const collection = $Collections.find((item) => item.name === name);

		return !!collection && collection.count === collection.items.length;
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
		<Controls
			complete={Object.keys($Collections).length}
			total={collections.length}
			bind:show={$Settings.show.collections}
		/>
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
				/>
			{/if}
		{/each}
	{/if}
</Section>
