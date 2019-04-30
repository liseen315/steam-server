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

  /**
   * 检测update
   * @param {*} arr
   * @param {*} message
   */
  checkUpdate(arr, message) {
    if (arr.includes(0)) {
      const error = new Error(message || '保存失败，请刷新后重试！');
      error.status = 422;
      throw error;
    }
  },
  /**
   * 检测删除
   * @param {*} count
   * @param {*} message
   */
  checkDelete(count, message) {
    if (!count) {
      const error = new Error(message || '删除失败，请刷新后重试！');
      error.status = 422;
      throw error;
    }
  },
};
