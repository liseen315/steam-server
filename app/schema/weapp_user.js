module.exports = app => {
  const { INTEGER, STRING, DATE, UUIDV1 } = app.Sequelize
  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: STRING(38),
      allowNull: false,
      defaultValue: UUIDV1,
      unique: true
    },
    nick_name: {
      type: STRING,
      allowNull: false
    },
    created_at: {
      type: DATE,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DATE,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }
}
