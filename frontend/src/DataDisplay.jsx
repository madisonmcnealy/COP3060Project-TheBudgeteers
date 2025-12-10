// frontend/src/DataDisplay.jsx
import React, { useEffect, useState, useMemo } from "react";

const API_BASE = "http://localhost:8080/api/expenses";

export default function DataDisplay() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadItems() {
        try {
            const response = await fetch(API_BASE);
            if (!response.ok) throw new Error("Failed to fetch items");
            const data = await response.json();
            setItems(data);
        } catch (err) {
            console.error(err);
            alert("Error loading items. Check console.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Delete this item?")) return;
        try {
            const response = await fetch(`${API_BASE}/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete item");
            setItems((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
            alert("Error deleting item. Check console.");
        }
    }

    useEffect(() => {
        loadItems();
    }, []);

    // Total spent this month
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const itemsThisMonth = useMemo(
        () =>
            items.filter((item) => {
                if (!item.date) return false;
                const d = new Date(item.date);
                return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
            }),
        [items, thisMonth, thisYear]
    );

    const totalThisMonth = useMemo(
        () =>
            itemsThisMonth.reduce(
                (sum, item) => sum + (Number(item.amount) || 0),
                0
            ),
        [itemsThisMonth]
    );

    const categoryTotals = useMemo(() => {
        const totals = {};
        for (const item of itemsThisMonth) {
            const cat = item.category || "Other";
            const amt = Number(item.amount) || 0;
            totals[cat] = (totals[cat] || 0) + amt;
        }
        return totals;
    }, [itemsThisMonth]);

    if (loading) return <p>Loading...</p>;
    if (items.length === 0)
        return (
            <div className="page-card">
                <h2 className="page-title">Spending Overview</h2>
                <p className="page-subtitle">
                    No expenses logged yet. Add your first one on the Add Expense page.
                </p>
            </div>
        );

    return (
        <div className="page-card">
            <h2 className="page-title">Spending Overview</h2>
            <p className="page-subtitle">
                Track where your money is going and see how your spending adds up this
                month.
            </p>

            <div className="summary-row">
                <div className="summary-card">
                    <div className="summary-label">Total Spent This Month</div>
                    <div className="summary-value">
                        ${totalThisMonth.toFixed(2)}
                    </div>
                </div>

                <div className="chart-card">
                    <h3 className="chart-title">Spending by Category (This Month)</h3>
                    {Object.keys(categoryTotals).length === 0 ? (
                        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                            No expenses with dates in the current month yet.
                        </p>
                    ) : (
                        Object.entries(categoryTotals).map(([cat, total]) => {
                            const percent =
                                totalThisMonth > 0 ? (total / totalThisMonth) * 100 : 0;
                            return (
                                <div key={cat} className="chart-row">
                                    <span className="chart-label">{cat}</span>
                                    <div className="chart-bar">
                                        <div
                                            className="chart-bar-fill"
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                    <span className="chart-amount">
                    ${total.toFixed(2)}
                  </span>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th style={{ width: "90px" }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>${Number(item.amount).toFixed(2)}</td>
                            <td>{item.date}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}





