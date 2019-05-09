'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const uuid = uuidv1()
    // 首次进行migrate的时候创建超级管理用户
    await queryInterface.bulkInsert('sys_user', [
      {
        user_id: uuid,
        username: 'liseen',
        password: '5e89975ce4e20fa7adbde6b1cf70a61a',
        role_id: 1
      },
      {
        user_id: uuidv1(),
        username: 'fangshu',
        password: '5e89975ce4e20fa7adbde6b1cf70a61a',
        role_id: 2
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sys_user', null)
  }
}
