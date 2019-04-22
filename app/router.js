'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/manager/login', controller.manager.login);
  router.post('/api/manager/loginout', controller.manager.loginout);
};
