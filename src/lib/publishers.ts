/**
 * Provides build-time data-access helpers for game publishers.
 * The helpers use an injectable Drizzle database client for page rendering
 * and in-memory unit tests.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Retrieve all publishers ordered alphabetically by name.
 *
 * @param db - Drizzle database client used to query publishers.
 * @returns Publishers mapped to the application's publisher type.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
