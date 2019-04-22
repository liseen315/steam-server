const BaseController = require('./base');

class ManagerController extends BaseController {
  async login() {
    // const { ctx, app } = this;
    const { username, password } = this.ctx.request.body;
    console.log('---username---', username, password);
    // let user = null;
    // user = await ctx.service.admin.adminLogin(username, password);
    // if (!user) {
    //   return this.fail(ctx.ERROR_CODE, '账号或者密码错误');
    // }
    this.success({});
  }

  async loginout() {}
}

module.exports = ManagerController;
