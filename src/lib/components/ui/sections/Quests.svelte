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
	let show = true;

	$: quests = getQuests(QUESTS as Quest[], $Skills, $Settings, $Quests).sort(
		(a, b) =>
			+$Quests.quests.includes(a.name) - +$Quests.quests.includes(b.name) ||
			a.name.localeCompare(b.name)
	);

	const canShow = (name: string) => {
		return $Settings.show__completed || !$Quests.quests.includes(name);
	};
</script>

<Section title="Quests">
	<img slot="icon" class="me-3 w-8 h-8" src="$lib/assets/icons/Quests.png" alt="Quests icon" />

	<svelte:fragment slot="controls">
		<Controls complete={$Quests.quests.length} total={quests.length} bind:show />
	</svelte:fragment>

	{#if show}
		{#each quests as quest}
			{#if canShow(quest.name)}
				<QuestTile
					img={quest.img}
					difficulty={quest.difficulty}
					name={quest.name}
					upcoming={quest.upcoming}
				/>
			{/if}
		{/each}
	{/if}
</Section>
