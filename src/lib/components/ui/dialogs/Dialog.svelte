<script lang="ts">
	import { Close, SVG } from '$lib/assets';
	import { iconSrc, onIconError } from '$lib/utils/icon.utils';

	export let dialog: HTMLDialogElement;
	export let title: string;
	export let img: string;

	$: src = img ? iconSrc(img) : onIconError();
</script>

<dialog bind:this={dialog} on:close class="max-h-full max-w-full bg-black/80 text-carrot-400">
	<div class="h-screen w-screen flex flex-col justify-center items-stretch sm:items-center">
		<div class="flex flex-col sm:min-w-lg max-h-9/10 rounded-xl m-5 bg-birch-800 select-none">
			<div class="flex justify-between items-center px-5">
				<div class="flex flex-row items-center py-3">
					<img
						{src}
						alt="{img} icon"
						on:error={() => {
							src = onIconError();
						}}
					/>
					<h2 class="ms-3 font-medium text-2xl">{title}</h2>
				</div>
				<button on:click={() => dialog.close()}>
					<SVG htmlClass="w-8 h-8 opacity-30 hover:opacity-60 cursor-pointer transition-opacity"
						><Close /></SVG
					>
				</button>
			</div>
			<hr class="h-px my-1 bg-birch-950 border-0" />
			<slot />
		</div>
	</div>
</dialog>
