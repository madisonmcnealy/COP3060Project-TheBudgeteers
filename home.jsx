import React from 'react'

export default function Home() {
  return (
    <div>
      <h1>Home / Dashboard</h1>
      <p>Welcome! Use the links above to go to the Data Display and Form pages.</p>
      <ul>
        <li>Data Display: fetches items from the backend</li>
        <li>Form Page: sends a new item to the backend</li>
      </ul>
    </div>
  )
}
