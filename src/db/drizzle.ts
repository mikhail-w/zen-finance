import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export function getDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return drizzle(sql);
}

// For backward compatibility
export const db = getDb();
