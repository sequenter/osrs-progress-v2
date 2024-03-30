<script lang="ts">
	import type { QuestDifficulty } from '$lib/data/types';
	import { QUESTS } from '$lib/data';
	import { Quests } from '$stores/quests.store';
	import Tile from './Tile.svelte';
	import { updateStoreArray } from '$lib/utils/store.utils';

	export let img: string;
	export let difficulty: QuestDifficulty;
	export let name: string;
	export let upcoming: boolean;
	export let complete: boolean;

	const onPress = () => {
		$Quests.items = updateStoreArray($Quests.items, name);
		$Quests.qp = getQuestPoints();
	};

	const getQuestPoints = () => {
		let QP = 0;

		for (const name of $Quests.items) {
			QP += QUESTS.find((item) => item.name === name)?.rewards?.QP || 0;
		}

		return QP;
	};
</script>

<Tile {complete} {difficulty} {img} {onPress} {upcoming} title={name} />
