const fs = require("fs").promises;
const path = require("path");
const productsFile = path.join(__dirname, "data/full-products.json");

/**
 * List products with optional pagination and filtering by tag
 * @param {object} options - Query parameters for listing products
 * @param {number} [options.offset=0] - The starting index for pagination
 * @param {number} [options.limit=25] - The number of products to return
 * @param {string} [options.tag] - Optional tag to filter products
 * @returns {Promise<Array>} - A promise that resolves to an array of products
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options;
  const data = await fs.readFile(productsFile);
  
  return JSON.parse(data)
    .filter((product) => {
      if (!tag) return product; // Return all products if no tag is provided
      return product.tags.some(({ title }) => title === tag); // Filter by tag
    })
    .slice(offset, offset + limit); // Apply pagination
}

/**
 * Retrieve a product by its ID
 * @param {string} id - The ID of the product to retrieve
 * @returns {Promise<object|null>} - A promise that resolves to the product object or null if not found
 */
async function get(id) {
  const products = JSON.parse(await fs.readFile(productsFile));
  
  // Find and return the product with the matching ID
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i];
    }
  }
  
  return null; // Return null if no product is found
}

/**
 * Update a product by its ID (Mock implementation)
 * @param {string} id - The ID of the product to update
 * @param {object} data - The updated product data
 * @returns {Promise<boolean>} - A promise that resolves to true (mock behavior)
 */
async function update(id, data) {
  console.log(`Product ${id} would be updated with:`, data);
  return true; // Placeholder response (no actual update performed)
}

/**
 * Delete a product by its ID (Mock implementation)
 * @param {string} id - The ID of the product to delete
 * @returns {Promise<boolean>} - A promise that resolves to true (mock behavior)
 */
async function deleteProduct(id) {
  console.log(`Product ${id} would be deleted`);
  return true; // Placeholder response (no actual deletion performed)
}

// Export the module functions
module.exports = {
  list,
  get,
  update,
  deleteProduct,
};
