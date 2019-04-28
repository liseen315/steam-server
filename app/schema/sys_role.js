/**
 * 角色表
 */
module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: STRING(76),
      allowNull: false,
    },
    status: {
      // enabled: '1有效', disabled: '2无效'
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
