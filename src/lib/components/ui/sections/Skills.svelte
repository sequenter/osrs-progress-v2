<script lang="ts">
	import { Section } from '$lib/components';
	import { SKILLS } from '$constant/Global';
	import { SkillTile } from '$lib/components/ui/tiles';
</script>

<Section
	title="Skills"
	htmlClass="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-5 lg:gap-4 xl:gap-3"
>
	<img slot="icon" class="me-3 w-8 h-8" src="$lib/assets/icons/Stats.png" alt="Skills icon" />

	{#each SKILLS as skill}
		<SkillTile {skill} minLevel={skill === 'Hitpoints' ? 10 : 1} maxLevel={99} />
	{/each}
</Section>
