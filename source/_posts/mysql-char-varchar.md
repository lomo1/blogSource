---
title: mysql char&varchar
date: 2016-08-03 11:55:38
tags: mysql
categories: study
description: MySQL中的char和varchar
---

## MySQL之CHAR与VARCHAR

> 无论是`char(M)`还是`varchar(M)`，其M均值字符数/字长.

`char(M)`类型，每个存储的值都会占据M个字节的空间，如果存入的数据长度小于定义的M字节空间，那么实际存储时也会占M个字节空间。实际数据与预定义长度相比较多出来的字节长度MySQL会在其右边用空格字符补充从而使每个存储的数据所用空间都为`M`个字节。

`varchar(M)`类型，该类型的数据列里，每个值只占用其数据实际长度，并不会被MySQL使用空格填充剩余的空间。


参考：
http://www.cnblogs.com/Lance--blog/p/5193027.html


另：

> SQL对大小写不敏感。SQL默认数据列类型都是有符号的，若有符号需要添加 `unsigned` 关键字。

> `char(M)` , M <= 255, char最大范围是255， 存储汉字最长为127个汉字。

> `varchar(M)`, M <= 65535, 由于记录的限制，最大为65532.
因为需要1-2个字节来保存信息(null)。故若允许存储null则`varchar`最大长度位65532；不允许null则为65533。