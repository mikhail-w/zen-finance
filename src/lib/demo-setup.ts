import { subDays, eachDayOfInterval, format } from 'date-fns';
import { db } from '@/db';
import { accounts, categories, transactions } from '@/db/schema';
import { convertAmountToMiliunits } from '@/lib/utils';

const generateRandomAmount = (categoryName: string) => {
  switch (categoryName) {
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

export async function setupDemoData(userId: string) {
  try {
    // Create demo categories
    const demoCategories = [
      { id: `category_${Date.now()}_1`, name: 'Food', userId, plaidId: null },
      { id: `category_${Date.now()}_2`, name: 'Rent', userId, plaidId: null },
      { id: `category_${Date.now()}_3`, name: 'Utilities', userId, plaidId: null },
      { id: `category_${Date.now()}_4`, name: 'Clothing', userId, plaidId: null },
    ];

    // Create demo accounts
    const demoAccounts = [
      { id: `account_${Date.now()}_1`, name: 'Checking', userId, plaidId: null },
      { id: `account_${Date.now()}_2`, name: 'Savings', userId, plaidId: null },
    ];

    // Insert categories and accounts
    await db.insert(categories).values(demoCategories).execute();
    await db.insert(accounts).values(demoAccounts).execute();

    // Generate demo transactions
    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 90);
    const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
    const demoTransactions = [];

    for (const day of days) {
      const numTransactions = Math.floor(Math.random() * 4) + 1;
      for (let i = 0; i < numTransactions; i++) {
        const category = demoCategories[Math.floor(Math.random() * demoCategories.length)];
        const isExpense = Math.random() > 0.6;
        const amount = generateRandomAmount(category.name);
        const formattedAmount = convertAmountToMiliunits(isExpense ? -amount : amount);

        demoTransactions.push({
          id: `transaction_${format(day, 'yyyy-MM-dd')}_${i}_${Date.now()}`,
          accountId: demoAccounts[0].id,
          categoryId: category.id,
          date: day,
          amount: formattedAmount,
          payee: 'Demo Merchant',
          notes: 'Demo transaction',
        });
      }
    }

    // Insert transactions
    await db.insert(transactions).values(demoTransactions).execute();

    return {
      success: true,
      message: 'Demo data setup completed successfully',
    };
  } catch (error) {
    console.error('Error setting up demo data:', error);
    return {
      success: false,
      message: 'Failed to setup demo data',
      error: error instanceof Error ? error.message : String(error),
    };
  }
} 