const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  async getProducts() {
    const data = await fs.promises.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id === parseInt(id));
  }

  async addProduct(product) {
    const products = await this.getProducts();

    if (products.some(p => p.code === product.code)) {
      throw new Error('Producto con código duplicado');
    }

    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      ...product
    };

    products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }
}

module.exports = ProductManager;
