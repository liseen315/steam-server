'use strict';
/**
 * 文件名字就是table名字
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
    // 是否是管理员,0非管理员,1管理员,因为只给内部人使用所有默认是管理
    is_admin: {
      type: INTEGER,
      defaultValue: 1,
    },
  };
};
