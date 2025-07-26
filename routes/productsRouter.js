const express = require('express');
const router = express.Router();
const ProductManager = require('../ProductManager');
const path = require('path');

const manager = new ProductManager(path.join(__dirname, '../data/products.json'));

router.get('/', async (req, res) => {
  const products = await manager.getProducts();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await manager.getProductById(req.params.id);
  product ? res.json(product) : res.status(404).send('Producto no encontrado');
});

router.post('/', async (req, res) => {
  try {
    const newProduct = await manager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
