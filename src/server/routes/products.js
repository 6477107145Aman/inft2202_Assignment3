// Name: Amanjot Singh
// Filename: products.js
// Course: INFT 2202
// Date: March, 2025
// Description: Routes for product API with pagination

import express from 'express';
import createProduct, { rules as createRules } from '../controllers/products/create.js';
import retrieveProducts from '../controllers/products/retrieve.js';
import updateProduct from '../controllers/products/update.js';
import deleteProduct from '../controllers/products/delete.js';
import searchProducts from '../controllers/products/search.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// GET routes
router.get('/', retrieveProducts);
router.get('/search', searchProducts);
router.get('/:id', retrieveProducts);

// POST route
router.post('/', createRules, validate, createProduct);

// PUT route
router.put('/:id', updateProduct);

// DELETE route
router.delete('/:id', deleteProduct);

// Export the router
export default router;