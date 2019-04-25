const { STATUS_CODE } = require('../utils/status_code');
module.exports = (options, app) => {
  async function verifyToken(token, app) {
    return await new Promise((resolve, reject) => {
      app.jwt.verify(token, app.jwt.secret, (err, decode) => {
        if (err) {
          resolve({ verity: false, message: err.message });
        } else {
          resolve({ verity: true, message: decode });
        }
      });
    });
  }
  return async function userInterceptor(ctx, next) {
    const authToken = ctx.header.authorization;
    if (authToken) {
      // 判断redis内的token是否过期
      const notexp = await app.redis.get('default').get(app.config.tokenKey);
      if (notexp) {
        const res = await verifyToken(authToken, app);
        if (res.verity) {
          ctx.locals.userid = res.message.userid;
          await next();
        } else {
          // token 验证失败
          ctx.body = {
            code: STATUS_CODE.TOKEN_ERROR,
            message: '您的账号已在其他地方登录',
          };
        }
      } else {
        ctx.body = { code: STATUS_CODE.TOKEN_EXP, message: 'token过期' };
      }
    } else {
      ctx.body = {
        code: STATUS_CODE.TOKEN_NOTFOUND,
        message: '请登录后进行操作',
      };
    }
  };
};
