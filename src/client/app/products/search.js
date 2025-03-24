/**
 * search.js
 * 
 * Name: Amanjot Singh
 * Date: March, 2025
 * Course: Web Development
 * 
 * Functions for searching and displaying products from the product service.
 */

import ProductService from './product.mock.service.js';
import { waitTho } from "../utils.js";

// Global variables
let productToDelete = null;
let currentPage = 1;
let itemsPerPage = 5;
let totalPages = 1;
let searchQuery = '';
let sortField = 'createdAt';

document.addEventListener("DOMContentLoaded", async function () {
    // Show spinner
    showSpinner();

    // Set up page size change handler
    const pageSizeSelect = document.getElementById('limit-select');
    if (pageSizeSelect) {
        pageSizeSelect.addEventListener('change', function() {
            itemsPerPage = parseInt(this.value);
            currentPage = 1; // Reset to first page when changing page size
            displayCurrentPage();
        });
    }
    
    // Set up search form handler
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            searchQuery = document.getElementById('search-input').value;
            currentPage = 1; // Reset to first page on new search
            displayCurrentPage();
        });
    }

    // Set up sort select handler
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortField = this.value;
            displayCurrentPage();
        });
    }

    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (tooltipTriggerList.length > 0) {
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }
    
    // Set up delete confirmation handler
    document.getElementById('confirmDeleteBtn').addEventListener('click', deleteConfirmedProduct);
    
    // Load products
    await displayCurrentPage();
    
    // Hide spinner
    hideSpinner();
});

/**
 * Load products from the API
 */
