const BaseController = require('../core/base_controller');

class SysUserController extends BaseController {
  /**
   * 登录
   */
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

  /**
   * 获取用户信息
   */
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
  /**
   * 更换密码
   */
  async changepw() {
    const { newPassWord } = this.ctx.request.body;

    const changeOk = await this.ctx.service.sysUser.changePw(newPassWord);

    if (changeOk) {
      this.success({});
    } else {
      this.fail('修改密码失败');
    }
  }

  /**
   * 登出
   */
  async logout() {
    await this.app.redis.get('default').del(this.app.config.tokenKey);
    this.success({});
  }
  /**
   * 获取管理员列表
   */
  async list() {
    const userList = await this.ctx.service.sysUser.getList();
    this.success(userList);
  }
  /**
   * 添加新管理员
   */
  async addUser() {
    const { userName, passWord, roleId } = this.ctx.request.body;
    const newUserId = await this.ctx.service.sysUser.addUser({
      userName,
      passWord,
      roleId,
    });
    this.success({ userId: newUserId });
  }

  /**
   * 删除管理员 需要验证不能删除超级管理
   */
  async removeUser() {
    const { userId } = this.ctx.request.body;
    const result = await this.ctx.service.sysUser.destroy(userId);
    if (result) {
      this.success(result);
    } else {
      this.fail('删除管理失败');
    }
  }
}

module.exports = SysUserController;
