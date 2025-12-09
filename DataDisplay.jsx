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

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1>Data Display</h1>
      <p>Items fetched from the backend:</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li
            key={item.id}
            style={{
              background: '#f5f5f5',
              padding: 12,
              marginBottom: 10,
              borderRadius: 6,
              fontSize: 16
            }}
          >
            {item.id}. {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
