const path = require("path");
const Products = require("./products");
const autoCatch = require("./lib/auto-catch");

/**
 * Handle the root route by serving the index.html file
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
}

/**
 * Retrieve a product by its ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 */
async function getProduct(req, res, next) {
  const { id } = req.params;

  const product = await Products.get(id);
  if (!product) {
    return next(); // Proceed to the next middleware if product is not found
  }
  return res.json(product); // Return the found product as JSON
}

/**
 * List all products with optional filtering, pagination, and tag-based search
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
async function listProducts(req, res) {
  // Extract query parameters with default values
  const { offset = 0, limit = 25, tag } = req.query;

  res.json(
    await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag,
    })
  ); // Fetch and return the list of products as JSON
}

/**
 * Create a new product (mock implementation)
 * @param {object} req - The request object containing product data
 * @param {object} res - The response object
 */
async function createProduct(req, res) {
  console.log("Request body:", req.body);
  res.json(req.body); // Return the received data as confirmation
}

/**
 * Update an existing product by ID
 * @param {object} req - The request object containing update data
 * @param {object} res - The response object
 */
async function editProduct(req, res) {
  const { id } = req.params;
  const updatedData = req.body;

  console.log(`Product ${id} updated with data:`, updatedData);
  res.status(200).json({ success: true, message: `Product ${id} updated` });
}

/**
 * Delete a product by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
async function deleteProduct(req, res) {
  const { id } = req.params;

  console.log(`Product ${id} deleted`);
  res.status(202).json({ success: true, message: `Product ${id} deleted` });
}

// Export all route handlers wrapped with autoCatch for error handling
module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
});
