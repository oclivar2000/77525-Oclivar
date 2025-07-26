const express = require('express');
const router = express.Router();
const CartManager = require('../CartManager');
const ProductManager = require('../ProductManager');
const path = require('path');

const cartManager = new CartManager(path.join(__dirname, '../data/carts.json'));
const productManager = new ProductManager(path.join(__dirname, '../data/products.json'));

router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  cart ? res.json(cart) : res.status(404).send('Carrito no encontrado');
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) return res.status(404).send('Producto no existe');

    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
