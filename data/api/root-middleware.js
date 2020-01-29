require('dotenv').config();

const express = require('express');

const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

module.exports = app => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(session({
    name: "userLogged",
    secret: process.env.COOKIE_SECRET,
    cookie: {
      maxAge: 12255000,
      secure: false,
      httpOnly: false
    },
    resave: false,
    saveUninitialized: false
  }));
}
