const Service = require('egg').Service;
const moment = require('moment');
const uuidv1 = require('uuid/v1');
const md5 = require('md5');
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
    const changed = await this.ctx.model.SysUser.changePw(userId, newPassWord);
    return changed;
  }

  async getList() {
    const userId = this.ctx.locals.userId;
    const list = await this.ctx.model.SysUser.getList(userId);

    const converList = await Promise.all(
      list.map(async userItem => {
        const rName = await this.ctx.service.sysRole.getRoleName(
          userItem.role_id
        );

        return {
          userName: userItem.username,
          createAt: moment(userItem.created_at)
            .utc()
            .format('YYYY-MM-DD'),
          updateAt: moment(userItem.updated_at)
            .utc()
            .format('YYYY-MM-DD'),
          status: userItem.status,
          roleId: userItem.role_id,
          roleName: rName,
        };
      })
    );

    return converList;
  }

  async addUser(newUserInfo) {
    const converInfo = {
      user_id: uuidv1(),
      username: newUserInfo.userName,
      password: md5(newUserInfo.passWord),
      role_id: newUserInfo.roleId,
    };
    const newUserId = await this.ctx.model.SysUser.addUser(converInfo);
    return newUserId;
  }
}

module.exports = SysUserService;
