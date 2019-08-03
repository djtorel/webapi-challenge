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

module.exports = router;
