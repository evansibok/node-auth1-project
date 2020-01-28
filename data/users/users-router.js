const router = require('express').Router();

const UsersDb = require('./users-model');

router.get('/', (req, res) => {
  UsersDb.getUsers()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: err.message,
        stack: err.stack
      })
    });
})

module.exports = router;