<script lang="ts">
	import { Pets } from '$stores/pets.store';
	import Tile from './Tile.svelte';
	import { updateStoreArray } from '$lib/utils/store.utils';

	export let img: string;
	export let name: string;
	export let upcoming: boolean;
	export let complete: boolean;

	const onPress = () => {
		$Pets = updateStoreArray($Pets, name);
	};
</script>

<Tile {complete} {img} {onPress} {upcoming} title={name} />
