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

	let level = $Skills.skills[skill].level;
	let locked = $Skills.skills[skill].locked;

	$: ($Skills.skills[skill].level = level), ($Skills.skills[skill].locked = locked);

	const handlePress = () => {
		locked = !locked;
	};

	const handleSkillLevel = () => {
		if (skill in COMBAT_SKILLS) {
			const attack = $Skills.skills['Attack'].level;
			const strength = $Skills.skills['Strength'].level;
			const defence = $Skills.skills['Defence'].level;
			const ranged = $Skills.skills['Ranged'].level;
			const prayer = $Skills.skills['Prayer'].level;
			const magic = $Skills.skills['Magic'].level;
			const hitpoints = $Skills.skills['Hitpoints'].level;

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
		locked && 'opacity-60'
	)}
	use:press={{ triggerBeforeFinished: true }}
	on:press={handlePress}
>
	<span class="text-md">{skill}</span>
	<img class="w-16 h-16 my-2" src={Mapper[skill]} alt="{skill} icon" />

	<div class="min-h-6">
		{#if !locked}
			<NumberInput bind:value={level} onChange={handleSkillLevel} {min} {max} />
		{/if}
	</div>
</div>
