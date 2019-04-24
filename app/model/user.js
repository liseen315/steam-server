const db = require('../../database/db');

module.exports = app => {
  const userSchema = require('../schema/user.js')(app);
  const user = db.defineModel(app, 'user', userSchema);
  return user;
};
