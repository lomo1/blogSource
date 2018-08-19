---
title: options request
date: 2016-08-24 11:47:26
tags: [js, cors]
categories: essay
description: 前端跨域与options请求
---

## 跨域与http请求之options

### 跨域/跨源

> 起始

同源策略：

> Same Origin Policy, 同源策略是一种约定，是浏览器最核心、最新基本的安全功能。Web是构建在同源策略基础之上，而浏览器是针对同源策略的一种实现。【From <a href="https://baike.baidu.com/item/%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5/3927875?fr=aladdin">百科</a>】

> 同源策略也是一种同来隔离潜在恶意文件的一种关键的安全机制. 【From <a href="https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy">MDN</a>】

同源/同域：
```bash
•协议相同
•端口相同
•域名相同
```

其它的可能存在嵌入跨域资源的 `HTML` 标签：

|标签🏷 |示例 | 说明|
| :--| --: | --:|
|script| script src="..."></script> |标签嵌入跨域脚本。语法错误信息只能在同源脚本中捕捉到 |
|link | link rel="stylesheet" href="..."> |标签嵌入CSS。由于CSS的松散的语法规则，CSS的跨域需要一个设置正确的Content-Type消息头 |
|img | img src="...."> | 支持的图片格式包括PNG,JPEG,GIF,BMP,SVG,...|
|video/audio | video src="...." /> | 多媒体资源 |
|object/embed/applet| | |
|frame/iframe| frame src="..."></frame> |站点可以使用X-Frame-Options消息头来阻止这种形式的跨域交互 |

因为 `同源策略` 的原因，通常情况下，浏览器端进行 `Ajax` 请求时只能进行同源请求(即：当前域下的Ajax请求只能请求当前域对应的后端接口/资源)

#### 跨域特点/造成的问题

通常跨域会有一下特点：
```bash
•跨域是浏览器同源策略限制，所以在浏览器之外是没有跨域问题的，所以有时候我们用Charles等抓包工具能够看到返回，但实际上是有跨越问题的;

• 表单(form)提交是没有跨域限制的;

•跨域导致Cookie、LocalStorage 和 IndexDB 无法读取；DOM无法获得；AJAX无法成功请求等; [存储在浏览器中的数据，如localStorage和IndexedDB，以源进行分割。每个源都拥有自己单独的存储空间，一个源中的Javascript脚本不能对属于其它源的数据进行读写操作]
跨域并非浏览器限制了发起跨站请求，而是跨站请求可以正常发起，但是返回结果被浏览器拦截(通常在打开开发者模式下的控制台可以看到 xxx origin not allowed ...这类红色error 信息)。当然也有些特例，有些浏览器不允许从HTTPS的域跨域访问HTTP，
```

#### 跨域解决方案

```bash
•JSONP
•CORS

•window.name
•document.domain
•location.hash
•window.postMessage
•flash
```

最常用的就前2中 `JSONP` 和 `CORS` 了。

##### JSONP解决跨域

作用： 实现跨域读取数据。

`JSONP`的全英文：`JSON with Padding`,  单次`padding`的中译文：衬垫、衬料；废话；赘语。 在此处直译为 衬垫比较接近其本意，那么就可以译为：一个附加性的、陪衬性的JSON。

一般情况下，我们在自己的项目中引用其他的、第三方的或是CDN上的JS等脚本资源时不会存在跨域(源)问题，可以自由加载并执行不同域名下的脚本。

前端
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>JSONP</title>
</head>
<body>
    <div id="divCustomers"></div>
    <script type="text/javascript">
        function callbackFunction(result)
                {
                    var html = '<ul>';
                    for(var i = 0; i < result.length; i++)
                    {
                        html += '<li>' + result[i] + '</li>';
                    }
                    html += '</ul>';
                    document.getElementById('divCustomers').innerHTML = html;
                }
    </script>
<script type="text/javascript" src="http://www.xxx/xxx/xx/jsonp.php?jsoncallback=callbackFunction"></script>
</body>
</html>
```

`http://www.xxx/xxx/xx/jsonp.php?jsoncallback=callbackFunction` 返回数据
```json
callbackFunction(["customername1","customername2"])
```

在前端页面里首先预定义了一个函数名为： `callbackFunction`, 当加载脚本`\<script type="text/javascript" src="http://www.xxx/xxx/xx/jsonp.php?jsoncallback=callbackFunction"></script>`完成后，返回的就是如上数据，那么此时我们预定义的这个函数 `callbackFunction` 就会被调用，同时返回的数据 `["customername1","customername2"]` 被当做这个函数的参数传入并执行该函数。


浏览器执行 脚本 `\<script type="text/javascript" src="http://www.xxx/xxx/xx/jsonp.php?jsoncallback=callbackFunction"></script>` 时回去请求这个资源并向后台传递了一个参数 `jsoncallback` 其value为 `callbackFunction`。

假设后端为PHP
```php
<?php
    header('Content-type: application/json');
    //获取回调函数名 -> callbackFunction
    $jsoncallback = htmlspecialchars($_REQUEST ['jsoncallback']);
    //返回给客户端的 json数据
    $json_data = '["customername1","customername2"]';
    //输出jsonp格式的数据
    echo $jsoncallback . "(" . json_encode($json_data) . ")";
?>
```

这样浏览器执行 `script` 脚本完毕后就可以获取到响应的数据，然后去渲染等.


> 使用JSONP模式的重要前提： 前后端要 **事先约定好** 包裹的函数名即callback名称; 且JSON的请求方式只能为 **GET** 请求; 同时若不对传递的包裹函数变量jsoncallback进行转义的话是很容易造成XSS攻击

##### CORS解决跨域

> CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）；允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。

详细参考：

http://www.ruanyifeng.com/blog/2016/04/cors.html




#### restful API

通常有 `PUT` `GET` `POST` `DELETE` `HEAD` `OPTIONS`

```bash
REST中又提出了几种其它类型的请求方式，汇总起来有六种：GET、POST、PUT、DELETE、HEAD、OPTIONS。

前四种，正好与CRUD操作对应：GET（查）、POST（增）、PUT（改）、DELETE（删）.

GET : 从服务器取出资源（一项或多项）
POST：在服务器新建一个资源
PUT：在服务器更新资源（客户端提供完整资源数据）
DELETE：从服务器删除资源
HEAD : 从服务器获取报头信息（不是资源）

GET、HEAD和OPTIONS均被认为是安全的方法，而PUT、POST、DELETE等请求都是不安全的（会修改数据).
```

说说其中的`options` 请求：

服务器端已支持跨域请求，但是浏览器端进行跨域请求时，会首先发出options请求，服务端会返回相应的response并并告诉浏览器是否允许跨域请求(access-control-allow-origin头为*或者和当前域名一致的话，才会进入第二段的真正请求)，允许，那浏览器就接着进行请求，否则就抛出错误(xxx. Xmlhttprequest not allowed 。。。。)
 
