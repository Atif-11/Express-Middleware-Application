// Add middleware to set isAdminAuthenticated in req.session
module.exports = function(req, res, next) {
    req.session.isAdminAuthenticated = false; // Default to false
    next();
  };