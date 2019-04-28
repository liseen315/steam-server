const db = require('../../database/db');

module.exports = app => {
  const sysRolePermissionSchema = require('../schema/sys_role_permission.js')(
    app
  );
  const SysRolePermission = db.defineModel(
    app,
    'sys_role_permission',
    sysRolePermissionSchema
  );

  /**
   * 根据角色id获取全部的权限id
   */
  SysRolePermission.getPermissionIdByRoleId = async roleId => {
    return await SysRolePermission.findAll({
      attributes: [ 'permission_id' ],
      where: {
        role_id: roleId,
      },
    });
  };

  return SysRolePermission;
};
