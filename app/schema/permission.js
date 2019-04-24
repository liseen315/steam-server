'use strict';
/**
 * 权限表
 */
module.exports = app => {
  const { INTEGER, STRING, TEXT } = app.Sequelize;

  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(50),
      allowNull: false,
    },
    path: {
      type: TEXT,
      allowNull: false,
    },
  };
};
