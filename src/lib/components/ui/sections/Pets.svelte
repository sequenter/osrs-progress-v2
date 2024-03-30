<script lang="ts">
	import { Controls, Section } from '$lib/components';
	import { getPets } from '$lib/utils/get.utils';
	import type { Pet } from '$lib/data/types';
	import { PETS } from '$lib/data';
	import { Pets } from '$stores/pets.store';
	import { PetTile } from '$lib/components/ui/tiles';
	import { Quests } from '$stores/quests.store';
	import { Settings } from '$stores/settings.store';
	import { Skills } from '$stores/skills.store';

	let pets: (Pet & { upcoming: boolean })[];

	$: $Pets, (pets = getPets(PETS as Pet[], $Skills, $Settings, $Quests).sort(compare));

	const compare = (a: Pet, b: Pet) => {
		return +$Pets.includes(a.name) - +$Pets.includes(b.name) || a.name.localeCompare(b.name);
	};

	const isComplete = (name: string) => {
		return $Pets.includes(name);
	};

	const canShow = (name: string) => {
		return $Settings.show__completed || !$Pets.includes(name);
	};
</script>

<Section title="Pets">
	<img slot="icon" class="me-3 w-8 h-8" src="$lib/assets/icons/Pets.png" alt="Pets icon" />

	<svelte:fragment slot="controls">
		<Controls complete={$Pets.length} total={pets.length} bind:show={$Settings.show.pets} />
	</svelte:fragment>

	{#if $Settings.show.pets}
		{#each pets as pet}
			{#if canShow(pet.name)}
				<PetTile
					img={pet.img}
					name={pet.name}
					upcoming={pet.upcoming}
					complete={isComplete(pet.name)}
				/>
			{/if}
		{/each}
	{/if}
</Section>
