---
title: nodejs链接ldap
date: 2017-08-18 10:42:27
tags: [nodejs, ldap]
categories: study
description: nodejs链接LDAP
---

## NodeJS 链接LDAP

> LDAP是一个轻量级的目录访问协议。关于LDAP更多解读，参考:
http://www.openldap.org/
https://baike.baidu.com/item/LDAP/2875565?fr=aladdin

通过以上，了解基本概念、：DN、basic_dn.....

### ldap认证过程
局域网内用户若需要统LDAP进行认证，则需要对应的应用服务接入LDAP。(假设LDAP服务已建立)

使用 `NodeJS` 来进行访问LDAP服务器，进行用户基本信息验证和校验。

其中，NodeJS有一个第三分包叫 `ldapjs` 封装了与ldap进行通信的方法。


```bash
官方网站：

http://ldapjs.org/

https://github.com/mcavage/node-ldapjs
```

通过LDAP验证用户合法性过程：

1. 前端获取用户输入的用户名+密码

2. 将用户名和密码传给后端上层接口 接口做基本校验(如：验证码是否ok等)

3. 上层接口使用具有管理权限的口令进行 `bind` 操作 （会通过 `LDAP` 扩展=> ldapjs ）

4. `bind` 操作成功后, 并根据用户名获取该用户的 `DN` ( `search` 操作， Search不到该用户返回错误，反之返回该用户的所有信息)

5. 根据第三步获取dn， 加上用户的密码再次进行 `bind`, LDAP服务器会根据密码是否ok返回结果

6. 接口处理完毕返回对应信息给前端


### 进行封装

```js
// ldap.js
const ldap = require('ldapjs');
// config文件里配置LDAP相关信息
const ldapConfig = require('../config/config');

var ldapAuth = {
    /**
     * username: 用户名
     * userPassword: 用户输入的密码
     * 
     * 
     */
    loginAuth: function(username, userPassword) {

        let client = ldap.createClient({
            url: ldapConfig.url
        });
        let options = {
            filter: '(sAMAccountName=' + username + ')', //查询条件过滤器, 查找username该用户节点
            scope: 'sub', //查询范围
            timeLimit: 500 // 超时
        };

        return new Promise(function(resolve, reject) {
            client.bind(ldapConfig.adminDn, ldapConfig.adminPwd, function(err, matched) {
                client.search(ldapConfig.bashDn, options, function(err, res2) {
                    res2.on('searchEntry', function(entry) {

                        //获取查询的对象
                        let user = entry.object;
                        //var userText = JSON.stringify(user, null, 2);
                        //console.log("查询的用户信息如下:\r\n" + userText);
                        //获取user DN
                        userDN = user.dn;
                        //校验该用户的密码是否ok
                        client.bind(userDN, userPassword, function(err, res) {
                            if (err) {
                                //console.log('验证失败！用户名或密码错误');
                                reject(err);
                            } else {
                                //console.log("验证通过，success！！！" + res);
                                resolve(user);
                            }
                        });

                    });

                    res2.on('searchReference', function(referral) {
                        //console.log('referral: ' + referral.uris.join());
                    });

                    //查询错误事件
                    res2.on('error', function(err) {
                        console.error('error: ' + err.message);
                        //unbind操作，必须要做
                        client.unbind();
                    });

                    //查询结束
                    res2.on('end', function(result) {
                        //console.log('search status: ' + result.status);
                        //unbind操作，必须要做
                        client.unbind();
                    });

                });
            });
        });
    }
};

module.exports = ldapAuth;
```

```js
//config.js
'use strict';

var ldapConfig = {
    url: "ldap://xx..xxx:389/",
    adminDn: "admin name",
    adminPwd: "admin password",
    bashDn: "basic DN"
};

module.exports = ldapConfig;
```


注意到，`ldap.js`组件导出的是一个 `ldapAuth` 对象， 该对象封装了 `loginAuth` 方法 且该方法返回的是一个 `Promise`对象。

那么如何使用呢？

```js
var ldapAuth = require('../components/ldap');

var verify = async function() {
    try {
        let res = await ldapAuth.loginAuth("testName", "testPwd");
        //console.log("======================");
        console.log(res);
    } catch (err) {
        console.log("用户名或密码不正确!");
    }
};

verify();

```

测试及结构如下图：

<div align="center">
    <img src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/ldapAuthTest.png" width="75%" height="80"></img>
</div>

`POSTMAN` 测试：

<div align="center">
    <img src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/postmantest.png" width="75%" height="80"></img>
</div>

### 参考

http://www.jb51.net/article/72954.htm

`async/await` 

https://cnodejs.org/topic/5640b80d3a6aa72c5e0030b6

http://www.ruanyifeng.com/blog/2015/05/async.html

http://www.runoob.com/nodejs/nodejs-express-framework.html

