'use strict';

/**
 * Controller 和 Service 抛出异常处理
 * @author ruiyong-lee
 * @returns {function} function
 */
module.exports = () => {
  return async function errorHandler(ctx, next) {
    let transaction;
    try {
      await next();

      transaction = await ctx.app.transition();

      // 如果有事务自动提交
      if (transaction) {
        transaction.commit();
        ctx.app.deleteTransition();
      }
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;

      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error =
        status === 500 && ctx.app.config.env === 'prod'
          ? '系统内部错误'
          : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        code: -1, // 这地方还没读取配置
        message: error,
      };

      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;

      // 如果有事务自动回滚
      if (transaction) {
        transaction.rollback();
        ctx.app.deleteTransition();
      }
    }
  };
};
