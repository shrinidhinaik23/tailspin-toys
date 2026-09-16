/**
 * Provides build-time data-access helpers for game categories.
 * The helpers use an injectable Drizzle database client for page rendering
 * and in-memory unit tests.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { categories } from '../../db/schema';
import type { Category } from '../types/game';

/** Retrieve all categories ordered alphabetically by name. */
export async function getAllCategories(db: Database): Promise<Category[]> {
    const rows = await db
        .select({
            id: categories.id,
            name: categories.name,
        })
        .from(categories)
        .orderBy(asc(categories.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
