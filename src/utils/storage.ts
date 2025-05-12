import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExpenseData } from '../types/expense';

const STORAGE_KEY = '@cyros_expense_data';

export const saveExpenseData = async (data: ExpenseData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save expense data', e);
  }
};

export const loadExpenseData = async (): Promise<ExpenseData | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to load expense data', e);
    return null;
  }
};

export const getDefaultData = (): ExpenseData => ({
  expenses: [],
  categories: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills'],
  monthlyBudget: 3000,
});