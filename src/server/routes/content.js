// Name: Amanjot Singh
// Filename: content.js
// Course: INFT 2202
// Date: March, 2025
// Description: Content routes for the application

import express from 'express';

const router = express.Router();

// Route for index
router.get('/', (req, res) => {
    res.send('Content route');
});

// Export the contentRoutes
export default router;