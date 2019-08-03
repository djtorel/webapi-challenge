// Import project database helpers
const projectDb = require('../data/helpers/projectModel');
const actionDb = require('../data/helpers/actionModel');

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

// Action ID validator middleware
const actionId = (req, res, next) => {
  const { id } = req.params;

  actionDb.get(id).then(action => {
    if (action) {
      req.action = action;
      next();
    } else {
      next(error(400, 'invalid action id'));
    }
  });
};

module.exports = {
  projectId,
  actionId,
};
