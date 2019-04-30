const db = require('../../database/db');

module.exports = app => {
  const sysRoleSchema = require('../schema/sys_role.js')(app);
  const SysRole = db.defineModel(app, 'sys_role', sysRoleSchema);
  const Op = app.Sequelize.Op;
  /**
   * 获取可用状态的角色名
   */
  SysRole.getRoleName = async roleId => {
    const role = await SysRole.findOne({
      where: {
        id: roleId,
        status: 1,
      },
    });

    return role.role_name;
  };

  SysRole.getList = async () => {
    // 排除掉超级管理员
    return await SysRole.findAll({
      where: {
        id: {
          [Op.ne]: 1,
        },
      },
    });
  };

  return SysRole;
};
