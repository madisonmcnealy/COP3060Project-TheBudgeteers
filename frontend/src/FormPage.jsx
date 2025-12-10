import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080/api/items";

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
        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.name || !form.amount) {
            alert("Name and amount are required.");
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
                throw new Error("Failed to save item");
            }

            // go to the data page after saving
            navigate("/data");
        } catch (err) {
            console.error(err);
            alert("Error saving item. Check console.");
        }
    }

    return (
        <div>
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                <div style={{ marginBottom: 10 }}>
                    <label>
                        Name<br />
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label>
                        Amount<br />
                        <input
                            type="number"
                            step="0.01"
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label>
                        Category<br />
                        <input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label>
                        Date<br />
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <button type="submit">Save Item</button>
            </form>
        </div>
    );
}

