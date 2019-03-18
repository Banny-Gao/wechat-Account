const Api = require('./service'),
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  jsonParser = bodyParser.json(),
  {
    promiseWraper
  } = require('./util/promise.tool'),
  //创建application/x-www-form-urlencoded
  urlencodedParser = bodyParser.urlencoded({
    extended: false
  });
app.use(urlencodedParser)
app.use(express.static('public'))

const {
  getWechatAuth,
  handleWechatMsg
} = Api

//验证token
app.get('/testToken', getWechatAuth)

app.post('/', handleWechatMsg);

//获取jssdk的config配置
app.post('/api/getConfig', jsonParser, function (req, res) {
  const {
    getToken, //获取access_token
    getTicket, //获取ticket
    getSign //获得签名
  } = Api, {
    url
  } = req.body
  getToken().then(response => {
    const {
      access_token
    } = response
    // console.log(response)
    return promiseWraper(access_token)
  }).then(params => {
    return getTicket(params).then(response => {
      const {
        ticket
      } = JSON.parse(response)
      return promiseWraper(ticket)
    })
  }).then(ticket => {
    const config = getSign(ticket, url)
    console.log(config)
    res.json(config)
  })
})


const server = app.listen(80, '0.0.0.0', function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})