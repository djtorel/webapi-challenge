const router = require('express').Router();

// Import project database helpers
const projectDb = require('../data/helpers/projectModel');
const actionDb = require('../data/helpers/actionModel');

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

// POST create new action by project ID
router.post(
  '/:id/actions',
  [validate.projectId, validate.actionData],
  (req, res, next) => {
    actionDb
      .insert({ ...req.body, project_id: req.project.id })
      .then(action => res.status(201).json(action))
      .catch(next);
  }
);

// --- POST routes end ---

// --- DELETE routes start ---

router.delete('/:id', validate.projectId, (req, res, next) => {
  projectDb
    .remove(req.params.id)
    .then(() => res.status(200).json(req.project))
    .catch(next);
});

// --- DELETE routes end ---

// --- PUT routes start ---

router.put(
  '/:id',
  [validate.projectId, validate.projectData],
  (req, res, next) => {
    const { id } = req.params;
    const newProject = req.body;

    projectDb
      .update(id, newProject)
      .then(async () => res.status(200).json(await projectDb.get(id)))
      .catch(next);
  }
);

// --- PUT routes end ---

module.exports = router;
