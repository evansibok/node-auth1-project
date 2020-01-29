const router = require('express').Router();
const bcrypt = require('bcryptjs');

const UsersDb = require('../users/users-model');
const { validatePostBody } = require('../middlewares');

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

module.exports = router;