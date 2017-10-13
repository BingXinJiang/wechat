/**
 * Created by jiangsong on 2017/10/12.
 */

var fs = require('fs'),
    https = require('https'),
    APP = require('./config');

//公司
var APPID = 'wxa642b5527a06fb43';
var APPSECRET = '8d683388955b173c8d1384553af8b47c';
//家
// var APPID = 'wx654035409e21993f';
// var APPSECRET = 'f6b0d6f10c73460a5bda1d9628f221fb';


var getToken = function () {
    
    https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+APP.APPID+'&secret='+APP.APPSECRET, function(res){
        
        res.on('data', function(data){
            
            var objTo = JSON.parse(data.toString());
            
            var token = objTo.access_token;
            // var expire = objTo.expire_in;
            process.send({access_token:token});

        });

        setTimeout(function () {
            getToken();
        },7000*1000);

    }).on('error', function(err){
        console.error(err);
    });

}

getToken();