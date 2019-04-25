const Service = require('egg').Service;
const md5 = require('md5');

class UserService extends Service {
  /**
   * 用户登录查询
   * @param {string} userName
   * @param {string} passWord
   */
  async userLogin(userName, passWord) {
    return await this.ctx.model.User.findOne({
      where: { username: userName, password: md5(passWord) },
    });
  }

  /**
   * 用户信息查询
   * @param {string} userid
   */
  async getuserInfo(userid) {
    return await this.ctx.model.User.findOne({
      where: { uuid: userid },
    });
  }
}

module.exports = UserService;
