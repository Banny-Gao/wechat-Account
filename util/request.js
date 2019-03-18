const https = require('https'),
  qs = require('qs'),
  urlUtil = require('url') //引入 url 模块


const get = (url, params = {}) => {
  let query = qs.stringify(params)
  if (Object.keys(params).length !== 0) url += `?${query}`
  return new Promise((resolve, reject) => {
    https.get(url, function (res) {
      var buffer = [],
        result = ""
      //监听 data 事件
      res.on('data', function (data) {
        buffer.push(data)
      });
      //监听 数据传输完成事件
      res.on('end', function () {
        result = Buffer.concat(buffer).toString('utf-8')
        //将最后结果返回
        resolve(result)
      })
    }).on('error', function (err) {
      reject(err);
    })
  })
}

const post = (url, content = {}) => {
  ContentType = 'application/x-www-form-urlencoded'
  content = qs.stringify(content)

  return new Promise(function (resolve, reject) {
    //解析 url 地址
    const urlData = urlUtil.parse(url),
      //设置 https.request  options 传入的参数对象
      options = {
        //目标主机地址
        hostname: urlData.hostname,
        //目标地址 
        path: urlData.path,
        //请求方法
        method: 'POST',
        //头部协议
        headers: {
          'Content-Type': ContentType,
          'Content-Length': content.length
        }
      }

    const req = https.request(options, function (res) {
        var buffer = [],
          result = ''
        //用于监听 data 事件 接收数据
        res.on('data', function (data) {
          buffer.push(data)
        });
        //用于监听 end 事件 完成数据的接收
        res.on('end', function () {
          result = Buffer.concat(buffer).toString('utf-8');
          resolve(result);
        })
      })
      //监听错误事件
      .on('error', function (err) {
        reject(err)
      });
    //传入数据
    req.write(content)
    req.end()
  });
}

module.exports = {
  get,
  post
}