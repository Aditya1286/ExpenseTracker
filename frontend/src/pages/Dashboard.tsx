import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { useExpenses } from "../context/ExpenseContext";
import ChartsSection from "../components/ChartsSection";
import { format } from "date-fns";

const sum = (values: number[]) => values.reduce((acc, n) => acc + n, 0);

const Dashboard: React.FC = () => {
  const { expenses, categories } = useExpenses();

  const { monthlyTotal, weeklyTotal, recent } = useMemo(() => {
    const now = new Date();
    const monthKey = format(now, "yyyy-MM");
    const weekKey = format(now, "yyyy-'W'II");
    const monthly = expenses.filter((e) => format(new Date(e.date), "yyyy-MM") === monthKey).map((e) => e.amount);
    const weekly = expenses.filter((e) => format(new Date(e.date), "yyyy-'W'II") === weekKey).map((e) => e.amount);
    const sorted = [...expenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return { monthlyTotal: sum(monthly), weeklyTotal: sum(weekly), recent: sorted.slice(0, 5) };
  }, [expenses]);

  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardHeader title="This Month" />
            <CardContent>
              <Typography variant="h4">${monthlyTotal.toFixed(2)}</Typography>
              <Typography color="text.secondary">Total expenses</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardHeader title="This Week" />
            <CardContent>
              <Typography variant="h4">${weeklyTotal.toFixed(2)}</Typography>
              <Typography color="text.secondary">Total expenses</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardHeader title="Recent" />
            <CardContent>
              <Stack spacing={1}>
                {recent.map((e) => (
                  <Stack key={e.id} direction="row" justifyContent="space-between">
                    <Typography>{e.title}</Typography>
                    <Typography fontWeight={600}>${e.amount.toFixed(2)}</Typography>
                  </Stack>
                ))}
                {recent.length === 0 && <Typography color="text.secondary">No expenses yet.</Typography>}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardHeader title="Analytics" />
        <CardContent>
          <ChartsSection expenses={expenses} categories={categories} />
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Dashboard;

