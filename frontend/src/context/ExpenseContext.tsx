import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Category, Expense } from "../types";
import { loadCategories, loadExpenses, saveCategories, saveExpenses } from "../utils/storage";
import { v4 as uuid } from "uuid";

type ExpenseContextValue = {
  expenses: Expense[];
  categories: Category[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (id: string, update: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  addCategory: (name: string, color?: string) => Category;
  deleteCategory: (id: string) => void;
  replaceAll: (payload: { expenses: Expense[]; categories: Category[] }) => void;
};

const ExpenseContext = createContext<ExpenseContextValue | undefined>(undefined);

const randomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setExpenses(loadExpenses());
    setCategories(loadCategories());
  }, []);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const value = useMemo<ExpenseContextValue>(
    () => ({
      expenses,
      categories,
      addExpense: (expense) => setExpenses((prev) => [...prev, { ...expense, id: uuid() }]),
      updateExpense: (id, update) =>
        setExpenses((prev) => prev.map((e) => (e.id === id ? { ...update, id } : e))),
      deleteExpense: (id) => setExpenses((prev) => prev.filter((e) => e.id !== id)),
      addCategory: (name, color) => {
        const cat: Category = { id: uuid(), name, color: color ?? randomColor() };
        setCategories((prev) => [...prev, cat]);
        return cat;
      },
      deleteCategory: (id) => {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        setExpenses((prev) => prev.map((e) => (e.categoryId === id ? { ...e, categoryId: "uncategorized" } : e)));
      },
      replaceAll: (payload) => {
        setCategories(payload.categories);
        setExpenses(payload.expenses);
      },
    }),
    [categories, expenses]
  );

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};

export const useExpenses = () => {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error("useExpenses must be used within ExpenseProvider");
  return ctx;
};

