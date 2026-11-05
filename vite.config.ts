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

// Rolldown's CJS interop helper runs `createRequire(import.meta.url)` at module load.
// `import.meta.url` is undefined in Workers, which crashes the Function on publish.
const fixWorkerCreateRequire = (): Plugin => ({
	name: 'fix-worker-create-require',
	apply: 'build',
	renderChunk(code) {
		if (this.environment?.name !== 'ssr') return null;
		if (!code.includes('createRequire(import.meta.url)')) return null;
		return {
			code: code.replaceAll(
				'createRequire(import.meta.url)',
				"createRequire('file:///worker.js')"
			),
			map: null
		};
	}
});

export default defineConfig({
	plugins: [prefixNodeBuiltins(), fixWorkerCreateRequire(), sveltekit()],
	// Resolve packages like get-it to their fetch-based builds in Workers, not the Node/stream ones.
	ssr: { resolve: { conditions: ['workerd', 'worker'] } },
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
