<script lang="ts">
	import type { AchievementDiary, AchievementDifficulty, Requirements } from '$lib/data/types';
	import { Achievements } from '$stores/achievements.store';
	import Tile from './Tile.svelte';
	import { updateStoreArray } from '$lib/utils/store.utils';

	export let id: string;
	export let complete: boolean;
	export let diary: AchievementDiary;
	export let difficulty: AchievementDifficulty;
	export let img: string;
	export let task: string;
	export let upcoming: boolean;
	export let requirements: Requirements;

	$: title = `${diary} ${difficulty} ${Number(id.substring(id.lastIndexOf('-') + 1, id.length))}`;

	const onPress = () => {
		$Achievements = updateStoreArray($Achievements, task);
	};
</script>

<Tile {title} {complete} {difficulty} {img} {upcoming} {requirements} {onPress}>
	<hr class="h-px my-2 bg-birch-800 border-0" />
	<span class="text-md text-yellow-400">{task}</span>
</Tile>
