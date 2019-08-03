const router = require('express').Router();

const projectDb = require('../data/helpers/projectModel');

router.get('/', (req, res, next) => {
  projectDb
    .get()
    .then(projects => res.status(200).json(projects))
    .catch(next);
});

module.exports = router;
