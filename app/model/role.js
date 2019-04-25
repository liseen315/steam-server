const db = require('../../database/db');

module.exports = app => {
  const roleSchema = require('../schema/role.js')(app);
  const Role = db.defineModel(app, 'role', roleSchema);

  /**
   * 获取可用状态的角色名
   */
  Role.getRoleName = async roleId => {
    const role = await Role.findOne({
      where: {
        id: roleId,
        status: 1,
      },
    });

    return role.name;
  };

  return Role;
};
