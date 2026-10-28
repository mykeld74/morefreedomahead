import type { SanityLocals } from '@sanity/sveltekit';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}

		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		interface Locals extends SanityLocals {}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
	}
}

export {};
