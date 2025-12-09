import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormPage() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price }),
        })
            .then(() => navigate("/data"));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Item name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
            <button type="submit">Add Item</button>
        </form>
    );
}

