---
title: angular study note
date: 2016-12-21 19:55:19
tags: [angularjs, js]
categories: study
description: AngularJS学习笔记
---

## AngularJS学习笔记

第一个示例

```html
<html ng-app></html>
```

> 当网页加载完毕，AngularJS 自动开启！！！

> ng-app告诉AngularJS来处理引导整个页面应用，一旦使用了ng-app指令在`<html></html>`中，则表示该页面应用属于Angular应用，整个页面控制将交由Angular来控制, 也可以在局部使用。【该标签定义了AngularJS的作用域！】
> ng-app指令同时标记了AngularJS脚本的作用域！
> ng-model 指令把元素值（比如输入域的值）绑定到应用程序（控制器的属性）
> ng-bind 指令把应用程序数据绑定到 HTML 视图

### AngularJS 应用解析
AngularJS应用程序三大组成部分：

1.模板/视图 View：
HTML、CSS；

 AngularJS编译器是完全可扩展 -> 可以给HTML添加新的元素、属性标记，作为AngularJS编译器的指令.


2.控制器Controller 应用程序逻辑、行为：
使用JS定义的控制器/函数；
添加修改属性；

AngularJS应用不需要对DOM添加或注册额外的事件监听去操作DOM，它们都被内置在AngularJS中了。


3.模型/Model 模型：

视图中的数据；
AngularJS通过作用域来保持数据模型与视图界面UI的双向同步


### phonecat 学习

git checkout -f step-编号number

npm start 启动服务

> https://docs.angularjs.org/tutorial


### 基本定义

AngularJS 模块（Module） 定义了 AngularJS 应用；

AngularJS 控制器（Controller） 用于**控制** AngularJS 应用；

ng-app指令定义了应用，通常为angular.module()的第一个参数，指定是哪个模块；

ng-controller 定义了控制器。


### Angular表达式

 大括号 {{var}}

> 当使用expression表达式来输出数据时，为了防止加载过程中页面显示表达式问题，推荐使用ng-bind或ng-cloak

例如：
```html
<!-- 不推荐写法！！！-->
<h3 class="entry-title">{{x.title}}</h3>
```
改为：
```html
<h3 class="entry-title" ng-cloak>{{x.title}}</h3>
```
或
```html
<h3 class="entry-title" ng-bind="x.title"></h3>

<p class="entry-excerpt" ng-bind="x.description"></p>
```

#### Angular表达式可以如何使用？

类似于 JavaScript 表达式，AngularJS 表达式可以包含**字母、操作符、变量**；

与 JavaScript 表达式不同，AngularJS 表达式可以写在 HTML 中；

与 JavaScript 表达式不同，AngularJS 表达式支持过滤器；

#### Angular表达式哪些不可用？
与 JavaScript 表达式不同，AngularJS 表达式**不支持条件判断，循环及异常**；


### Angular指令

#### 指令的基本定义
angular的指令是用来扩展HTML、为应用添加新功能，还可以自定义指令。

> 扩展的HTML属性，指令统一格式：前缀为`ng-`

#### 常见指令、自定义指令及其作用
①
`ng-app` 指令：初始化一个AngularJS应用；同时相当于定义了AngularJS应用程序的根元素

> `ng-app="xx" ` 指令：初始化一个名为xx的AngularJS应用；

②
`ng-init="xx" ` 指令，初始化应用程序数据；为应用提供了初始数据 -- 初始值.

③
`ng-show="xxx表达式" `, xxx表达式返回为true时，ng所在的标签则会显示，否则隐藏； 

④
`ng-model=""` 指令，把元素值绑定到应用中(比如输入框中输入的值); **AngularJS中的数据双向绑定就是通过该指令实现**
该指令一般应于有输入功能的元素上 -- 表单、输入框、textarea等.

例如：
```html
<p>姓名：<input type="text" ng-model="firstName"></p>
<p>你输入的为： {{ firstName }}</p>
```

ng-model指令除了可以绑定HTML元素到应用程序，还可以做一些以下工作:

>提供应用程序数据类型校验(emial, number, required)

>提供应用程序数据状态 (invalid, dirty, error, touched)

>为HTML元素提供CSS 类

>绑定HTML元素到HTML表单



⑤`ng-model`与`ng-bind`区别:

```html
<input ng-model="expression">

<span ng-bind="expression"></span>
<!-- ng-bind另一种写法 -->
<span class="ng-bind: expression"></span>
```

`ng-bind` 是从ng的`$scope`作用域 => `view`层的**单向**数据绑定. 相当于直接在标签内使用表达式`{{expression}}`

`ng-model` 是从ng作用域`$scope` <=> `view`层的**双向**数据绑定. 


⑥ng-repeat 指令，克隆、复制元素

⑦自定义指令
> 使用`.directive` 函数添加自定义指令. 调用自定义指令，HTML元素上必须要添加自定义指令名!!!

自定义指令定义规则：

