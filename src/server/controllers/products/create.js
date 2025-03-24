// Name: Amanjot Singh
// Filename: create.js (controller)
// Course: INFT 2202
// Date: March, 2025
// Description: Controller for creating products

import { checkSchema } from 'express-validator';
import productService from '../../services/ProductService.js';

// Validation rules for creating an product
export const rules = checkSchema({
    name: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'Name is required'
        },
        trim: true
    },
    description: {
        in: ['body'],
        isString: true,
        notEmpty: {
            errorMessage: 'Description is required'
        },
        trim: true
    },
    price: {
        in: ['body'],
        isInt: {
            options: { min: 0 },
            errorMessage: 'Price must be a positive number'
        },
        optional: {
            options: { nullable: true, checkFalsy: true }
        },
        toInt: true
    },
    stock: {
        in: ['body'],
        isInt: {
            options: { min: 0 },
            errorMessage: 'Stock must be a positive number'
        },
        notEmpty: {
            errorMessage: 'stock is required'
        },
        toInt: true
    }
});

export default async function createProduct(req, res, next) {
    try {
        // Get parameters from request body
        const productData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock
        };

        // Call service to create product
        console.log('Creating product with data:', productData);
        const product = await productService.createProduct(productData);
        console.log('Product created:', product);

        // Return success response
        res.status(201).json(product);
    } catch (error) {
        // Handle errors
        next(error);
    }
}