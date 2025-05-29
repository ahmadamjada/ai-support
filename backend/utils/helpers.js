/**
 * Format date to a readable string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
exports.formatDate = (date) => {
    return new Date(date).toLocaleString();
};

/**
 * Generate a random string
 * @param {number} length - Length of the random string
 * @returns {string} Random string
 */
exports.generateRandomString = (length = 8) => {
    return Math.random().toString(36).substring(2, length + 2);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
exports.isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Handle async errors in Express routes
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware function
 */
exports.asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}; 