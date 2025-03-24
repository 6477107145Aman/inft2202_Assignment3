// Name: Amanjot Singh
// Filename: Product.js (model)
// Course: INFT 2202
// Date: March, 2025
// Description: Mongoose model for Product

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;