const express = require('express');

const UsersDb = require('./users-model');

const router = express.Router();

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