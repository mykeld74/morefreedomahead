import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { building } from '$app/environment';
import { env } from '$env/dynamic/private';

const fallbackBuildDatabaseUrl =
	'postgresql://build:build@localhost:5432/build_placeholder?sslmode=disable';

const databaseUrl = env.DATABASE_URL ?? (building ? fallbackBuildDatabaseUrl : undefined);

if (!databaseUrl) throw new Error('DATABASE_URL is not set');

const client = neon(databaseUrl);

export const db = drizzle(client, { schema });
