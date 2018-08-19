---
title: angular  request
date: 2016-11-07 23:10:30
tags: [angularjs]
categories: study
description: AngularJS使用$http与后台请求formData问题
---

## AngularJS使用$http请求传递数据

> $http服务用于与后端进行数据交互/获取数据然后在UI渲染等. AngularJS核心服务 `$http`服务, 可认为相当于JQuery中的Ajax.

### 用法
V1.5版本**以下**:
```js
$http.get("url").success(function (res){
    //do sth... for success response
}).error(function (res){
    //do sth... for fail response
});
//Or
var config = {
    url: "url",
    headers: {...},
    data: "data"
};
$http.post(config).success(function s(){
    //...
}).error(function (f){
    //...
});
```

V1.5版本以上写法：

```js 
//一般写法:
//[类似于JQuery中的Ajax写法]
$http({
    method: 'GET',
    url: 'http://domain.com/path'
}).then(function successCallBack(){
    //请求成功执行的方法
}, function failCallBack(){
    //请求失败执行的方法
} );

//或
//将请求方式、API、传递的DATA、以及一些请求设置封装到req对象中.
var req = {
 method: 'POST',
 url: 'http://example.com',
 headers: {
   'Content-Type': undefined
 },
 data: { test: 'test' }
}
//V1.5 的.then 方法
$http(req).then(function(){...}, function(){...});
```

### 全部http请求

```js
$http.get
$http.head
$http.post
$http.put
$http.delete
$http.jsonp
$http.patch
```
参考：
> https://docs.angularjs.org/api/ng/service/$http


### formData问题
> 默认情况下使用post请求向后端传递数据
```js
<script>
        var app = angular.module("httpDemo", []);
        app.controller("httpDemoController", function($scope, $http) {
            $scope.data = {
                name: "lomoa",
                age: 22,
                sex: "male"
            };
            $http({
                method: "POST",
                data: $scope.data,
                url: "./data.json"
            }).then(function successFn(response) {
                $scope.names = response.data.sites;
            }, function failFn(response) {
                //do nothing here if fail
            });
        });
</script>
```

Charles抓包查看Http请求传递的数据格式为JSON Text，如下图所示：

<div align="center">
    <img src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/json-default.png" width="75%" height="" />>
</div>

思考🤔：
> 这样以来的话，如果后端接口未改变，那么前端使用AngularJS的$http服务请求API传递数据就会出现问题，导致后端接受不到JSON数据.

例如, 后端PHP开发的Restful API, 部分代码如下:
```php
if (isset($_POST['login'])) {

        $login = $_POST['login'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $addr = getEnv("REMOTE_ADDR");

        $result = mysqli_query($conn, "SELECT * FROM users WHERE email = '" . $email. "' and password = '" . md5($password) . "'");

        if ($row = mysqli_fetch_assoc($result)) {
         
          $u = new \generateUUID\Uuid($addr);
          $uuid = $u -> uuid();
          //.....
          //....
        }
}
// 这样的话，$_POST就接受不到来自前端传过来的非formData形式的数据
```

此时在AngularJS应用中，需要将传输的JSON数据格式转为Formdata格式(否则，就修改后端接口? 呵呵🙄)


针对此问题，有2种解决方案(个人已知!)

方案1:

使用jQuery的$.param序列化函数.

对$http请求中的 `$scope.data` 直接使用 `$.param` 函数序列化data对象即可.
```js
app.controller('httpDemoController', function($scope, $http) {
	$scope.data = {
			name: 'lomo',
			age: 25,
			sex: 'male',
			height: '1980'
		},
	$http({
		method: 'POST',
		data: $.param($scope.data),
		headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
		url: './data.json'
	}).then(function successCallback(response) {
			$scope.names = response.data.sites;
		}, function errorCallback(response) {
			// 请求失败执行代码
	});
  
});
```
> 此种方法需要引入jQuery类库，依据情况决定是否有必要为了使用这个函数而引入该库(通常不会!), 如果项目其它多处也需要使用jQuery的其它功能，那么就可以，方便使用。

> 此外，还需要在请求中设置`headers`, `headers : { 'Content-Type': 'application/x-www-form-urlencoded' }` 这样，嗯。就是酱紫😯。

方案2:

手动序列化data对象.

```js
<script>
        var app = angular.module("httpDemo", []);
        app.service('params', function() {
            this.jsonToString = function(obj) {
                var query = '',
                    name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null)
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }

                return query.length ? query.substr(0, query.length - 1) : query;

            }
        });
        app.controller("httpDemoController", function($scope, $http, params) {
            $scope.data = {
                name: "lomoa",
                age: 22,
                sex: "male"
            };
            $http({
                method: "POST",
                data: params.jsonToString($scope.data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: "./data.json"
            }).then(function successFn(response) {
                $scope.names = response.data.sites;
            }, function failFn(response) {
                //do nothing here if fail
            });
        });
    </script>
```

>  **headers必须要设置，无论是方案1还是方案2** !!!

抓包查看请求传递的参数:

<div align="center">
    <img src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/json-formdata.png" width="75%" height="" />>
</div>

方案2 完整Demo
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta property="og:site_name" content="Demo" />
    <meta property="og:type" content="demo">
    <meta property="og:author" content="admin@lomo.space">
    <meta property="og:publisher" content="Wechat@Lomo" />
    <meta property="og:masterEmail" content="lomo@lomo.space" />

    <title>HTTP请求传递参数问题</title>

    <script src="./lib/angular-1.6.3.min.js"></script>
</head>

<body>
    <div class="demo" ng-app="httpDemo" ng-controller="httpDemoController">
        <ul>
            <li ng-repeat="x in names">
                {{x.Name + ', ' + x.Country}}
            </li>
        </ul>
    </div>
    <script>
        var app = angular.module("httpDemo", []);
        app.service('params', function() {
            this.jsonToString = function(obj) {
                var query = '',
                    name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null)
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }

                return query.length ? query.substr(0, query.length - 1) : query;

            }
        });
        app.controller("httpDemoController", function($scope, $http, params) {
            $scope.data = {
                name: "lomoa",
                age: 22,
                sex: "male"
            };
            $http({
                method: "POST",
                data: params.jsonToString($scope.data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: "./data.json"
            }).then(function successFn(response) {
                $scope.names = response.data.sites;
            }, function failFn(response) {
                //do nothing here if fail
            });
        });
    </script>
</body>
</html>
```


### 其它 

使用jQuery的高版本(带Promise的) `ajax`请求，需要将参数以Form(key->value)形式请求时，需要添加一个参数。默认是json形式 即：`platform=1&channelType=22a` (抓包或浏览器开发者工具查看到的都是这种形式)

修改为`Form Data`形式: 添加一个参数 `headers`, 然后再次请求查看浏览器 `XHR`即可看到接口请求时携带的 `Form Data`形式的参数。


```js
var data = {
    a: 112,
    b: 344,
    c: "xx"
};

$.ajax({
    url: xx,
    type: 'POST',
    data: data
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // ....
    // ....
});

```