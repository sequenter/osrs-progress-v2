<script lang="ts">
	import { Left, Right, SVG } from '$lib/assets';
	import { ActionButton } from '$lib/components';

	export let value: number;
	export let min: number;
	export let max: number;
	export let disabled = false;
	export let onChange = () => {};

	const handleClick = (val: number) => {
		value = Math.min(max, Math.max(min, value + val));
		onChange();
	};
</script>

<div class="flex items-center justify-between w-12 h-6">
	<ActionButton onClick={() => handleClick(-1)} {disabled}>
		<SVG><Left /></SVG>
	</ActionButton>

	<span class="flex-1 text-center text-lg">{value}</span>

	<ActionButton onClick={() => handleClick(1)} {disabled}>
		<SVG><Right /></SVG>
	</ActionButton>
</div>
