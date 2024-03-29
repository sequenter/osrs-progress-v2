<script lang="ts">
	import clsx from 'clsx';
	import { COMBAT_SKILLS } from '$constant/Global';
	import { Mapper } from '$lib/utils/icon.utils';
	import { NumberInput } from '$lib/components';
	import { press } from 'svelte-gestures';
	import type { Skill } from '$lib/data/types';
	import { Skills } from '$stores/skills.store';

	export let skill: Skill;
	export let min: number;
	export let max: number;

	const handlePress = () => {
		$Skills.items[skill].locked = !$Skills.items[skill].locked;
	};

	const handleSkillLevel = () => {
		if (skill in COMBAT_SKILLS) {
			const attack = $Skills.items['Attack'].level;
			const strength = $Skills.items['Strength'].level;
			const defence = $Skills.items['Defence'].level;
			const ranged = $Skills.items['Ranged'].level;
			const prayer = $Skills.items['Prayer'].level;
			const magic = $Skills.items['Magic'].level;
			const hitpoints = $Skills.items['Hitpoints'].level;

			$Skills.combatLevel =
				(defence + hitpoints + Math.floor(prayer * 0.5)) * 0.25 +
				Math.max((attack + strength) * 0.325, ranged * 1.5 * 0.325, magic * 1.5 * 0.325);

			console.log($Skills.combatLevel);
		}
	};
</script>

<div
	class={clsx(
		'flex flex-col select-none items-center rounded-lg p-2 cursor-pointer transition-opacity drop-shadow-lg hover:outline bg-birch-500',
		$Skills.items[skill].locked && 'opacity-60'
	)}
	use:press={{ triggerBeforeFinished: true }}
	on:press={handlePress}
>
	<span class="text-md">{skill}</span>
	<img class="w-16 h-16 my-2" src={Mapper[skill]} alt="{skill} icon" />

	<div class="min-h-6">
		{#if !$Skills.items[skill].locked}
			<NumberInput
				bind:value={$Skills.items[skill].level}
				onChange={handleSkillLevel}
				{min}
				{max}
			/>
		{/if}
	</div>
</div>
