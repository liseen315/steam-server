/**
 * token模块全部100开头预留两位
 */
const STATUS_CODE = {
  SUCCESS: 0,
  FAIL: -1,
  TOKEN_NOTFOUND: 10001, // 没token
  TOKEN_EXP: 10002, // token过期
  TOKEN_ERROR: 10003 // token错误
}
module.exports = {
  STATUS_CODE
}
