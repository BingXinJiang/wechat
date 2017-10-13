var http = require('http'),
 querystring = require('querystring'),
 crypto = require('crypto'),
 cp = require('child_process');

global.WEIXIN_ACCESS_TOKEN = '';

http.createServer(function(req,res){

	var url = req.url;
	url = url.slice(2);
	var urlObj = querystring.parse(url);

	var sortArr = ['jiangsong',urlObj.timestamp,urlObj.nonce].sort();
	var sortStr = sortArr.join('');

	var sha1 = crypto.createHash('sha1');
	sha1.update(sortStr);
	var newSignature = sha1.digest('hex');

	console.log('oldSignature:',urlObj.signature);
	console.log('newSignature:',newSignature);

	res.writeHead(200,{'Content-Type':'text/plain'});
	if(newSignature === urlObj.signature){
		res.end(urlObj.echostr);
	}else{
		res.end('验证错误！');
	}
	
}).listen(3001);

/**
 * 定时获取accessToken
 * */
function getToken() {
	
	console.log('开始执行子进程');
    var child = cp.fork(__dirname+'/src/getToken.js')
	child.on('message',function (data) {
		if(data){
			console.log('access_token:',data.access_token);
			global.WEIXIN_ACCESS_TOKEN = data.access_token;
		}
    })
}

getToken();

