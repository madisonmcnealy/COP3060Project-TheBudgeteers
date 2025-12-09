import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./home.jsx";
import DataDisplay from "./DataDisplay.jsx";
import FormPage from "./FormPage.jsx";

export default function App() {
    return (
        <Router>
            <div style={{ fontFamily: 'Arial', padding: 20 }}>

                {/* Top navbar (styled) */}
                <nav style={{ marginBottom: 20 }}>
                    <Link to="/" style={{ marginRight: 15 }}>Home</Link>
                    <Link to="/data" style={{ marginRight: 15 }}>Data Display</Link>
                    <Link to="/add">Add Expense</Link> {/* renamed pathway for clarity */}
                </nav>

                {/* Page routing */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/data" element={<DataDisplay />} />
                    <Route path="/add" element={<FormPage />} />
                </Routes>

            </div>
        </Router>
    );
}

}
