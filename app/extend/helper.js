module.exports = {
  /**
   * 生成token
   * @param {*} data
   */
  createToken(data) {
    // this 是 helper 对象，在其中可以调用其他 helper 方法
    // this.ctx => context 对象
    // this.app => application 对象
    const token = this.app.jwt.sign(data, this.app.config.jwt.secret);
    return token;
  },
};
