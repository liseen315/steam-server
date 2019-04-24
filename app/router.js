'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt();
  router.post('/user/login', controller.user.login);
  router.get('/user/info', jwt, controller.user.info);
  router.post('/user/logout', jwt, controller.user.logout);
};
