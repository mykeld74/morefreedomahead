import { env } from '$env/dynamic/private';
import { client } from '$lib/sanity/client';

// Read at runtime so building does not require the token to be set.
export const serverClient = client.withConfig({
	token: env.SANITY_API_READ_TOKEN,
	useCdn: false,
	stega: true
});
