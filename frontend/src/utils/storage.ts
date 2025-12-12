import { Category, Expense, ExportBundle } from "../types";

const EXPENSE_KEY = "et_expenses";
const CATEGORY_KEY = "et_categories";
const DEFAULT_CATEGORIES: Category[] = [
  { id: "groceries", name: "Groceries", color: "#4caf50" },
  { id: "bills", name: "Bills", color: "#f44336" },
  { id: "transport", name: "Transport", color: "#2196f3" },
  { id: "entertainment", name: "Entertainment", color: "#9c27b0" },
];

const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const loadExpenses = (): Expense[] =>
  safeParse<Expense[]>(localStorage.getItem(EXPENSE_KEY), []);

export const saveExpenses = (expenses: Expense[]) =>
  localStorage.setItem(EXPENSE_KEY, JSON.stringify(expenses));

export const loadCategories = (): Category[] =>
  safeParse<Category[]>(localStorage.getItem(CATEGORY_KEY), DEFAULT_CATEGORIES);

export const saveCategories = (categories: Category[]) =>
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));

export const exportBundle = (expenses: Expense[], categories: Category[]): ExportBundle => ({
  version: "1.0.0",
  exportedAt: new Date().toISOString(),
  expenses,
  categories,
});

export const importBundle = (bundle: ExportBundle) => {
  saveExpenses(bundle.expenses);
  saveCategories(bundle.categories);
};

