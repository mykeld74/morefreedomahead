<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head
	><title>{page.status === 404 ? 'Page not found' : 'Something went wrong'}</title></svelte:head
>

<section class="sectionPlain ctaSection">
	<h1 class="pageTitle">{page.status === 404 ? 'Page not found' : 'Something went wrong'}</h1>
	<p>
		{page.status === 404 ? 'We couldn’t find that page.' : 'Please try again in a moment.'}
	</p>
	<a class="heroCta" href={resolve('/')}>Back to home</a>
</section>
