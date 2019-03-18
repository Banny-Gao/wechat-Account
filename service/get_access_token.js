const {
  get
} = require('../util/request'),
  fs = require('fs'),
  util = require('util'), {
    appID,
    appSecret,
    apiDomain,
    apiURL
  } = require('../config.basic'),
  accessTokenJson = require('../static/access_token.json')


const url = util.format(apiURL.accessTokenApi, apiDomain, appID, appSecret),
  getToken = () => new Promise((resolve) => {
    const currentTime = new Date().getTime()
    if (!accessTokenJson.access_token || accessTokenJson.expires_time < currentTime) {
      get(url).then(data => {
        let {
          access_token,
          expires_in
        } = JSON.parse(data)
        expires_time = new Date().getTime() + (parseInt(expires_in) - 200) * 1000
        const o = {
          access_token,
          expires_time
        }
        fs.writeFile('./static/access_token.json', JSON.stringify(o), (err) => {
          if (err) throw err;
          console.log('文件已保存');
        });
        resolve(o)
      })
    } else {
      //将本地存储的 access_token 返回
      resolve(accessTokenJson);
    }
  })

module.exports = getToken;