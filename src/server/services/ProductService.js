// Name: Amanjot Singh
// Filename: ProductService.js
// Course: INFT 2202
// Date: March, 2025
// Description: Service for handling product data with MongoDB

import Product from '../models/Product.js';

class ProductService {
    // Create a new product
    async createProduct(productData) {
        try {
            const product = new Product(productData);
            console.log(product);
            return await product.save();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Get all products
    async retrieveProducts() {
        try {
            return await Product.find({});
        } catch (error) {
            throw error;
        }
    }

    // Find one product by ID
    async retrieveProduct(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            throw error;
        }
    }

    // Update an product
    async updateProduct(id, productData) {
        try {
            return await Product.findByIdAndUpdate(id, productData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    // Delete an product
    async deleteProduct(id) {
        try {
            return await Product.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
    
    // Search products with pagination
    async searchProducts(where, fields, options, page, limit, skip, sort) {
        try {
            // Get total count of matching documents
            const total = await Product.countDocuments(where);
            
            // Get the paginated products
            const products = await Product.find(where, fields, options)
                .sort(sort)
                .skip(skip)
                .limit(limit);
                
            // Return both the products and the total count
            return { 
                products: products,
                total: total
            };
        } catch (error) {
            console.error("Error in searchProducts:", error);
            throw error;
        }
    }
}

export default new ProductService();