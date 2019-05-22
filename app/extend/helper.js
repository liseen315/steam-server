const crypto = require('crypto')
module.exports = {
  /**
   * 生成token
   * @param {*} data
   */
  createToken (data) {
    // this 是 helper 对象，在其中可以调用其他 helper 方法
    // this.ctx => context 对象
    // this.app => application 对象
    const token = this.app.jwt.sign(data, this.app.config.jwt.secret)
    return token
  },

  /**
   * 解析weixin session
   * @param {*} sessionKey
   * @param {*} encryptedData
   * @param {*} iv
   */
  async decryptUserInfoData (sessionKey, encryptedData, iv) {
    let decoded = ''
    try {
      const _sessionKey = Buffer.from(sessionKey, 'base64')
      encryptedData = Buffer.from(encryptedData, 'base64')
      iv = Buffer.from(iv, 'base64')
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', _sessionKey, iv)
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true)
      decoded = decipher.update(encryptedData, 'binary', 'utf8')
      decoded += decipher.final('utf8')
      const userInfo = JSON.parse(decoded)
      if (userInfo.watermark.appid !== this.app.config.appid) {
        return null
      }
      return userInfo
    } catch (err) {
      return null
    }
  },

  JsonParse (str) {
    try {
      return JSON.parse(str)
    } catch (e) {
      return {}
    }
  },

  /**
   * 检测update
   * @param {*} arr
   * @param {*} message
   */
  checkUpdate (arr, message) {
    if (arr.includes(0)) {
      const error = new Error(message || '保存失败，请刷新后重试！')
      error.status = 422
      throw error
    }
  },
  /**
   * 检测删除
   * @param {*} count
   * @param {*} message
   */
  checkDelete (count, message) {
    if (!count) {
      const error = new Error(message || '删除失败，请刷新后重试！')
      error.status = 422
      throw error
    }
  }
}