1> 使用驼峰法命名指令

2> HTML中的自定义指令单词之间使用 必须 使用"-" 分割开来链接

自定义指令调用方式：

1> 通过元素名的方式调用
```HTML
<my-directive></my-directive>
```

如：
```angularjs
var app = angular.module("myApp", []);
//自定义指令myDirective
app.directive("myDirective", function(){
    return {
        template: "<p>自定义啊!</p>"
    };
});
```

=>>

完整示例
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script> 
</head>
<body ng-app="myApp">
<!-- 指令调用, 通过元素名的方式调用 -->
<my-directive></my-directive>

<script>
var app = angular.module("myApp", []);
app.directive("myDirective", function() {
    return {
        template: "<p>自定义啊!</p>"
    };
});
</script>

</body>
</html>
```

**运行后**，开发者模式查看Elements：
```html
<body ng-app="myApp" class="ng-scope">

<my-directive><p>自定义啊!</p></my-directive>

<script>
var app = angular.module("myApp", []);
app.directive("myDirective", function() {
    return {
        template: "<p>自定义啊!</p>"
    };
});
</script>

</body>
```

2> 通过HTML标签属性的方式调用
```html
<div my-directive></div>
```

3> 通过类名的方式调用, 通过类名class去调用该指令时, **必须在JS对应的指令中设置restrict值为"C"**, 且`C`必须大写!!!

`HTML部分`
```html
<div class="my-directive"></div>
```
`JS部分`
```js
var app = angular.module("myApp", []);
app.directive("myDirective", function() {
    return {
		restrict: "C",  //必须要设置！
        template: "<p>自定义啊!</p>"
    };
});
```

4> 通过注释的方式调用, 通过注释方式调用, 必须`restrict`值为大写`M`

注释语法和HTML注释语法类似 `<!-- directive: 自定义指令名以-分割开链接 -->`

`HTML部分`
```html
<!-- directive: my-directives -->
```
`JS部分`
```javascript
app.directive("myDirectives", function(){
	return {
		restrict: "M",
		replace: true,
		template: "<span>通过注释的方式 调用的</span>"
	}
	});
```

> 上述3>和4>完整示例

```html 
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script> 
</head>
<body ng-app="myApp">
	<div class="my-directive"></div>
	
	<!-- directive: my-directives -->

<script>
var app = angular.module("myApp", []);
app.directive("myDirective", function() {
    return {
		restrict: "C",
        template: "<p>通过class类名的方式调用的</p>"
    };
});
	app.directive("myDirectives", function(){
	return {
		restrict: "M",
		replace: true,
		template: "<span>通过注释的方式 调用的</span>"
	}
	});
</script>

</body>
</html>
```

#### 如何选择/限制使用、调用指令的方式？

在JS中定义相应的指令时，使用`restrict`字段来限制其调用方式!

restrict的值及其含义：

① E作为元素名使用

② A作为属性使用

③ C作为类名使用

④ M作为注释来使用

> restrict默认值 EA, 通过元素名和属性名调用


### Angular模型
` ng-model `, 该指令用来将输入域的值绑定到angularJS创建的变量中. 即：通过ng-model 指令将输入型的元素(input、select、textarea)和scope中的数据进行绑定.


#### 单向绑定
示例:
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script> 
</head>
<body>
<div ng-app="myApp" ng-controller="myCtrl">
名字: <input ng-model="name">
年龄：<input type="text" ng-model="age">
</div>

<script>
//controller中必须使用$scope
angular.module('myApp', []).controller('myCtrl',['$scope', func]);

//将设定的赛到制定的标签中, 也可以请求后台将拿到的数据塞到对应的标签中进而展示、交互
function func($scope, $s) {
    $scope.name = "John Doe1";
	$scope.age = 122;
}
</script>
<p>使用 ng-model 指令来绑定输入域的值到控制器的属性。</p>
</body>
</html>
```

#### 双向绑定
> 双向绑定，修改输入域的值时，对应的angularJS的属性值也会随之改变

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script> 
</head>
<body>
<div ng-app="myApp" ng-controller="myCtrl">
名字: <input ng-model="name">
<h1>你输入了: {{name}}</h1>
</div>

