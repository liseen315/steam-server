const BaseController = require('../core/base_controller')
const uuidv1 = require('uuid/v1')
class WeUserController extends BaseController {
  async login () {
    const { code, userInfo } = this.ctx.request.body
    const sessionData = await this.service.weUser.code2session(code)
    if (!sessionData) {
      this.fail('登录失败')
      return
    }

    let targetUserId = await this.ctx.model.WeUser.getUserIdByopenId(
      sessionData.data.openid
    )

    // 从来没登录过的认为是注册
    if (!targetUserId) {
      targetUserId = await this.ctx.model.WeUser.addUser({
        user_id: uuidv1(),
        nick_name: userInfo.nickName,
        gender: userInfo.gender,
        avatar: userInfo.avatarUrl,
        city: userInfo.city,
        country: userInfo.country,
        open_id: sessionData.data.openid
      })
    } else {
      const newRecord = await this.ctx.model.WeUser.updateLoginDate(
        targetUserId
      )

      this.ctx.helper.checkUpdate(newRecord)
    }

    const newUserInfo = await this.ctx.model.WeUser.getUserInfo(targetUserId)

    const { openid: openId, session_key } = sessionData.data || {}

    if (openId) {
      const result = JSON.stringify({ openId, session_key })
      // 保存openId和session_key到redis 暂时定10分钟过期
      await this.app.redis.get('default').setex(targetUserId, 600, result)
    } else {
      return this.fail('登录失败')
    }

    this.success({ token: targetUserId, userInfo: newUserInfo })
  }
}

module.exports = WeUserController
