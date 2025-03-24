/**
 * product.mock.service.js
 * 
 * Name: Amanjot Singh
 * Date: March, 2025
 * Course: Web Development
 * 
 * This service handles CRUD operations for products in our shop.
 */

import Product from './product.js';

class ProductService {
  /**
   * Creates a new ProductService instance
   * Initializes with empty product list if none exists
   */
  constructor() {
    // API base URL
    this.apiUrl = "http://localhost:3000/api/products";
  }

    // Get all products from API
    async listProducts() {
      try {
          // Create URL with query parameters
          const url = `${this.apiUrl}`;
          
          // Set up the fetch request with headers
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Accept': 'application/json'
              }
          });
          
          // Check if response is ok
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          // Parse the JSON response
          const data = await response.json();
          
          // Return the data
          return data;
      } catch (error) {
          console.error('Error fetching products:', error);
          throw error;
      }
  }
   
  // Search products with pagination
  async searchProducts(query = '', page = 1, limit = 10, sort = 'createdAt') {
      try {
          // Build query parameters
          const params = new URLSearchParams({
              page: page,
              limit: limit,
              sort: sort
          });
          
          if (query) {
              params.append('q', query);
          }
          
          // Create URL with query parameters
          const url = `${this.apiUrl}/search?${params.toString()}`;
          
          // Set up the fetch request with headers
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Accept': 'application/json'
              }
          });
          
          // Check if response is ok
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          // Parse the JSON response
          const data = await response.json();
          
          // Return the data
          return data;
      } catch (error) {
          console.error('Error searching products:', error);
          throw error;
      }
  }
  
  // Find a specific product by ID
  async findProduct(id) {
      try {
          // Make API call to get the product
          const url = `${this.apiUrl}/${id}`;
          
          // Set up the fetch request with headers
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Accept': 'application/json'
              }
          });
          
          // Check if response is ok
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          // Parse the JSON response
          const data = await response.json();
          
          // Return the product
          return data;
      } catch (error) {
          console.error(`Error finding product with ID ${id}:`, error);
          throw error;
      }
  }
  
  // Create a new product
  async createProduct(productData) {
      try {
          // Set up the fetch request with headers and body
          const response = await fetch(this.apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: JSON.stringify(productData)
          });
          
          // Check if response is ok
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
          }
          
          // Parse the JSON response
          const data = await response.json();
          
          // Return the created product
          return data;
      } catch (error) {
          console.error('Error creating product:', error);
          throw error;
      }
  }
  
  // Update an existing product
  async updateProduct(id, productData) {
      try {
          // Set up the fetch request with headers and body
          const response = await fetch(`${this.apiUrl}/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: JSON.stringify(productData)
          });
          
          // Check if response is ok
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
          }
          
          // Parse the JSON response
          const data = await response.json();
          
          // Return the updated product
          return data;
      } catch (error) {
          console.error(`Error updating product with ID ${id}:`, error);
          throw error;
      }
  }
  
  // Delete an product
  async deleteProduct(id) {
      try {
          // Set up the fetch request with headers
          const response = await fetch(`${this.apiUrl}/${id}`, {
              method: 'DELETE',
              headers: {
                  'Accept': 'application/json'
              }
          });
          
          // Check if response is ok
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
          }
          // Return success
          return true;
      } catch (error) {
          console.error(`Error deleting product with ID ${id}:`, error);
          throw error;
      }
  }
}

// Export the service
export default ProductService;