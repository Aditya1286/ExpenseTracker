export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Expense = {
  id: string;
  title: string;
  amount: number;
  categoryId: string;
  date: string;
  note?: string;
};

export type ExportBundle = {
  version: string;
  exportedAt: string;
  expenses: Expense[];
  categories: Category[];
};

