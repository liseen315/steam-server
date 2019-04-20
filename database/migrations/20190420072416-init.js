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

      // 首次进行migrate的时候创建超级管理员

      await queryInterface.bulkInsert('admin', [
        {
          uuid: uuidv1(),
          username: 'liseen',
          password: '5e89975ce4e20fa7adbde6b1cf70a61a',
          created_time: new Date(),
          creator_name: 'system',
          creator_id: 'system',
          status: 'enabled',
          user_type: 'admin',
          name: '超级管理员',
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
