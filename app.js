const express = require("express");
const api = require("./api");
const middleware = require("./middleware");
const bodyParser = require("body-parser");

// Set the port (use environment variable or default to 3000)
const port = process.env.PORT || 3000;

// Initialize the Express application
const app = express();

// Serve static files from the "public" directory
app.use(express.static(__dirname + "/public"));

// Apply middleware
app.use(middleware.cors); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests

// Define API routes for handling product-related requests
app.get("/products", api.listProducts); // Fetch all products
app.get("/products/:id", api.getProduct); // Fetch a single product by ID
app.post("/products", api.createProduct); // Create a new product
app.delete("/products/:id", api.deleteProduct); // Delete a product by ID
app.put("/products/:id", api.editProduct); // Update a product by ID

// Define the root route
app.get("/", api.handleRoot);

// Apply middleware for error handling and 404 responses
app.use(middleware.handleError); // Handle errors globally
app.use(middleware.notFound); // Handle 404 (Not Found) errors

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server listening on port ${port}`));
