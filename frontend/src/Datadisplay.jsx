import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080/api/items";

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
            setItems((prev) => prev.filter((it) => it.id !== id));
        } catch (err) {
            console.error(err);
            alert("Error deleting item. Check console.");
        }
    }

    useEffect(() => {
        loadItems();
    }, []);

    // --- Calculations for "this month" ---
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const itemsThisMonth = items.filter((it) => {
        if (!it.date) return false;
        const d = new Date(it.date);
        return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    });

    const totalSpentThisMonth = itemsThisMonth.reduce(
        (sum, it) => sum + Number(it.amount || 0),
        0
    );

    // totals by category for simple bar chart
    const categoryTotals = itemsThisMonth.reduce((acc, it) => {
        const cat = it.category || "Other";
        const amt = Number(it.amount || 0);
        acc[cat] = (acc[cat] || 0) + amt;
        return acc;
    }, {});

    if (loading) return <p>Loading...</p>;
    if (items.length === 0)
        return <p>No items yet. Add one on the form page.</p>;

    return (
        <div>
            <h2>All Items</h2>

            {/* Summary for this month */}
            <section style={{ marginBottom: "1.5rem" }}>
                <h3>Total Spent This Month</h3>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    ${totalSpentThisMonth.toFixed(2)}
                </p>

                {/* Simple bar chart by category */}
                <h4>Spending by Category (This Month)</h4>
                {Object.keys(categoryTotals).length === 0 ? (
                    <p>No spending recorded for this month yet.</p>
                ) : (
                    <div style={{ maxWidth: "600px" }}>
                        {Object.entries(categoryTotals).map(([cat, total]) => {
                            const percent =
                                totalSpentThisMonth > 0
                                    ? (total / totalSpentThisMonth) * 100
                                    : 0;
                            return (
                                <div
                                    key={cat}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "0.35rem",
                                    }}
                                >
                                    <span style={{ width: "120px", fontWeight: 600 }}>{cat}</span>
                                    <div
                                        style={{
                                            flex: 1,
                                            height: "12px",
                                            background: "#eee",
                                            borderRadius: "999px",
                                            overflow: "hidden",
                                            marginRight: "0.5rem",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: `${percent}%`,
                                                height: "100%",
                                                background: "#2e7d32", // green-ish bar; we'll refine with full styling later
                                            }}
                                        />
                                    </div>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Raw table of all items */}
            <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.amount}</td>
                        <td>{item.date}</td>
                        <td>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}




