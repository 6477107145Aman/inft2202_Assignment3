// Name: Amanjot Singh
// Filename: validation.js
// Course: INFT 2202
// Date: March, 2025
// Description: Middleware for validating request inputs using express-validator

import { validationResult } from 'express-validator';
import { createApiError } from './errorHandler.js';

// Middleware to validate request based on schema rules
export function validate(req, res, next) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    // Get the first error message
    const firstError = errors.array()[0];
    const errorMessage = `Validation error: ${firstError.msg} for ${firstError.param}`;
    
    // Create a 400 Bad Request error
    return next(createApiError(400, errorMessage));
  }
  
  next();
}