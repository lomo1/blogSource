---
title: js-map
date: 2016-07-23 16:03:17
tags: js
categories: study
description: JavaScript中的map
---

## map

map将原来的数据映射成新数组；

```js
var arr = [1,2,3,4];

var arr2 = arr.map(function(item){return item;});

console.log(arr2);
//[1, 2, 3, 4]

console.log(typeof arr2); //"object"

```

声明一个`userInfo`数组对象：

```js
var userInfo = [
    {"name": "lmo", "email": "lmo@lmo.space"},
    {"name": "lomo1", "email": "lomo1@lomo1.spae"},
    {"name": "lomo", "email": "lomo@lomo.space"},
    {"name": "lomo2", "email": "lomo2@lomo2.space"}
];
```

使用map取出特定属性值的集合。
```js
var users = userInfo.map(function(item){return item;});
users.length; // 4

var usersName = userInfo.map(function(item){return item.name;});
console.log(usersName); //["lmo", "lomo1", "lomo", "lomo2"]

var usersEmail = userInfo.map(function(item){return item.email;});
usersEmail; //object->["lmo@lmo.space", "lomo1@lomo1.spae", "lomo@lomo.space", "lomo2@lomo2.space"]

console.log(usersEmail.join(","));
//输出： lmo@lmo.space,lomo1@lomo1.spae,lomo@lomo.space,lomo2@lomo2.space
```

### 兼容性--改进:

> IE6 ~ IE8

`Array.prototype.map` map方法的根->Array；

```js
if(typeof Array.prototype.mar != "function")
{
    Array.prototype.map = function(fn, context){
        var arr = [];
        if(typeof fn === "function")
        {
            //不能使用let k = 0;
            for(var k = 0; k < this.length; k ++)
            {
                arr.push(fn.call(context, this[k], this));
            }
        }
        return arr;
    };
}
```