// Name: Amanjot Singh
// Filename: logging.js
// Course: INFT 2202
// Date: March, 2025
// Description: Middleware for logging HTTP requests and responses

import logger from '../utils/logger.js';

// Log incoming requests
function logRequest(req, res, next) {
  const startTime = new Date();
  const { method, path } = req;
  
  logger.info(`Request received: ${method} ${path}`);
  
  // Log when the response is finished
  res.on('finish', () => {
    const duration = new Date() - startTime;
    logger.info(`Response sent: ${method} ${path} - Status: ${res.statusCode} - Duration: ${duration}ms`);
  });
  
  next();
}

export const LoggingMiddleware = logRequest;