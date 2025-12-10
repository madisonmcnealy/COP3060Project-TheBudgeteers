// frontend/src/FormPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080/api/expenses";

export default function FormPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        amount: "",
        category: "",
        date: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.name || !form.amount) {
            alert("Please enter a name and amount.");
            return;
        }

        try {
            const response = await fetch(API_BASE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    amount: parseFloat(form.amount),
                    category: form.category,
                    date: form.date || null,
                }),
            });

            if (!response.ok) {
                console.error("Save failed:", response.status, response.statusText);
                throw new Error("Failed to save expense");
            }

            // Optionally clear the form
            setForm({ name: "", amount: "", category: "", date: "" });

            navigate("/data");
        } catch (err) {
            console.error("Error saving expense:", err);
            alert("Error saving item. Check console.");
        }
    }

    return (
        <div className="page-card">
            <h2 className="page-title">Add a New Expense</h2>
            <p className="page-subtitle">
                Log your recent spending to keep your student budget on track.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-field">
                        <label className="form-label" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            className="form-input"
                            placeholder="e.g., Groceries, Textbooks"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label" htmlFor="amount">
                            Amount
                        </label>
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            step="0.01"
                            className="form-input"
                            placeholder="e.g., 45.00"
                            value={form.amount}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label" htmlFor="category">
                            Category
                        </label>
                        <input
                            id="category"
                            name="category"
                            className="form-input"
                            placeholder="e.g., Food, Bills, Social"
                            value={form.category}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label" htmlFor="date">
                            Date
                        </label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            className="form-input"
                            value={form.date}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="button-row">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Save Expense
                    </button>
                </div>
            </form>
        </div>
    );
}

