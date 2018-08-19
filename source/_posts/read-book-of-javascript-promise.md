---
title: read book of javascript-promise
date: 2016-09-30 00:14:37
tags: js
categories: study
description: JavaScript笔记之Promise
---


## JavaScript-Promise笔记

### 创建Promise对象

第一种创建方法：

> 1. `new Promise(fn)` 返回一个Promise对象

> 2. 在`fn`中指定异步等待处理：① 处理结果ok，调用`resolve(value)` ② 处理结果错误的话，调用`reject(error Object)`

```js
new Promise(function(resolve, reject){
    if(...) {
        resolve(...);
    }else {
        reject(...);
    }
});
```

那么，返回的Promise对象如何进行下一步操作？

用法：

`promise.then().catch()`, then函数内为正常逻辑处理流程， catch函数内针对reject或其它异常处理。


第二种创建方法：

`Promise.resolve(value)` <=> `new Promise(fn)`, promise.resolve()返回的也是一个Promise对象，所以也可以对其返回值进行链式调用,then, catch ....

### 关于then方法

`.then()` 中指定的方法调用是**异步进行**的。

e.g.
```js
//test.js
let promise = new Promise(function(resolve){
    console.log(111);
    resolve(2);
});

promise.then(function(value){
    console.log(value);
});

console.log('33333');
```

运行`test.js`后发现结果为111，33333，2

分析：
> JavaScript代码会按照文件的从上到下的顺序执行，所以最开始, 执行输出为111，然后执行`resolve(2)`, 这时，Promise对象状态已是确定状态，即：fulfilled被置为2. 接着执行promise.then()的代码，它注册了里面的回调函数，由于promise.then执行的时候promise对象已经是确定状态，理论上来讲，这个回调函数应该是同步被执行的，但是实际上是没有的！这时因为promise.then注册回调函数的时候，**Promise对象不管其对象是否已经是确定状态，Promise都会以异步的方式调用回调函数**，这是Promise设计上的规定！！！


Promise规范：异步函数只能被异步调用！ 因为Promise保证了每次调用都是异步进行的，所以不需要使用`setTimeout`来实现异步调用。

每次调用then都会返回一个新创建的promise对象，不管是then还是catch方法调用，都返回了一个新的promise对象。





