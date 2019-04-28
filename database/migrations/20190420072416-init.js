'use strict';
const fs = require('fs');
const path = require('path');
const folderPath = path.join('./', 'app/schema');
const uuidv1 = require('uuid/v1');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const files = fs.readdirSync(folderPath);

      // 根据schema 创建表
      for (const fileName of files) {
        const filePath = path.join('../../app/schema/', fileName);
        const schema = require(filePath)({ Sequelize });
        await queryInterface.createTable(fileName.replace('.js', ''), schema, {
          charset: 'utf8mb4',
        });
      }

      const uuid = uuidv1();
      // 首次进行migrate的时候创建超级管理用户
      await queryInterface.bulkInsert('sys_user', [
        {
          user_id: uuid,
          username: 'liseen',
          password: '5e89975ce4e20fa7adbde6b1cf70a61a',
          role_id: 1,
        },
      ]);

      // 创建角色
      await queryInterface.bulkInsert('sys_role', [
        {
          role_name: 'super_admin',
        },
      ]);
      // 创建基础权限
      await queryInterface.bulkInsert('sys_permission', [
        {
          menu_code: 'sys_user',
          menu_name: '系统用户',
          permission_code: 'sys:user:list',
          permission_name: '系统用户列表',
          require: 1,
        },
        {
          menu_code: 'sys_user',
          menu_name: '系统用户',
          permission_code: 'sys:user:add',
          permission_name: '新增系统用户',
          require: 2,
        },
        {
          menu_code: 'sys_user',
          menu_name: '系统用户',
          permission_code: 'sys:user:update',
          permission_name: '修改系统用户',
          require: 2,
        },
      ]);

      await queryInterface.bulkInsert('sys_role_permission', [
        {
          role_id: 1,
          permission_id: 1,
        },
        {
          role_id: 1,
          permission_id: 2,
        },
        {
          role_id: 1,
          permission_id: 3,
        },
      ]);
    } catch (e) {
      console.log('migrate up error', e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // 删除schema创建的表如果是爬虫的不进行删除操作
    try {
      const files = fs.readdirSync(folderPath);
      for (const fileName of files) {
        await queryInterface.dropTable(fileName.replace('.js', ''));
      }
    } catch (e) {
      console.log('migrate down error', e);
    }
  },
};
