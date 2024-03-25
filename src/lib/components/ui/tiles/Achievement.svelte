<script lang="ts">
	import type { AchievementDiary, AchievementDifficulty } from '$lib/data/types';
	import { WIKI_IMAGES_ERROR, WIKI_IMAGES_URL } from '$constant/Global';
	import { Achievements } from '$stores/achievements.store';
	import { clsx } from 'clsx';
	import { press } from 'svelte-gestures';
	import { TEXT_COLOUR } from '$constant/Mapper';

	export let img: string;
	export let diary: AchievementDiary;
	export let difficulty: AchievementDifficulty;
	export let task: string;
	export let upcoming: boolean;

	$: src = `${WIKI_IMAGES_URL}${img.replaceAll(' ', '_')}.png`;
	$: complete = $Achievements.includes(task);

	function handleError() {
		src = WIKI_IMAGES_ERROR;
	}

	function handlePress() {
		if ($Achievements.includes(task)) {
			Achievements.set($Achievements.filter((item) => item !== task));
		} else {
			Achievements.update((current) => [...current, task]);
		}
	}
</script>

<div
	class={clsx(
		'flex flex-col rounded-lg p-3 cursor-pointer transition-opacity drop-shadow-lg hover:outline bg-birch-500',
		complete && 'opacity-60'
	)}
	use:press={{ triggerBeforeFinished: true }}
	on:press={handlePress}
>
	<div class="flex justify-between items-center">
		<div class="flex items-center">
			<div class="flex justify-center w-8">
				<img on:error={handleError} {src} alt="{img} icon" />
			</div>
			<h3 class="text-2xl ms-3">{diary}</h3>
		</div>

		<span class="text-md {TEXT_COLOUR[difficulty]}">{difficulty}</span>
	</div>
	<hr class="h-px my-2 bg-birch-800 border-0" />
	<span class="text-md text-yellow-400 grow">{task}</span>
	<hr class="h-px my-2 bg-birch-800 border-0" />
	<span
		class={clsx(
			'text-status text-md',
			complete && 'text-green-400',
			!complete && !upcoming && 'text-gray-400'
		)}>{complete ? 'Complete' : upcoming ? 'Upcoming' : 'Incomplete'}</span
	>
</div>
