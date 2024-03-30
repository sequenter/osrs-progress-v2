<script lang="ts">
	export let complete: number;
	export let total: number;
	export let title: string;
</script>

<div class="flex flex-col p-3 rounded-lg text-center bg-birch-800 drop-shadow-lg">
	<h3 class="text-2xl">{title}</h3>
	<div class="flex items-center grow">
		<h4 class="text-2xl grow">{complete} / {total}</h4>
	</div>
</div>
