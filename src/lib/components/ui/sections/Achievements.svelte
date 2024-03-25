<script lang="ts">
	import type { Achievement } from '$lib/data/types';
	import { Achievements } from '$stores/achievements.store';
	import { ACHIEVEMENTS } from '$lib/data';
	import { AchievementTile } from '$lib/components/ui/tiles';
	import { getAchievements } from '$lib/utils/get.utils';
	import { Section } from '$lib/components';
	import { Settings } from '$stores/settings.store';
	import { Skills } from '$stores/skills.store';

	$: achievements = getAchievements(ACHIEVEMENTS as Achievement[], $Skills, $Settings);

	Achievements.subscribe(() => {
		achievements = getAchievements(ACHIEVEMENTS as Achievement[], $Skills, $Settings);
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
