// Import project database helpers
const projectDb = require('../data/helpers/projectModel');

// Import utilities
const { error } = require('../utils');

// Project ID validator middleware
const projectId = (req, res, next) => {
  const { id } = req.params;

  projectDb.get(id).then(project => {
    if (project) {
      req.project = project;
      next();
    } else {
      next(error(400, 'invalid project id'));
    }
  });
};

module.exports = {
  projectId,
};
