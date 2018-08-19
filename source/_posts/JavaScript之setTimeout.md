---
title: JavaScript之setTimeout
date: 2017-09-15 09:52:23
tags: js
categories: essay
description: JavaScript的setTimeout
---

## JavaScript之setTimeout

由`setTimeout`引发的一些了解 -> 事件循环机制、异步队列、时钟周期、执行上下文

> js里常见的2个定时器：`setTimeout` 和 `setInterval`，指定一定时间后触发其第一个参数函数(异步回调函数)然后执行函数体内的代码发生一些操作、变化....


e.g.1
```js
setTimeout(function(){console.log(4)},0);
new Promise(function(resolve){
    console.log(1)
    for( var i=0 ; i<10000 ; i++ ){
        i==9999 && resolve()
    }
    console.log(2)
}).then(function(){
    console.log(5)
});
console.log(3);
// 输出结果：1 2 3 5 4
```

> Pormise，`Promise` 对象代表一个异步操作，它有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败），Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。

先看
```js
setTimeout(function () {
    console.log(123)
    }, 0);
```
在浏览器控制台可以看到好像确实是立马就输出123了。

先看下
```js
for (var i = 0; i < 1000; i++) {
    console.log(i);
}
setTimeout(function () {
    console.log('I am Here !');
}, 0);
```
这个很好理解，常规思维都是顺序执行，这个结果也是如常规思维所想。


再看（改变下顺序）：
```js
setTimeout(function () {
    console.log('I am Here !');
}, 0);
for (var i = 0; i < 1000; i++) {
    console.log(i);
}
```
在浏览器控制台执行，发现先输出的是`for`循环内的内容，无论循环条件里是1000还是100 或是 10，都是先执行的循环体最后执行的`setTimeout`


分析：首先代码被JS解释引擎(如V8)顺序加载解释并执行，到遇到`setTimeout`函数时，会将其第一个function参数函数放入异步队列排队等待线程空闲后再按照队列顺序执行。

`new Promise`是第一个参数是一个同步函数，`new Promise` 最终返回的结果是一个`promise`对象， `.then()`方法也是异步的，所以代码执行到此处时会将`.then()`的回调函数放入一个异步队列，当`new Promise`返回的`promise`达到fulfilled状态时且当前线程空闲时就会执行`.then()`内的异步回调函数输出结果5, 再接着执行`console.log(3);` 控制台输出3。

最后当前JS线程已将代码遍历完并执行完，然后获取异步队列的内回调函数，这里关键在于：为什么先执行的是`new Promise`返回的`Promise`对象的`.then()`里的方法而不是`setTimeout`里的参数函数。因为浏览器或webview的时间钟，时间钟是由机器硬件的时间周期决定(CPU时钟周期)。


总结：js主线程在执行当前代码这个线程手里，当前线程只有空闲后，才回去处理事件队列，虽然`setTimeout` 设定的时间已到，但是也得等队列里所有代码已执行完毕，最后才处理`setTimeout`里的东西。



```js
setTimeout("console.log('test!')", 1000); 
alert('主线程挂起！');
```

执行试试。必须要等待用户点击确认按钮后才会继续执行。

因为alert挂起了主线程，使得当前主线程被block(同样的函数还是`prompt()`, `confirm()`)，主线程被挂起，整个当前执行js的进程进入等待状态，事件触发或代码执行都被中断，计时器也会**暂停计时** ，当主线程恢复后，余下的代码继续执行，计时器安装时钟周期重新开始计时。


再看外国网站的例子[JakeArchibald.com]
e.g.2

```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

//promise链式调用
Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');

```

> 运行输出：
```bash
 script start
 script end
 promise1
 promise2
 setTimeout
```

> `Promise`对象经过`resolve`后的`.then` 是异步的. 所以promise1 和 promise2的输出会在第3、4行输出；(setTimtout是因为 异步队列+系统时钟周期导致最后被执行--即当前线程空闲时)

进一步修改示例
e.g.3

```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

new Promise(function(resolve){console.log(123)}).then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
```

运行后输出：
```bash
script start
123
script end

setTimeout
```

再修改：
e.g.4
```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

let promise = new Promise(function(resolve, reject){
        console.log("执行了new Promise里的resolve");
        resolve(123);
    });

promise.then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
}).then(function(){
    console.log('promise 3');
});

console.log('script end');
```

```bash
#输出：
script start
执行了new Promise里的resolve
script end
promise1
promise2
promise 3
setTimeout

```

> 这是因为 `new Promise()`里接受一个函数参数`function(resolve,reject)`用来执行异步执行成功或失败后的处理逻辑。

```js
let promise = new Promise(function(resolve, reject){
    if(value/*success */){
        resolve(value);
    }else{
        reject(value);
    }
});

promise.then(function(successValue){
    console.log(successValue); // 此函数可以接收resolve过来的对象。此处：打印resole过来的值
}, function(failInfo){
    console.log(failInfo); // 打印错误信息
});
```

> `new Promise()`里的参数函数，在代码被执行到此处时可以认为是**同步执行**的，其返回的Promise对象使用.then链式调用时其内的函数是被**异步执行**。

参考:
https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
https://github.com/abbshr/abbshr.github.io/issues/32

http://www.jianshu.com/p/063f7e490e9a [Promise基础]


