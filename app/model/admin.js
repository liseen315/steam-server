const db = require('../../database/db');

module.exports = app => {
  const managerSchema = require('../schema/manager.js')(app);
  const Manager = db.defineModel(app, 'manager', managerSchema);

  return Manager;
};
