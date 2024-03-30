<script lang="ts">
	import { Collections, itemComplete } from '$stores/collections.store';
	import { iconSrc, onIconError } from '$lib/utils/icon.utils';
	import { clsx } from 'clsx';

	export let name: string;
	export let item: string;

	let complete: boolean;
	let src = iconSrc(item);

	$: $Collections, (complete = itemComplete(name, item));

	const handleClick = () => {
		console.log($Collections[name]);
		if ($Collections[name].items.includes(item)) {
			$Collections[name].items = $Collections[name].items.filter((value) => value != item);
		} else {
			$Collections[name].items = [...$Collections[name].items, item];
		}
	};
</script>

<li class={clsx('rounded-lg bg-birch-500 px-2 py-1 cursor-pointer', complete && 'opacity-60')}>
	<button class="flex justify-between items-center w-full" on:click={handleClick}>
		<div class="flex items-center">
			<img
				{src}
				alt="{item} icon"
				class="me-2 h-4 w-4"
				on:error={() => {
					src = onIconError();
				}}
			/>
			<span class="text-xl">{item}</span>
		</div>
		<span class={clsx('text-status text-md', complete ? 'text-green-400' : 'text-gray-400')}
			>{complete ? 'Complete' : 'Incomplete'}</span
		>
	</button>
</li>
