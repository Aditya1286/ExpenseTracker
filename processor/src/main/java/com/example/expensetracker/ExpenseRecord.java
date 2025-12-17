package com.example.expensetracker;

public record ExpenseRecord(
        String title,
        double amount,
        String category,
        String date,
        String note
) {
    public ExpenseRecord withCategory(String newCategory) {
        return new ExpenseRecord(title, amount, newCategory, date, note);
    }
}
