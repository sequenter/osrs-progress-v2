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

	$: $Achievements,
		(achievements = getAchievements(
			ACHIEVEMENTS as Achievement[],
			$Skills,
			$Settings,
			$Quests
		).sort(compare));

	const compare = (a: Achievement, b: Achievement) => {
		return (
			+$Achievements.includes(a.task) - +$Achievements.includes(b.task) ||
			a.diary.localeCompare(b.diary) ||
			DIFFICULTY_COMPARE[a.difficulty] - DIFFICULTY_COMPARE[b.difficulty]
		);
	};

	const isComplete = (task: string) => {
		return $Achievements.includes(task);
	};

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
		<Controls
			complete={$Achievements.length}
			total={achievements.length}
			bind:show={$Settings.show.achievements}
		/>
	</svelte:fragment>

	{#if $Settings.show.achievements}
		{#each achievements as achievement}
			{#if canShow(achievement.task)}
				<AchievementTile
					img={achievement.img}
					diary={achievement.diary}
					difficulty={achievement.difficulty}
					task={achievement.task}
					upcoming={achievement.upcoming}
					complete={isComplete(achievement.task)}
					requirements={achievement.requirements}
				/>
			{/if}
		{/each}
	{/if}
</Section>
