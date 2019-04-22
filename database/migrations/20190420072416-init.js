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

      // 首次进行migrate的时候创建超级管理用户
      await queryInterface.bulkInsert('manager', [
        {
          uuid: uuidv1(),
          username: 'liseen',
          password: '5e89975ce4e20fa7adbde6b1cf70a61a',
          creator_name: 'system',
          creator_id: 'system',
        },
      ]);
      // 创建超级管理角色
      await queryInterface.bulkInsert('role', [
        {
          name: '超级管理员',
        },
      ]);
      // 创建权限
      await queryInterface.bulkInsert('permision', [
        {
          title: '用户管理',
          path: '/manager/list',
        },
        {
          title: '添加管理员',
          path: '/manager/add',
        },
      ]);
      // 创建管理员与角色对应关系
      await queryInterface.bulkInsert('man_role', [
        {
          man_id: 1,
          role_id: 1,
        },
      ]);
      // 创建角色与权限对应关系
      await queryInterface.bulkInsert('role_permision', [
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
        const filePath = path.join('../../app/schema/', fileName);
        const schema = require(filePath)({ Sequelize });
        await queryInterface.dropTable(fileName.replace('.js', ''));
      }
    } catch (e) {
      console.log('--migrate down error', e);
    }
  },
};
