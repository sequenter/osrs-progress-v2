<script lang="ts">
	import { Check, Cross, Minus, SVG } from '$lib/assets';
	import type { Skill, SkillDetail } from '$lib/data/types';
	import { clsx } from 'clsx';
	import { Settings } from '$stores/settings.store';
	import { Skills } from '$stores/skills.store';

	export let skills: SkillDetail | undefined;
	export let title: string;

	export const skillFulfilled = (key: string, level: number) => {
		const skill = key as Skill;
		return !$Skills.items[skill].locked && $Skills.items[skill].level >= level;
	};

	const skillUpcoming = (key: string, level: number) => {
		const skill = key as Skill;
		console.log($Skills.items[skill].level, level);
		return (
			!$Skills.items[skill].locked &&
			$Skills.items[skill].level + $Settings.show__upcoming >= level !=
				$Skills.items[skill].level >= level
		);
	};
</script>

<div class="flex flex-col items-center pb-2">
	<h2 class="text-lg font-medium">{title}</h2>
	{#if skills}
		{#each Object.entries(skills) as [skill, level]}
			<div class="flex justify-between items-center w-full px-3">
				<span
					class={clsx(
						'text-md',
						skillFulfilled(skill, level)
							? 'text-lime-400'
							: skillUpcoming(skill, level)
								? 'text-yellow-400'
								: 'text-red-400'
					)}>{level} {skill}</span
				>
				<SVG htmlClass="w-4 h-4">
					{#if skillFulfilled(skill, level)}
						<Check />
					{:else if skillUpcoming(skill, level)}
						<Minus />
					{:else}
						<Cross />
					{/if}
				</SVG>
			</div>
		{/each}
	{/if}
</div>
