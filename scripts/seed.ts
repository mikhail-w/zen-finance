import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { categories, accounts, transactions } from '@/db/schema';
import * as fs from 'fs';
import * as path from 'path';
import { eq, inArray } from 'drizzle-orm';
import { setupDemoData } from '@/lib/demo-setup';

// Get user ID from command line argument
const userId = process.argv[2];
if (!userId) {
  console.error('Please provide a user ID as a command line argument');
  console.error('Usage: npm run db:seed -- your-user-id');
  process.exit(1);
}

console.log('Loading environment variables manually...');
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = config({ path: envPath });
  if (envConfig.error) {
    throw envConfig.error;
  }
} else {
  console.warn('.env.local file not found, using process.env');
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

const main = async () => {
  try {
    console.log('Starting database seeding process...');

    // Reset database for this user
    console.log('Deleting existing data...');
    await db.delete(transactions)
      .where(eq(transactions.accountId, `account_${Date.now()}_1`))
      .execute();
    await db.delete(accounts)
      .where(eq(accounts.userId, userId))
      .execute();
    await db.delete(categories)
      .where(eq(categories.userId, userId))
      .execute();

    // Setup demo data using the shared function
    await setupDemoData(userId);

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seed:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
};

main();
