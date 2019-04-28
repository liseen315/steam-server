const Service = require('egg').Service;

class SysUserService extends Service {
  /**
   * 用户登录查询
   * @param {string} userName
   * @param {string} passWord
   */
  async login(userName, passWord) {
    return await this.ctx.model.SysUser.login(userName, passWord);
  }

  /**
   * 用户信息查询
   * @param {string} userId
   */
  async getInfo(userId) {
    const userInfo = await this.ctx.model.SysUser.getInfo(userId);
    // 重新组合新的userInfo
    const permissionIds = await this.ctx.service.sysRolePermission.getPermisionIds(
      userInfo.role_id
    );

    const pIds = [];
    permissionIds.map(item => {
      pIds.push(item.permission_id);
    });
    const permisions = await this.ctx.model.SysPermission.getPermisionByIdList(
      pIds
    );

    console.log('--permisions--', permisions);

    // console.log('--permissionIds--',permissionIds)
    return userInfo;
  }

  async changePw(newPassWord) {
    const userId = this.ctx.locals.userId;
    const user = await this.ctx.model.SysUser.getInfo(userId);
    const changeOk = false;
    if (user) {
      changeOk = true;
    } else {
      return changeOk;
    }
  }
}

module.exports = SysUserService;
