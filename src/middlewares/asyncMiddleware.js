/**
 * Allows for catching errors in async/await middleware in express
 * @param {callback} fn
 * @return {function}
 */
module.exports = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
