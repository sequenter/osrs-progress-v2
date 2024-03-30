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
	<div class="flex flex-col p-5 gap-3 overflow-scroll">
		{#if requirements}
			{#if requirements.main}
				<svelte:component this={Concerns} concerns={requirements.main} title="Main" />
			{/if}
			{#if requirements.ironman && $Settings.general__ironman}
				<svelte:component this={Concerns} concerns={requirements.ironman} title="Ironman" />
			{/if}
			{#if requirements.recommended}
				<svelte:component this={Concerns} concerns={requirements.recommended} title="Recommended" />
			{/if}
		{/if}
	</div>
</Dialog>