<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.name = "lomo"; //设定初始值
});
</script>
</body>
</html>
```

双向绑定的使用场景：


#### 使用ng-model简单验证数据有效性(提供数据状态)
> invalid -- 输入是否合法，默认如果无输入值 则为false
> dirty -- 输入框的默认值是否被改变，改变返回true, 否则返回false
> touched -- 点击是否点击，是:返回true, 否则返回false (初次为false,当光标点击输入框后，再离开变为true)

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script> 
</head>
<body>
<form ng-app="" name="myForm" ng-init="myText = 'test@runoob.com'">
Email: <input type="email" name="myAddress" ng-model="myText" required>
<input type="text" name="textT" ng-init="tt='init-txt'" ng-model="tt" required>
<div name="div" ng-init="" ng-model="div1">Lomo</div>
<p>编辑邮箱地址，查看状态的改变。</p>
<h1>状态</h1>
<p>Valid: {{myForm.myAddress.$valid}} (如果输入的值是合法的则为 true)。</p>
<p>Dirty: {{myForm.myAddress.$dirty}} (如果值改变则为 true)。</p>
<p>Touched: {{myForm.myAddress.$touched}} (如果通过触屏点击则为 true)。</p>
	
<p>input-valid: {{myForm.textT.$valid}} </p>
	<p>div-invalid: {{myForm.div.$dirty}} </p>
</form>

</body>
</html>
```
其中的`ng-model` 指令必须写入标签中 !!!
它能根据表单域的状态自动添加或删除以下类:
<ul>
<li>ng-empty</li>
<li>ng-not-empty</li>
<li>ng-touched</li>
<li>ng-untouched</li>
<li>ng-valid</li>
<li>ng-invalid</li>
<li>ng-dirty</li>
<li>ng-pending</li>
<li>ng-pristine</li>
</ul>
通常这些状态值是针对form表单各类输入框组使用。


示例:
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script> 
<style>
input.ng-invalid {
    background-color: lightblue;
}
</style>
</head>
<body>
<form ng-app="" name="myForm">
    输入你的名字:
    <input name="myName" ng-model="myText">
	
	<div name="div" ng-init="" >Lomo</div>
</form>
<p>编辑文本域，不同状态背景颜色会发送变化。</p>
<p>文本域添加了 required 属性，该值是必须的，如果为空则是不合法的。</p>
</body>
</html>
```

Run之后,
> 开发者模式查看Elements：

```html
<form ng-app="" name="myForm" class="ng-pristine ng-valid ng-scope">
    输入你的名字:
    <input name="myName" ng-model="myText" class="ng-pristine ng-untouched ng-valid">
	<div name="div" ng-init="">Lomo</div>
	<div name="div" ng-init="" ng-model="div2" class="ng-pristine ng-untouched ng-valid">Lomo</div>
</form>
```
观察上述代码, ng-model指令使应用程序初始化完后, 自动为其添加一些对应的class.

默认情况下，在ng-model指令作用下添加三个class类: `ng-pristine ng-untouched ng-invalid `


修改示例中的Html代码，并给`input`标签添加required属性, `<input name="myName" ng-model="myText" required>` 

再次Run. 然后打开开发者模式查看
```html
<form ng-app="" name="myForm" class="ng-pristine ng-scope ng-invalid ng-invalid-required">
    输入你的名字:
    <input name="myName" ng-model="myText" required="" class="ng-pristine ng-untouched ng-invalid ng-invalid-required">
	<div name="div" ng-init="">Lomo</div>
	<div name="div" ng-init="" ng-model="div2" class="ng-pristine ng-untouched ng-valid">Lomo</div>
</form>
```
观察上述代码, 多了一个required类.


### 作用域Scope

> 作用域是在视图HTML和控制器(JS)中间的纽带；

Scope是一个JavaScript 模型对象！ 拥有对应的属性和方法, 可以使用在视图和控制器中.

#### Scope使用

示例
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body>

<div ng-app="myApp" ng-controller="myCtrl">
<h1>{{carname[1].age}}</h1>
</div>

<script>
var app = angular.module('myApp', []);
//控制器中添加$scope对象时，视图就可以获得其对应的属性
app.controller('myCtrl', function($scope) {
    //数组对象carname
    $scope.carname = [{
		name: "dc",
		age: 11
	},{
		name: "lo",
		age: 12
	}];
});
</script>

<p>控制器中创建一个属性名 "carname"，对应了视图中使用 {{ }} 中的名称。</p>
</body>
</html>
```

示例2: 修改视图的同时, 模型Model和控制器随之的改变
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body>
<div ng-app="myApp" ng-controller="myCtrl">
	<input ng-model="name" placeholder="">
	<span>{{name}}</span>
	<h2>{{greetings}}</h2>
	<button ng-click='sayHello()'>点我</button>	
</div>

