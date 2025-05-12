import React, { createContext, useContext, useEffect, useState } from 'react';
import { ExpenseData, Expense } from '../types/expense';
import { loadExpenseData, saveExpenseData, getDefaultData } from '../utils/storage';

interface ExpenseContextType {
  data: ExpenseData;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  updateBudget: (amount: number) => void;
  addCategory: (category: string) => void;
  clearAllData: () => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ExpenseData>(getDefaultData());

  useEffect(() => {
    const loadData = async () => {
      const savedData = await loadExpenseData();
      if (savedData) {
        setData(savedData);
      }
    };
    loadData();
  }, []);

  const updateStorage = async (newData: ExpenseData) => {
    setData(newData);
    await saveExpenseData(newData);
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    updateStorage({
      ...data,
      expenses: [...data.expenses, newExpense],
    });
  };

  const deleteExpense = (id: string) => {
    updateStorage({
      ...data,
      expenses: data.expenses.filter(exp => exp.id !== id),
    });
  };

  const updateBudget = (amount: number) => {
    updateStorage({
      ...data,
      monthlyBudget: amount,
    });
  };

  const addCategory = (category: string) => {
    if (!data.categories.includes(category)) {
      updateStorage({
        ...data,
        categories: [...data.categories, category],
      });
    }
  };

  const clearAllData = () => {
    updateStorage(getDefaultData());
  };

  return (
    <ExpenseContext.Provider
      value={{
        data,
        addExpense,
        deleteExpense,
        updateBudget,
        addCategory,
        clearAllData,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};