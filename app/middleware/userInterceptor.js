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
  /**
   * user 拦截器 用于验证jwttoken
   */
  return async function userInterceptor(ctx, next) {
    const authToken = ctx.header.authorization;
    console.log('--userInterceptor---', ctx.url);
    const whiteList = [ '/sysuser/login', '/sysuser/logout' ];
    if (whiteList.includes(ctx.url)) {
      await next();
      return;
    }
    // 这里需要过滤掉login logout白名单的路由
    if (authToken) {
      // 判断redis内的token是否过期
      const notexp = await app.redis.get('default').get(app.config.tokenKey);
      if (notexp) {
        const res = await verifyToken(authToken, app);
        if (res.verity) {
          ctx.locals.userId = res.message.userId;
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
