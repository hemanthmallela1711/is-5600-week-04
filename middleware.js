/**
 * CORS Middleware - Enables Cross-Origin Resource Sharing
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 */
function cors(req, res, next) {
    const origin = req.headers.origin;
  
    // Set CORS headers to allow requests from any origin or a specific one
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  
    // Define allowed HTTP methods
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS, XMODIFY"
    );
  
    // Allow credentials (cookies, authorization headers, etc.)
    res.setHeader("Access-Control-Allow-Credentials", true);
  
    // Cache CORS settings for 24 hours (86400 seconds)
    res.setHeader("Access-Control-Max-Age", "86400");
  
    // Define allowed request headers
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
  
    next(); // Proceed to the next middleware
  }
  
  /**
   * Global Error Handling Middleware
   * @param {object} err - The error object
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware function
   */
  function handleError(err, req, res, next) {
    // Log the error for debugging
    console.error(err);
  
    // If headers have already been sent, delegate to the default error handler
    if (res.headersSent) {
      return next(err);
    }
  
    // Send a 500 Internal Server Error response
    res.status(500).json({ error: "Internal Server Error" });
  }
  
  /**
   * 404 Not Found Middleware - Handles requests to undefined routes
   * @param {object} req - The request object
   * @param {object} res - The response object
   */
  function notFound(req, res) {
    res.status(404).json({ error: "Not Found" });
  }
  
  // Export middleware functions
  module.exports = {
    cors,
    handleError,
    notFound,
  };
  