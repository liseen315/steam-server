/**
 * token模块全部100开头预留两位
 */

const crypto = require('crypto');
const STATUS_CODE = {
  SUCCESS: 0,
  FAIL: -1,
  TOKEN_NOTFOUND: 10001, // 没token
  TOKEN_EXP: 10002, // token过期
  TOKEN_ERROR: 10003, // token错误
};
class WXBizDataCrypt {
  constructor(appId, sessionKey) {
    this.appId = appId;
    this.sessionKey = sessionKey;
  }

  decryptData(encryptedData, iv) {
    const sessionKey = new Buffer(this.sessionKey, 'base64');
    encryptedData = new Buffer(encryptedData, 'base64');
    iv = new Buffer(iv, 'base64');

    try {
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      var decoded = decipher.update(encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');

      decoded = JSON.parse(decoded);
    } catch (err) {
      throw new Error('Illegal Buffer');
    }

    if (decoded.watermark.appid !== this.appId) {
      throw new Error('Illegal Buffer');
    }

    return decoded;
  }
}
module.exports = {
  STATUS_CODE,
  WXBizDataCrypt,
};
