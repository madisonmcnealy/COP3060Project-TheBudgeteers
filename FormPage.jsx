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
        throw new Error(err.error || 'Failed to post')
      }
      const newItem = await res.json()
      setStatus('Saved! ID: ' + newItem.id)
      setText('')
    } catch (err) {
      setStatus('Error: ' + err.message)
    }
  }

  return (
    <div>
      <h1>Form Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          New item text:
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            style={{ marginLeft: 8 }}
            required
          />
        </label>
        <button type="submit" style={{ marginLeft: 8 }}>Send</button>
      </form>
      <p>{status}</p>
    </div>
  )
}
