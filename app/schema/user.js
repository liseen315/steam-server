'use strict';
/**
 * 管理员表
 */
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
    creator_name: {
      type: STRING(76),
      allowNull: false,
    },
    creator_id: {
      type: STRING(38),
      allowNull: false,
    },
    // enabled: '启用1', disabled: '禁用0'
    status: {
      type: INTEGER,
      defaultValue: 1,
    },
  };
};
