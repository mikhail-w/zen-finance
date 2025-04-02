export interface ImportedTransaction {
  amount: number;
  date: string;
  payee: string;
  categoryId?: string;
  [key: string]: string | number | undefined;
} 