<script lang="ts">
	import { Check, Cross, SVG } from '$lib/assets';
	import { clsx } from 'clsx';
	import type { Concern } from '$lib/data/types';
	import GeneralConcern from './GeneralConcern.svelte';
	import { Quests } from '$stores/quests.store';
	import { Settings } from '$stores/settings.store';
	import SkillConcern from './SkillConcern.svelte';
	import { Skills } from '$stores/skills.store';

	export let concerns: Concern[];
	export let title: string;

	const combatLevelFulfilled = (combatLevel: number | undefined) => {
		return !!combatLevel && $Skills.combatLevel >= combatLevel;
	};

	const qpFulfilled = (qp: number | undefined) => {
		return !!qp && $Quests.qp >= qp;
	};

	const questFulfilled = (quest: string) => {
		return $Quests.items.includes(quest);
	};
</script>

<div>
	<h2 class="text-2xl">{title}</h2>

	{#each concerns as { concern, detail }}
		<h2 class="text-xl mt-3 mb-1">{concern}</h2>

		{#each detail as { combat, combatLevel, quests, skills, QP }, i}
			<div class="flex flex-col rounded-lg bg-birch-500">
				{#if combat || combatLevel || QP}
					<div class="grid grid-cols-3 divide-x divide-birch-900">
						<GeneralConcern title="Combat" value={combat} fulfilled={$Settings.show__combat} />
						<GeneralConcern
							title="Combat Level"
							value={combatLevel}
							fulfilled={combatLevelFulfilled(combatLevel)}
						/>
						<GeneralConcern title="Quest Points" value={QP} fulfilled={qpFulfilled(QP)} />
					</div>
				{/if}
				{#if skills}
					<hr class="h-px bg-birch-900 border-0" />
					<div class="grid grid-cols-2 divide-x divide-birch-800">
						<svelte:component this={SkillConcern} skills={skills.allOf} title="All Skills" />
						<svelte:component this={SkillConcern} skills={skills.anyOf} title="Any Skills" />
					</div>
				{/if}
				{#if quests}
					<hr class="h-px bg-birch-900 border-0" />
					<div class="flex flex-col mb-2">
						<h2 class="text-lg font-medium ps-3">Quests</h2>
						{#each quests as quest}
							<div class="flex justify-between items-center w-full px-3">
								<span
									class={clsx('text-md', questFulfilled(quest) ? 'text-lime-400' : 'text-red-400')}
									>{quest}</span
								>
								<SVG htmlClass="w-4 h-4">
									{#if questFulfilled(quest)}
										<Check />
									{:else}
										<Cross />
									{/if}
								</SVG>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			{#if i < detail.length - 1}
				<div class="text-md font-bold text-center py-1">OR</div>
			{/if}
		{/each}
	{/each}
</div>
