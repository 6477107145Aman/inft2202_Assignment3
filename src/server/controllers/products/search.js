// Name: Amanjot Singh
// Filename: search.js (controller)
// Course: INFT 2202
// Date: March, 2025
// Description: Controller for searching and paginating products

import productService from '../../services/ProductService.js';

export default async function searchProducts(req, res) {
    try {
        // Get query parameters
        const query = req.query.q || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'createdAt';

        // Inside searchProducts function in your search.js controller
        console.log(`Search request received: query="${query}", page=${page}, limit=${limit}, sort="${sort}"`);
        
        // Define search object
        const where = {};
        const fields = {};
        const options = {};

        // If query exists, add to search conditions
        if (query) {
            // Search in name or description fields (case-insensitive)
            where.$or = [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ];
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Call service to get paginated products
        const result = await productService.searchProducts(where, fields, options, page, limit, skip, sort);

        // Send JSON response with pagination key
        res.json({
            records: result.products,
            pagination: {
                total: result.total,
                page: page,
                limit: limit,
                pages: Math.ceil(result.total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}