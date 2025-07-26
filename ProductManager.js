class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    const codeExists = this.products.some((product) => product.code === code);
    if (codeExists) {
      console.error(`Ya existe un producto con el código "${code}".`);
      return;
    }

    const newProduct = {
      id: this.nextId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.error("Not found");
    
    }
    return product;
  }
}

module.exports = ProductManager; // Exportar la clase
