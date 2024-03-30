<script lang="ts">
	import { QUEST_POINTS, SKILLS } from '$constant/Global';
	import ProgressNumeral from './Numeral.svelte';
	import { Quests } from '$stores/quests.store';
	import { Skills } from '$stores/skills.store';

	$: completeSkills = Object.values($Skills.items).filter((skill) => !skill.locked).length;
</script>

<ProgressNumeral title="Skills" total={Object.keys(SKILLS).length} complete={completeSkills} />
<ProgressNumeral title="Quest Points" total={QUEST_POINTS} complete={$Quests.qp} />
