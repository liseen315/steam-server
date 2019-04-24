const ignore = require('ignore');
const { STATUS_CODE } = require('../utils/status_code');
module.exports = (options, app) => {
  async function verifyToken(token, app) {
    console.log('---thisapp----', app);
    const verifyResult = await new Promise((resovle, reject) => {
      app.jwt.verify(token, app.jwt.secret, (err, decode) => {
        console.log('----verifyToken---', decode);
        resovle(decode);
      });
    });
  }
  return async function userInterceptor(ctx, next) {
    const authToken = ctx.header.authorization;
    if (authToken) {
      const res = await verifyToken(authToken, app);
    } else {
      ctx.body = { code: STATUS_CODE.LOGIN_FIRST, message: '请登录后进行操作' };
    }
  };
};
