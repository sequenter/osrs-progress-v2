<script lang="ts">
	import { Left, Right, SVG } from '$lib/assets';
	import { ActionButton } from '$lib/components';

	export let value: number;
	export let min: number;
	export let max: number;
	export let htmlClass = '';

	const handleClick = (val: number) => {
		value = Math.min(max, Math.max(min, value + val));
	};
</script>

<div class="flex items-center justify-between w-12 h-6 {htmlClass}">
	<ActionButton onClick={() => handleClick(-1)}>
		<SVG><Left /></SVG>
	</ActionButton>

	<span class="flex-1 text-center text-lg">{value}</span>

	<ActionButton onClick={() => handleClick(1)}>
		<SVG><Right /></SVG>
	</ActionButton>
</div>
