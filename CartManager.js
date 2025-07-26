const fs = require('fs').promises;

class CartManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async createCart() {
    const carts = await this.getCarts();
    const newCart = {
      id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
      products: [],
    };
    carts.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === parseInt(id));
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === parseInt(cartId));
    if (!cart) throw new Error('Carrito no encontrado');

    const productInCart = cart.products.find(p => p.product === parseInt(productId));
    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.products.push({ product: parseInt(productId), quantity: 1 });
    }

    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return cart;
  }
}

module.exports = CartManager;