<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.name = "";
	$scope.sayHello = function() {
		if($scope.name !== "")
			$scope.greetings = 'Hello1 ' + $scope.name + '!';
		
    	
	};
});
</script>
</body>
</html>
```

#### Scope作用域

`$rootScope`，每一个AngularJS应用中都有这样第一个根作用域，它可以作用/控制在 `ng-app` 指令包含的所有HTML元素中。
即根作用域可以作用于该ng-app下的整个应用.

同时, `$rootScope` 是各个controller中`$scope`的桥梁。在`$rootScope`中定义的值可以再各个controller中使用!

示例：
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <script src="./lib/angular-1.6.3.min.js"></script>
</head>
<body ng-app="myApp">

    <div ng-controller="myCtrl">
        <h3>姓氏为 {{lastname}} 家族成员:</h3>
        <p>第一个控制器</p>
        <ul>
            <li ng-repeat="x in names">{{x}} {{lastname}}</li>
        </ul>
    </div>
    <!-- 第二个controller -->
    <div ng-controller="myCtrl2">
        <p>第二个控制器</p>
        <ul>
            <li ng-repeat="x in names">{{x}} {{lastname}}</li>
        </ul>
        <h3>第二个控制器controller：myCtrl2的LastName: {{lastname}}</h3>
    </div>
    <!--获取rootScope值 -->
    <p>{{lastname_global}}</p>
    <script>
        var app = angular.module('myApp', []);
        app.controller('myCtrl', function($scope, $rootScope) {
            $scope.names = ["A", "B", "C"];
            $scope.lastname = "scope-lastename"; //{{lastname}}表达式中会优先调用$scope的lastname
            $rootScope.lastname = "rootScope-Lomo111";
            $rootScope.lastname_global = "rootScope-Lomo111";
        });
        app.controller('myCtrl2', function($scope, $rootScope) {
            $scope.names = ["cc", "dd", "ee"];
            $rootScope.lastname = "rootScope--Lomo222"; //会覆盖上面第一个controller的rootScope
            //第二个控制器controller：myCtrl2的LastName: Lomo222
            $scope.lastname = "scope--Lomo2";
            $rootScope.lastname_global = "rootScope-Lomo222";
        });
    </script>
    <p>注意 $rootScope 在循环对象内外都可以访问。</p>

</body>
</html>
```

Run结果：
```text
姓氏为 scope-lastename 家族成员:

第一个控制器

A scope-lastename
B scope-lastename
C scope-lastename
第二个控制器

cc scope--Lomo2
dd scope--Lomo2
ee scope--Lomo2
第二个控制器controller：myCtrl2的LastName: scope--Lomo2

rootScope-Lomo222

注意 $rootScope 在循环对象内外都可以访问。 
//说明在此controller里，优先调用本controller中的$scope(而非整个应用的$rootscope)
```

分析+总结:

>根据上述示例：<br>
> ① 在多个controller共存的情况下，在当前控制器里，$rootScope的优先级要**低**于$Scope优先级
[比如，同时定义：$scope.lastname = "scope-lastename"; $rootScope.lastname = "Lomo111"; 表达式{{lastname}}会优先取$scope作用域下的值] <br>
> ② 若多个控制器中同时定义了`$rootScope`, 则后定义的`$rootScope`会覆盖之前的`$rootScope`的 <font color="#0099ff">相同字段</font>值！！！


### AngularJS控制器
> 控制器 -- 控制AngularJS应用程序的数据. 控制器也是一个JS对象.

#### 控制器定义

使用`ng-controller`指令定义控制器.

#### 调用

AngularJS使用 `$scope` 对象来调用控制器. 同时, `$scope`对象是一个应用对象(包含应用的变量属性和函数方法);

控制器的`$scope`(相当于作用域、控制范围), 用来保存AngularJS Model(模型)的对象。

> 通常，将controller单写与js文件中.


### AngularJS过滤器

常用过滤器:

①currency，格式化数字为货币格式, 默认为$

②filter， 从数组项中选出一个子集, 后跟一个冒号和模型名称(test,)

③lowercase，将字符串格式化为小写

④uppercase，将字符串格式化为答谢

⑤orderBy，根据某个表达式排列数组, 默认排序以升序排列

⑥date，格式化日期

⑦number，保留几位小数位

⑧limitTo, 截取数字或字符串


#### 过滤器使用

使用管道符 `|` 将过滤器添加到表达式和指令中.

##### 表达式中添加过滤器

> 将字符转为小写
```html
<p>姓名为 {{ lastName | lowercase }}</p>
{{ "LOMOO" | lowercase }}      // 结果：lomoo
{{1490161945000 | date:"yyyy-MM-dd HH:mm:ss"}} //2017-03-22 13:52:25
{{14.194000 | number:2}} // 保留两位小数，14.19
{{ 250.0000 | currency:"RMB ￥" }} //格式化货币单位为人民币，RMB ￥250.00
{{"1234567890" | limitTo:-4}} // 从右向左截取7890
{{"1234567890" | limitTo:4}}  // 从左往右截取 1234
```

> filter
```js
// 查找name为iphone的行
{{ [{"age": 20,"id": 10,"name": "iphone"},
{"age": 12,"id": 11,"name": "sunm xing"},
{"age": 44,"id": 12,"name": "test abc"}
] | filter:{'name':'iphone'} }}
```


##### 指令中添加过滤器

> 按照数组names中的country字段进行生序排序

```html
<li ng-repeat="x in names | orderBy:'country'">
<!-- 升序 -->

<li ng-repeat="x in names | orderBy:'country：true'"> 
<!-- 降序排列 -->
```

##### 过滤输入

使用场景，搜索、筛选时.

示例
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body>

