/**
 * Created by jiangsong on 2017/10/15.
 */

var querystring = require('querystring'),
    crypto = require('crypto'),
    xml2js = require('xml2js');

module.exports = function (req,res) {


    var url = req.url;
    url = url.slice(2);
    var urlObj = querystring.parse(url);

    var sortArr = ['jiangsong',urlObj.timestamp,urlObj.nonce].sort();
    var sortStr = sortArr.join('');

    var sha1 = crypto.createHash('sha1');
    sha1.update(sortStr);
    var newSignature = sha1.digest('hex');

    res.writeHead(200,{'Content-Type':'text/plain'});
    if(newSignature === urlObj.signature){

        //处理消息
        var buffers = [];
        req.on('data',function (chunk) {
            buffers += chunk;
        })
        req.on('end',function () {
            if(buffers.length>0){
                msg(buffers.toString(),function (reXml) {
                    res.end(reXml);
                });
            }
        })

        if(buffers.length<=0){
            res.end(urlObj.echostr);
        }
    }else{
        res.end('验证错误！');
    }
}

// xml 转化为json
function msg(data,callback) {

    xml2js.parseString(data,{ explicitArray : false, ignoreAttrs : true },function (err,json) {

        console.log('--------------------分割线------------------');
        console.log('json:',json);

        reply(function (reXml) {
            callback(reXml);
        })

        //json转化为xml
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(json);

        // console.log('data:',data);
        // console.log('xml:',xml);

    })

}

//回复消息
function reply(callback) {

    var date = (Date.parse(new Date())/1000) + '';

    var reXml = '<xml>'+
        '<ToUserName><![CDATA[o1V441XjncheX1VFl1Azvpizr930]]></ToUserName>'+
        '<FromUserName><![CDATA[gh_68ba12a4503f]]></FromUserName>'+
        '<CreateTime>'+date+'</CreateTime>'+
        '<MsgType><![CDATA[text]]></MsgType>'+
        '<Content><![CDATA[你好]]></Content>'+
        '</xml>';

    console.log('reXml:',reXml);

    callback(reXml);

}