---
title: js operate date
date: 2016-05-26 10:53:55
tags: [js, date]
categories: study
description: JavaScript时间操作
---

## JS 关于时间的一些操作

> 为了正确，一般时间要求严格准确的操作、管理，都是在server端完成，某些情况下，也需要前端对时间的一些基本操作。

```js
var x = new Date(); // x -> Fri May 26 2016 10:56:33 GMT+0800 (CST), 注意这是CST时区
//然后就可以得到需要的格式，必须yyyy-MM-dd 年月日，yyyy-MM-dd hh:mm:ss 年月日时分秒格式...

x.getFullYear(); //年
x.getMonth() + 1; //中国时区的 月份
x.getDate();  // 这个月的几号
x.getHours(); //小时
x.getMinutes(); //分
x.getSeconds(); //秒

Math.floor((x.getMonth()+3)/3); //获得当前属于第几个季度

x.getMilliseconds(); //微秒

```

参考：

http://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html

