// backend/server.js
console.log("Starting server.js...");
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let items = [
  { id: 1, text: 'Sample item 1' },
  { id: 2, text: 'Sample item 2' }
];



// GET endpoint -> returns items
app.get('/data', (req, res) => {
  res.json(items);
});

// POST endpoint -> add a new item
app.post('/data', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });
  const newItem = { id: items.length + 1, text };
  items.push(newItem);
  res.status(201).json(newItem);
});

const port = 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
