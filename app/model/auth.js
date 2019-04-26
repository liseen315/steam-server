const db = require('../../database/db');
const md5 = require('md5');
module.exports = app => {
  const authSchema = require('../schema/auth.js')(app);
  const Auth = db.defineModel(app, 'user', authSchema);

  /**
   * login
   */
  Auth.login = async (userName, passWord) => {
    return await Auth.findOne({
      where: { username: userName, password: md5(passWord) },
    });
  };

  /**
   * 根据userid获取user
   */
  Auth.get = async userId => {
    return await User.findOne({
      where: { user_id: userId },
    });
  };

  return Auth;
};
