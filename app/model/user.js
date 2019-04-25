const db = require('../../database/db');
const md5 = require('md5');
module.exports = app => {
  const userSchema = require('../schema/user.js')(app);
  const User = db.defineModel(app, 'user', userSchema);

  /**
   * login
   */
  User.login = async (userName, passWord) => {
    return await User.findOne({
      where: { username: userName, password: md5(passWord) },
    });
  };

  /**
   * 根据userid获取user
   */
  User.get = async userId => {
    return await User.findOne({
      where: { user_id: userId },
    });
  };

  return User;
};
