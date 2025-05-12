export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
}

export interface ExpenseData {
  expenses: Expense[];
  categories: string[];
  monthlyBudget: number;
}