<div ng-app="myApp" ng-controller="namesCtrl">
<p>输入过滤:</p>
<p><input type="text" ng-model="testText"></p>
<ul>
<!-- 输入过滤/搜索 支持中文 且 不区分大小写-->
  <li ng-repeat="x in names | filter:testText | orderBy:'country'">
    {{ (x.name | uppercase) + ', ' + x.country }}
  </li>
</ul>
</div>
<script >
	angular.module('myApp', []).controller('namesCtrl', function($scope) {
    $scope.names = [
        {name:'Jani',country:'Norway'},
        {name:'Hege',country:'Sweden'},
        {name:'Kai',country:'Denmark'},
		{name:'lomo',country:'中国'}
    ];
});
	</script>

</body>
</html>
```

##### 自定义过滤器
> 定义一个字符串反转reverse
字符串反转:

```js
//原生JS函数 去反转一个连续的字符串，注意不是一个话！
function strReverseOut(str) {
	var arr = new Array();
	arr = str.split(''); //将一个连续的字符串拆分成单个字母存入数组
	var temp = arr.reverse(); //数组反转
	return temp.join(""); //将数组再转为字符串
}
```

===>>>

```html
<!DOCTYPE html>
<html>
<meta charset="utf-8">
<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
<body>

<div ng-app="myApp" ng-controller="myCtrl">
<!-- ng-model 实现双向绑定，根据输入字符数字实时反转-->
<input type="text" ng-model="msg">
Output: {{ msg | reverse }}
<!--输出： Output: dchaomoL -->
</div>
<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.msg = "Lomoahcd";
});
app.filter('reverse', function() { //可以注入依赖
    return function(text) {
        return text.split("").reverse().join("");
    }
});
</script>
</body>
</html>
```


### Angular 服务(Service)

使用AngularJS内置的服务(30+个)或自定义服务.

#### 内置Service
$location服务，原生JS的window.location

获取当前页面URL
```js
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $location) {
    $scope.myUrl = $location.absUrl();
});
```

http请求服务
```js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $http.get("welcome.htm").then(function (response) {
        $scope.myWelcome = response.data;
    });
});
```

timeout定时服务, 对应原生JS的window.setTimeout 

```js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $timeout) {
  $scope.myHeader = "Hello World!";
  $timeout(function () {
      $scope.myHeader = "How are you today?";
  }, 2000);
});
```

$interval 服务，原生JS的window.setInterval

实时显示本地时钟

```js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval) {
  $scope.theTime = new Date().toLocaleTimeString(); //获取当前的本地时刻
  $interval(function () {
      $scope.theTime = new Date().toLocaleTimeString(); //实时显示本地时钟，达到动态时钟显示效果
  }, 1000);
});

<!-- 不使用 $interval服务的写法-->
app.controller('myCtrl', function($scope) {
	$scope.theTime = new Date().toLocaleTimeString();
	$scope.setTime = function() {
		// $apply 方法可以修改数据
		$scope.$apply(function() {
			$scope.theTime = new Date().toLocaleTimeString();
		});
	};
    // 使用JS原生的setInterval
	setInterval($scope.setTime, 1000);
});
```

#### 自定义Service服务

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body>
<div ng-app="myApp" ng-controller="myCtrl">
<p>255 的16进制是:</p>
<h1>{{hex}}</h1>
</div>
<p>自定义服务，用于转换16进制数：</p>
<script>
var app = angular.module('myApp', []);

app.service('hexafy', function() {
	this.myFunc = function (x) {
        return x.toString(16);
    }
});
app.controller('myCtrl', function($scope, hexafy) {
  $scope.hex = hexafy.myFunc(255);
});
</script>

</body>
</html>

```


### XMLHttpRequest - $http

> $http服务用于与后端进行数据交互/获取数据然后在UI渲染等.

> $http服务也是一个JavaScript对象.

AngularJS核心服务 `$http`服务, 可认为相当于JQuery中的Ajax.

#### 基本使用

简单的get请求

一般写法:
```js [类似于JQuery中的Ajax写法]
$http({
    method: 'GET',
    url: 'http://domain.com/path'
}).then(function successCallBack(){
    //请求成功执行的方法
}, function failCallBack(){
    //请求失败执行的方法
} );
```

简写法:

常用的GET、POST请求
> V1.5版本以下的`$http`方法success和error方法废弃，直接使用`.then`
```js
$http.get('url', config).then(successCallBackFn, errorCallBackFn);
//data, config与上类似, 都是以字符串或对象形式传递
//post请求
$http.post('url', data, config).then(successCallBackFn, errorCallBackFn);
```

进一步简写:
```js
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

#### 常用请求方法

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


### 下拉框

#### 第一种下拉框
> 使用`ng-options`指令, 直接写在`select`标签里
```html
<div ng-app="myApp" ng-controller="myCtrl">
        <select ng-init="selectedName = names[0]" ng-model="selectedName" ng-options="x for x in names">
        </select>

        <p>选择的是{{selectedName}}</p>
