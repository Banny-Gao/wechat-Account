const config = {
  "token": "weixin",
  "appID": "wx1d89b5ff37c0c408",
  "appSecret": "4742606ad6c669de92839f6d0027191c",
  "apiDomain": "https://api.weixin.qq.com/",
  "apiURL": {
    "accessTokenApi": "%scgi-bin/token?grant_type=client_credential&appid=%s&secret=%s",
    "createMenu": "%scgi-bin/menu/create?access_token=%s",
    "ticketApi": "%scgi-bin/ticket/getticket?access_token=%s&type=jsapi"
  }
}
module.exports = config