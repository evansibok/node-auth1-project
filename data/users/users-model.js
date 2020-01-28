const db = require('../dbConfig');

function getUsers() {
  return db('users');
}

function addUser(user) {
  return db('users')
    .insert(user);
}

function findBy(filter){
  return db('users')
  .where(filter)
}

module.exports = {
  getUsers,
  addUser,
  findBy
}