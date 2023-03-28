import express from 'express';
import data from './data.js';

const app = express();
// test
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`serve at http://localhost:${PORT}`);
});
