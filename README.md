# Expense Tracker

Local-first expense management application with React frontend and Java CLI for offline analytics. Zero backend dependencies.

## Overview

Privacy-focused expense tracker storing data in browser localStorage. Includes a Maven-based CLI processor for offline analysis of exported data.

## Architecture

**Frontend**: React 18 + TypeScript + Vite  
**UI**: Material-UI + Recharts  
**Storage**: Browser localStorage (no backend calls)  
**Processor**: Java 17 + Maven CLI

## Features

### Web Application
- CRUD operations for expenses and categories
- Filter/sort by date, category, amount
- Visual analytics (pie, line, bar charts)
- Monthly/weekly aggregations
- JSON/CSV export and import
- Dark/light theme

### Java CLI Processor
- Process exported JSON/CSV files offline
- Generate category and monthly summaries
- Output to console and `summary.json`

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
```

### Java Processor

```bash
cd processor
chmod +x mvnw        # Unix/Linux/Mac
./mvnw clean package

# Process exported data
java -jar target/expense-processor-1.0.0-shaded.jar path/to/expenses-export.json
```

## Data Flow

1. Manage expenses in React app (localStorage)
2. Export as JSON/CSV from Settings
3. Run Java CLI for offline analytics
4. Re-import JSON to restore/merge data

## File Formats

**JSON Export**:
```json
{
  "expenses": [
    {
      "id": "1",
      "title": "Groceries",
      "amount": 45.50,
      "category": "Food",
      "date": "2025-01-15",
      "note": "Optional note"
    }
  ],
  "categories": ["Food", "Transport"]
}
```

**CSV Export**:
```csv
title,amount,category,date,note
Groceries,45.50,Food,2025-01-15,Weekly shopping
```

## Project Structure

```
├── frontend/           # React application
│   ├── src/
│   ├── public/
│   └── package.json
│
└── processor/          # Java CLI
    ├── src/main/java/
    ├── pom.xml
    └── mvnw
```

## Requirements

- Node.js 16+
- Java 17+
- Maven 3.6+ (or use included wrapper)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| UI | Material-UI, Recharts |
| Routing | React Router v6 |
| Backend | Java 17, Maven |
| Libraries | Lombok, MapStruct, Commons Lang3 |

## License

MIT
