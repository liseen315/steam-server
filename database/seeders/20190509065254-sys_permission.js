'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 创建基础权限
    await queryInterface.bulkInsert('sys_permission', [
      {
        menu_code: 'sys_user',
        menu_name: '系统用户',
        permission_code: 'sys:user:list',
        permission_name: '系统用户列表',
        require: 1
      },
      {
        menu_code: 'sys_user',
        menu_name: '系统用户',
        permission_code: 'sys:user:add',
        permission_name: '新增系统用户',
        require: 2
      },
      {
        menu_code: 'sys_user',
        menu_name: '系统用户',
        permission_code: 'sys:user:update',
        permission_name: '修改系统用户',
        require: 2
      },
      {
        menu_code: 'sys_news',
        menu_name: '新闻',
        permission_code: 'sys:news:list',
        permission_name: '新闻列表',
        require: 1
      },
      {
        menu_code: 'sys_news',
        menu_name: '新闻',
        permission_code: 'sys:news:add',
        permission_name: '添加新闻',
        require: 2
      },
      {
        menu_code: 'sys_news',
        menu_name: '新闻',
        permission_code: 'sys:news:update',
        permission_name: '修改新闻',
        require: 2
      },
      {
        menu_code: 'sys_news',
        menu_name: '新闻',
        permission_code: 'sys:news:del',
        permission_name: '删除新闻',
        require: 2
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sys_permission', null)
  }
}
