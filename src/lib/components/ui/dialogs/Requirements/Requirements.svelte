<script lang="ts">
	import Concerns from './Concerns.svelte';
	import Dialog from '../Dialog.svelte';
	import type { Requirements } from '$lib/data/types';
	import { Settings } from '$stores/settings.store';

	let dialog: HTMLDialogElement;
	let requirements: Requirements & { title?: string };

	export function show(taskRequirements: Requirements & { title?: string }) {
		requirements = taskRequirements;
		dialog.showModal();
	}
</script>

<Dialog bind:dialog title={requirements?.title || ''} img={'Cake of guidance'}>
	<div class="flex flex-col p-5 gap-1 overflow-scroll">
		{#if requirements}
			{#if requirements.main}
				<h2 class="text-2xl">Main</h2>
				<svelte:component this={Concerns} concerns={requirements.main} />
			{/if}
			{#if requirements.ironman && $Settings.general__ironman}
				<h2 class="text-2xl pt-5">Ironman</h2>
				<svelte:component this={Concerns} concerns={requirements.ironman} />
			{/if}
		{/if}
	</div>
</Dialog>