async function displayCurrentPage() {
    try {
        // Show spinner
        showSpinner();
        await waitTho(3000);

        // Hide any existing content
        document.getElementById("products-list").classList.add("d-none");
        document.getElementById("message-box").classList.add("d-none");
        
        // Build query parameters
        const params = new URLSearchParams({
            page: currentPage,
            limit: itemsPerPage,
            sort: sortField
        });
        
        if (searchQuery) {
            params.append('q', searchQuery);
        }
        
        // Make the API request
        const response = await fetch(`http://localhost:3000/api/products/search?${params.toString()}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if data has the expected structure
        if (!data || !data.records || !Array.isArray(data.records)) {
            throw new Error('Invalid data format returned from server');
        }
        
        // Update pagination information
        if (data.pagination) {
            totalPages = data.pagination.pages || 1;
            currentPage = data.pagination.page || 1;
        }
        
        // Display the products
        drawProductsTable(data.records);
        
        // Draw pagination
        drawPaginationLinks();
        
        // Hide spinner
        hideSpinner();
    } catch (error) {
        // Hide spinner
        hideSpinner();
        
        // Show error message
        showMessage(`Error loading products: ${error.message}`, "danger");
        
        // Hide the table
        document.getElementById("products-list").classList.add("d-none");
    }
}

/**
 * Display products in the table
 * @param {Array} products - List of products to display
 */
function drawProductsTable(products) {
    // Get the table body
    const tableBody = document.querySelector("#products-list tbody");
    
    // Clear existing rows
    tableBody.innerHTML = "";
    
    if (products && products.length > 0) {
        // Show the table
        document.getElementById("products-list").classList.remove("d-none");
        document.getElementById("message-box").classList.add("d-none");
        
        // Add rows for each product
        products.forEach(product => {
            const row = tableBody.insertRow();
            const productId = product._id || product.id;

            // Name cell
            const nameCell = row.insertCell(0);
            nameCell.textContent = product.name;
            
            // description cell
            const descriptionCell = row.insertCell(1);
            descriptionCell.textContent = product.description;
            
            // price cell
            const priceCell = row.insertCell(2);
            priceCell.textContent = product.price;
            
            // stock cell
            const stockCell = row.insertCell(3);
            stockCell.textContent = product.stock;
            
            // Controls cell
            const controlsCell = row.insertCell(4);
            
            // Edit button
            const editButton = document.createElement("button");
            editButton.classList.add("btn", "btn-sm", "btn-primary", "me-2");
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.setAttribute("data-bs-toggle", "tooltip");
            editButton.setAttribute("data-bs-placement", "top");
            editButton.setAttribute("title", "Edit this product");
            editButton.addEventListener("click", function() {
                window.location.href = `create.html?id=${productId}`;
            });
            controlsCell.appendChild(editButton);
            
            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("btn", "btn-sm", "btn-danger");
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.setAttribute("data-bs-toggle", "tooltip");
            deleteButton.setAttribute("data-bs-placement", "top");
            deleteButton.setAttribute("title", "Delete this product");
            deleteButton.addEventListener("click", function() {
                showDeleteConfirmation(product);
            });
            controlsCell.appendChild(deleteButton);
        });
        
        // Initialize tooltips for new buttons
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        if (tooltipTriggerList.length > 0) {
            [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        }
    } else {
        // No products - show message
        showMessage("No products found.", "info");
        
        // Hide the table
        document.getElementById("products-list").classList.add("d-none");
    }
}

/**
 * Show delete confirmation modal
 * @param {Object} product - The product to delete
 */
function showDeleteConfirmation(product) {
    // Store the product ID to delete
    productToDelete = product._id || product.id;
    
    // Set the modal text
    const productNameElement = document.getElementById("deleteModalProductName");
    if (productNameElement) {
        productNameElement.textContent = product.name;
    } else {
        // If the element doesn't exist, update the modal body text directly
        const modalBody = document.querySelector("#deleteConfirmModal .modal-body");
        if (modalBody) {
            modalBody.textContent = `Are you sure you want to delete "${product.name}"? This action cannot be undone.`;
        }
    }
    
    // Show the modal
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    deleteModal.show();
}

/**
 * Delete the product after confirmation
 */
async function deleteConfirmedProduct() {
    if (!productToDelete) return;
    
    // Get the modal instance
    const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal'));
    
    try {
        // Disable button and show spinner
        const confirmBtn = document.getElementById('confirmDeleteBtn');
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Deleting...';
        
        // Get the product service
        const productService = new ProductService();
        
        // Delete the product
        await productService.deleteProduct(productToDelete);
        
        // Reset the product to delete
        productToDelete = null;
        
        // Hide the modal
        deleteModal.hide();
        
        // Reset button
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = 'Delete';
        
        // Show success message
        showMessage("Product deleted successfully.", "success");
        
        // Reload the products
        await displayCurrentPage();
    } catch (error) {
        // Hide the modal
        deleteModal.hide();
        
        // Reset button
        const confirmBtn = document.getElementById('confirmDeleteBtn');
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = 'Delete';
        
        // Show error message
        showMessage(`Error deleting product: ${error.message}`, "danger");
    }
}

/**
 * Draw pagination controls
 */
function drawPaginationLinks() {
    const paginationContainer = document.getElementById("productPagination");
    paginationContainer.innerHTML = "";
    
    if (totalPages <= 1) {
        return; // No pagination needed
    }
    
    // Previous button
    const prevItem = document.createElement("li");
    prevItem.className = "page-item" + (currentPage === 1 ? " disabled" : "");
    const prevLink = document.createElement("a");
    prevLink.className = "page-link";
    prevLink.href = "#";
    prevLink.textContent = "Previous";
    prevLink.addEventListener("click", function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayCurrentPage();
        }
    });
    prevItem.appendChild(prevLink);
    paginationContainer.appendChild(prevItem);
    
    // Determine which page numbers to show
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    // Page links
    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement("li");
        pageItem.className = "page-item" + (i === currentPage ? " active" : "");
        const pageLink = document.createElement("a");
        pageLink.className = "page-link";
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.addEventListener("click", function(e) {
            e.preventDefault();
            currentPage = i;
            displayCurrentPage();
        });
        pageItem.appendChild(pageLink);
        paginationContainer.appendChild(pageItem);
    }
    
    // Next button
    const nextItem = document.createElement("li");
    nextItem.className = "page-item" + (currentPage === totalPages ? " disabled" : "");
    const nextLink = document.createElement("a");
    nextLink.className = "page-link";
    nextLink.href = "#";
    nextLink.textContent = "Next";
    nextLink.addEventListener("click", function(e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            displayCurrentPage();
        }
    });
    nextItem.appendChild(nextLink);
    paginationContainer.appendChild(nextItem);
}

/**
 * Show a message to the user
 * @param {string} message - The message to show
 * @param {string} type - The type of message (success, danger, info, etc.)
 */
function showMessage(message, type = "info") {
    const messageBox = document.getElementById("message-box");
    messageBox.textContent = message;
    messageBox.classList.remove("d-none", "alert-success", "alert-danger", "alert-info", "alert-warning");
    messageBox.classList.add(`alert-${type}`);
}

/**
 * Show spinner when loading
 */
function showSpinner() {
    document.getElementById("spinner").classList.remove("d-none");
}

/**
 * Hide spinner after loading
 */
function hideSpinner() {
    document.getElementById("spinner").classList.add("d-none");
}