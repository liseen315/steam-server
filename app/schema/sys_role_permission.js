'use strict';
/**
 * 角色权限表
 */
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: {
      type: INTEGER,
      allowNull: false,
    },
    permission_id: {
      type: INTEGER,
      allowNull: false,
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
    },
    createdAt: {
      type: DATE,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DATE,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  };
};
