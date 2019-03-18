const {
  token
} = require('../config.basic'),
  getToken = require('./get_access_token'),
  util = require('util'), {
    apiDomain,
    apiURL
  } = require('../config.basic'), {
    post
  } = require('../util/request'),
  menus = require('../static/menus.json')


const getWechatAuth = (req, res) => {
  const {
    echostr,
    signature,
    timestamp,
    nonce
  } = req.query,
    sha1 = require('sha1'),
    oriArray = [token, timestamp, nonce].sort()
  const original = oriArray.join(''),
    scyptoString = sha1(original)
  console.log(signature, scyptoString)
  if (signature == scyptoString) {
    res.send(echostr)
    // 创建自定义菜单
    getToken().then(({
      access_token
    }) => {
      const url = util.format(apiURL.createMenu, apiDomain, access_token)
      post(url, menus).then(res => {
        console.log(res)
      })
    })
  } else {
    res.send(false)
  }
  // next()
}

module.exports = getWechatAuth