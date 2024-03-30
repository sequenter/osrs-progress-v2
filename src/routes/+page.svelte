<script lang="ts">
	import {
		Achievements,
		Collections,
		Pets,
		Quests,
		RequirementsDialog,
		Skills
	} from '$lib/components';
	import { Requirements } from '$stores/requirements.store';

	let requirementsDialog: RequirementsDialog;

	$: $Requirements,
		(() => {
			requirementsDialog &&
				Object.keys($Requirements).length > 0 &&
				requirementsDialog.show($Requirements);
		})();
</script>

<Skills />
<hr class="h-px mx-5 bg-birch-950 border-0" />
<Achievements />
<hr class="h-px mx-5 bg-birch-950 border-0" />
<Quests />
<hr class="h-px mx-5 bg-birch-950 border-0" />
<Pets />
<hr class="h-px mx-5 bg-birch-950 border-0" />
<Collections />

<RequirementsDialog bind:this={requirementsDialog} />
