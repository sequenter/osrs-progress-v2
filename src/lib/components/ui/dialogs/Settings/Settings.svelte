<script lang="ts">
	import { CheckInput, NumberInput } from '$lib/components';
	import Dialog from '../Dialog.svelte';
	import { Settings } from '$stores/settings.store';
	import SettingsItem from './SettingsItem.svelte';
	import SettingsSection from './SettingsSection.svelte';

	export function show() {
		dialog.showModal();
	}

	$: $Settings.general__all,
		(() => {
			if ($Settings.general__all) {
				$Settings.general__recommended = false;
			}
		})();

	let dialog: HTMLDialogElement;
</script>

<Dialog bind:dialog title="Settings" img="Settings">
	<SettingsSection title="General">
		<SettingsItem item="Disregard requirements">
			<CheckInput bind:checked={$Settings.general__all} />
		</SettingsItem>

		<hr class="h-px my-1 bg-birch-900 border-0" />

		<SettingsItem item="Ironman btw">
			<CheckInput bind:checked={$Settings.general__ironman} />
		</SettingsItem>

		{#if !$Settings.general__all}
			<hr class="h-px my-1 bg-birch-900 border-0" />

			<SettingsItem item="Require recommended stats">
				<CheckInput bind:checked={$Settings.general__recommended} />
			</SettingsItem>
		{/if}
	</SettingsSection>

	<hr class="h-px my-1 bg-birch-950 border-0" />

	<SettingsSection title="Show Tasks">
		<SettingsItem item="That are completed">
			<CheckInput bind:checked={$Settings.show__completed} />
		</SettingsItem>

		<hr class="h-px my-1 bg-birch-900 border-0" />

		<SettingsItem item="That require combat">
			<CheckInput bind:checked={$Settings.show__combat} />
		</SettingsItem>

		{#if !$Settings.general__all}
			<hr class="h-px my-1 bg-birch-900 border-0" />

			<SettingsItem item="That are upcoming">
				<NumberInput bind:value={$Settings.show__upcoming} min={0} max={99} />
			</SettingsItem>
		{/if}
	</SettingsSection>
</Dialog>
