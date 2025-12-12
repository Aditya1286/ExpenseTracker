import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useExpenses } from "../context/ExpenseContext";

const Categories: React.FC = () => {
  const { categories, addCategory, deleteCategory } = useExpenses();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#2196f3");

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardHeader title="Create Category" />
          <CardContent>
            <Stack spacing={2}>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <TextField
                label="Color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                sx={{ width: 160 }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  if (!name) return;
                  addCategory(name, color);
                  setName("");
                }}
              >
                Add Category
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardHeader title="Categories" />
          <CardContent>
            <Stack spacing={1}>
              {categories.map((c) => (
                <Stack direction="row" justifyContent="space-between" key={c.id} alignItems="center">
                  <Chip label={c.name} sx={{ backgroundColor: c.color, color: "#fff" }} />
                  <Button color="error" onClick={() => deleteCategory(c.id)}>
                    Delete
                  </Button>
                </Stack>
              ))}
              {categories.length === 0 && <Typography color="text.secondary">No categories yet.</Typography>}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Categories;

