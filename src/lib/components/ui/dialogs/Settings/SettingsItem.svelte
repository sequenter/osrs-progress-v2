<script lang="ts">
	export let item: string;
</script>

<li class="flex justify-between w-full">
	<span class="text-xl">{item}</span>
	<slot />
</li>
