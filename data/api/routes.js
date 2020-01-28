const router = require('express').Router();

const usersRouter = require('../users/users-router');

router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.json(`API is live!`);
})

module.exports = router;