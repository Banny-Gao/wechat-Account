const CryptoGraphy = require('../util/cryptoGraphy'),
  config = require('../config.basic'),
  parseString = require('xml2js').parseString

const handleMsg = function (req, res) {
  const buffer = [],
    //实例微信消息加解密
    cryptoGraphy = new CryptoGraphy(config, req);

  //监听 data 事件 用于接收数据
  req.on('data', function (data) {
    buffer.push(data);
  });
  //监听 end 事件 用于处理接收完成的数据
  req.on('end', function () {
    const msgXml = Buffer.concat(buffer).toString('utf-8');
    //解析xml
    parseString(msgXml, {
      explicitArray: false
    }, function (err, result) {
      if (!err) {
        result = result.xml;
        //判断消息加解密方式
        if (req.query.encrypt_type == 'aes') {
          //对加密数据解密
          result = cryptoGraphy.decryptMsg(result.Encrypt);
        }
        const toUser = result.ToUserName, //接收方微信
          fromUser = result.FromUserName //发送仿微信
        let reportMsg = ""; //声明回复消息的变量   

        //判断消息类型
        if (result.MsgType.toLowerCase() === "event") {
          //判断事件类型
          switch (result.Event.toLowerCase()) {
            case 'subscribe':
              //回复消息
              let content = "欢迎关注 hvkcoder 公众号，一起斗图吧。回复以下数字：\n";
              content += "1.你是谁\n";
              content += "2.关于Node.js\n";
              content += "回复 “文章”  可以得到图文推送哦~\n";
              reportMsg = msg.txtMsg(fromUser, toUser, content);
              break;
            case 'click':
              const contentArr = [{
                  Title: "Node.js 微信自定义菜单",
                  Description: "使用Node.js实现自定义微信菜单",
                  PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                  Url: "http://blog.csdn.net/hvkcoder/article/details/72868520"
                },
                {
                  Title: "Node.js access_token的获取、存储及更新",
                  Description: "Node.js access_token的获取、存储及更新",
                  PicUrl: "http://img.blog.csdn.net/20170528151333883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                  Url: "http://blog.csdn.net/hvkcoder/article/details/72783631"
                },
                {
                  Title: "Node.js 接入微信公众平台开发",
                  Description: "Node.js 接入微信公众平台开发",
                  PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                  Url: "http://blog.csdn.net/hvkcoder/article/details/72765279"
                }
              ];
              //回复图文消息
              reportMsg = msg.graphicMsg(fromUser, toUser, contentArr);
              break;
          }
        } else {
          //判断消息类型为 文本消息
          if (result.MsgType.toLowerCase() === "text") {
            //根据消息内容返回消息信息
            switch (result.Content) {
              case '1':
                reportMsg = msg.txtMsg(fromUser, toUser, 'Hello ！我的英文名字叫 H-VK');
                break;
              case '2':
                reportMsg = msg.txtMsg(fromUser, toUser, 'Node.js是一个开放源代码、跨平台的JavaScript语言运行环境，采用Google开发的V8运行代码,使用事件驱动、非阻塞和异步输入输出模型等技术来提高性能，可优化应用程序的传输量和规模。这些技术通常用于数据密集的事实应用程序');
                break;
              case '文章':
                const contentArr = [{
                    Title: "Node.js 微信自定义菜单",
                    Description: "使用Node.js实现自定义微信菜单",
                    PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                    Url: "http://blog.csdn.net/hvkcoder/article/details/72868520"
                  },
                  {
                    Title: "Node.js access_token的获取、存储及更新",
                    Description: "Node.js access_token的获取、存储及更新",
                    PicUrl: "http://img.blog.csdn.net/20170528151333883?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                    Url: "http://blog.csdn.net/hvkcoder/article/details/72783631"
                  },
                  {
                    Title: "Node.js 接入微信公众平台开发",
                    Description: "Node.js 接入微信公众平台开发",
                    PicUrl: "http://img.blog.csdn.net/20170605162832842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaHZrQ29kZXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast",
                    Url: "http://blog.csdn.net/hvkcoder/article/details/72765279"
                  }
                ];
                //回复图文消息
                reportMsg = msg.graphicMsg(fromUser, toUser, contentArr);
                break;
              default:
                reportMsg = msg.txtMsg(fromUser, toUser, '没有这个选项哦');
                break;
            }
          }
        }
        //判断消息加解密方式，如果未加密则使用明文，对明文消息进行加密
        reportMsg = req.query.encrypt_type == 'aes' ? cryptoGraphy.encryptMsg(reportMsg) : reportMsg;
        //返回给微信服务器
        res.send(reportMsg);

      } else {
        //打印错误
        console.log(err);
      }
    });
  });
}
module.exports = handleMsg