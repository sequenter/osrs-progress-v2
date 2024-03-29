<script lang="ts">
	import { Down, SVG } from '$lib/assets';
	import { ActionButton } from '$lib/components';
	import { clsx } from 'clsx';

	export let complete: number;
	export let total: number;
	export let show: boolean;
</script>

<div class="flex gap-3 items-center">
	<h3 class="font-medium text-2xl me-2">
		<span>{complete}</span>/<span>{total}</span>
	</h3>
	<ActionButton onClick={() => (show = !show)}>
		<SVG htmlClass={clsx('w-4 h-4 text-carrot-400 transition-all transform', !show && '-rotate-90')}
			><Down /></SVG
		>
	</ActionButton>
</div>
