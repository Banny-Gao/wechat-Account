const getToken = require('./get_access_token'),
  getTicket = require('./get_jsapi_ticket'),
  getSign = require('./getSign'),
  getWechatAuth = require('./getAuth'),
  handleWechatMsg = require('./handleMsg')

module.exports = {
  getToken,
  getTicket,
  getSign,
  getWechatAuth,
  handleWechatMsg
}