'use strict';
/**
 * 角色权限表
 */
module.exports = app => {
  const { INTEGER, STRING, TEXT } = app.Sequelize;

  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: {
      type: STRING(50),
      allowNull: false,
    },
    permission_id: {
      type: INTEGER,
      allowNull: false,
    },
  };
};
