package com.example.budgettracker.service;

import com.example.budgettracker.model.Expense;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ExpenseService {

    private final Map<Long, Expense> expenseStore = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public List<Expense> getAllExpenses() {
        return new ArrayList<>(expenseStore.values());
    }

    public Optional<Expense> getExpenseById(Long id) {
        return Optional.ofNullable(expenseStore.get(id));
    }

    public Expense createExpense(Expense expense) {
        Long id = idGenerator.getAndIncrement();
        expense.setId(id);
        expenseStore.put(id, expense);
        return expense;
    }

    public Optional<Expense> updateExpense(Long id, Expense updated) {
        if (!expenseStore.containsKey(id)) {
            return Optional.empty();
        }
        updated.setId(id);
        expenseStore.put(id, updated);
        return Optional.of(updated);
    }

    public boolean deleteExpense(Long id) {
        return expenseStore.remove(id) != null;
    }
}
