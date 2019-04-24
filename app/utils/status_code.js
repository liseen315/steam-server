const STATUS_CODE = {
  SUCCESS: 0,
  FAIL: 1,
  LOGIN_FIRST: 50008, // 没token
  TOKEN_EXP: 50012, // token过期
};
module.exports = {
  STATUS_CODE,
};
