// Name: Amanjot Singh
// Filename: update.js (controller)
// Course: INFT 2202
// Date: March, 2025
// Description: Controller for updating products

import productService from '../../services/ProductService.js';

export default async function updateProduct(req, res) {
    try {
        // Get parameters from request
        const id = req.params.id;
        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock
        };
        
        // Call service to update product
        const product = await productService.updateProduct(id, productData);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Return updated product
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}