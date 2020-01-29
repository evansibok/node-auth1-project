const express = require('express');

const routes = require('./routes');
const rootMiddleware = require('./root-middleware');

const app = express();

rootMiddleware(app)

app.use('/api', routes);

module.exports = app;