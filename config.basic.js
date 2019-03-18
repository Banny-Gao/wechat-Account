const config = {
  "token": "weixin",
  "appID": "wx7bd54a*******11b8e2",
  "appSecret": "0b13a8d*****41dcccd10c209877d",
  "apiDomain": "https://api.weixin.qq.com/",
  "apiURL": {
    "accessTokenApi": "%scgi-bin/token?grant_type=client_credential&appid=%s&secret=%s",
    "createMenu": "%scgi-bin/menu/create?access_token=%s",
    "ticketApi": "%scgi-bin/ticket/getticket?access_token=%s&type=jsapi"
  }
}
module.exports = config