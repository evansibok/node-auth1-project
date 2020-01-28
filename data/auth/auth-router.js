const router = require('express').Router();
const bcrypt = require('bcryptjs');

const UsersDb = require('../users/users-model');

router.post('/register', validatePostBody, (req, res) => {
  const { username, password } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  const user = {
    username,
    password: passwordHash
  }

  UsersDb.addUser(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: 'Account creation failed!',
        stack: err.stack
      })
    })
})

router.post('/login', validatePostBody, (req, res) => {
  const user = req.body;

  UsersDb.findBy(user)
    .then(user => {
      res.status(200).json({
        message: `Welcome ${user.username}!`
      });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: 'User not found!',
        stack: err.stack
      })
    })
})

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