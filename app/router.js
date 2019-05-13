'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  // const jwt = app.middleware.jwt({}, app);
  router.post('/sysuser/login', controller.sysUser.login)
  router.get('/sysuser/info', controller.sysUser.info)
  router.post('/sysuser/changepw', controller.sysUser.changepw)
  router.post('/sysuser/logout', controller.sysUser.logout)
  router.get('/sysuser/list', controller.sysUser.list)
  router.post('/sysuser/add', controller.sysUser.addUser)
  router.post('/sysuser/remove', controller.sysUser.removeUser)
  // 角色
  router.get('/sysrole/rolelist', controller.sysRole.list)

  // 微信小程序
  router.post('/weapp/login', controller.weUser.login)
}
