<script lang="ts">
	import { Pets } from '$stores/pets.store';
	import type { Requirements } from '$lib/data/types';
	import Tile from './Tile.svelte';
	import { updateStoreArray } from '$lib/utils/store.utils';

	export let img: string;
	export let name: string;
	export let upcoming: boolean;
	export let complete: boolean;
	export let requirements: Requirements;

	const onPress = () => {
		$Pets = updateStoreArray($Pets, name);
	};
</script>

<Tile title={name} {complete} {img} {upcoming} {requirements} {onPress} />
