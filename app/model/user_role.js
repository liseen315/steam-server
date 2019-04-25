const db = require('../../database/db');

module.exports = app => {
  const userRoleSchema = require('../schema/user_role.js')(app);
  const UserRole = db.defineModel(app, 'user_role', userRoleSchema);

  /**
   * 根据用户id获取对应的角色id
   */
  UserRole.getRoleIdByUserId = async userId => {
    const role = await UserRole.findOne({
      where: {
        user_id: userId,
      },
    });

    return role.role_id;
  };

  return UserRole;
};
