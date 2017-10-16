var http = require('http'),
    querystring = require('querystring'),
	crypto = require('crypto'),
    cp = require('child_process'),
	WeChat = require('./src/request'),
	Msg = require('./src/msg');

global.WEIXIN_ACCESS_TOKEN = '';

http.createServer(function(req,res){


	Msg(req,res);
	
	
}).listen(3001);

/**
 * 定时获取accessToken
 * */
function getToken() {

    var child = cp.fork(__dirname+'/src/getToken.js')
	child.on('message',function (data) {
		if(data){
			console.log('access_token:',data.access_token);
			global.WEIXIN_ACCESS_TOKEN = data.access_token;
		}
    })
}
// getToken();
/**
 * 创建菜单
 * */

function createMenu() {

	var menuBody = {
		button:[
			{
				type:'click',
				name:'click',
				key:'01'
			},
			{
                name:'菜单1',
                sub_button:[
					{
						type:'view',
						name:'view',
						url:'http://www.baidu.com',
						key:'02'
					},
					{
						type:'scancode_push',
						name:'scancode_push',
						key:'03'
					},
					{
						type:'scancode_waitmsg',
						name:'scancode_waitmsg',
						key:'04'
					},
					{
                        type:'pic_sysphoto',
                        name:'pic_sysphoto',
                        key:'05'
					},
					{
                        type:'pic_photo_or_album',
                        name:'pic_photo_or_album',
                        key:'06'
					}
				]
			},
			{
				name:'菜单2',
				sub_button:[
                    {
                        type:'pic_weixin',
                        name:'pic_weixin',
                        key:'07'
                    },
                    {
                        type:'location_select',
                        name:'location_select',
                        key:'08'
                    }
				]
			}
		]
	}

	WeChat.createMenu(menuBody);
}
// createMenu();

/**
 * 查询菜单
 * */
function checkMenu() {
	WeChat.checkMenu();
}
// checkMenu();

/**
 * 删除菜单
 * */
function delMenu() {
	WeChat.delMenu();
}
// delMenu();

/**
 * 创建个性化菜单
 * */
function createPersonMenu() {

	var menuBody = {
		button:[
			{
				type:'click',
				name:'click',
				key:'01'
			},
			{
				name:'个性菜单3',
				sub_button:[
					{
						type:'view',
						name:'view',
						url:'http://www.baidu.com',
						key:'02'
					},
					{
						type:'scancode_push',
						name:'scancode_push',
						key:'03'
					},
					{
						type:'scancode_waitmsg',
						name:'scancode_waitmsg',
						key:'04'
					},
					{
						type:'pic_sysphoto',
						name:'pic_sysphoto',
						key:'05'
					},
					{
						type:'pic_photo_or_album',
						name:'pic_photo_or_album',
						key:'06'
					}
				]
			},
			{
				name:'个性菜单4',
				sub_button:[
					{
						type:'pic_weixin',
						name:'pic_weixin',
						key:'07'
					},
					{
						type:'location_select',
						name:'location_select',
						key:'08'
					}
				]
			}
		],
		matchrule:{
			sex:1,
			client_platform_type:2
		}
	}
	WeChat.createPersonMenu(menuBody);
}
// createPersonMenu();

/**
 * 删除个性菜单
 * */
function delPersonMenu() {
	var body = {
		menuid:'526767362'
	}
	WeChat.delPersonMenu(body);
}
// delPersonMenu();

/**
 * 个性化菜单的匹配结果
 * */
function checkPersonMenu() {
	var body = {
		user_id:'kudanderensheng'
	}
	WeChat.checkPersonMenu(body);
}
// checkPersonMenu();