/**
 * Product.js
 * 
 * Name: Amanjot Singh
 * Date: March, 2025
 * Course: Web Development
 * 
 * A model representing a product in our shop with properties for name, price,
 * stock quantity, and description.
 */

class Product {
  constructor({ id = null, name, price, stock, description }) {
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.description = description;
}

toString() {
    return `${this.name} (${this.description}) is Priced as ${this.price} and total ${this.stock} in stock."`;
}

toJSON() {
    return {
        id: this.id,
        name: this.name,
        price: this.price,
        stock: this.stock,
        description: this.description
    };
  }
}

// Export the Product class for use in other modules
export default Product;