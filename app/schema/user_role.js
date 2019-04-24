/**
 * 管理<->角色表
 */
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      // 管理员uuid
      type: STRING(38),
      allowNull: false,
    },
    role_id: {
      // 角色id
      type: INTEGER,
      allowNull: false,
    },
  };
};
