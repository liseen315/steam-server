const BaseController = require('../core/base_controller')
const uuidv1 = require('uuid/v1')
class WeUserController extends BaseController {
  async login () {
    const { code, userInfo } = this.ctx.request.body
    const session = await this.service.weUser.code2session(code, userInfo)
    console.log('----session----', session)
    if (!session) {
      this.fail('登录失败')
      return
    }

    let targetUser = await this.ctx.model.WeUser.getUserByopenId(session.openId)
    let targetUserId
    // 从来没登录过的认为是注册
    if (!targetUser) {
      targetUserId = await this.ctx.model.WeUser.addUser({
        user_id: uuidv1(),
        nick_name: session.nickName,
        gender: session.gender,
        avatar: session.avatarUrl,
        city: session.city,
        country: session.country,
        open_id: session.openId
      })
    } else {
      targetUserId = targetUser.user_id
    }

    console.log('---targetUserId--', targetUserId)
  }
}

module.exports = WeUserController
