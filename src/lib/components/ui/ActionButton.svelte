<script lang="ts">
	import { clsx } from 'clsx';

	export let onClick: () => void;
	export let disabled = false;
</script>

<button
	class={clsx('transition-opacity opacity-60', !disabled && 'hover:opacity-100')}
	on:click={onClick}
	{disabled}
>
	<slot />
</button>
