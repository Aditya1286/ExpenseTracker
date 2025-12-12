## Expense Tracker (React + Java)

Local-only expense tracker with a React frontend (Vite + MUI + Recharts) that stores data in browser `localStorage`, plus a Java/Maven CLI for offline analytics from exported JSON/CSV. No backend or database is used.

### Frontend (React)
- Location: `frontend/`
- Stack: React 18, Vite, TypeScript, MUI, Recharts, React Router.
- Features: add/edit/delete expenses, category manager, filtering/sorting, monthly/weekly totals, charts (pie/line/bar), JSON/CSV export, JSON import for recovery, dark/light theme toggle.

#### Run locally
```bash
cd frontend
npm install
npm run dev   # http://localhost:5173
npm run build # output in dist/
```

### Java Processor (Maven CLI)
- Location: `processor/`
- Build runnable JAR with dependencies:
```bash
cd processor
mvn clean package
```
- Run against an exported JSON/CSV file:
```bash
java -jar target/expense-processor-1.0.0-shaded.jar ../path/to/expenses-export.json
```
- Output: prints totals by category/month to stdout and writes `summary.json` next to the input file.

### Data flow
1. Use the React app to manage expenses (data stored in browser `localStorage`).
2. Export data as JSON/CSV from the Settings page.
3. Run the Java CLI on the exported file for offline analytics or archiving.
4. Re-import JSON in the UI to restore/merge data locally.

### Notes
- No backend calls are made; everything is local to the browser.
- The Java CLI accepts either the frontend JSON bundle (`{ expenses, categories }`) or a CSV with headers: `title,amount,category,date,note`.

