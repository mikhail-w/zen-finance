import { config } from 'dotenv';
import { subDays } from 'date-fns';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { categories, accounts, transactions } from '@/db/schema';
import * as fs from 'fs';
import * as path from 'path';

// Manually load the DATABASE_URL from .env file since the config() method isn't working
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

// Hardcode the DATABASE_URL from what we see in your .env file
if (!process.env.DATABASE_URL) {
  console.log('DATABASE_URL not found in environment, using hardcoded value');
  process.env.DATABASE_URL =
    'postgresql://neondb_owner:npg_1xNdb18awfFHOep@withered-credit-a4smoszg-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require';
}

console.log(
  'DATABASE_URL:',
  process.env.DATABASE_URL ? 'Is defined' : 'Is not defined'
);

// Create the database connection
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

// Use the correct user ID from Clerk
const SEED_USER_ID = 'user_2trtEteGjV50IKsFKKLqfgxOAeu';

// Keep the rest of your seed code the same...
console.log(`Using user ID: ${SEED_USER_ID}`);

const SEED_CATEGORIES = [
  { id: 'category_1', name: 'Food', userId: SEED_USER_ID, plaidId: null },
  { id: 'category_2', name: 'Rent', userId: SEED_USER_ID, plaidId: null },
  { id: 'category_3', name: 'Utilities', userId: SEED_USER_ID, plaidId: null },
  { id: 'category_7', name: 'Clothing', userId: SEED_USER_ID, plaidId: null },
];

const SEED_ACCOUNTS = [
  { id: 'account_1', name: 'Checking', userId: SEED_USER_ID, plaidId: null },
  { id: 'account_2', name: 'Savings', userId: SEED_USER_ID, plaidId: null },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];

import { eachDayOfInterval, format } from 'date-fns';
import { convertAmountToMiliunits } from '@/lib/utils';

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case 'Rent':
      return Math.random() * 400 + 90; // Rent will likely be a larger amount
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
  const numTransactions = Math.floor(Math.random() * 4) + 1; // 1 to 4 transactions per day
  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6; // 60% chance of being an expense
    const amount = generateRandomAmount(category);
    const formattedAmount = convertAmountToMiliunits(
      isExpense ? -amount : amount
    ); // Negative for expenses

    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, 'yyyy-MM-dd')}_${i}`,
      accountId: SEED_ACCOUNTS[0].id, // Assuming always using the first account for simplicity
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: 'Merchant',
      notes: 'Random transaction',
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
  days.forEach(day => generateTransactionsForDay(day));
};

generateTransactions();

const main = async () => {
  try {
    console.log('Starting database seeding process...');

    // Reset database
    console.log('Deleting existing data...');
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();

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
    console.error(
      'Error details:',
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
};

// Run the main function
main();
