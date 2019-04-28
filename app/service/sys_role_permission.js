const Service = require('egg').Service;

class SysRolePermissionService extends Service {
  async getPermisionIds(roleId) {
    const permisions = await this.ctx.model.SysRolePermission.getPermissionIdByRoleId(
      roleId
    );
    return permisions;
  }
}

module.exports = SysRolePermissionService;
