'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({}, app);
  router.post('/auth/login', controller.auth.login);
  router.get('/auth/info', jwt, controller.auth.info);
  router.post('/auth/changepw', jwt, controller.auth.changepw);
  router.post('/auth/logout', jwt, controller.auth.logout);
};
