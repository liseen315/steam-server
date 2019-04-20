const Service = require('egg').Service;
const md5 = require('md5');

class AdminService extends Service {
  async adminLogin(userName, password) {
    return await this.ctx.model.Admin.findOne({
      where: { username: userName, password: md5(password) },
    });
  }
}

module.exports = AdminService;
