---
title: MySQL restore autoincrement id
date: 2016-08-03 19:22:40
tags: mysql
categories: study
description: MySQL重置数据表、自增ID
---

## MySQL重置表

### 重置的2种方式
1. 
```bash
#删除tableName表的所有数据
delete * from tableName;
```

2. 
```bash
#将jsonT表的数据删除并将自增ID置为初始值。
truncate table jsonT;
```

> `DBCC CHECKIDENT (jsonT,NORESEED, uid);`  DBCC操作不适用MySQL， MS的SQL Server未验证.

### 比较

`truncate` 和 `delete` 都会清空已保存的数据。

`truncate` 比 `delete` 速度要快，但truncate删除后不记录mysql日志，不可以恢复数据。



