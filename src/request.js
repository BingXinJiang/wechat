/**
 * Created by jiangsong on 2017/10/13.
 */

var https = require('https'),
    APP = require('./config'),
    querystring = require('querystring'),
    url = require('url');
    URL = require('./url');

module.exports = {

    createMenu:function (body) {
        post(URL.MenuAPI,body);
    },

    checkMenu:function () {
        get(URL.CheckMenuAPI);
    },

    delMenu:function () {
        get(URL.DelMenuAPI);
    },

    createPersonMenu:function (body) {
        post(URL.PersonMenuAPI,body);
    },
    
    delPersonMenu:function (body) {
        post(URL.DelPersonMenuAPI,body)
    },
    
    checkPersonMenu:function (body) {
        post(URL.CheckPersonMenuAPI,body);
    }

}

function get(path) {
    var urlObj = url.parse(path);
    var opt = {
        hostname:urlObj.hostname,
        method:'GET',
        path:urlObj.path,
        headers:{
            'Content-Type': 'application/json',
            'accept':'application/json'
        },
        timeout:60*1000
    }

    var req = https.request(opt,function (res) {

        var buffers = [];
        res.setEncoding('utf8');
        res.on('data',function (chunk) {
            buffers.push(chunk);
        })

        res.on('end',function () {
            var data = buffers.toString();
            var dataObj = JSON.parse(data);
            console.log('data:',buffers.toString());
            console.log('dataObj:',dataObj);
        })

    }).on('error', function(err) {
        console.log('error ' + err);
    })

    req.end();
}

function post(path,body) {

    var urlObj = url.parse(path);

    var opt = {
        hostname:urlObj.hostname,
        method:'POST',
        path:urlObj.path,
        headers:{
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(body)),
            'accept':'application/json'
        },
        timeout:60*1000
    }

    console.log('body:',JSON.stringify(body));

    var req = https.request(opt,function (res) {

        var buffers = [];
        res.setEncoding('utf8');
        res.on('data',function (chunk) {
            buffers.push(chunk);
        })

        res.on('end',function () {
            var data = buffers.toString();
            var dataObj = JSON.parse(data);
           console.log('data:',buffers.toString());
           console.log('dataObj:',dataObj);
        })

    }).on('error', function(err) {
        console.log('error ' + err);
    })

    req.write(JSON.stringify(body));
    req.end();

}