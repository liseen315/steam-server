const Controller = require('egg').Controller;

class AdminController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    let user = null;
    user = await ctx.service.admin.adminLogin(username, password);

    if (!user) {
      return this.fail(ctx.ERROR_CODE, '账号或者密码错误');
    }
    console.log('-----',user.)
    this.success({});
  }
}

module.exports = AdminController;
