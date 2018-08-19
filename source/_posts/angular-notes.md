---
title: angular notes
date: 2017-09-26 15:14:21
tags: angular
categories: study
description: angular项目笔记📒
---

## Angular项目笔记

> 记录📝点Angular项目开发过程中 不熟悉的、陌生的、自认为有需要注意的。

以 `autoPublisher` <a href="https://gitee.com/lomospace/autoPublisher.git">Project</a>为例.

项目结构划分：
```bash
#root
├── Temp
├── app
├── build
├── build_w
├── data
├── demo
├── dist
├── gulpfile.js
├── node_modules
├── package-lock.json
├── package.json
├── readme.md
├── tmp
└── webpack.config.js

#app
.
├── app.js
├── css
│   ├── fishBone.css
│   └── imports.css
├── favicon.ico
├── img
│   ├── arrow.png
│   ├── jdb_blue_logo.png
│   ├── jdb_logo.png
│   ├── line-first.png
│   ├── line-point.png
│   ├── loading.gif
│   └── title.png
├── index.html
├── js
│   ├── controllers
│   ├── directives
│   ├── filters
│   └── services
├── lib
│   ├── angular
│   ├── bootstrap
│   ├── fishBone.js
│   ├── font-awesome-4.7.0
│   ├── jquery
│   └── layui
└── views
    ├── autoPublishFishBone.html
    ├── autoPublishFooter.html
    ├── autoPublishNavigationBar.html
    └── autoPublishVersion.html

#app/js, tree -L 2
.
├── controllers
│   └── index.controller.js
├── directives
│   ├── indexFishBone.directive.js
│   ├── indexFooter.directive.js
│   ├── indexNavigationBar.directive.js
│   └── indexVersion.directive.js
├── filters
│   └── fishBone.filter.js
└── services
    ├── api.service.js
    ├── fishBone.service.js
    ├── fishBoneAction.service.js
    └── utils.service.js
```

核心功能主要在`app/js`下实现。 `controllers` 主要是对整个控制器。`directives`是对页面每个块儿的定义以及监听数据变化然后调用`Service`方法进行页面渲染、数据更新等。`filters`是对接口返回的数据进行二次处理与包装的过滤器。`services`文件夹下的Service主要是对公共方法封装以及提供给directive中使用的一些方法。

在页面中这 `controllers` `directives` `filters` `services` 的引用顺序：
```js

// AMD、ES6
require('./js/services/utils.service.js'); //基本公共方法
require('./js/services/api.service.js');  //$http请求封装，其它接口相关
require('./js/services/fishBone.service.js'); //页面渲染Service
require('./js/services/fishBoneAction.service.js'); //事件

require('./js/controllers/index.controller.js'); //控制器

require('./js/filters/fishBone.filter.js'); //数据过滤器

require('./js/directives/indexNavigationBar.directive.js'); //nav bar directive
require('./js/directives/indexVersion.directive.js'); //input directive
require('./js/directives/indexFishBone.directive.js'); //fishBone, page main
require('./js/directives/indexFooter.directive.js'); //footer
```

首先，控制器`index.controller`依赖：
```js
// 依赖api.service.js的jdbAutoPublisherAPIModule ... 将其依赖一次添加至jdbAutoPublisherApps模块。
var jdbAutoPublisherApps = angular.module('jdbAutoPublisherApp', ['jdbAutoPublisherAPIModule', 'jdbAutoPublisherFishBoneModule', 'jdbAutoPublishUtilsModule', 'jdbAutoPublisherFishBoneActionModule']);

// 控制器里调用了哪些函数、方法、无论是自定义还是Angular内置，在此处的function里依次注入即可
// 第一种：隐示注入，书写简单，但是在js进行压缩时候会出错，需要使用插件gulp-ng-annotate(若使用gulp的话)
jdbAutoPublisherApps.controller('jdbAutoPublisherCtrl', function($scope, jdbAutoPublishUtilsService, jdbAutoPublisherAPIService, $filter) {
    // do sth...
}

//上面👆这个controller依赖注入的另一种写法：
// 显示注入，代码长，不易阅读，压缩不出错
jdbAutoPublisherApps.controller('jdbAutoPublisherCtrl', ['$scope', 'jdbAutoPublishUtilsService', 'jdbAutoPublisherAPIService', '$filter', function($scope, jdbAutoPublishUtilsService, jdbAutoPublisherAPIService, $filter) {
    // do sth...
}]);

// 第三种, $inject的方式
jdbAutoPublisherApps.controller('jdbAutoPublisherCtrl', controllerFn);
controllerFn.$inject = ['$scope', 'jdbAutoPublishUtilsService', 'jdbAutoPublisherAPIService', '$filter'];

function controllerFn() {
    // do sth...
}
```

在`controller`中如何正确使用`Filter` ?

首先，依赖注入`$filter`, 其次，使用语法：

`$filter('filter名字')(参数)`即可。


再看看 `indexFishBone.directive`， 其需要调用`fishBone.service` 和 `api.service` 以及 `fishBoneAction.serivce`里的方法，那么只需在controller的moudle声明是添加对应的依赖，然后再这个directive中的function里注入依赖的Service名即可。

BTW，如果在directive的return里声明了`scope: {}`则表示该directive的`scope`作用域与controller中以及该应用其它地方声明的所有`scope`作用域都是隔离的。

其次，directive中如何获取controller中的值？或：controller与directive如何通信？

当controller通过Service或filter获取到数据后，绑定到`scope`作用域，在directive中使用`$watch`监听该作用域上的值即可。(前提：directive中的Scope作用域未隔离！)

```js
// wathch第一个参数为绑定在scope作用域上的变量
scope.$watch('fishData', function(newVlaue) {
    if (scope.fishData) {
        // do sth
    }
});
```