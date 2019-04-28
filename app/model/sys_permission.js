const db = require('../../database/db');

module.exports = app => {
  const sysPermissionSchema = require('../schema/sys_permission.js')(app);
  const SysPermission = db.defineModel(
    app,
    'sys_permission',
    sysPermissionSchema
  );
  /**
   * 根据permissionID查询单条权限
   */
  SysPermission.getPermisionById = async perMissionId => {
    return await SysPermission.findOne({
      where: {
        id: perMissionId,
      },
    });
  };

  /**
   * 根据permissionIDs列表查看所有相应的权限列表
   */
  SysPermission.getPermisionByIdList = async permisionIds => {
    return await SysPermission.findAll({
      where: {
        id: permisionIds,
      },
    });
  };

  return SysPermission;
};
