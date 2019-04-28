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

  SysUser.changePw = async newPassWord => {
    // await SysUser.
  };

  return SysUser;
};
