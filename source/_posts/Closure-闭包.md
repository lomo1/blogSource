---
title: Closure-闭包
date: 2016-06-21 11:50:56
tags: [js]
categories: study
description: 闭包相关
---

## 闭包

> 总结下闭包相关知识，记录下笔记.

### JS里的闭包

```js
//闭包函数
function Counter() {
  let k = 0;

  return function() {
    return ++k;
  };
}

var counter = new Counter();

console.log(couner()); //输出：1
console.log(couner()); //再次输出：2
console.log(counter();); // ..输出：3
// ....
```

> 闭包： 保留局部变量不被JavaScript的GC回收♻️ 的代码块(通常是函数),称其为闭包。


`var counter = new Counter();`  

创建counter对象，第一次`console.log(counter());`时输出为1，counter()调用了Counter内的匿名函数，该匿名函数对Counter内部的局部变量k进行了引用，局部变量k在counter()调用完毕后(函数执行完毕后) 并未被GC回收，从而产生了闭包。

该闭包的作用保留了局部变量k的值在内存中。


闭包的作用：创造一些函数私有的"持久化变量"。将函数内的局部变量值保存在内存中(函数执行完毕后该变量不被GC回收)。

闭包的创造条件：

①存在内、外两层函数。

②内层函数对外层函数内的局部变量进行了引用。

#### 闭包用途

将函数内局部变量持久化，例如：将ajax返回的值进行持久化，便于在ajax封装的函数外调用返回的值等.

做缓存示例参考：
http://taobaofed.org/blog/2017/03/16/javascript-functional-programing/


#### 闭包弊端

由于变量持久化，这些持久化的变量一直存在于对象(除非关闭当前浏览器标签或结束对应进程)，否则会造成内存浪费。
所以需要额外的手动清理机制。

