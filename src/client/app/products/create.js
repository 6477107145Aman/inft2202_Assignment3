/**
 * create.js
 * 
 * Name: Amanjot Singh
 * Date: March, 2025
 * Course: Web Development
 * 
 * Functions for creating and updating products using the form.
*/

import { waitTho } from "../utils.js";
import ProductService from './product.mock.service.js';

document.addEventListener("DOMContentLoaded", async function () {
    // Get form element
    const productForm = document.getElementById("product-form");

    // Check if we're editing (URL has an id parameter)
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // If ID is present, set up form for editing
    if (id) {
        await setupEditForm(id);
    }
    // Add submit event listener
    if (productForm) {
        productForm.addEventListener("submit", async function (event) {
            // Prevent default form submission
            event.preventDefault();
            await submitProductForm(event);
        });

        // Add input listeners for real-time validation
        productForm.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", function () {
                validateProductInput(this);
            });
        });
    }
});
// Set up form for editing
async function setupEditForm(id) {
    try {
        showSpinner();

        // Get product service
        const productService = new ProductService();

        // Get product by ID
        const product = await productService.findProduct(id);

        hideSpinner();

        // Change heading to "Edit Product"
        const heading = document.querySelector("h2");
        if (heading) {
            heading.textContent = "Edit Product";
        }

        // Add hidden field for ID
        let idField = document.getElementById("product-id");
        if (!idField) {
            idField = document.createElement("input");
            idField.type = "hidden";
            idField.id = "product-id";
            idField.name = "id";
            document.getElementById("product-form").appendChild(idField);
        }
        idField.value = product.productId;

        // Set form values from product object
        document.getElementById("name").value = product.name;
        document.getElementById("description").value = product.description;
        document.getElementById("price").value = product.price;
        document.getElementById("stock").value = product.stock;

        // Disable the name field (can't change product name)
        document.getElementById("name").disabled = true;

        // Change submit button text
        const submitButton = document.querySelector("button[type='submit']");
        if (submitButton) {
            submitButton.textContent = "Update Product";
        }
    } catch (error) {
        hideSpinner();
        // Show error message if product not found
        const messageBox = document.getElementById("message-box");
        messageBox.textContent = error.message;
        messageBox.classList.remove("d-none");
        messageBox.classList.add("alert-danger");
    }
}

/**
 * Validates the product form submission
 * @param {Event} event - The form submission event
 */
async function submitProductForm(event) {
    // Prevent the default action from happening
    event.preventDefault();

    // Get the form from the event parameter
    const form = event.currentTarget;

    // Check to see if it is valid using your new validation method
    if (validateProductForm(form)) {
        try {
            showSpinner();
            disableForm(form);

            // Create product service instance
            const productService = new ProductService();

            // Get form values
            const productData = {
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                stock: parseInt(document.getElementById("stock").value),
                price: parseInt(document.getElementById("price").value)
            };

            // Check if we're updating or creating
            const productId = document.getElementById("product-id");
            let result;

            if (productId && productId.value) {
                // We're updating
                result = productService.updateProduct(productId.value, productData);

                // Show success message
                const messageBox = document.getElementById("message-box");
                messageBox.textContent = "Product updated successfully!";
                messageBox.classList.remove("d-none", "alert-danger");
                messageBox.classList.add("alert-success");

                // Redirect to search page after 3 seconds
                await waitTho(3000);
                window.location.href = "search.html";
            } else {
                // Create the product
                result = await productService.createProduct(productData);

                // Reset the form
                form.reset();

                // Remove validation classes after reset
                form.querySelectorAll("input").forEach(input => {
                    input.classList.remove("is-valid", "is-invalid");
                });

                // Show success message
                const messageBox = document.getElementById("message-box");
                messageBox.textContent = "Product created successfully!";
                messageBox.classList.remove("d-none", "alert-danger");
                messageBox.classList.add("alert-success");

                // Use waitTho with await instead of setTimeout
                await waitTho(2000);
                window.location.href = "search.html";
            }
        }
        catch (error) {
            // Hide spinner and enable form on error
            hideSpinner();
            enableForm(form);

            // Show error message
            const messageBox = document.getElementById("message-box");
            messageBox.textContent = error.message;
            messageBox.classList.remove("d-none", "alert-success");
            messageBox.classList.add("alert-danger");
        }
    } else {
        // Otherwise, print the error message in the message box
        document.getElementById("message-box").textContent = "Please correct the errors in the form.";
        document.getElementById("message-box").classList.remove("d-none", "alert-success");
        document.getElementById("message-box").classList.add("alert-danger");
    }
}

/**
 * Validates the product form inputs
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateProductForm(form) {
    let isValid = true;

    // Check each input on the form
    form.querySelectorAll("input").forEach(input => {
        if (!validateProductInput(input)) {
            isValid = false;
        }
    });

    return isValid;
}

/**
 * Validates a single form input
 * @param {HTMLInputElement} input - The input to validate
 * @returns {boolean} - Whether the input is valid
 */
function validateProductInput(input) {
    // Consider hidden fields always valid
    if (input.type === "hidden") {
        return true;
    }

    // Get the error message element that follows this input
    const errorElement = input.nextElementSibling;

    // Check if errorElement exists
    if (!errorElement) {
        // console.error(`No error element found for ${input.id}`);
        return true; // Consider it valid and continue
    }

    // Check if field is required and empty
    if (input.hasAttribute("required") && !input.value.trim()) {
        // Show error
        errorElement.textContent = `${input.name} is required`;
        errorElement.classList.remove("d-none");
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    }

    // Type-specific validation
    if (input.type === "number") {
        // For price and stock, ensure they are positive numbers
        if (isNaN(input.value) || parseInt(input.value) < 0) {
            errorElement.textContent = `${input.name} must be a positive number`;
            errorElement.classList.remove("d-none");
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
            return false;
        }
    }

    // If we get here, the field is valid
    errorElement.classList.add("d-none");
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
}

// Helper functions for showing/hiding spinner and disabling/enabling form
function showSpinner() {
    document.getElementById("spinner").classList.remove("d-none");
}

function hideSpinner() {
    document.getElementById("spinner").classList.add("d-none");
}

function disableForm(form) {
    // Disable all form inputs
    form.querySelectorAll("input, button").forEach(element => {
        element.disabled = true;
    });
}

function enableForm(form) {
    // Enable all form inputs except name field in edit mode
    form.querySelectorAll("input, button").forEach(element => {
        if (element.id !== "name" || !document.getElementById("product-id")) {
            element.disabled = false;
        }
    });
}