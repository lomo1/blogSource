---
title: angularjs img
date: 2016-10-19 19:58:05
tags: angularjs
categories: study
description: Angularjs操作img地址
---

## AngularJS动态修改img的URL

> 项目过程中，在首页面的左上角Logo可以达到配置化(或通过配置接口进行显示灯). 主要问题在`directive` 中相对路径问题.


项目目录结构:

```bash
#app 源码目录下
├── css
│   ├── fishBone.css
│   └── imports.css
├── favicon.ico
├── img
│   ├── arrow.png
│   ├── jdb_blue_logo.png
│   ├── jdb_logo.png
│   ├── line-first.png
│   ├── line-point.png
│   ├── loading.gif
│   └── title.png
├── index.html
├── js
│   ├── controllers
│   ├── directives
│   ├── filters
│   ├── main.js
│   ├── modules
│   ├── require.js
│   └── services
├── lib
│   ├── angular
│   ├── bootstrap
│   ├── fishBone.js
│   ├── font-awesome-4.7.0
│   ├── jquery
│   └── layui
└── views
    ├── autoPublishFishBone.html
    ├── autoPublishFooter.html
    ├── autoPublishNavigationBar.html
    └── autoPublishVersion.html

15 directories, 18 files
```
在`app`目录下，需要的`jdb_blue_logo.png` 与`index.html`其相对路径为`img/jdb_blue_logo.png`。


```bash
#js目录
├── controllers
│   └── index.controller.js
├── directives
│   ├── indexFishBone.directive.js
│   ├── indexFooter.directive.js
│   ├── indexNavigationBar.directive.js
│   └── indexVersion.directive.js
├── filters
│   └── fishBone.filter.js
├── main.js
├── modules
│   └── fishBone.module.js
├── require.js
└── services
    ├── api.service.js
    ├── fishBone.service.js
    └── utils.service.js

5 directories, 12 files
```

`views/autoPublishNavigationBar`

```html
<!-- img部分代码 -->
<a class="nav ar-brand" href="./">
    <img title="logo" ng-src="{{logoSrc}}">
        <span class="sub-title">XXLogoName</span>
</a>
```

对应的`directive`
```js
jdbAutoPublisherApps.directive('jdbAutoPublishNavBar', function() {
    return {
        restrict: 'EAC',
        replace: true,
        // scope: {}, //与$scope隔离
        templateUrl: '././views/autoPublishNavigationBar.html', //路径啊！！！
        link: function(scope, elem, attr) {
                scope.logoSrc = "img/jdb_blue_logo.png";
            }
            // compile: function(tElement, tAttrs, transclude) {
            //     return {
            //         pre: function(scope, iElement, iAttrs, controller) {
            //             // console.log("pre");
            //             // scope.Circle = {};
            //             // scope.colorArr = ['#F89782', '#1A84CE', '#F7A259', '#43A6DA', '#F9BF3B', '#88C7CC', '#EF6D5F', '#60A96E', '#F03852', '#3A9284'];
            //             console.log('pre-compile -- directive.');
            //             // console.log(scope.fishData);
            //         },
            //         post: function(scope, iElement, iAttrs, controller) {
            //             // console.log("post");
            //             // console.log(scope.colorArr);
            //             console.log('post-compile -- directive.');
            //         }
            //     };

        // },
        // controller: function($scope) {
        //     // console.log("1.directive -- controller");
        // },
        // link: function($scope) {
        //     console.log("2.directive -- link"); //不执行！
        // },
        // compile: function($scope) {
        //     // console.log("3.directive -- compile");
        // }
    };
});
```

> 注意directive最终会被引用到首页，所有,此处logoSrc的地址为相对index.html而言的路径.

