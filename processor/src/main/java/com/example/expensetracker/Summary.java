package com.example.expensetracker;

import java.util.Map;

public record Summary(double total, Map<String, Double> byCategory, Map<String, Double> byMonth) {
}

