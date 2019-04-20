const BaseController = require('../core/base_controller');

class AdminController extends BaseController {
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    let user = null;
    user = await ctx.service.admin.adminLogin(username, password);

    if (!user) {
      return this.fail(ctx.ERROR_CODE, '账号或者密码错误');
    }

    this.success(null);
  }
}

module.exports = AdminController;
