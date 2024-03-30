<script lang="ts">
	import { Check, Cross, SVG } from '$lib/assets';
	import { clsx } from 'clsx';
	import type { Concern } from '$lib/data/types';
	import { Quests } from '$stores/quests.store';
	import { Settings } from '$stores/settings.store';
	import SkillConcern from './SkillConcern.svelte';
	import { Skills } from '$stores/skills.store';

	export let concerns: Concern[];

	const combatLevelFulfilled = (combatLevel: number) => {
		return $Skills.combatLevel >= combatLevel;
	};

	const qpFulfilled = (qp: number) => {
		return $Quests.qp >= qp;
	};

	const questFulfilled = (quest: string) => {
		return $Quests.items.includes(quest);
	};
</script>

{#each concerns as { concern, detail }}
	<h2 class="text-xl py-2">{concern}</h2>

	{#each detail as { combat, combatLevel, quests, skills, QP }, i}
		<div class="flex flex-col rounded-lg bg-birch-500">
			{#if combat || combatLevel || QP}
				<div class="grid grid-cols-3 divide-x divide-birch-900">
					<div class="flex flex-col gap-2 items-center pb-2">
						<h2 class="text-lg font-bold">Combat</h2>
						{#if combat}
							<div class="flex justify-between items-center w-full px-3">
								<span
									class={clsx('text-md', $Settings.show__combat ? 'text-lime-400' : 'text-red-400')}
									>Enabled</span
								>
								<SVG htmlClass="w-4 h-4">
									{#if $Settings.show__combat}
										<Check />
									{:else}
										<Cross />
									{/if}
								</SVG>
							</div>
						{/if}
					</div>

					<div class="flex flex-col gap-2 items-center pb-2">
						<h2 class="text-lg font-bold">Combat Level</h2>
						{#if combatLevel}
							<div class="flex justify-between items-center w-full px-3">
								<span
									class={clsx(
										'text-md',
										combatLevelFulfilled(combatLevel) ? 'text-lime-400' : 'text-red-400'
									)}>{combatLevel}</span
								>
								<SVG htmlClass="w-4 h-4">
									{#if combatLevelFulfilled(combatLevel)}
										<Check />
									{:else}
										<Cross />
									{/if}
								</SVG>
							</div>
						{/if}
					</div>

					<div class="flex flex-col gap-2 items-center pb-2">
						<h2 class="text-lg font-bold">Quest Points</h2>
						{#if QP}
							<div class="flex justify-between items-center w-full px-3">
								<span class={clsx('text-md', qpFulfilled(QP) ? 'text-lime-400' : 'text-red-400')}
									>{QP}</span
								>
								<SVG htmlClass="w-4 h-4">
									{#if qpFulfilled(QP)}
										<Check />
									{:else}
										<Cross />
									{/if}
								</SVG>
							</div>
						{/if}
					</div>
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
					<h2 class="text-lg font-bold ps-3">Quests</h2>
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
			<span class="text-md font-bold py-2 text-center">OR</span>
		{/if}
	{/each}
{/each}
