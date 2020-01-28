const app = require('./data/api/server');

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`** Listening on port: ${PORT} **`);
})