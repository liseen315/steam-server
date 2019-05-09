'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sys_role_permission', [
      {
        role_id: 1,
        permission_id: 1
      },
      {
        role_id: 1,
        permission_id: 2
      },
      {
        role_id: 1,
        permission_id: 3
      },
      {
        role_id: 1,
        permission_id: 4
      },
      {
        role_id: 1,
        permission_id: 5
      },
      {
        role_id: 1,
        permission_id: 6
      },
      {
        role_id: 1,
        permission_id: 7
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sys_role_permission', null)
  }
}
