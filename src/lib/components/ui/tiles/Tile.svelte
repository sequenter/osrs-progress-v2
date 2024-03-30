<script lang="ts">
	import type { AchievementDifficulty, QuestDifficulty, Requirements } from '$lib/data/types';
	import { iconSrc, onIconError } from '$lib/utils/icon.utils';
	import { Info, SVG } from '$lib/assets';
	import { ActionButton } from '$lib/components';
	import { clsx } from 'clsx';
	import { press } from 'svelte-gestures';
	import { Requirements as RequirementsStore } from '$lib/stores/requirements.store';
	import { Settings } from '$stores/settings.store';
	import { TEXT_COLOUR } from '$constant/Mapper';

	export let img: string;
	export let title: string;
	export let complete: boolean;
	export let upcoming: boolean;
	export let htmlClass = '';
	export let difficulty: QuestDifficulty | AchievementDifficulty | undefined = undefined;
	export let requirements: Requirements;
	export let onPress: () => void;

	$: src = iconSrc(img);

	$: showRequirements = !!(
		requirements.main ||
		($Settings.general__ironman && requirements.ironman)
	);
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
				<img
					{src}
					alt="{img} icon"
					on:error={() => {
						src = onIconError();
					}}
				/>
			</div>
			<h3 class="text-2xl ms-3">{title}</h3>
		</div>
		{#if difficulty}
			<span class="text-md {TEXT_COLOUR[difficulty]}">{difficulty}</span>
		{:else}
			<slot name="info" />
		{/if}
	</div>
	<div class="flex flex-col grow">
		<slot />
	</div>
	<hr class="h-px my-2 bg-birch-800 border-0" />
	<div class="flex justify-between items-center">
		<span
			class={clsx(
				'text-status text-md',
				complete && 'text-green-400',
				!complete && !upcoming && 'text-gray-400'
			)}>{complete ? 'Complete' : upcoming ? 'Upcoming' : 'Incomplete'}</span
		>
		{#if showRequirements}
			<ActionButton
				onClick={() => {
					$RequirementsStore = { ...requirements, ...{ title } };
				}}
			>
				<SVG htmlClass="w-6 h-6"><Info /></SVG>
			</ActionButton>
		{/if}
	</div>
</div>
