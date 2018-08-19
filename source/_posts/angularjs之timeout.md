---
title: angularjs之timeout
date: 2017-08-20 15:51:13
tags: [angularjs, js]
categories: program
description: AngularJS的$timeout
---

## AngularJS之$timeout

### 问题

需求：用户登录时，如果用户名或密码输入框输入错误，予以相应的错误提示并将错误提示实现类似于`jQuery`的 `fadeOut()`效果，几秒后自动消失。

使用 `ng-show` 或 `ng-if` 来显示对应错误，这2个ng指令属性默认值为`false`。

当`controller` work起来触发了相应的条件时，controller会将对应的 `ng-show` 或 `ng-if` 值置为 `true`, 并给对应的错误信息变量赋值.


### 过程+结果

*html部分*
```html
<p class="error-info">
    <span class="text-error text-danger" ng-show="isError">{{errorInfo}}</span>
</p>

```

> #双大括号在某些条件不友好，可使用 `ng-cloak` 等
参考：
http://lomo.space/2016/12/21/angular-study-note/#Angular表达式

*js部分*
```js
var loginAPP = angular.module("loginApp", ['loginModel']);
loginAPP.controller('loginAppController', function($scope, $http, loginService) {
    $scope.loginLdap = function() {
        var username = $scope.username;
        var password = $scope.password;
        //影藏错误信息, 使用setTimeout简单实现fadeOut功能（忽略动画）
        setTimeout(function() {
            $scope.isError = false;
            //$scope.errorInfo = "";
            $scope.$apply(); // important !!!
            }, 3000);
        }
        if (username === undefined || password === undefined) {
            $scope.isError = true;
            $scope.errorInfo = "用户名/密码不能为空！";

        }

    };
});
```

当触发条件后，JS手动修改的model `{{isError}}` 的值，model被修改后并未通知AngulaJS, 所以ng 不会主动去update view, 需要手动调用 `$scope.$apply();` .

`$scope.$apply()` 这种无参形式调用，不推荐！应该将对应的函数作为一个参数传给`$apply()`，Angular的 `$apply()`会将传入的参数function包装进 `try catch` 块儿中，当参数函数抛异常时就能被catch块儿捕获。

修改后：
```js
 $timeout(function() {
    $scope.isError = false;
}, 2000);
```

总结：当使用原生JS或其它非AngularJS内置函数/方法更新了Model后都需要手动调用 `$apply()` 以此来通知Angular的 `watcher` , watcher 被触发后，Angular就会检测scope模型model。

参考：
http://blog.csdn.net/dm_vincent/article/details/38705099
