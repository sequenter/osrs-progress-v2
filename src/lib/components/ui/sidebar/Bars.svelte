<script lang="ts">
	import { ACHIEVEMENTS, COLLECTIONS, PETS, QUESTS } from '$lib/data';
	import { collectionCompleteCount, Collections } from '$stores/collections.store';
	import { Achievements } from '$stores/achievements.store';
	import Bar from './Bar.svelte';
	import { Pets } from '$stores/pets.store';
	import { Quests } from '$stores/quests.store';

	let complete: number;

	$: $Collections,
		(() => {
			complete = collectionCompleteCount();
		})();
</script>

<Bar title="Achievements" total={ACHIEVEMENTS.length} complete={$Achievements.length} />
<Bar title="Quests" total={QUESTS.length} complete={$Quests.items.length} />
<Bar title="Pets" total={PETS.length} complete={$Pets.length} />
<Bar title="Collections" total={COLLECTIONS.length} {complete} />
