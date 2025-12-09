import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Home from './home.jsx'
import DataDisplay from "./pages/DataDisplay.jsx";
import FormPage from "./pages/FormPage.jsx";

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial', padding: 20 }}>
        <nav style={{ marginBottom: 20 }}>
          <Link to="/" style={{ marginRight: 15 }}>Home</Link>
          <Link to="/data" style={{ marginRight: 15 }}>Data Display</Link>
          <Link to="/form">Form Page</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<DataDisplay />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </div>
    </Router>
  )
}
