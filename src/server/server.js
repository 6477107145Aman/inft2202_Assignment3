// Name: Amanjot Singh
// Filename: server.js
// Course: INFT 2202
// Date: March, 2025
// Description: Main application file with MongoDB connection

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import router from './routes/router.js';
import cors from 'cors';
import { LoggingMiddleware } from './middleware/logging.js';
import errorHandler from './middleware/errorHandler.js';
import logger from './utils/logger.js';

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Apply logging middleware
app.use(LoggingMiddleware);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/animalDB')
    .then(() => logger.info('✅ Connected to MongoDB'))
    .catch(err => logger.error('❌ Could not connect to MongoDB:', err));

app.use(express.json()); 

// Serve static files from the client folder
app.use(express.static(path.join(process.cwd(), 'src/client')));
app.use('/node_modules', express.static(path.join(process.cwd(), 'node_modules')));

// Use the router
app.use('/', router);

// Error handler middleware (must be after routes)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}/`);
});
