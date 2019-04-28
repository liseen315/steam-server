const Service = require('egg').Service;

class SysRoleService extends Service {
  async getRoleName(id) {
    return await this.ctx.model.SysRole.getRoleName(id);
  }
}

module.exports = SysRoleService;
