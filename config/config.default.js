/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555731759199_796'

  // add your middleware config here
  config.middleware = ['userInterceptor', 'weappAuth', 'errorHandler']

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    tokenKey: 'authorization',
    weappToken: 'wetoken',
    appid: 'wxf15b26be5a4341a3',
    secret: 'bbcce9727298dba357e1943f276f0b78'
  }

  config.security = {
    csrf: {
      enable: false
    }
  }
  // 所有的weapp的接口都不走user拦截中间件
  config.userInterceptor = {
    ignore: '/weapp'
  }
  // 所有微信的接口都不走sysuser管理后台中间件
  config.weappAuth = {
    ignore: '/sysuser'
  }

  config.sequelize = {
    dialect: 'mysql',
    database: 'steam_vgfuns',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: 'Liseen315song',
    timezone: '+08:00',
    pool: { maxConnections: 5, maxIdleTime: 30 },
    operatorsAliases: false // 加上这个才能不报symbol的警告...
  }

  exports.jwt = {
    secret: 'Liseen315song'
  }

  config.redis = {
    clients: {
      default: {
        host: 'localhost',
        port: '6379',
        password: 'Liseen315song',
        db: '1'
      }
    },
    agent: true
  }

  return {
    ...config,
    ...userConfig
  }
}
