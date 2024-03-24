<script>
	import '../app.css';
	import { Sidebar } from '$lib/components';
</script>

<div class="bg-birch-800 text-carrot-400 select-none">
	<div class="flex flex-col lg:flex-row">
		<aside class="lg:w-96 lg:h-screen lg:sticky lg:top-0 bg-birch-950">
			<Sidebar />
		</aside>
		<main class="w-full">
			<div class="container mx-auto min-h-screen gap-5">
				<slot />
			</div>
		</main>
	</div>
</div>
