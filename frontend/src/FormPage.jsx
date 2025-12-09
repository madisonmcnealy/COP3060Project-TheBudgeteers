import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPage() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const expense = {
            name,
            amount: parseFloat(amount),
            category,
            date, // from <input type="date">
        };

        try {
            const res = await fetch("http://localhost:8080/api/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(expense),
            });

            if (!res.ok) throw new Error("Failed to save expense");

            // clear + navigate
            setName("");
            setAmount("");
            setCategory("");
            setDate("");
            navigate("/data");
        } catch (err) {
            console.error(err);
            setError("Could not save expense.");
        }
    };

    return (
        <div>
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:{" "}
                        <input value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Amount:{" "}
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Category:{" "}
                        <input value={category} onChange={(e) => setCategory(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Date:{" "}
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </label>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Save Expense</button>
            </form>
        </div>
    );
}

export default FormPage;

