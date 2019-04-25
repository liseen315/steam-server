const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 用户登录查询
   * @param {string} userName
   * @param {string} passWord
   */
  async userLogin(userName, passWord) {
    return await this.ctx.model.User.login(userName, passWord);
  }

  /**
   * 用户信息查询
   * @param {string} userId
   */
  async getuserInfo(userId) {
    const userInfo = await this.ctx.model.User.get(userId);

    const roleId = await this.ctx.model.UserRole.getRoleIdByUserId(userId);

    const roleName = await this.ctx.model.Role.getRoleName(roleId);

    userInfo.roleName = roleName;
    return userInfo;
  }
}

module.exports = UserService;
