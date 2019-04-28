'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // const jwt = app.middleware.jwt({}, app);
  router.post('/sysuser/login', controller.sysUser.login);
  router.get('/sysuser/info', controller.sysUser.info);
  // router.post('/sysuser/changepw', jwt, controller.auth.changepw);
  // router.post('/sysuser/logout', jwt, controller.auth.logout);
};
