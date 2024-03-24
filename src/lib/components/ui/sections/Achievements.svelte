<script lang="ts">
	import { ACHIEVEMENTS } from '$lib/data';
	import type { Achievement } from '$lib/data/types';
	import { AchievementTile } from '$lib/components/ui/tiles';
	import { Section } from '$lib/components';

	const achievements = ACHIEVEMENTS as Achievement[];
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
		/>
	{/each}
</Section>
