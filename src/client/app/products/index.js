/**
 * index.js
 * 
 * Name: Amanjot Singh
 * Date: March, 2025
 * Course: Web Development
 * 
 * Displays featured products on the homepage and handles related functionality.
 */

import ProductService from './product.mock.service.js';
import { formatPrice, showError, navigateTo } from '../app.js';

// DOM elements will be set when the DOM is loaded
let featuredProductsContainer;
let noProductsMessage;
// Create an instance of the ProductService
const productService = new ProductService();

/**
 * Initialize the homepage
 */
function initHomepage() {
  // Get DOM elements
  featuredProductsContainer = document.getElementById('featured-products-container');
  noProductsMessage = document.getElementById('no-products-message');

  // Load and display featured products
  displayFeaturedProducts();
}

/**
 * Display featured products on the homepage
 */
async function displayFeaturedProducts() {
  try {
    const response = await productService.listProducts();
    
    // Extract products array from the response
    // The API returns an object with a 'records' property containing the products array
    const products = response.records || [];

    // Make sure featuredProductsContainer exists
    if (!featuredProductsContainer) {
      console.error('Featured products container not found');
      return;
    }
    
    // Clear the container
    featuredProductsContainer.innerHTML = '';

    // Handle empty state
    if (products.length === 0) {
      // If no products, show a message
      featuredProductsContainer.innerHTML = `
              <div class="col-12 text-center">
                <div class="alert alert-info">
                  <p>No products available yet. <a href="create.html">Add some products</a> to get started!</p>
                </div>
              </div>
            `;
      return;
    }

    // Hide no products message if there are products
    if (noProductsMessage) {
      noProductsMessage.style.display = 'none';
    }

    // Get up to 3 featured products
    const featuredProducts = products.slice(0, 3);

    // Create featured product cards
    featuredProducts.forEach(product => {
      const productCard = createFeaturedProductCard(product);
      featuredProductsContainer.appendChild(productCard);
    });

    // Initialize tooltips
    initTooltips();
  } catch (error) {
    console.error('Error displaying featured products:', error);
    if (featuredProductsContainer) {
      featuredProductsContainer.innerHTML = `
        <div class="col-12 text-center">
          <div class="alert alert-danger">
            <p>Failed to load products. Please try again later.</p>
          </div>
        </div>
      `;
    }
  }
}

/**
 * Initialize Bootstrap tooltips
 */
function initTooltips() {
  setTimeout(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, 500);
}

/**
 * Create a featured product card element
 * 
 * @param {Object} product - The product object
 * @returns {HTMLElement} The product card element
 */
function createFeaturedProductCard(product) {
  const col = document.createElement('div');
  col.className = 'col-md-4 mb-4';

  // Determine the image source
  let imgSrc = '';

  if (product.imagePath) {
    // To get the data URL from localStorage
    const imageDataUrl = localStorage.getItem(`image_${product.imagePath}`);
    imgSrc = imageDataUrl;
  } else {
    imgSrc = `/src/client/assets/img/products/NoImage.jpg`;
  }
  col.innerHTML = `
    <div class="card h-100">
    <div class="card-image">
      <img src="${imgSrc}" class="card-img-top" alt="${product.name}">
      </div>
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text text-primary fw-bold">${formatPrice(product.price)}</p>
        <p class="card-text"><small class="text-muted">In stock: ${product.stock}</small></p>
        <p class="card-text">${product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}</p>
        <div class="d-flex justify-content-between mt-3">
          <button class="btn btn-outline-primary view-btn" data-id="${product.productId}" data-bs-toggle="tooltip" title="View Product details">
            <i class="fas fa-eye"></i> View Details
          </button>
          <button class="btn btn-primary add-to-cart-btn" data-id="${product.productId}" data-bs-toggle="tooltip" title="Add Product to cart">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;

  // Add event listeners to buttons
  const viewBtn = col.querySelector('.view-btn');

  if (viewBtn) {
    viewBtn.addEventListener('click', () => {
      navigateTo(`search.html?product=${product.productId}`);
    });
  }

  return col;
}

/**
 * Add a new product to the featured section (for demo purposes)
 * 
 * @param {Object} product - The product to add
 */
async function addFeaturedProduct(product) {
  try {
    await productService.createProduct(product);
    displayFeaturedProducts();
    return true;
  } catch (error) {
    console.error('Error adding featured product:', error);
    return false;
  }
}

// Initialize homepage when DOM is loaded
document.addEventListener('DOMContentLoaded', initHomepage);

// Export functions for use in other modules
export { initHomepage, displayFeaturedProducts, addFeaturedProduct };