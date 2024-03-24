<script lang="ts">
	import clsx from 'clsx';

	export let determiner: boolean;
	export let onClick: () => void;
</script>

<button
	class={clsx(
		'transition-opacity',
		!determiner && 'opacity-0',
		determiner && 'opacity-60 hover:opacity-100'
	)}
	on:click={onClick}
>
	<slot />
</button>
