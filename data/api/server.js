const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('../users/users-router');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.status(200).json(`API is live`);
})

module.exports = app;