'use strict'
const fs = require('fs')
const path = require('path')
const folderPath = path.join('./', 'app/schema')
const uuidv1 = require('uuid/v1')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const files = fs.readdirSync(folderPath)

      // 根据schema 创建表
      for (const fileName of files) {
        const filePath = path.join('../../app/schema/', fileName)
        const schema = require(filePath)({ Sequelize })
        await queryInterface.createTable(fileName.replace('.js', ''), schema, {
          charset: 'utf8mb4'
        })
      }
    } catch (e) {
      console.log('migrate up error', e)
    }
  },

  down: async (queryInterface, Sequelize) => {
    // 删除schema创建的表如果是爬虫的不进行删除操作
    try {
      const files = fs.readdirSync(folderPath)
      for (const fileName of files) {
        await queryInterface.dropTable(fileName.replace('.js', ''))
      }
    } catch (e) {
      console.log('migrate down error', e)
    }
  }
}
