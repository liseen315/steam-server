const BaseController = require('../core/base_controller');

class UserController extends BaseController {
  async login() {
    const { userName, passWord } = this.ctx.request.body;
    const targetUser = await this.ctx.service.user.userLogin(
      userName,
      passWord
    );
    if (!targetUser) {
      return this.fail('账号或者密码错误');
    }
    const { uuid } = targetUser;

    const token = this.ctx.helper.createToken({ userid: uuid });
    const exp = Math.floor(Date.now() / 1000) + 7200;
    await this.app.redis.get('default').setex('authorization', exp, token);

    this.success({ token, expires: exp });
  }

  async info() {
    console.log('-----------info------', this.ctx);
  }

  async logout() {}
}

module.exports = UserController;
