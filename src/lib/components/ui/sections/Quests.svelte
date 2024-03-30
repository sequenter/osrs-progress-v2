<script lang="ts">
	import { Controls, Section } from '$lib/components';
	import { getQuests } from '$lib/utils/get.utils';
	import type { Quest } from '$lib/data/types';
	import { QUESTS } from '$lib/data';
	import { Quests } from '$stores/quests.store';
	import { QuestTile } from '$lib/components/ui/tiles';
	import { Settings } from '$stores/settings.store';
	import { Skills } from '$stores/skills.store';

	let quests: (Quest & { upcoming: boolean })[];

	$: quests = getQuests(QUESTS as Quest[], $Skills, $Settings, $Quests).sort(compare);

	const compare = (a: Quest, b: Quest) => {
		return (
			+$Quests.items.includes(a.name) - +$Quests.items.includes(b.name) ||
			a.name.localeCompare(b.name)
		);
	};

	const isComplete = (name: string) => {
		return $Quests.items.includes(name);
	};

	const canShow = (name: string) => {
		return $Settings.show__completed || !$Quests.items.includes(name);
	};
</script>

<Section title="Quests">
	<img slot="icon" class="me-3 w-8 h-8" src="$lib/assets/icons/Quests.png" alt="Quests icon" />

	<svelte:fragment slot="controls">
		<Controls
			complete={$Quests.items.length}
			total={quests.length}
			bind:show={$Settings.show.quests}
		/>
	</svelte:fragment>

	{#if $Settings.show.quests}
		{#each quests as quest}
			{#if canShow(quest.name)}
				<QuestTile
					img={quest.img}
					difficulty={quest.difficulty}
					name={quest.name}
					upcoming={quest.upcoming}
					complete={isComplete(quest.name)}
					requirements={quest.requirements}
				/>
			{/if}
		{/each}
	{/if}
</Section>
