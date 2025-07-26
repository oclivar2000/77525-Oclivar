const fs = require('fs').promises;
const path = require('path');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async addProduct(product) {
    const products = await this.getProducts();

    if (products.some(p => p.code === product.code)) {
      throw new Error('Código duplicado');
    }

    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      ...product,
    };

    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id === parseInt(id));
  }
}

module.exports = ProductManager;
