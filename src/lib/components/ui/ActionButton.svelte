<script lang="ts">
	export let onClick: () => void;
</script>

<button class="transition-opacity opacity-60 hover:opacity-100" on:click={onClick}>
	<slot />
</button>
