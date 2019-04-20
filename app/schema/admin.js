'use strict';

module.exports = app => {
  const { INTEGER, STRING, BIGINT, DATE, UUIDV1, ENUM } = app.Sequelize;

  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
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
    created_time: {
      type: DATE,
      allowNull: false,
    },
    creator_name: {
      type: STRING(76),
      allowNull: false,
    },
    creator_id: {
      type: STRING(38),
      allowNull: false,
    },
    // enabled: '启用', disabled: '禁用'
    status: {
      type: ENUM('enabled', 'disabled'),
      allowNull: false,
    },
    user_type: {
      type: ENUM('admin'),
      allowNull: false,
    },
  };
};
