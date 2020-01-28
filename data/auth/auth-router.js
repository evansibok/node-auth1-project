const express = require('express');

const UsersDb = require('../users/users-model');

const router = express.Router();

router.post('/register', validatePostBody, (req, res) => {
  const { username, password } = req.body;

  UsersDb.addUser({ username, password })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: 'User account creation failed!',
        stack: err.stack
      })
    })
})

// router.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   UsersDb.addUser({ username, password })
//     .then(user => {
//       res.status(202).json(user);
//     })
//     .catch(err => {
//       res.status(500).json({
//         errorMessage: 'Invalid Credentials!',
//         stack: err.stack
//       })
//     })
// })

function validatePostBody(req, res, next) {
  const contentToPost = req.body;

  if (Object.keys(contentToPost).length === 0) {
    res.status(400).json({ message: 'Invalid user credentials!' })
  } else if (!contentToPost.username || !contentToPost.password) {
    res.status(400).json({ message: 'Please enter a username or password!' });
  } else {
    next();
  }
}

module.exports = router;