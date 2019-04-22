/**
 * 角色表
 */
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      // 角色名
      type: STRING(76),
      allowNull: false,
    },
    status: {
      // enabled: '启用1', disabled: '禁用0'
      type: INTEGER,
      defaultValue: 1,
    },
  };
};
