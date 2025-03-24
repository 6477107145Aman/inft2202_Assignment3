// Name: Amanjot Singh
// Filename: errorHandler.js
// Course: INFT 2202
// Date: March, 2025
// Description: Error handling middleware for centralized error processing

import logger from '../utils/logger.js';
import createError from 'http-errors';

export default function errorHandler(err, req, res, next) {
  // Log the error
  logger.error(`Error: ${err.message}`, {
    stack: err.stack,
    method: req.method,
    path: req.path,
    body: req.body,
    params: req.params,
    query: req.query
  });

  // Check if the error has a status code, otherwise use 500
  const statusCode = err.statusCode || err.status || 500;
  
  // Send the error response
  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: statusCode
    }
  });
}

// Helper function to create errors
export function createApiError(statusCode, message) {
  return createError(statusCode, message);
}