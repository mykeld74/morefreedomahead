import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { sveltekit } from '@sveltejs/kit/vite';

import { builtinModules } from 'node:module';
import type { Plugin } from 'vite';

// Cloudflare Pages bundles the worker with a compatibility date that can't be
// set from here. Bare Node imports ("crypto") only resolve on dates >= 2024-09-23,
// while "node:crypto" always resolves with the nodejs_compat flag. Rewrite them.
const bareBuiltins = new Set(builtinModules.filter((m) => !m.startsWith('_')));
const prefixNodeBuiltins = (): Plugin => ({
	name: 'prefix-node-builtins',
	enforce: 'pre',
	apply: 'build',
	resolveId(source) {
		if (this.environment?.name !== 'ssr') return null;
		if (!bareBuiltins.has(source)) return null;
		return { id: `node:${source}`, external: true };
	}
});

export default defineConfig({
	plugins: [prefixNodeBuiltins(), sveltekit()],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
