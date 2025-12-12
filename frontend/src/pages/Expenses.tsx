import React, { useMemo, useState } from "react";
import { Button, Card, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import { useExpenses } from "../context/ExpenseContext";
import { Expense } from "../types";
import { ExpenseFilter, useFilteredExpenses } from "../hooks/useFilteredExpenses";

const Expenses: React.FC = () => {
  const { expenses, categories, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [filter, setFilter] = useState<ExpenseFilter>({ sort: "dateDesc" });
  const [editing, setEditing] = useState<Expense | null>(null);
  const { list } = useFilteredExpenses(expenses, categories, filter);

  const total = useMemo(() => list.reduce((acc, e) => acc + e.amount, 0), [list]);

  return (
    <Stack spacing={3}>
      <Card>
        <CardHeader title="Add Expense" />
        <CardContent>
          <ExpenseForm categories={categories} onSubmit={addExpense} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title="History"
          action={
            <Typography sx={{ pr: 2 }} color="text.secondary">
              Total: ${total.toFixed(2)}
            </Typography>
          }
        />
        <CardContent>
          <ExpenseTable
            expenses={list}
            categories={categories}
            filter={filter}
            onFilterChange={setFilter}
            onEdit={(expense) => setEditing(expense)}
            onDelete={deleteExpense}
          />
        </CardContent>
      </Card>

      <Dialog open={!!editing} onClose={() => setEditing(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          {editing && (
            <ExpenseForm
              categories={categories}
              initial={editing}
              submitLabel="Save"
              onSubmit={(payload) => {
                updateExpense(editing.id, payload);
                setEditing(null);
              }}
            />
          )}
          <Button onClick={() => setEditing(null)} sx={{ mt: 2 }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default Expenses;

