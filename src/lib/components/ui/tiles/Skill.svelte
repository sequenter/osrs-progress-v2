<script lang="ts">
	import clsx from 'clsx';
	import { Mapper } from '$lib/utils/icon.utils';
	import { NumberInput } from '$lib/components';
	import { press } from 'svelte-gestures';
	import type { Skill } from '$lib/data/types';
	import { Skills } from '$stores/skills.store';

	export let skill: Skill;
	export let min: number;
	export let max: number;

	let level = $Skills[skill].level;
	let locked = $Skills[skill].locked;

	$: ($Skills[skill].level = level), ($Skills[skill].locked = locked);

	const handlePress = () => {
		locked = !locked;
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

	<NumberInput htmlClass={locked ? 'opacity-0' : 'opacity-100'} bind:value={level} {min} {max} />
</div>
