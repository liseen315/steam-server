const Service = require('egg').Service;
const moment = require('moment');
class SysRoleService extends Service {
  async getRoleName(id) {
    return await this.ctx.model.SysRole.getRoleName(id);
  }

  /**
   * 获取角色列表
   */
  async getList() {
    const roleList = await this.ctx.model.SysRole.getList();

    const converList = roleList.map(roleItem => {
      return {
        roleId: roleItem.id,
        roleName: roleItem.role_name,
        status: roleItem.status,
        createAt: moment(roleItem.created_at)
          .utc()
          .format('YYYY-MM-DD'),
        updateAt: moment(roleItem.updated_at)
          .utc()
          .format('YYYY-MM-DD'),
      };
    });
    return converList;
  }
}

module.exports = SysRoleService;
