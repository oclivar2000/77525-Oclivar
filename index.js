const ProductManager = require('./ProductManager');

const manager = new ProductManager();

manager.addProduct({
  title: "Laptop",
  description: "Una laptop potente",
  price: 1500,
  thumbnail: "/images/laptop.jpg",
  code: "LP123",
  stock: 10,
});

manager.addProduct({
  title: "Mouse",
  description: "Mouse inalámbrico",
  price: 25,
  thumbnail: "/images/mouse.jpg",
  code: "MS456",
  stock: 50,
});

console.log("Listado de productos: ");
console.log(manager.getProducts());
console.log("");
console.log("Producto 1: ");
console.log(manager.getProductById(1)); // Muestra el primer producto
console.log("");
console.log("Producto 999");
console.log(manager.getProductById(999)); // Muestra un producto que no existe
