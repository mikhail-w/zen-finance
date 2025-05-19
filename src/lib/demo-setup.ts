import { subDays, eachDayOfInterval, format } from 'date-fns';
import { db } from '@/db';
import { accounts, categories, transactions } from '@/db/schema';
import { convertAmountToMiliunits } from '@/lib/utils';

const generateRandomAmount = (categoryName: string) => {
  switch (categoryName) {
    case 'Rent/Mortgage':
      return Math.random() * 1000 + 800; // $800-1800
    case 'Utilities':
      return Math.random() * 150 + 50; // $50-200
    case 'Groceries':
      return Math.random() * 150 + 50; // $50-200
    case 'Dining Out':
      return Math.random() * 60 + 20; // $20-80
    case 'Transportation':
      return Math.random() * 70 + 30; // $30-100
    case 'Healthcare':
      return Math.random() * 200 + 50; // $50-250
    case 'Entertainment':
      return Math.random() * 80 + 20; // $20-100
    case 'Shopping':
      return Math.random() * 150 + 50; // $50-200
    case 'Personal Care':
      return Math.random() * 100 + 30; // $30-130
    case 'Insurance':
      return Math.random() * 150 + 100; // $100-250
    case 'Savings':
      return Math.random() * 500 + 200; // $200-700 (income)
    case 'Salary':
      return Math.random() * 2000 + 3000; // $3000-5000 (income)
    default:
      return Math.random() * 50 + 20; // $20-70
  }
};

export async function setupDemoData(userId: string) {
  try {
    // Create demo categories
    const demoCategories = [
      { id: `category_${Date.now()}_1`, name: 'Rent/Mortgage', userId, plaidId: null },
      { id: `category_${Date.now()}_2`, name: 'Utilities', userId, plaidId: null },
      { id: `category_${Date.now()}_3`, name: 'Groceries', userId, plaidId: null },
      { id: `category_${Date.now()}_4`, name: 'Dining Out', userId, plaidId: null },
      { id: `category_${Date.now()}_5`, name: 'Transportation', userId, plaidId: null },
      { id: `category_${Date.now()}_6`, name: 'Healthcare', userId, plaidId: null },
      { id: `category_${Date.now()}_7`, name: 'Entertainment', userId, plaidId: null },
      { id: `category_${Date.now()}_8`, name: 'Shopping', userId, plaidId: null },
      { id: `category_${Date.now()}_9`, name: 'Personal Care', userId, plaidId: null },
      { id: `category_${Date.now()}_10`, name: 'Insurance', userId, plaidId: null },
      { id: `category_${Date.now()}_11`, name: 'Savings', userId, plaidId: null },
      { id: `category_${Date.now()}_12`, name: 'Salary', userId, plaidId: null },
    ];

    // Create demo accounts
    const demoAccounts = [
      { id: `account_${Date.now()}_1`, name: 'Checking', userId, plaidId: null },
      { id: `account_${Date.now()}_2`, name: 'Savings', userId, plaidId: null },
      { id: `account_${Date.now()}_3`, name: 'Credit Card', userId, plaidId: null },
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
      // Generate 1-3 transactions per day
      const numTransactions = Math.floor(Math.random() * 3) + 1;
      
      // Always generate one salary transaction on the 1st and 15th of each month
      const dayOfMonth = day.getDate();
      if (dayOfMonth === 1 || dayOfMonth === 15) {
        const salaryCategory = demoCategories.find(c => c.name === 'Salary');
        if (salaryCategory) {
          const amount = generateRandomAmount('Salary');
          demoTransactions.push({
            id: `transaction_${format(day, 'yyyy-MM-dd')}_salary_${Date.now()}`,
            accountId: demoAccounts[0].id, // Checking account
            categoryId: salaryCategory.id,
            date: day,
            amount: convertAmountToMiliunits(amount), // Positive amount for income
            payee: 'Employer Inc.',
            notes: 'Monthly salary',
          });
        }
      }

      // Generate regular transactions
      for (let i = 0; i < numTransactions; i++) {
        // Skip rent/mortgage and insurance categories most days, only include them on 1st of month
        const availableCategories = demoCategories.filter(category => {
          if ((category.name === 'Rent/Mortgage' || category.name === 'Insurance') && day.getDate() !== 1) {
            return false;
          }
          // Exclude Salary category from regular transactions
          if (category.name === 'Salary') {
            return false;
          }
          return true;
        });

        const category = availableCategories[Math.floor(Math.random() * availableCategories.length)];
        const amount = generateRandomAmount(category.name);
        const isIncome = category.name === 'Savings'; // Only Savings is considered income besides Salary

        demoTransactions.push({
          id: `transaction_${format(day, 'yyyy-MM-dd')}_${i}_${Date.now()}`,
          accountId: demoAccounts[Math.floor(Math.random() * demoAccounts.length)].id,
          categoryId: category.id,
          date: day,
          amount: convertAmountToMiliunits(isIncome ? amount : -amount),
          payee: `Demo ${category.name} Merchant`,
          notes: `Demo ${category.name.toLowerCase()} transaction`,
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