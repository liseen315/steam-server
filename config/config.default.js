/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555731759199_796';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    database: 'steam_vgfuns',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: 'Liseen315song',
    timezone: '+08:00',
  };

  return {
    ...config,
    ...userConfig,
  };
};
