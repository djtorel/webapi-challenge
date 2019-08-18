const router = require('express').Router();

// Import action database helpers
const actionDb = require('../data/helpers/actionModel');

// Import middleware
const { validate } = require('../middleware');

// --- Get routes start ---
// GET all actions
router.get('/', (req, res, next) => {
  actionDb
    .get()
    .then(actions => res.status(200).json(actions))
    .catch(next);
});

// Get action by ID
router.get('/:id', validate.actionId, (req, res) => {
  res.status(200).json(req.action);
});

// --- Get routes end ---

// --- DELETE routes start ---

router.delete('/:id', validate.actionId, (req, res, next) => {
  actionDb
    .remove(req.params.id)
    .then(() => res.status(200).json(req.action))
    .catch(next);
});

// --- DELETE routes end

// --- PUT routes start

router.put(
  '/:id',
  [validate.actionId, validate.actionData],
  (req, res, next) => {
    const { id } = req.params;
    const newAction = req.body;

    actionDb
      .update(id, newAction)
      .then(async () => res.status(200).json(await actionDb.get(id)))
      .catch(next);
  }
);

// --- PUT routes end

module.exports = router;
