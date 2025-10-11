
// Simple mock REST API using Express
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

let products = [
  { id: 1, name: 'Camiseta', price: 29.99 },
  { id: 2, name: 'Pantalón', price: 49.99 },
  { id: 3, name: 'Chaqueta', price: 79.99 }
];

// List all
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get one
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const p = products.find(x => x.id === id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

// Create
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const id = products.length ? Math.max(...products.map(p=>p.id))+1 : 1;
  const newP = { id, name, price };
  products.push(newP);
  res.status(201).json(newP);
});

// Delete
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const before = products.length;
  products = products.filter(p => p.id !== id);
  if (products.length === before) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});

// Simple reset endpoint for testing
app.post('/api/__reset', (req, res) => {
  products = [
    { id: 1, name: 'Camiseta', price: 29.99 },
    { id: 2, name: 'Pantalón', price: 49.99 },
    { id: 3, name: 'Chaqueta', price: 79.99 }
  ];
  res.json({ ok: true, products });
});

app.listen(port, () => {
  console.log(`Mock API listening at http://localhost:${port}/api/products`);
});
