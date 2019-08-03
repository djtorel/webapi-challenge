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

// Project data validator
const projectData = (req, res, next) => {
  if (
    Object.entries(req.body).length === 0 &&
    req.body.constructor === Object
  ) {
    next(error(400, 'missing project data'));
  }
  const { name, description } = req.body;
  name && name.length > 0 && (description && description.length > 0)
    ? next()
    : next(error(400, `'name' or 'description' fields are missing or empty`));
};

// Action data validator
const actionData = (req, res, next) => {
  if (
    Object.entries(req.body).length === 0 &&
    req.body.constructor === Object
  ) {
    next(error(400, 'missing project data'));
  }
  const { description, notes } = req.body;

  if (!description) return next(error(400, 'missing description field'));
  if (!notes) return next(error(400, 'missing notes field'));

  if (description.length > 128)
    return next(
      error(400, 'description field must contain 128 characters or less')
    );

  next();
};

module.exports = {
  projectId,
  actionId,
  projectData,
  actionData,
};
