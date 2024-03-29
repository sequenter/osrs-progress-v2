<script lang="ts">
	import { Controls, Section } from '$lib/components';
	import type { Achievement } from '$lib/data/types';
	import { Achievements } from '$stores/achievements.store';
	import { ACHIEVEMENTS } from '$lib/data';
	import { AchievementTile } from '$lib/components/ui/tiles';
	import { DIFFICULTY_COMPARE } from '$constant/Global';
	import { getAchievements } from '$lib/utils/get.utils';
	import { Quests } from '$stores/quests.store';
	import { Settings } from '$stores/settings.store';
	import { Skills } from '$stores/skills.store';

	let achievements: (Achievement & { upcoming: boolean })[];
	let show = true;

	$: achievements = getAchievements(
		ACHIEVEMENTS as Achievement[],
		$Skills,
		$Settings,
		$Quests
	).sort(
		(a, b) =>
			+$Achievements.includes(a.task) - +$Achievements.includes(b.task) ||
			a.diary.localeCompare(b.diary) ||
			DIFFICULTY_COMPARE[a.difficulty] - DIFFICULTY_COMPARE[b.difficulty]
	);

	Achievements.subscribe(() => {
		// Completing achievements only adds them to the achievements store with no further processing required,
		// and as such 'getAchievements' does not have to be called again.
		achievements = achievements;
	});

	const canShow = (task: string) => {
		return $Settings.show__completed || !$Achievements.includes(task);
	};
</script>

<Section title="Achievements">
	<img
		slot="icon"
		class="me-3 w-8 h-8"
		src="$lib/assets/icons/Achievements.png"
		alt="Achievements icon"
	/>

	<svelte:fragment slot="controls">
		<Controls complete={$Achievements.length} total={achievements.length} bind:show />
	</svelte:fragment>

	{#if show}
		{#each achievements as achievement}
			{#if canShow(achievement.task)}
				<AchievementTile
					img={achievement.img}
					diary={achievement.diary}
					difficulty={achievement.difficulty}
					task={achievement.task}
					upcoming={achievement.upcoming}
				/>
			{/if}
		{/each}
	{/if}
</Section>