</div>
    <script>
        var app = angular.module('myApp', []);
        app.controller('myCtrl', function($scope) {
            $scope.names = ["Google", "Runoob", "LomoSpace"];
        });
    </script>
```

> `ng-options`指令，选择的是一个对象。

当选择的值是对象时，使用ng-options指令就可以进一步获取更多该对象的属性.

运行审查元素:
```html
<div ng-app="myApp" ng-controller="myCtrl" class="ng-scope">

        <select ng-init="selectedName = names[0]" ng-model="selectedName" ng-options="x for x in names" class="ng-pristine ng-untouched ng-valid ng-not-empty">
        <option label="Google" value="string:Google" selected="selected">Google</option>
        <option label="lomo" value="string:Lomo">LomoSpace</option>
        <option label="Taobao" value="string:Taobao">Taobao</option>
        </select>
</div>
```

#### 第二种下拉框
> 使用`ng-repeat`指令, 直接写在`option`标签内, 使用`ng-repeat`指令，循环`option`标签即可
```html
<select>
<option ng-repeat="x in names">{{x}}</option>
</select>
```

`ng-repeat`指令，通过数组来循环HTML代码创建下拉列表。

> `ng-repeat`指令，选择的是字符串.


#### 获取select下拉框选中的值
> 通过在`select`标签绑定`ng-model指令` 获取即可.


#### 使用场景

通常，使用第一种`ng-options`的方式。


### 表格

和上面的下拉框方式2相似，也可以使用`ng-repeat`指令循环创建html达到创建表格的目的.

表达式中常用一些 **选择器** :

```html
     <ul>
        <li>$index：遍历的进度,下标/序号（0...length-1）。 </li>
        <li>$first：当元素是遍历的 第一个 时值为true。</li>
        <li>$middle：当元素处于 第一个和后元素之间时值为true。 </li>
        <li>$last：当元素是遍历的 后一个时值为true。 </li>
        <li>$even：当$index值是 偶数 时值为true。[0为偶数] </li>
        <li>$odd：当$index值是 奇数 时值为true。 </li>
    </ul>
```

### AngularJS 指令之操作HTML DOM属性

`ng-disabled` 指令, 通常该指令的值绑定到具体的ng-model上，如：
```html
<div ng-app="" ng-init="mySwitch=true">
// ...
<input ng-disabled="mySwitch" value="点!" >
<!--点击下面的复选框后，上面的输入框属性随之改变，默认为禁用(true) 也就是当点击复选框后，ng-model的值从true变为false，使得上面输入框的disabled属性从true变为false-->
<input type="checkbox" ng-model="mySwitch"/>按钮
```

`ng-show` 指令, 用来显示或隐藏 HTML 元素.

```html
<p ng-show="true">可见的。</p>

<p ng-show="false">不可见的。</p>
```

### AngularJS 事件

点击事件： `ng-click` 指令;

隐藏元素： `ng-hide` 指令;

显示元素：`ng-show` 指令;


### AngularJS 模块

#### 前言

AngularJS是纯客户端技术，完全使用JavaScript编写。其大大简化应用开发(尤其单页应用)，将一些常规操作封装，直接调用即可，减少重复性、低级质量的代码。
包括：DOM操作、事件监听、输入验证等。

同时，带来了更多其它技术：

数据、业务逻辑、视图分离；

数据与视图的绑定；

通用类服务，如$http

依赖注入

可扩展的HTML

...


大部分面向对象应用程序，例如C、C++、Java等程序中，都有一个 **主方法用来实例化、组织、启动应用** . 

在AngularJS应用里没有这样的主方法，而是使用模块来声明应用如何启动.

模块化特点：

声明式的启动过程，易读、易懂

有助于单元测试，无需加载全部模块

可以以任何先后或者并行的顺序加载(模块的执行本身是延迟的)


#### 概述

模块定义了一个应用程序，同时，模块是应用程序中各个不同部分的容器；

同时模块也是应用控制器的容器(controller控制器的操作需要依赖所对应的具体module)；

模块module和控制器controller可以分开写入不同的`.js`文件,， 然后使用`script`标签安装顺序引入即可。


```js
var app = anguler.module("my-app", []);
```
> 关于`module`里的中括号[], 其表示该模块所需要的依赖，[]中的参数用来定义模块的依赖关系，若没有依赖，则为空[]；如果有，则写入依赖模块的名字.

通常在JavaScript中要避免使用全局函数，容易被其它脚本文件覆盖。而angularJS中的模块让所有函数、变量的作用域都在自己对应的模块下，避免了此问题。

一般web应用对JS的加载都在`body`元素最底部，angularJS的加载 通常加载在`head`标签，因为`angular.module`的调用只能在angularJS库加载完后才能进行，所以可以将AngularJS库的加载位置
放在`ng-app`所在的标签之前、`body`标签之中。

#### 模块化--


### AngularJS表单

输入控件集合。

HTML表单通常与HTML控件同在。

```html
<form novalidate>
</form>
//novalidate 属性是在 HTML5 中新增的。禁用了使用浏览器的默认验证.
```

#### 表单输入验证

基本验证方法：
|属性 | 说明 |
|:--- | :-----: |
|$dirty | 表单有填写记录 |
|$valid | 字段内容合法的| 
|$invalid | 字段内容是非法的|
|$pristine | 表单没有填写记录 |

```html
<p>用户名:<br>
  <input type="text" name="user" ng-model="user" required>
  <span style="color:red" ng-show="myForm.user.$dirty && myForm.user.$invalid">
  <span ng-show="myForm.user.$error.required">用户名是必须的。</span>
  </span>
