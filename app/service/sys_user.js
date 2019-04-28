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
    const idList = await this.ctx.service.sysRolePermission.getPermisionIds(
      userInfo.role_id
    );

    const roleName = await this.ctx.service.sysRole.getRoleName(
      userInfo.role_id
    );

    const menuAndPermissions = await this.ctx.service.sysPermission.getMenuAndPermissions(
      idList
    );

    const converInfo = {
      userName: userInfo.username,
      userId: userInfo.user_id,
      status: userInfo.status,
      roleName,
      menus: menuAndPermissions.menuList,
      permissions: menuAndPermissions.permissionList,
    };
    return converInfo;
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
