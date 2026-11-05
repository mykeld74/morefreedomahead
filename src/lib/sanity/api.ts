// Project ID, dataset and API version are public, not secrets, so they have
// defaults and the build never depends on environment variables being set.
const env = import.meta.env;

export const dataset: string = env.PUBLIC_SANITY_DATASET || 'production';
export const projectId: string = env.PUBLIC_SANITY_PROJECT_ID || 'opdzk1nw';
export const apiVersion: string = env.PUBLIC_SANITY_API_VERSION || '2026-05-15';
export const studioUrl: string = env.PUBLIC_SANITY_STUDIO_URL || '/studio';
