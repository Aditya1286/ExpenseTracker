import { useMemo } from "react";
import { Expense, Category } from "../types";

export type ExpenseFilter = {
  categoryId?: string;
  sort?: "amountDesc" | "amountAsc" | "dateDesc" | "dateAsc";
  start?: string;
  end?: string;
};

export const useFilteredExpenses = (
  expenses: Expense[],
  categories: Category[],
  filter: ExpenseFilter
) =>
  useMemo(() => {
    const list = expenses.filter((e) => {
      if (filter.categoryId && filter.categoryId !== "all" && e.categoryId !== filter.categoryId) return false;
      const ts = new Date(e.date).getTime();
      if (filter.start && ts < new Date(filter.start).getTime()) return false;
      if (filter.end && ts > new Date(filter.end).getTime()) return false;
      return true;
    });

    const sorted = [...list].sort((a, b) => {
      switch (filter.sort) {
        case "amountAsc":
          return a.amount - b.amount;
        case "amountDesc":
          return b.amount - a.amount;
        case "dateAsc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "dateDesc":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    const categoryLookup = new Map(categories.map((c) => [c.id, c.name]));
    return { list: sorted, categoryLookup };
  }, [expenses, categories, filter]);

