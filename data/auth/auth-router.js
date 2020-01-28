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
        errorMessage: 'Account not created!',
        stack: err.stack
      })
    })
})

router.post('/login', validatePostBody, (req, res) => {
  let { username, password } = req.body;

  UsersDb.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          message: `Welcome ${user.username.toUpperCase()}!`
        })
      } else {
        res.status(404).json({ message: `User not found!` })
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: err.message,
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