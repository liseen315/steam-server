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

    if (!userInfo) {
      const error = new Error('找不到指定的管理');
      error.status = 422;
      throw error;
    }
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

  /**
   * 更改密码
   * @param {String} newPassWord
   */
  async changePw(newPassWord) {
    const userId = this.ctx.locals.userId;
    const changed = await this.ctx.model.SysUser.changePw(userId, newPassWord);
    return changed;
  }

  /**
   * 获取!超级管理的所有管理
   */
  async getList() {
    const userId = this.ctx.locals.userId;
    const list = await this.ctx.model.SysUser.getList(userId);

    const converList = await Promise.all(
      list.map(async userItem => {
        const rName = await this.ctx.service.sysRole.getRoleName(
          userItem.role_id
        );

        return {
          userId: userItem.user_id,
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

  /**
   * 添加新管理员
   * @param {Object} newUserInfo
   */
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

  /**
   * 删除管理员
   * @param {*} userId
   */
  async destroy(userId) {
    const userInfo = await this.ctx.model.SysUser.getInfo(userId);

    if (!userInfo) {
      const error = new Error('找不到指定的管理');
      error.status = 422;
      throw error;
    }
    // 超级管理
    if (userInfo.role_id === 1) {
      const error = new Error('禁止删除超级管理');
      error.status = 422;
      throw error;
    }

    const result = await this.ctx.model.SysUser.destroyById(userId);

    this.ctx.helper.checkDelete(result);

    return result;
  }
}

module.exports = SysUserService;
