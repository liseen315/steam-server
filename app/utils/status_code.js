const STATUS_CODE = {
  SUCCESS: 0,
  FAIL: 1,
  LOGIN_FIRST: 50008, // 没token
  TOKEN_EXP: 50012, // token过期
  TOKEN_ERROR: 50013, // token错误
};
module.exports = {
  STATUS_CODE,
};
