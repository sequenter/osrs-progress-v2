<script lang="ts">
	import type { Achievement } from '$lib/data/types';
	import { Achievements } from '$stores/achievements.store';
	import { ACHIEVEMENTS } from '$lib/data';
	import { AchievementTile } from '$lib/components/ui/tiles';
	import { getAchievements } from '$lib/utils/get.utils';
	import { Quests } from '$stores/quests.store';
	import { Section } from '$lib/components';
	import { Settings } from '$stores/settings.store';
	import { Skills } from '$stores/skills.store';

	let achievements: (Achievement & { upcoming: boolean })[];

	$: achievements = getAchievements(ACHIEVEMENTS as Achievement[], $Skills, $Settings, $Quests);

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
		<h3 class="font-medium text-2xl me-2">
			<span>{$Achievements.length}</span>/<span>{achievements.length}</span>
		</h3>
	</svelte:fragment>

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
</Section>
