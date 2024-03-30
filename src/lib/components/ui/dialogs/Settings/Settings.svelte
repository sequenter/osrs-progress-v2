<script lang="ts">
	import { CheckInput, NumberInput } from '$lib/components';
	import Dialog from '../Dialog.svelte';
	import { Settings } from '$stores/settings.store';
	import SettingsItem from './SettingsItem.svelte';
	import SettingsSection from './SettingsSection.svelte';

	export function show() {
		dialog.showModal();
	}

	let dialog: HTMLDialogElement;
</script>

<Dialog bind:dialog title="Settings" img="Settings">
	<SettingsSection title="General">
		<SettingsItem item="Ironman btw">
			<CheckInput bind:checked={$Settings.general__ironman} />
		</SettingsItem>

		<hr class="h-px my-1 bg-birch-900 border-0" />

		<SettingsItem item="Require recommended stats">
			<CheckInput bind:checked={$Settings.general__recommended} />
		</SettingsItem>
	</SettingsSection>

	<hr class="h-px my-1 bg-birch-950 border-0" />

	<SettingsSection title="Show Tasks">
		<SettingsItem item="That require combat">
			<CheckInput bind:checked={$Settings.show__combat} />
		</SettingsItem>

		<hr class="h-px my-1 bg-birch-900 border-0" />

		<SettingsItem item="That are completed">
			<CheckInput bind:checked={$Settings.show__completed} />
		</SettingsItem>

		<hr class="h-px my-1 bg-birch-900 border-0" />

		<SettingsItem item="That are upcoming">
			<NumberInput bind:value={$Settings.show__upcoming} min={0} max={99} />
		</SettingsItem>
	</SettingsSection>
</Dialog>
