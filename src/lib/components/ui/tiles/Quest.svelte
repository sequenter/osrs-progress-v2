<script lang="ts">
	import { WIKI_IMAGES_ERROR, WIKI_IMAGES_URL } from '$constant/Global';
	import { clsx } from 'clsx';
	import { press } from 'svelte-gestures';
	import type { QuestDifficulty } from '$lib/data/types';
	import { Quests } from '$stores/quests.store';
	import { TEXT_COLOUR } from '$constant/Mapper';

	export let img: string;
	export let difficulty: QuestDifficulty;
	export let name: string;
	export let upcoming: boolean;

	$: src = `${WIKI_IMAGES_URL}${img.replaceAll(' ', '_')}.png`;
	$: complete = $Quests.quests.includes(name);

	const handlePress = () => {
		if ($Quests.quests.includes(name)) {
			$Quests.quests = $Quests.quests.filter((item) => item !== name);
		} else {
			$Quests.quests = [...$Quests.quests, name];
		}
	};

	const handleError = () => {
		src = WIKI_IMAGES_ERROR;
	};
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
			<h3 class="text-2xl ms-3">{name}</h3>
		</div>

		<span class="text-md {TEXT_COLOUR[difficulty]}">{difficulty}</span>
	</div>
	<hr class="h-px my-2 bg-birch-800 border-0" />
	<span
		class={clsx(
			'text-status text-md',
			complete && 'text-green-400',
			!complete && !upcoming && 'text-gray-400'
		)}>{complete ? 'Complete' : upcoming ? 'Upcoming' : 'Incomplete'}</span
	>
</div>
