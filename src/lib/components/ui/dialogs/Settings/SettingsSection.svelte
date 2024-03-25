<script lang="ts">
	export let title: string;
</script>

<div class="px-5 py-5">
	<h2 class="text-2xl">{title}</h2>
	<ul class="flex flex-col list-none gap-1 overflow-scroll pe-1 py-2">
		<slot />
	</ul>
</div>
