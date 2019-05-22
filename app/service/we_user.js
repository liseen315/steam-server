const Service = require('egg').Service
const crypto = require('crypto')
const _ = require('lodash')

class WeUserService extends Service {
  async code2session (code, fullUserInfo) {
    try {
      const sessionData = await this.ctx.curl(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${
          this.app.config.appid
        }&secret=${
          this.app.config.secret
        }&js_code=${code}&grant_type=authorization_code`,
        {
          dataType: 'json'
        }
      )
      if (!sessionData.data.openid) {
        return null
      }

      return sessionData
    } catch (e) {
      return null
    }
  }

  async getInfo (userId) {
    const userInfo = await this.ctx.model.WeUser.getUserInfo(userId)
    if (!userInfo) {
      const error = new Error('找不到指定的用户')
      error.status = 422
      throw error
    }

    return userInfo
  }
}

module.exports = WeUserService
