const BaseController = require('../core/base_controller')

class WeAppController extends BaseController {
  async login () {
    const { code, userInfo } = this.ctx.request.body
    const session = await this.service.weapp.code2session(code, userInfo)
    this.success(session)
  }
}

module.exports = WeAppController
