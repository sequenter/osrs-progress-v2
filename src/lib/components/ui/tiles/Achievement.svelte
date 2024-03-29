<script lang="ts">
	import type { AchievementDiary, AchievementDifficulty } from '$lib/data/types';
	import { Achievements } from '$stores/achievements.store';
	import Tile from './Tile.svelte';
	import { updateStoreArray } from '$lib/utils/store.utils';

	export let img: string;
	export let diary: AchievementDiary;
	export let difficulty: AchievementDifficulty;
	export let task: string;
	export let upcoming: boolean;
	export let complete: boolean;

	const onPress = () => {
		$Achievements = updateStoreArray($Achievements, task);
	};
</script>

<Tile {complete} {difficulty} {img} {onPress} {upcoming} title={diary}>
	<span class="text-md text-yellow-400 grow">{task}</span>
	<hr class="h-px my-2 bg-birch-800 border-0" />
</Tile>
