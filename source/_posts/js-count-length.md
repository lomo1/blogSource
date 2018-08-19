---
title: js count length
date: 2016-03-30 14:37:30
tags: js
categories: program
description: JavaScript计算对象长度
---

## JavaScript计算对象长度

直接封装函数:
```js
function countObjectLength(obj) {
    var Length = 0;
    if ((typeof obj) == "string") {
        return obj.length;
    } else if ((typeof obj) == "object") {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                Length++;
            }
        }
        return Length;
    } else {
        console.log("既不是字符串也不是对象无法计算长度");
        return;
    }
}
```

测试该函数:
```js
//Test Object
var a = {"name":"Lomo", "amy":"Sherry","age":"26"}
alert(typeof a); //object
alert(countObjectLength(a)); //3

//Test Array
var b = [1,2,3,"lomo"];
alert(typeof b); //object
alert(countObjectLength(b));

//Test string
var c = 'lomoao';
alert(countObjectLength(c)); //6

var arr = new Array("123","345","chnhawk","Sherry","a","b","c");
alert(countObjectLength(arr)); //7
```

> 看起来，好像没毛病啊！！！ 但是测试的对象里并不包含特殊情况，所以是存在问题的！

### 关于hasOwnProperty

> `hasOwnProperty()` 方法返回的是一个bool型。如: `a.hasOwnProperty(b)`, 判断a是否包含属性b, 属性b可能是个成员变量, 也可能是个成员方法.
> 在JavaScript中, 利用 `hasOwnProperty()` 方法去判断某个对象是否含有指定属性时, 在某些特殊情况下, 这个对象的属性名可能恰好使用的是这个关键字.

例如：
```js
	var foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons',
    lomo: "lo"
};
		
foo.hasOwnProperty('bar'); // 始终返回 false
foo.hasOwnProperty('hasOwnProperty');  //始终返回错误
foo.hasOwnProperty("lomo"); //false
```
此时，使用开头的封装函数测试，也是无法得到正确结果的。

为什么？

> 因为：因为冲突，被覆盖！

解决办法:
> 使用外部原型链上的、或Object的hasOwnProperty属性方法去判断

```js
// 直接使用原型链上真正的 hasOwnProperty 方法
({}).hasOwnProperty.call(foo, 'lomo'); // true
// 也可以使用 Object 原型上的 hasOwnProperty 属性
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true

```

对开头封装的函数进行改进：
```js
	function countObjectLength(obj) {
	 var Length = 0;
	 if ((typeof obj) == "string") {
	   return obj.length;
	 }else if ((typeof obj) == "object") {
	 for (var key in obj) {
         //使用外部原型链
	   if(({}).hasOwnProperty.call(obj, key)) {
	   	 Length ++;
	   }
	  }
	  return Length;
	 }else {
	 console.log("既不是字符串也不是对象无法计算长度");
	 return;
	 }
}
```
或
```js
	function countObjectLength(obj) {
	 var Length = 0;
	 if ((typeof obj) == "string") {
	   return obj.length;
	 }else if ((typeof obj) == "object") {
	 for (var key in obj) {
         //使用Object上的hasOwnproperty方法
	   if(Object.prototype.hasOwnProperty.call(obj, key)) {
	   	 Length ++;
	   }
	  }
	  return Length;
	 }else {
	 console.log("既不是字符串也不是对象无法计算长度");
	 return;
	 }
}
```

测试
```js
var foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons', 
    lomo: "lo"
};

countObjectLength(foo); // 输出：3
```

这两种函数都算是一个考虑很周(考虑到了特殊字符)的长度计算的最佳方法.

