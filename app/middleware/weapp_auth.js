const { STATUS_CODE } = require('../utils/status_code')

module.exports = (options, app) => {
  return async function weappAuth (ctx, next) {
    const sessionId = ctx.get('sessionid')
    const sesstion =
      ctx.helper.JsonParse(await app.redis.get('default').get(sessionId)) || {}

    const { userId } = sesstion
    const whiteList = ['/weapp/login']

    if (userId || whiteList.includes(ctx.url)) {
      await next()
    } else {
      ctx.body = {
        code: STATUS_CODE.LOGIN_FAIL,
        message: '登录失败'
      }
    }
  }
}
