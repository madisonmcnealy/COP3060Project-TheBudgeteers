import React, { useState } from 'react'

export default function FormPage() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('Sending...')

    try {
      const res = await fetch('http://localhost:4000/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to send')
      }

      const newItem = await res.json()
      setStatus('Saved! ID: ' + newItem.id)
      setText('')
    } catch (err) {
      setStatus('Error: ' + err.message)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1>Form Page</h1>

      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: 10 }}>
          New item:
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            style={{
              marginLeft: 10,
              padding: 8,
              width: '70%',
              borderRadius: 4,
              border: '1px solid #ccc'
            }}
            required
          />
        </label>

        <button
          type="submit"
          style={{
            padding: '8px 16px',
            background: 'black',
            color: 'white',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </form>

      <p style={{ marginTop: 15 }}>{status}</p>
    </div>
  )
}
