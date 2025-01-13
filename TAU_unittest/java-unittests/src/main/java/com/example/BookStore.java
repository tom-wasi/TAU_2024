package com.example;

import java.util.HashMap;
import java.util.Map;

public class BookStore {
    private Map<String, Integer> books = new HashMap<>();

    public void addBook(String title, int quantity) {
        books.put(title, books.getOrDefault(title, 0) + quantity);
    }

    public boolean isBookAvailable(String title) {
        return books.containsKey(title) && books.get(title) > 0;
    }

    public void removeBook(String title) throws IllegalArgumentException {
        if (!books.containsKey(title) || books.get(title) <= 0) {
            throw new IllegalArgumentException("Book not available");
        }
        books.put(title, books.get(title) - 1);
    }

    public int getBookQuantity(String title) {
        return books.getOrDefault(title, 0);
    }
}