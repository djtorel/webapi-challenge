const router = require('express').Router();

// Import project database helpers
const projectDb = require('../data/helpers/projectModel');

// Import middleware
const { validate } = require('../middleware');

// --- GET routes start ---

// GET all projects
router.get('/', (req, res, next) => {
  projectDb
    .get()
    .then(projects => res.status(200).json(projects))
    .catch(next);
});

// GET project by ID
router.get('/:id', validate.projectId, (req, res) => {
  res.status(200).json(req.project);
});

// GET actions by project ID
router.get('/:id/actions', validate.projectId, (req, res) => {
  res.status(200).json(req.project.actions);
});

// --- GET routes end ---

// --- POST routes start ---

// POST create new project
router.post('/', validate.projectData, (req, res, next) => {
  projectDb
    .insert(req.body)
    .then(project => res.status(201).json(project))
    .catch(next);
});

// --- POST routes end ---

module.exports = router;
