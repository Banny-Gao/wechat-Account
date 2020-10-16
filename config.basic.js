const config = {
  "token": "weixin",
  "appID": "wx4292751810bff506",
  "appSecret": "8e37892dae7002953b4f002266f30f94",
  "apiDomain": "https://api.weixin.qq.com/",
  "apiURL": {
    "accessTokenApi": "%scgi-bin/token?grant_type=client_credential&appid=%s&secret=%s",
    "createMenu": "%scgi-bin/menu/create?access_token=%s",
    "ticketApi": "%scgi-bin/ticket/getticket?access_token=%s&type=jsapi"
  }
}
module.exports = config