package com.example.expensetracker;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public final class FileParser {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    private FileParser() {}

    public static List<ExpenseRecord> read(Path path) throws IOException {
        String fileName = path.getFileName().toString().toLowerCase();
        if (fileName.endsWith(".json")) {
            return readJson(path);
        } else if (fileName.endsWith(".csv")) {
            return readCsv(path);
        }
        throw new IllegalArgumentException("Unsupported file type: " + fileName);
    }

    private static List<ExpenseRecord> readJson(Path path) throws IOException {
        JsonNode root = MAPPER.readTree(path.toFile());
        if (root.has("expenses")) {
            // bundle format from frontend export
            return MAPPER.convertValue(root.get("expenses"), new TypeReference<>() {});
        }
        return MAPPER.convertValue(root, new TypeReference<>() {});
    }

    private static List<ExpenseRecord> readCsv(Path path) throws IOException {
        try (Reader reader = Files.newBufferedReader(path); CSVParser parser = CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(reader)) {
            List<ExpenseRecord> items = new ArrayList<>();
            for (CSVRecord record : parser) {
                String title = record.get("title");
                double amount = Double.parseDouble(record.get("amount"));
                String category = record.isMapped("category") ? record.get("category") : "Uncategorized";
                String date = record.isMapped("date") ? record.get("date") : LocalDate.now().toString();
                String note = record.isMapped("note") ? record.get("note") : "";
                items.add(new ExpenseRecord(title, amount, category, date, note));
            }
            return items;
        }
    }

    public static Summary summarize(List<ExpenseRecord> expenses) {
        Map<String, Double> byCategory = expenses.stream().collect(
                java.util.stream.Collectors.groupingBy(ExpenseRecord::category, java.util.stream.Collectors.summingDouble(ExpenseRecord::amount)));
        Map<String, Double> byMonth = expenses.stream().collect(
                java.util.stream.Collectors.groupingBy(e -> e.date().substring(0, Math.min(7, e.date().length())),
                        java.util.stream.Collectors.summingDouble(ExpenseRecord::amount)));
        double total = expenses.stream().mapToDouble(ExpenseRecord::amount).sum();
        return new Summary(total, byCategory, byMonth);
    }
}

