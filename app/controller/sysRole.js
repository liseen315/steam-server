const BaseController = require('../core/base_controller');

class SysRoleController extends BaseController {
  async list() {
    const roleList = await this.ctx.service.sysRole.getList();
    this.success(roleList);
  }

  async addRole() {}
}

module.exports = SysRoleController;
