const BaseController = require('../core/base_controller');

class SysUserController extends BaseController {
  async login() {
    const { userName, passWord } = this.ctx.request.body;

    if (typeof userName === 'undefined' || typeof passWord === 'undefined') {
      return this.fail('参数错误');
    }
    const targetUser = await this.ctx.service.sysUser.login(userName, passWord);
    if (!targetUser) {
      return this.fail('账号或者密码错误');
    }
    const { user_id } = targetUser;
    // 创建token
    const token = this.ctx.helper.createToken({ userId: user_id });
    // 生成redis过期时间
    const exp = Math.floor(Date.now() / 1000) + 7200;
    await this.app.redis
      .get('default')
      .setex(this.app.config.tokenKey, exp, token);

    // 响应
    this.success({ token, expires: exp });
  }

  async info() {
    const userId = this.ctx.locals.userId;
    const uInfo = await this.ctx.service.sysUser.getInfo(userId);
    if (!uInfo) {
      return this.fail('没有此用户');
    }

    const userInfo = {
      nickname: uInfo.userName,
    };

    this.success(uInfo);
  }

  async changepw() {
    const { newPassWord } = this.ctx.request.body;

    const changeOk = await this.ctx.service.sysUser.changePw(newPassWord);

    if (changeOk) {
      this.success({}, '修改密码成功');
    } else {
      this.fail('修改密码失败');
    }
  }

  async logout() {
    await this.app.redis.get('default').del(this.app.config.tokenKey);
    this.success({}, '退出登录成功');
  }
}

module.exports = SysUserController;
