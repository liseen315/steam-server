const Service = require('egg').Service
const crypto = require('crypto')
const _ = require('lodash')

class WeappService extends Service {
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
      console.log('---sessionData---', sessionData)
      // 验证用户信息完整性
      const sha1 = crypto
        .createHash('sha1')
        .update(fullUserInfo.rawData.toString() + sessionData.data.session_key)
        .digest('hex')

      if (fullUserInfo.signature !== sha1) {
        console.log('--sha1--')
        return null
      }

      // 解析用户数据
      const wechatUserInfo = await this.ctx.helper.decryptUserInfoData(
        sessionData.data.session_key,
        fullUserInfo.encryptedData,
        fullUserInfo.iv
      )
      if (_.isEmpty(wechatUserInfo)) {
        console.log('---wechatUserInfo--')
        return null
      }

      return wechatUserInfo
    } catch (e) {
      return null
    }
  }
}

module.exports = WeappService