</p>
```

### AngularJS API

全局API用来执行常见的JavaScript函数集合。如：比较、迭代、转换对象。

全局API使用angular对象来访问.

通用API函数：

| API | 描述 |
|:--- | :----:|
|angular.lowercase() | 将字符串转换为小写|
|angular.uppercase() | 转换字符串为大写 |
|angular.isString() | 判断给的对象是否为字符串，是 返回true|
|angular.isNumber() | 判断给定的对象是否为数字，是 返回true|


### AngularJS Bootstrap

在AngularJS中使用Twitter的BootStrap UI框架与其它方式相同，直接引入，调用对应的类即可。
```html
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
```

### HTML包含HTML

AngularJS应用中，可以在HTML中包含HTML文件.(传统的HTML中不能包含HTML文件)

> 大多数的服务端脚本语言都支持文件包含，如PHP
```php
<?php require("xxx.php"); ?>
```

客户端包含:

通过`ng-include`指令来包含HTML文件, 该指令除了可以包含HTML文件外，还可以包含AngularJS代码。

如：

```html
<body ng-app=""> 
<div ng-include="'lomo.html'"></div>
</body>
```
```html
//lomo.html
<h3>head3</h3>
<p>。。。</p>
<div><span>....</span></div>
```

> 默认，`ng-include`指令不允许包含跨域的文件(包括统一顶级域下的二级三级域)，如果需要包含其他域的文件，需要设置域名访问白名单.
某些情况下还要再设置服务器端允许跨域请求。

```html
<body ng-app="myApp">

<div ng-include="'http://c.domain.com/xxx/xx.php'"></div>
<script>
var app = angular.module('myApp', [])
app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'http://c.domain.com/xxx/**'
    ]);
});
</script>
 
</body>
```

### AngularJS 动画

AngularJS使用动画需要引入`angular-animate.min.js` 库配合CSS使用。

当已定义了ng-app的应用名称时，需要将ngAnimate写入module的依赖模型数组中括号[]里。

```js
var app = angular.module('myApp', ['ngAnimate']);
```

> ngAnimate的作用：添加、移除class; 监听事件，类似于显示、隐藏HTML元素；

AngularJS 添加/移除 class 的指令:
```html
ng-show
ng-hide
ng-class
ng-view
ng-include
ng-repeat
ng-if
ng-switch
```

ng-show 和 ng-hide 指令用于添加或移除 ng-hide class 的值

在动画完成后，HTML 元素的类集合将被移除, 如 ng-hide 指令会添加一下类(在操作的那一瞬间动态加入class值，在动画完成后，再去掉这些class值)

ng-animate
ng-hide-animate
ng-hide-add (如果元素将被隐藏)
ng-hide-remove (如果元素将显示)
ng-hide-add-active (如果元素将隐藏)
ng-hide-remove-active (如果元素将显示)


### AngularJS依赖注入

#### 基本概念

依赖注入(Dependency Injection), 是一种设计模式。

在这种模式里，一个或多个依赖(或服务) 被注入(或者通过引用传递)到一个独立的对象(或客户端)中，然后成为该对象(客户端)的一部分。

这种模式，使得客户端脱离了 对本身行为创建的依赖性。

#### 核心注入组件
AngularJS提供了以下组件用来作为注入依赖：

* value
* factory
* service
* provider
* constant

* `value注入组件`

value是一个简单的JavaScript对象，用来向控制器controller传递值.

e.g.
```js
//模块定义
var app = angular.module("myApp", []);

//创建value对象defaultValue并传递值 'lomo'
app.value("defaultValue", "lomo");

//将 defaultValue 注入到控制器
app.controller("myCtrl", function($scope, xxService, defaultValue){
    //...
});
```

* `factory注入组件`

factory是一个函数，用来返回值。

e.g.
```js
var app = angular.module("myApp", []);

app.factory("calcService", function(){
    var factory = {};
    factory.calc = function(a, b){
        return a*b;
    };
    return factory;
});

//注入factory 的calcService方法, 利用factory方法获得另一个service方法cal2
app.service("myService", function(calcService){
    this.cal2 = function(x){
        return calcService.calc(x, x);
    };
});

