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

module.exports = {
  validatePostBody
}