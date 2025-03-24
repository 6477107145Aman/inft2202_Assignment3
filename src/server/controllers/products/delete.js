// Name: Amanjot Singh
// Filename: delete.js (controller)
// Course: INFT 2202
// Date: March, 2025
// Description: Controller for deleting products

import productService from '../../services/ProductService.js';

export default async function deleteProduct(req, res) {
    try {
        // Get parameters from request
        const id = req.params.id;
        
        // Call service to delete product
        const product = await productService.deleteProduct(id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Return success message
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}