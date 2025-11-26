import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import DataDisplay from './pages/DataDisplay'
import FormPage from './pages/FormPage'

export default function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/data" style={{ marginRight: 10 }}>Data Display</Link>
        <Link to="/form">Form Page</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<DataDisplay />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </div>
  )
}
