<script lang="ts">
	import { SVG, Left, Right } from '$lib/assets';
	import { ActionButton } from '$lib/components';
	import clsx from 'clsx';
	import { Mapper } from '$lib/utils/icon.utils';
	import { press } from 'svelte-gestures';
	import type { Skill } from '$lib/data/types';
	import { Skills } from '$stores/skills.store';

	export let skill: Skill;
	export let minLevel: number;
	export let maxLevel: number;

	let level = $Skills[skill].level;
	let locked = $Skills[skill].locked;

	$: ($Skills[skill].level = level), ($Skills[skill].locked = locked);

	const handlePress = () => {
		locked = !locked;
	};

	const handleClick = (val: number) => {
		if (!locked) {
			level = Math.min(maxLevel, Math.max(minLevel, level + val));
		}
	};
</script>

<div
	class={clsx(
		'flex flex-col select-none items-center rounded-lg p-2 cursor-pointer transition-opacity drop-shadow-lg hover:outline bg-birch-500',
		locked && 'opacity-60'
	)}
	use:press={{ triggerBeforeFinished: true }}
	on:press={handlePress}
>
	<span class="text-md">{skill}</span>
	<img class="w-16 h-16 my-2" src={Mapper[skill]} alt="{skill} icon" />

	<div class="flex items-center">
		<ActionButton determiner={!locked} onClick={() => handleClick(-1)}>
			<SVG><Left /></SVG>
		</ActionButton>

		<span
			class={clsx(
				'px-2 text-lg font-bold w-6 flex items-center justify-center transition-opacity',
				locked && 'opacity-0'
			)}>{level}</span
		>

		<ActionButton determiner={!locked} onClick={() => handleClick(1)}>
			<SVG><Right /></SVG>
		</ActionButton>
	</div>
</div>
