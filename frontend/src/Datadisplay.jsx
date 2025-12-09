import React, { useEffect, useState } from "react";

function DataDisplay() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchItems() {
            try {
                const res = await fetch("http://localhost:8080/api/items");
                if (!res.ok) throw new Error("Failed to load expenses");
                const data = await res.json();
                setItems(data);
            } catch (err) {
                console.error(err);
                setError("Could not load expenses.");
            } finally {
                setLoading(false);
            }
        }
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/items/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete");
            setItems((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
            alert("Could not delete item");
        }
    };

    if (loading) return <p>Loading expenses...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>All Expenses</h2>
            {items.length === 0 ? (
                <p>No expenses yet. Try adding one on the Add Expense page.</p>
            ) : (
                <table border="1" cellPadding="8">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>${item.amount}</td>
                            <td>{item.category}</td>
                            <td>{item.date}</td>
                            <td>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default DataDisplay;
