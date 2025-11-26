import React, { useEffect, useState } from 'react'

export default function DataDisplay() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch('http://localhost:4000/data')
        if (!res.ok) throw new Error('Network error')
        const data = await res.json()
        setItems(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Data Display</h1>
      <p>Items fetched from the backend:</p>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.id}: {item.text}</li>
        ))}
      </ul>
    </div>
  )
}
