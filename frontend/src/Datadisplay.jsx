import { useEffect, useState } from "react";

export default function DataDisplay() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/items")
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2 style={{ color: "white" }}>Stored Items</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name} — ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

