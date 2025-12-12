import { Expense, Category, ExportBundle } from "../types";

const csvEscape = (value: string | number) => {
  const str = String(value);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

export const toCsv = (expenses: Expense[], categories: Category[]): string => {
  const headers = ["title", "amount", "category", "date", "note"];
  const catLookup = new Map(categories.map((c) => [c.id, c.name]));
  const rows = expenses.map((e) =>
    [e.title, e.amount.toFixed(2), catLookup.get(e.categoryId) ?? e.categoryId, e.date, e.note ?? ""]
      .map(csvEscape)
      .join(",")
  );
  return [headers.join(","), ...rows].join("\n");
};

export const downloadBlob = (content: string, filename: string, mime: string) => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const handleJsonExport = (bundle: ExportBundle) =>
  downloadBlob(JSON.stringify(bundle, null, 2), "expenses-export.json", "application/json");

export const handleCsvExport = (expenses: Expense[], categories: Category[]) =>
  downloadBlob(toCsv(expenses, categories), "expenses-export.csv", "text/csv");

