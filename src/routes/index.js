/**
 * Main application routes
 */
module.exports = (app) => {
  // initialize routes for common module
  app.use(`/`, require('../api'));
};
