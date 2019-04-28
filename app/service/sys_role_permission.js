const Service = require('egg').Service;

class SysRolePermissionService extends Service {
  async getPermisionIds(roleId) {
    const permisions = await this.ctx.model.SysRolePermission.getPermissionIdByRoleId(
      roleId
    );

    const idList = permisions.map(item => item.permission_id);

    return idList;
  }
}

module.exports = SysRolePermissionService;
