// Name: Amanjot Singh
// Filename: router.js
// Course: INFT 2202
// Date: March, 2025
// Description: Main router for the application

import express from 'express';
import productRoutes from './products.js';
import contentRoutes from './content.js';

const router = express.Router();

// Use content routes
router.use('/', contentRoutes);

// Use product routes with /api prefix
router.use('/api/products', productRoutes);

// Export the router
export default router;