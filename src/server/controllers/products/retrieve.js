// Name: AManjot Singh
// Filename: retrieve.js (controller)
// Course: INFT 2202
// Date: March, 2025
// Description: Controller for retrieving products

import productService from '../../services/ProductService.js';

export default async function retrieveProducts(req, res) {
    try {
        // Get parameters from request
        const id = req.params.id;
        
        // If ID is provided, get specific product
        if (id) {
            const product = await productService.retrieveProduct(id);
            
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            return res.json(product);
        }
        
        // Otherwise, get all products
        const products = await productService.retrieveProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}