import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, Grid2 as Grid } from "@mui/material";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, BarChart, Bar } from "recharts";
import { Expense, Category } from "../types";
import { format } from "date-fns";

type Props = {
  expenses: Expense[];
  categories: Category[];
};

const ChartsSection: React.FC<Props> = ({ expenses, categories }) => {
  const categoryData = useMemo(() => {
    const totals = new Map<string, number>();
    expenses.forEach((e) => totals.set(e.categoryId, (totals.get(e.categoryId) ?? 0) + e.amount));
    return Array.from(totals.entries()).map(([id, amount]) => ({
      name: categories.find((c) => c.id === id)?.name ?? "Other",
      value: Number(amount.toFixed(2)),
    }));
  }, [categories, expenses]);

  const monthlyData = useMemo(() => {
    const totals = new Map<string, number>();
    expenses.forEach((e) => {
      const key = format(new Date(e.date), "yyyy-MM");
      totals.set(key, (totals.get(key) ?? 0) + e.amount);
    });
    return Array.from(totals.entries())
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .map(([month, amount]) => ({ month, amount: Number(amount.toFixed(2)) }));
  }, [expenses]);

  const weeklyData = useMemo(() => {
    const totals = new Map<string, number>();
    expenses.forEach((e) => {
      const week = format(new Date(e.date), "yyyy-'W'II");
      totals.set(week, (totals.get(week) ?? 0) + e.amount);
    });
    return Array.from(totals.entries())
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .map(([week, amount]) => ({ week, amount: Number(amount.toFixed(2)) }));
  }, [expenses]);

  const colors = categories.map((c) => c.color);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardHeader title="By Category" subheader="Pie" />
          <CardContent sx={{ height: 320 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={categoryData} nameKey="name" label>
                  {categoryData.map((_, idx) => (
                    <Cell key={idx} fill={colors[idx % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardHeader title="Monthly Trend" subheader="Line" />
          <CardContent sx={{ height: 320 }}>
            <ResponsiveContainer>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#2196f3" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardHeader title="Weekly Totals" subheader="Bar" />
          <CardContent sx={{ height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={weeklyData}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChartsSection;

