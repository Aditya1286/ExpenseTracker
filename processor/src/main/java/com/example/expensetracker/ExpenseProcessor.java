package com.example.expensetracker;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.nio.file.Path;
import java.util.List;

public final class ExpenseProcessor {

    private static final ObjectMapper MAPPER =
            new ObjectMapper().findAndRegisterModules();

    private ExpenseProcessor() {}

    public static void main(String[] args) throws Exception {

        if (args.length == 0) {
            System.err.println("Usage: java -jar expense-processor.jar <file.json|file.csv>");
            System.exit(1);
        }

        Path input = Path.of(args[0]);

        List<ExpenseRecord> expenses = FileParser.read(input);
        Summary summary = FileParser.summarize(expenses);

        System.out.printf("Total expenses: $%.2f%n", summary.total());

        System.out.println("\nBy category:");
        summary.byCategory().forEach(
                (cat, amt) -> System.out.printf("  %s: $%.2f%n", cat, amt)
        );

        System.out.println("\nBy month:");
        summary.byMonth().forEach(
                (month, amt) -> System.out.printf("  %s: $%.2f%n", month, amt)
        );

        Path out = input.resolveSibling("summary.json");
        MAPPER.writerWithDefaultPrettyPrinter()
              .writeValue(out.toFile(), summary);

        System.out.println("\nSaved JSON summary to: " + out.toAbsolutePath());
    }
}
