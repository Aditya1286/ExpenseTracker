import React, { ChangeEvent, useRef, useState } from "react";
import { Alert, Button, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { useExpenses } from "../context/ExpenseContext";
import { exportBundle, importBundle } from "../utils/storage";
import { handleCsvExport, handleJsonExport } from "../utils/exporters";
import { ExportBundle } from "../types";

const Settings: React.FC = () => {
  const { expenses, categories, replaceAll } = useExpenses();
  const [message, setMessage] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const startExportJson = () => handleJsonExport(exportBundle(expenses, categories));
  const startExportCsv = () => handleCsvExport(expenses, categories);

  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const bundle = JSON.parse(String(reader.result)) as ExportBundle;
        importBundle(bundle);
        replaceAll({ expenses: bundle.expenses, categories: bundle.categories });
        setMessage("Import completed.");
      } catch (err) {
        setMessage("Import failed: invalid file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <Stack spacing={3}>
      {message && <Alert severity="info">{message}</Alert>}
      <Card>
        <CardHeader title="Backup & Restore" />
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button variant="contained" onClick={startExportJson}>
              Export JSON
            </Button>
            <Button variant="outlined" onClick={startExportCsv}>
              Export CSV
            </Button>
            <input
              type="file"
              accept=".json"
              ref={fileInput}
              style={{ display: "none" }}
              onChange={handleImport}
            />
            <Button variant="text" onClick={() => fileInput.current?.click()}>
              Import from JSON
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Data is stored locally in your browser. Keep a JSON backup for recovery.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Settings;

