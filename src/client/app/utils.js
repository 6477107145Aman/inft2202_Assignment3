// Name: Amanjot Singh
// Filename: utils.js
// Course: INFT 2202
// Date: March, 2025
// Description: Utility functions for the application

/**
 * Wait for a specified amount of time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} - Promise that resolves after the specified time
 */
export function waitTho(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}