const db = require('../../database/db');
const md5 = require('md5');
module.exports = app => {
  const sysUserSchema = require('../schema/sys_user.js')(app);
  const SysUser = db.defineModel(app, 'sys_user', sysUserSchema);

  /**
   * login
   */
  SysUser.login = async (userName, passWord) => {
    return await SysUser.findOne({
      where: { username: userName, password: md5(passWord) },
    });
  };

  /**
   * 根据userid获取user
   */
  SysUser.getInfo = async userId => {
    return await SysUser.findOne({
      where: { user_id: userId },
    });
  };

  SysUser.changePw = async (userId, newPassWord) => {
    return await SysUser.update(
      { password: md5(newPassWord) },
      {
        where: {
          user_id: userId,
        },
      }
    );
  };

  SysUser.getList = async userId => {
    // 排除掉超级管理员
    const Op = app.Sequelize.Op;
    return await SysUser.findAll({
      where: {
        user_id: {
          [Op.ne]: userId,
        },
      },
    });
  };

  /**
   * 添加管理员记录
   */
  SysUser.addUser = async newUserInfo => {
    const result = await SysUser.create(newUserInfo);
    return result.user_id;
  };

  return SysUser;
};
