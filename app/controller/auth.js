const BaseController = require('../core/base_controller');

class AuthController extends BaseController {
  async login() {
    const { userName, passWord } = this.ctx.request.body;
    const targetUser = await this.ctx.service.user.userLogin(
      userName,
      passWord
    );
    if (!targetUser) {
      return this.fail('账号或者密码错误');
    }
    const { user_id } = targetUser;
    const token = this.ctx.helper.createToken({ userid: user_id });
    const exp = Math.floor(Date.now() / 1000) + 7200;
    await this.app.redis
      .get('default')
      .setex(this.app.config.tokenKey, exp, token);

    this.success({ token, expires: exp });
  }

  async info() {
    const userid = this.ctx.locals.userid;
    const uInfo = await this.ctx.service.user.getuserInfo(userid);
    if (!uInfo) {
      return this.fail('没有此用户');
    }

    this.success({
      userInfo: {
        userName: uInfo.username,
        userId: userid,
        status: uInfo.status,
        createName: uInfo.creator_name,
        createId: uInfo.creator_id,
        roleName: uInfo.roleName,
      },
    });
  }

  async changepw() {}

  async logout() {
    await this.app.redis.get('default').del(this.app.config.tokenKey);
    this.success({}, '退出登录成功');
  }
}

module.exports = AuthController;
