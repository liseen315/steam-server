'use strict';
/**
 * 权限表
 */
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    menu_code: {
      type: STRING,
      defaultValue: '',
    },
    menu_name: {
      type: STRING,
      defaultValue: '',
    },
    permission_code: {
      type: STRING,
      defaultValue: '',
    },
    permission_name: {
      type: STRING,
      defaultValue: '',
    },
    require: {
      // 是否本菜单必选权限, 1.必选 2非必选 通常是"列表"权限是必选
      type: INTEGER,
      defaultValue: 2,
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
