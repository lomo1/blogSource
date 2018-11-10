---
title: stored procedure
date: 2018-10-10 22:50:32
tags: [sql, mysql]
categories: study
description: 存储过程
---

## 存储过程

### 定义

存储过程，类似程序语言的一组/系列 实现特定功能的 `SQL` 组合(包含了常见的 SQL 语句、基本的流程控制, if else、 case when then、concat 等等).

它经过编译后存储在数据库中, 以后不需要再次编译而可以直接调用(call).

存储过程的格式类似函数, 有名字、参数.

常用的 `MySQL`, 其存储过程的定义有三种参数类型: `in`, `out`, `inout`

### 创建/使用/删除

创建:

```sql
-- # 关键字 create 和 procedure
create procedure sp_xxName()
begin
-- # ...
-- # ...
end
```

调用:

`call sp_xxName()`, 调用时 存储过程名后面必须加 `()`, 无论其定义时是否有参数.

删除:

`drop procedure sp_xxName()`

查看:

`show procedure status`

> 显示数据库中所有存储的存储过程基本信息，包括所属数据库，存储过程名称，创建时间等

`show create procedure sp_name`

> 显示某一个mysql存储过程的详细信息

### 示例

以 `MySQL` DBMS 为例.

e.g.1 不带参数的存储过程

创建一个简单(不带参数)的存储过程：

`create procedure sp_test() select 1;`

查看创建的这个存储过程：

`show create procedure sp_test;`

![sp_test](https://images.gitee.com/uploads/images/2018/1110/230726_dccf1593_1120068.png "sp_test.png")

调用存储过程：

`call sp_test();`

![call_sp_test](https://images.gitee.com/uploads/images/2018/1110/230812_cc13cc8c_1120068.png "call_sp_test.png")


e.g.2 带输入参数

输入参数(in关键字)，调用存储过程时必须要传入该参数，且存储过程中修改该参数的值不能被返回.

> DELIMITER原本就是“；”的意思，因此用这个命令转换一下“；”为“//”，这样只有收到“//”才认为指令结束可以执行.

创建一个带参数的存储过程:

```sql
delimiter //
create procedure sp1_test(in p int)
comment ' insert into value '
begin
declare v1 int;
set v1 = p;
Insert into test(id) values(v1);
end //
```

![sp1_test](https://images.gitee.com/uploads/images/2018/1110/231005_f92c1435_1120068.png "sp1_test.png")

调用存储过程：

`call sp1_test(1); //`


e.g.3(带输出参数)
	
> 关键字out，表示该参数值 在 存储过程内部 改变并返回该值；
	
创建存储过程:
```sql
create procedure sp2_test(out p int)
DETERMINISTIC
begin
select max(id) into p from test;
end //
```

调用:

必须要加 **@** 符号！

`call sp2_test(@max); //`

![sp2_test](https://images.gitee.com/uploads/images/2018/1110/231213_18c1d2ed_1120068.png "sp2_test.png")

获取调用后的结果:

`select @max; //`

![调用后的结果](https://images.gitee.com/uploads/images/2018/1110/231256_f2e43a40_1120068.png "调用后的结果.png")


e.g.4 (带输入输出参数)

创建:

```sql
drop procedure if exists sp3_test //

create procedure sp3_test(in p int , out s int)
begin
if p = 1 then
set @v = 111;  // 与declare 声明变量方式类似，该方式必须在变量名前加@
else
set @v = 333;
end if;

insert into test(id) values(@v);
select max(id) into s from test;

end //
```

调用:

`call sp3_test(1, @res1); //`

获取调用后的结果:

```bash
select @res1; //
+-------+
| @res1 |
+-------+
|   212 |
+-------+
1 row in set (0.00 sec)
```

结果不是111，因为表中之前已存的最大数是212。

![test表](https://images.gitee.com/uploads/images/2018/1110/231522_8e8e2215_1120068.png "test表.png")


`Call sp3_test(3, @res2); //`

获取存储过程返回值:

```sql
mysql> select @res2; //
+-------+
| @res2 |
+-------+
|   333 |
+-------+
1 row in set (0.00 sec)
```

e.g.5(同时作输入输出参数的存储过程)：

`drop procedure if exists sp4_test //`

创建:

```sql
create procedure sp4_test(inout s int)
begin
if s = 100 then
set @v = 1000;
else
set @v = 999;
end if;  /* 必须加分号 */
select @v;

end //
```

调用:

```sql
-- #先设定变量：

set @x = 100; //
Set @x2 = 1;
call sp4_test(@x); //
```

![输入图片说明](https://images.gitee.com/uploads/images/2018/1110/231815_f7b44a23_1120068.png "屏幕截图.png")

![输入图片说明](https://images.gitee.com/uploads/images/2018/1110/231835_2500e1cd_1120068.png "屏幕截图.png")


