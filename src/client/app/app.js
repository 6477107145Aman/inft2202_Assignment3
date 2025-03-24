/**
 * app.js
 * 
 * Name: Amanjot Singh
 * Date: March, 2025
 * Course: Web Development
 * 
 * Main JavaScript file that's included in all HTML pages.
 */

// Format price to display with currency symbol
function formatPrice(price) {
  return '$' + parseFloat(price).toFixed(2);
}

// Check if a string is empty or contains only whitespace
function isEmpty(str) {
  return !str || str.trim().length === 0;
}

// Validate input field
function validateField(field, errorMessage) {
  const value = field.value.trim();
  const fieldContainer = field.parentElement;
  const errorSpan = fieldContainer.querySelector('.field-error') || document.createElement('span');

  errorSpan.className = 'field-error';

  if (isEmpty(value)) {
    errorSpan.textContent = errorMessage || 'This field is required';
    fieldContainer.appendChild(errorSpan);
    field.classList.add('error-field');
    return false;
  }

  // Field is valid, remove error styling
  if (errorSpan.parentNode === fieldContainer) {
    fieldContainer.removeChild(errorSpan);
  }

  field.classList.remove('error-field');
  field.classList.add('valid-field');
  return true;
}

// Navigate to another page
function navigateTo(url) {
  window.location.href = url;
}

// Get URL parameter by name
function getUrlParam(paramName) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(paramName);
}

// Show error message
function showError(message, duration = 3000) {
  const errorContainer = document.createElement('div');
  errorContainer.className = 'error-message';
  errorContainer.textContent = message;
  document.body.appendChild(errorContainer);
  
  setTimeout(() => {
    errorContainer.remove();
  }, duration);
}

// Copyright span with current year
let copyrightSpan = document.getElementById("copyright");

// Get the current year using the Date object
const currentYear = new Date().getFullYear();

// Append the year to the copyright span
copyrightSpan.append(currentYear + " Aman's Market, Amanjot Singh");


export {
  formatPrice,
  isEmpty,
  validateField,
  navigateTo,
  getUrlParam,
  showError
};