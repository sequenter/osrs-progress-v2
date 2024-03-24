<script lang="ts">
	import type { Achievement } from '$lib/data/types';
	import { ACHIEVEMENTS } from '$lib/data';
	import { AchievementTile } from '$lib/components/ui/tiles';
	import { getAchievements } from '$lib/utils/get.utils';
	import { Section } from '$lib/components';
	import { Skills } from '$stores/skills.store';

	let achievements = getAchievements(ACHIEVEMENTS as Achievement[], $Skills);

	Skills.subscribe(() => {
		achievements = getAchievements(ACHIEVEMENTS as Achievement[], $Skills);
	});
</script>

<Section title="Achievements">
	<img
		slot="icon"
		class="me-3 w-8 h-8"
		src="$lib/assets/icons/Achievements.png"
		alt="Achievements icon"
	/>

	{#each achievements as achievement}
		<AchievementTile
			img={achievement.img}
			diary={achievement.diary}
			difficulty={achievement.difficulty}
			task={achievement.task}
			upcoming={achievement.upcoming}
		/>
	{/each}
</Section>
