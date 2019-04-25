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
        await queryInterface.createTable(fileName.replace('.js', ''), schema);
      }

      const uuid = uuidv1();
      // 首次进行migrate的时候创建超级管理用户
      await queryInterface.bulkInsert('user', [
        {
          user_id: uuid,
          username: 'liseen',
          password: '5e89975ce4e20fa7adbde6b1cf70a61a',
          creator_name: 'system',
          creator_id: 'system',
        },
      ]);
      // 创建超级管理角色
      await queryInterface.bulkInsert('role', [
        {
          name: 'super_admin',
        },
      ]);
      // 创建权限
      await queryInterface.bulkInsert('permission', [
        {
          title: '管理员列表',
          path: '/manager/list',
        },
        {
          title: '添加管理员',
          path: '/manager/add',
        },
        {
          title: '编辑管理员',
          path: '/manager/edit',
        },
        {
          title: '角色列表',
          path: '/manager/role/list',
        },
        {
          title: '添加角色',
          path: '/manager/role/add',
        },
        {
          title: '编辑角色',
          path: '/manager/role/edit',
        },
        {
          title: '权限列表',
          path: '/manager/permision/list',
        },
        {
          title: '添加权限',
          path: '/manager/permision/add',
        },
        {
          title: '编辑权限',
          path: '/manager/permision/edit',
        },
        {
          title: '爬虫列表',
          path: '/manager/spider/list',
        },
        {
          title: '编辑爬虫',
          path: '/manager/spider/edit',
        },
      ]);
      // 创建管理员与角色对应关系
      await queryInterface.bulkInsert('user_role', [
        {
          user_id: uuid,
          role_id: 1,
        },
      ]);
      // 创建角色与权限对应关系
      await queryInterface.bulkInsert('role_permission', [
        {
          role_id: 1,
          permission_id: 1,
        },
        {
          role_id: 1,
          permission_id: 2,
        },
      ]);
    } catch (e) {
      console.log('--migrate up error', e);
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
      console.log('--migrate down error', e);
    }
  },
};
