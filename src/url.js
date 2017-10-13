/**
 * Created by jiangsong on 2017/10/13.
 */

var token = 'jjflkKkBVXcTS8SBKJw5JMzCvSYu-77wKrNIQ9JzzMBm91oxs4PVlMlaFtv7Z_wZBZeE6JpVkNsfRJCSw_wuskQnTFjrPRSs-JCDLLTDmsKXIgYtOiFNMl_KVwcL5jp4WNYhACAQHS'

module.exports = {

    MenuAPI:'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token ,
    CheckMenuAPI:'https://api.weixin.qq.com/cgi-bin/menu/get?access_token=' + token,
    DelMenuAPI:'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=' + token,

    //个性化菜单
    PersonMenuAPI:'https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=' + token,
    DelPersonMenuAPI:'https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token=' + token,
    CheckPersonMenuAPI:'https://api.weixin.qq.com/cgi-bin/menu/trymatch?access_token=' + token,
    SearchPersonMenuAPI:'',//同 CheckMenuAPI
    DelAllPersonMenuAPI:'', //同 DelMenuAPI

    //获取自定义菜单配置
    MenuConfigAPI:'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=' + token

}