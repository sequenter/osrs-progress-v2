<script lang="ts">
	import type { AchievementDifficulty, QuestDifficulty } from '$lib/data/types';
	import { WIKI_IMAGES_ERROR, WIKI_IMAGES_URL } from '$constant/Global';
	import { clsx } from 'clsx';
	import { press } from 'svelte-gestures';
	import { TEXT_COLOUR } from '$constant/Mapper';

	export let img: string;
	export let title: string;
	export let complete: boolean;
	export let upcoming: boolean;
	export let htmlClass = '';
	export let difficulty: QuestDifficulty | AchievementDifficulty | undefined = undefined;
	export let onPress: () => void;

	$: src = `${WIKI_IMAGES_URL}${img.replaceAll(' ', '_')}.png`;

	const handleError = () => {
		src = WIKI_IMAGES_ERROR;
	};
</script>

<div
	class={clsx(
		'flex flex-col rounded-lg p-3 cursor-pointer transition-opacity drop-shadow-lg hover:outline bg-birch-500',
		complete && 'opacity-60',
		htmlClass
	)}
	use:press={{ triggerBeforeFinished: true }}
	on:press={onPress}
>
	<div class="flex justify-between items-center">
		<div class="flex items-center">
			<div class="flex justify-center w-8">
				<img on:error={handleError} {src} alt="{img} icon" />
			</div>
			<h3 class="text-2xl ms-3">{title}</h3>
		</div>
		{#if difficulty}
			<span class="text-md {TEXT_COLOUR[difficulty]}">{difficulty}</span>
		{/if}
	</div>
	<hr class="h-px my-2 bg-birch-800 border-0" />
	<slot />
	<span
		class={clsx(
			'text-status text-md',
			complete && 'text-green-400',
			!complete && !upcoming && 'text-gray-400'
		)}>{complete ? 'Complete' : upcoming ? 'Upcoming' : 'Incomplete'}</span
	>
</div>
