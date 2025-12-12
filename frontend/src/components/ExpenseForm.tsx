import React, { useState } from "react";
import { Button, Grid2 as Grid, MenuItem, Stack, TextField } from "@mui/material";
import { Category, Expense } from "../types";

type Props = {
  categories: Category[];
  onSubmit: (expense: Omit<Expense, "id">) => void;
  initial?: Expense;
  submitLabel?: string;
};

const ExpenseForm: React.FC<Props> = ({ categories, onSubmit, initial, submitLabel }) => {
  const [form, setForm] = useState<Omit<Expense, "id">>({
    title: initial?.title ?? "",
    amount: initial?.amount ?? 0,
    categoryId: initial?.categoryId ?? categories[0]?.id ?? "",
    date: initial?.date ?? new Date().toISOString().slice(0, 10),
    note: initial?.note ?? "",
  });

  const updateField = (key: keyof typeof form, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.categoryId) return;
    onSubmit({ ...form, amount: Number(form.amount) });
    if (!initial) {
      setForm((prev) => ({ ...prev, title: "", amount: 0, note: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            label="Amount"
            type="number"
            value={form.amount}
            onChange={(e) => updateField("amount", parseFloat(e.target.value))}
            fullWidth
            required
            inputProps={{ min: 0, step: "0.01" }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            label="Category"
            value={form.categoryId}
            onChange={(e) => updateField("categoryId", e.target.value)}
            fullWidth
            required
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Note"
            value={form.note}
            onChange={(e) => updateField("note", e.target.value)}
            fullWidth
            multiline
            minRows={2}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Stack direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained">
              {submitLabel ?? (initial ? "Update Expense" : "Add Expense")}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default ExpenseForm;