app.controller("myCtrl", function($scope, "myService"){
    //...
});
```

* `provider注入组件`

通过provider创建一个service、factory，provider中提供了一个factory方法get(), 用来返回value/service/factory。

e.g.
```js
var app = angular.module("myApp", []);

app.config(function($provide){
    $provide.provider("calcService", function(){
        this.$get = function(){
            var factory = {};
            factory.calc = function(x, y) {
                return x*y;
            }
            return factory;
        };
    });
});

//...
```

* `constant注入组件`

constant(常量)用来在配置阶段传递数值，注意这个常量在配置阶段是不可用的。

```js
app.constant("Config Param", "Constant Value");
```

完整示例:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Injection Test</title>

    <script src="./lib/angular-1.6.3.min.js"></script>
</head>
<body>
    <h4>Injection Test</h4>
    <div ng-app="myApp" ng-controller="myCtrl">
        <span>输入数字: </span><input type="number" ng-model="number">
        <button ng-click="getValue()" value="计算">计算</button>
        <div>
            <p>default 计算结果: {{result1}}</p>
            <p>input 输入为：{{number}}， 计算结果: {{result}}</p>
        </div>
    </div>
    <script>
        //定义模块
        var app = angular.module("myApp", []);

        //创建factory的CalcuatorFactory
        app.factory("CalcuatorFactory", function() {
            var calcuatorFactory = {};
            calcuatorFactory.calcFactory = function(a, b) {
                return a * b;
            }

            return calcuatorFactory;
        });

        //配置 facotry对象方法
        app.config(function($provide) {
            $provide.provider("CalcuatorFactory", function() {
                this.$get = function() {
                    var factorya = {};
                    factorya.calcFactory = function(a, b) {
                        //config注入组件里的factory对象的属性calcFactory必须和通过provider传入的对象CalcuatorFactory的属性名相同。
                        return a * b;
                    };
                    return factorya;
                };
            });
        });

        //设定初始值
        app.value("defaultValue", 10);

        //自定义service服务：calculatorService
        app.service("calculatorService", function(CalcuatorFactory) {
            this.calcService = function(x) {
                return CalcuatorFactory.calcFactory(x, x);
            };
        });

        app.controller("myCtrl", function($scope, calculatorService, defaultValue) {
            $scope.number = defaultValue;
            $scope.result1 = calculatorService.calcService($scope.number);

            $scope.getValue = function() {
                //console.log(123);
                //console.debug($scope.number);
                $scope.result = calculatorService.calcService($scope.number);
            };
        });

        //依赖注入的顺序?
        //创建factory注入的service，然后将factory的service注入到config默认配置中，初始值设定，自定义service对象服务，最后在controller直接调用自定义的service即可。
    </script>
</body>
</html>
```


### AngularJS 路由

通过路由机制达到根据不同的URL来浏览不同的内容、页面。

在单页web应用中，angularJS通过 #+标记符 来标记实现达到不同页面。
```bash
http://domain.com/#one
http://domain.com/#lmoa
http://domain.com/#three
http://domain.com/#lomo
```
点击请求时，向服务器请求的都是`#`之前的，#之后的内容会被浏览器会忽略掉。所以我们就需要在客户端实现 # 号后面内容的功能实现。

AngularJS 路由机制 就是通过 `# + 标记` 帮助我们区分不同的逻辑页面并将不同的页面绑定到对应的控制器上。

示例:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Route Test</title>
    <script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
    <script src="https://apps.bdimg.com/libs/angular-route/1.3.13/angular-route.js"></script>

    <!-- 版本问题 <script src="./lib/angular-1.6.3.min.js"></script>
    <script src="//cdn.bootcss.com/angular.js/1.6.3/angular-route.min.js"></script> -->

</head>

<body ng-app="myApp">
    <div>
        <h3>Route T</h3>
        <ul>
            <li>
                <a href="#/">HOME</a>
            </li>
            <li>
                <a href="#/first">第一页</a>
            </li>
            <li>
                <a href="#/lomo">LOMO页</a>
            </li>
            <li>
                <a href="#/lomo1">lomo1页</a>
            </li>
            <li>
                <a href="#/lomo122">lomo123-other页</a>
            </li>
        </ul>

        <div ng-view></div>

    </div>

    <script>
        angular.module("myApp", ['ngRoute']).config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/', {
                template: "这是首页 -- HOME Page 呀哈!"
            }).when('/first', {
                template: '这是第一个页面！'
            }).when('/lomo', {
                template: '这是LOMO页面！'
            }).when('/lomo1', {
                template: '这是lomo1 页面！'
            }).otherwise({
                redirectTo: '/'
            });
        }]);
    </script>
</body>
</html>
```

> 通常不适用自带的ngRouter，因为它只支持一个页面只允许一个视图`ng-view`，而使用ui-router,参考：http://www.jianshu.com/p/35c0acdea86c

