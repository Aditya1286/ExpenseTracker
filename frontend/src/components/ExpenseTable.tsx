import React from "react";
import {
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Expense, Category } from "../types";
import { ExpenseFilter } from "../hooks/useFilteredExpenses";

type Props = {
  expenses: Expense[];
  categories: Category[];
  filter: ExpenseFilter;
  onFilterChange: (filter: ExpenseFilter) => void;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
};

const ExpenseTable: React.FC<Props> = ({ expenses, categories, filter, onFilterChange, onEdit, onDelete }) => {
  const handleFilterChange = (key: keyof ExpenseFilter, value: string) =>
    onFilterChange({ ...filter, [key]: value || undefined });

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          select
          label="Category"
          value={filter.categoryId ?? "all"}
          onChange={(e) => handleFilterChange("categoryId", e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="all">All</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Sort"
          value={filter.sort ?? "dateDesc"}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="dateDesc">Date (new → old)</MenuItem>
          <MenuItem value="dateAsc">Date (old → new)</MenuItem>
          <MenuItem value="amountDesc">Amount (high → low)</MenuItem>
          <MenuItem value="amountAsc">Amount (low → high)</MenuItem>
        </TextField>
        <TextField
          type="date"
          label="Start"
          value={filter.start ?? ""}
          onChange={(e) => handleFilterChange("start", e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          label="End"
          value={filter.end ?? ""}
          onChange={(e) => handleFilterChange("end", e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Stack>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((e) => {
              const category = categories.find((c) => c.id === e.categoryId);
              return (
                <TableRow key={e.id} hover>
                  <TableCell>{e.title}</TableCell>
                  <TableCell>{category?.name ?? "Uncategorized"}</TableCell>
                  <TableCell>{e.date}</TableCell>
                  <TableCell align="right">${e.amount.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="edit" onClick={() => onEdit(e)} size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => onDelete(e.id)} size="small" color="error">
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default ExpenseTable;

