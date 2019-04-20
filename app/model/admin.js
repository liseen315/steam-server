const db = require('../../database/db');

module.exports = app => {
  const adminSchema = require('../schema/admin.js')(app);
  const Admin = db.defineModel(app, 'admin', adminSchema);

  return Admin;
};
