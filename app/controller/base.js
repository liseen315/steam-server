const { Controller } = require('egg');
const { STATUS_CODE } = require('../utils/status_code');
class BaseController extends Controller {
  success(data, msg) {
    this.ctx.body = {
      code: STATUS_CODE.SUCCESS,
      message: msg || 'success',
      body: data,
    };
    this.ctx.status = 200;
  }

  fail(data, msg) {
    this.ctx.body = {
      code: STATUS_CODE.FAIL,
      msg: msg || 'fail',
    };
    this.ctx.state = 200;
  }

  notFound() {}
}

module.exports = BaseController;
