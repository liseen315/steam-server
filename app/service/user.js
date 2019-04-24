const Service = require('egg').Service;
const md5 = require('md5');

class UserService extends Service {
  async userLogin(userName, passWord) {
    return await this.ctx.model.User.findOne({
      where: { username: userName, password: md5(passWord) },
    });
  }
}

module.exports = UserService;
