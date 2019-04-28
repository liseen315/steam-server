'use strict';
/**
 * 管理员表
 */
module.exports = app => {
  const { INTEGER, STRING, DATE, UUIDV1 } = app.Sequelize;

  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: STRING(38),
      allowNull: false,
      defaultValue: UUIDV1,
      unique: true,
    },
    username: {
      type: STRING(76),
      allowNull: false,
    },
    password: {
      type: STRING(100),
      allowNull: false,
    },
    role_id: {
      type: INTEGER,
      defaultValue: 0,
    },
    // enabled: '1有效', disabled: '2无效'
    status: {
      type: INTEGER,
      defaultValue: 1,
    },
    created_at: {
      type: DATE,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DATE,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  };
};
