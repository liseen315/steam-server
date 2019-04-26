const db = require('../../database/db');

module.exports = app => {
  const authRoleSchema = require('../schema/auth_role.js')(app);
  const AuthRole = db.defineModel(app, 'auth_role', authRoleSchema);

  /**
   * 根据用户id获取对应的角色id
   */
  AuthRole.getRoleIdByUserId = async userId => {
    const role = await AuthRole.findOne({
      where: {
        user_id: userId,
      },
    });

    return role.role_id;
  };

  return AuthRole;
};
