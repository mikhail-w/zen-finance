import { config } from 'dotenv';
import { subDays } from 'date-fns';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { categories, accounts, transactions } from '@/db/schema';
import * as fs from 'fs';
import * as path from 'path';
import { eq, inArray } from 'drizzle-orm';

// Get user ID from command line argument
const userId = process.argv[2];
if (!userId) {
  console.error('Please provide a user ID as a command line argument');
  console.error('Usage: npm run db:seed -- your-user-id');
  process.exit(1);
}

console.log('Loading environment variables manually...');
try {
  const envPath = path.resolve(process.cwd(), '.env.local');
  console.log(`Looking for .env file at: ${envPath}`);

  if (fs.existsSync(envPath)) {
    console.log('.env.local file found');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const envVars = envContent.split('\n');

    for (const line of envVars) {
      if (line.trim() && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=');
        process.env[key.trim()] = value.trim();
      }
    }
  } else {
    console.log('.env.local file not found, trying .env');
    const regularEnvPath = path.resolve(process.cwd(), '.env');

    if (fs.existsSync(regularEnvPath)) {
      console.log('.env file found');
      const envContent = fs.readFileSync(regularEnvPath, 'utf-8');
      const envVars = envContent.split('\n');

      for (const line of envVars) {
        if (line.trim() && !line.startsWith('#')) {
          const [key, ...valueParts] = line.split('=');
          const value = valueParts.join('=');
          process.env[key.trim()] = value.trim();
        }
      }
    }
  }
} catch (error) {
  console.error('Error loading environment variables:', error);
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL not found in environment variables');
  process.exit(1);
}

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Is defined' : 'Is not defined');

// Create the database connection
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

console.log(`Using user ID: ${userId}`);

const SEED_CATEGORIES = [
  { id: `category_${Date.now()}_1`, name: 'Food', userId, plaidId: null },
  { id: `category_${Date.now()}_2`, name: 'Rent', userId, plaidId: null },
  { id: `category_${Date.now()}_3`, name: 'Utilities', userId, plaidId: null },
  { id: `category_${Date.now()}_4`, name: 'Clothing', userId, plaidId: null },
];

const SEED_ACCOUNTS = [
  { id: `account_${Date.now()}_1`, name: 'Checking', userId, plaidId: null },
  { id: `account_${Date.now()}_2`, name: 'Savings', userId, plaidId: null },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];

import { eachDayOfInterval, format } from 'date-fns';
import { convertAmountToMiliunits } from '@/lib/utils';

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case 'Rent':
      return Math.random() * 400 + 90;
    case 'Utilities':
      return Math.random() * 200 + 50;
    case 'Food':
      return Math.random() * 30 + 10;
    case 'Transportation':
    case 'Health':
      return Math.random() * 50 + 15;
    case 'Entertainment':
    case 'Clothing':
    case 'Miscellaneous':
      return Math.random() * 100 + 20;
    default:
      return Math.random() * 50 + 10;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < numTransactions; i++) {
    const category = SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6;
    const amount = generateRandomAmount(category);
    const formattedAmount = convertAmountToMiliunits(isExpense ? -amount : amount);

    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, 'yyyy-MM-dd')}_${i}_${Date.now()}`,
      accountId: SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: 'Demo Merchant',
      notes: 'Demo transaction',
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
  days.forEach(day => generateTransactionsForDay(day));
};

const main = async () => {
  try {
    console.log('Starting database seeding process...');

    // Reset database for this user
    console.log('Deleting existing data...');
    await db.delete(transactions)
      .where(eq(transactions.accountId, SEED_ACCOUNTS[0].id))
      .execute();
    await db.delete(accounts)
      .where(eq(accounts.userId, userId))
      .execute();
    await db.delete(categories)
      .where(eq(categories.userId, userId))
      .execute();

    // Generate transactions
    generateTransactions();

    // Seed categories
    console.log('Seeding categories...');
    await db.insert(categories).values(SEED_CATEGORIES).execute();

    // Seed accounts
    console.log('Seeding accounts...');
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();

    // Seed transactions
    console.log(`Seeding ${SEED_TRANSACTIONS.length} transactions...`);
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seed:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
};

// Run the main function
main();
