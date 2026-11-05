import { handlePreviewMode, handleQueryLoader, setServerClient } from '@sanity/sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { env } from '$env/dynamic/private';
import { serverClient } from '$lib/sanity/client.server';

setServerClient(serverClient);

// Workers forbid generating random values in global scope, and handlePreviewMode does
// that when no secret is given. Build it on the first request instead. Set
// SANITY_PREVIEW_SECRET so preview cookies stay valid across worker instances.
let previewHandle: Handle | undefined;
const lazyPreviewMode: Handle = (input) => {
	previewHandle ??= handlePreviewMode({
		client: serverClient,
		preview: { redirect, secret: env.SANITY_PREVIEW_SECRET || crypto.randomUUID() }
	});
	return previewHandle(input);
};

export const handle = sequence(lazyPreviewMode, handleQueryLoader());
