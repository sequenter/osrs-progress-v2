<script lang="ts">
	import { ActionButton, Section } from '$lib/components';
	import { Settings as Icon, SVG } from '$lib/assets';
	import { SettingsDialog } from '$lib/components';
	import { SKILLS } from '$constant/Global';
	import { SkillTile } from '$lib/components/ui/tiles';

	let settingsDialog: SettingsDialog;

	const handleSettings = () => {
		settingsDialog.show();
	};
</script>

<Section
	title="Skills"
	htmlClass="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-10 2xl:grid-cols-12 gap-5 lg:gap-4 xl:gap-3"
>
	<img slot="icon" class="me-3 w-8 h-8" src="$lib/assets/icons/Stats.png" alt="Skills icon" />

	<svelte:fragment slot="controls">
		<ActionButton onClick={handleSettings}>
			<SVG htmlClass="w-8 h-8"><Icon /></SVG>
		</ActionButton>
	</svelte:fragment>

	{#each SKILLS as skill}
		<SkillTile {skill} min={skill === 'Hitpoints' ? 10 : 1} max={99} />
	{/each}
</Section>

<SettingsDialog bind:this={settingsDialog} />
