---
title: angularjs之directive
date: 2017-09-14 16:22:31
tags: js
categories: study
description: AngularJS指令directive之controller、Link、compile
---

## angularjs之directive

指令directive的控制器controller、链接link和编译compile

`directive`指令：
```html
<div class="row">
    <jdb-introductionhtml></jdb-introductionhtml>
</div>
```

`directive.js`
```js
detailsApp.directive('jdbIntroductionhtml', function(utilsService) {
    return {
        restrict: 'EAC',
        replace: false,
        // scope: {},
        template: '统计周期：本月（<strong>{{beginDate}}~{{endDate}}</strong>）</p><p style=margin-left:40px></p>',
        controller: function($scope) {
            console.log("1.directive -- controller");
            $scope.beginDate = '0902';
            $scope.endDate = "0931";
            console.log(utilsService.getPeriod());
        },
        link: function($scope) {
            console.log("2.directive -- link");
            $scope.beginDate = '0903';
            $scope.endDate = '0909';
        },
        compile: function($scope) {
            console.log("3.directive -- compile");
            $scope.beginDate = '0903';
            $scope.endDate = '0908';
        }
    };
});
```

在chrome `Console` 看到输出顺序：`3.directive -- compile`, `1.directive -- controller`,发现link并未打印。是link function没有执行吗。

了解下它们之间的区别：

<div style="align:center">
    <img src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/20160930141355651.jpg">
</div>


angular对directive指令执行顺序：编译调用compile生成dom对象，再调用link绑定到对应的$scope域(设置事件监听器，监视数据变化和实时的操作DOM.)，最后执行controller；

使用场景：

控制器和link函数可以进行互换;控制器主要是用来提供可在指令间复用的行为，但链接函数只能在当前内部指令中定义行为,无法被其它指令间复用；link函数可以将指令互相隔离开来，而controller则定义可复用的行为以供其它指令来调用该指令；

`link` 对特定元素添加/注册事件、增加功能、使用scope的$watch()或者想要与DOM元素做实时的交互；


简言之，在directive的controller中写的方法操作等可以被暴露出来给其他指令使用；link函数中写的方法只在本指令中使用、有效；compile指令在Angularjs解析我们自定义的HTML标签时最先执行的编译，将自定义的标签进行编译然后进行link或controller 最后产出供浏览器可以识别的DOM进行页面渲染....


参考：

https://stackoverflow.com/questions/24615103/angular-directives-when-and-how-to-use-compile-controller-pre-link-and-post

