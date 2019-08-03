const router = require('express').Router();

// Import action database helpers
const actionDb = require('../data/helpers/actionModel');

router.get('/', (req, res, next) => {
  actionDb
    .get()
    .then(actions => res.status(200).json(actions))
    .catch(next);
});

module.exports = router;
