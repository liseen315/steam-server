'use strict';

const { Controller } = require('egg');
/**
 * 需要重构这里个基础的响应结构
 */
class BaseController extends Controller {
  success(data, status) {
    this.ctx.body = { code: this.ctx.SUCCESS_CODE, data };
    this.ctx.status = status || 200;
  }

  fail(code, message) {
    this.ctx.body = { code, message };
    this.ctx.status = 200;
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController;
