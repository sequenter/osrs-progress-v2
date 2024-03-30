<script lang="ts">
	import { clsx } from 'clsx';

	export let item: string;
	export let disabled = false;
</script>

<li class={clsx('flex justify-between w-full', disabled && 'opacity-40')}>
	<span class="text-xl">{item}</span>
	<slot />
</li>
