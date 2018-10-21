---
title: general sql grammar
date: 2018-10-03 14:14:27
tags: mysql
categories: study
description: MySQL常见的一些函数使用
---

## MySQL内置函数

> 平时写 SQL 用(到)过的一些 MySQL 内置函数.

### 常见查询

e.g.1

`version` 表:

```bash
+-------------+---------------------+------+-----+---------------------+----------------+
| Field       | Type                | Null | Key | Default             | Extra          |
+-------------+---------------------+------+-----+---------------------+----------------+
| id          | bigint(20) unsigned | NO   | PRI | NULL                | auto_increment |
| project_id  | int(11)             | NO   |     | NULL                |                |
| version     | varchar(32)         | NO   |     | NULL                |                |
| build       | int(11)             | NO   |     | NULL                |                |
| stage       | varchar(32)         | NO   |     | NULL                |                |
| created_at  | timestamp           | NO   |     | CURRENT_TIMESTAMP   |                |
| released_at | timestamp           | NO   |     | 0000-00-00 00:00:00 |                |
| commit_hash | varchar(128)        | YES  |     | NULL                |                |
+-------------+---------------------+------+-----+---------------------+----------------+
8 rows in set (0.01 sec)
```

`project_id` 只有2个值 分别为 1、2 代表 `iOS` 和 `Android`.


Q:  从version表取出: 指定版本号(version)、阶段(stage)的最小build号对应的id

A: 查出结果集
```sql
select * from version where version='5.26.0' and stage='grey' order by build limit 1;
```

```bash
+----+------------+---------+-------+-------+---------------------+---------------------+------------------------------------------+
| id | project_id | version | build | stage | created_at          | released_at         | commit_hash                              |
+----+------------+---------+-------+-------+---------------------+---------------------+------------------------------------------+
| 37 |          2 | 5.26.0  |   898 | grey  | 2018-09-14 15:31:19 | 0000-00-00 00:00:00 | 369f6761d4a2162a96151799fd879509d34dfdeb |
+----+------------+---------+-------+-------+---------------------+---------------------+------------------------------------------+
```

只获取所需的 `id`

```sql
select v.id from (select * from version where version='5.26.0' and stage='grey' order by build limit 1) as v;
```

```bash
+----+
| id |
+----+
| 37 |
+----+
1 row in set (0.06 sec)
```

使用了 `select` 子查询. 注意子查询语句后的 `as` 语法.

#### 跨表查询(join)

> join 默认为 left join

e.g.2

现同一DB下有另一张 `table` 名为 `mr`, 结构如下:

```bash
mysql> desc mr;
+------------------+---------------------+------+-----+---------------------+-----------------------------+
| Field            | Type                | Null | Key | Default             | Extra                       |
+------------------+---------------------+------+-----+---------------------+-----------------------------+
| id               | bigint(20) unsigned | NO   | PRI | NULL                | auto_increment              |
| project_id       | int(11)             | NO   | MUL | NULL                |                             |
| mr_id            | int(11) unsigned    | NO   |     | NULL                |                             |
| version_id       | int(11)             | YES  |     | NULL                |                             |
| product_id       | int(11)             | YES  |     | NULL                |                             |
| testcase         | varchar(512)        | YES  |     | NULL                |                             |
| description      | text                | YES  |     | NULL                |                             |
| reject           | tinyint(11)         | NO   |     | 0                   |                             |
| failed           | tinyint(11)         | NO   |     | 0                   |                             |
| author           | varchar(64)         | NO   |     | NULL                |                             |
| title            | varchar(128)        | NO   |     | NULL                |                             |
| jira_key         | varchar(64)         | NO   |     |                     |                             |
| status           | varchar(32)         | YES  |     | NULL                |                             |
| changed_file     | int(11) unsigned    | NO   |     | NULL                |                             |
| additions        | int(11) unsigned    | NO   |     | NULL                |                             |
| deletions        | int(11) unsigned    | NO   |     | NULL                |                             |
| created_at       | timestamp           | NO   |     | CURRENT_TIMESTAMP   |                             |
| merged_at        | timestamp           | NO   |     | 0000-00-00 00:00:00 |                             |
| updated_at       | timestamp           | NO   |     | CURRENT_TIMESTAMP   | on update CURRENT_TIMESTAMP |
| total_review     | int(11)             | YES  |     | NULL                |                             |
| resolved_review  | int(11)             | YES  |     | NULL                |                             |
| pa_name          | varchar(32)         | YES  |     | NULL                |                             |
| bug_count        | int(11) unsigned    | NO   |     | 0                   |                             |
| severe_bug_count | int(11) unsigned    | NO   |     | 0                   |                             |
| bug_list         | text                | YES  |     | NULL                |                             |
+------------------+---------------------+------+-----+---------------------+-----------------------------+
25 rows in set (0.02 sec)
```

`mr` 表中的 `version_id` 字段和 `version`表中的 `id` 相等.

Q: 给定一个版本号(如: `5.26.0`)、且 `stage=grey`情况下 获取 `mr` 表中该版本该 `stage` 对应的数据.

```sql
select mr_id, jira_key, title, author,pa_name,changed_file,additions,deletions 
from mr where version_id in 
(select v.id from (select * from version where version='5.26.0' and stage='grey' order by build limit 1) as v);
```

子查询中使用了 `limit 1` 表示 只取 `version` 表中的最小的 `id`.

![指定查询](https://images.gitee.com/uploads/images/2018/1021/143847_975cf667_1120068.png "屏幕截图.png")

e.g.3

Q: 查询 `iOS` 所有版本的 `mr` 关键信息

A:

```sql
select distinct version.version as '版本号',sum(mr.changed_file) as '修改文件数', 
sum(mr.additions) as '新增代码行数', sum(mr.deletions) as '删除代码行数', 
pa_name from version left join mr on version.id=mr.version_id where mr.project_id=1 group by version;
```

```bash
+-----------+-----------------+--------------------+--------------------+-----------------+
| 版本号    | 修改文件数      | 新增代码行数       | 删除代码行数       | pa_name         |
+-----------+-----------------+--------------------+--------------------+-----------------+
| 4.24.0    |              44 |                242 |                 50 | smart-community |
| 4.24.1    |               1 |                 29 |                  0 | NULL            |
| 4.25.0    |              31 |                177 |                115 | community       |
| 4.25.1    |              43 |                199 |                141 | community       |
| 4.26.0    |             366 |               7897 |               3083 | community       |
| 4.26.1    |             127 |                776 |                339 | community       |
| 4.26.2    |              10 |                 53 |                 10 | community       |
| 4.26.3    |               0 |                  0 |                  0 | community       |
| 4.27.0    |             376 |               5241 |               2321 | mobile-platform |
| 4.27.1    |              63 |                838 |                561 | NULL            |
| 4.28.0    |             424 |               1117 |              15794 | community       |
+-----------+-----------------+--------------------+--------------------+-----------------+
11 rows in set (0.03 sec)
```

e.g.4

Q: 以pa_name 为维度 查询某个Android grey阶段 某个版本 （如: `version='5.26.0' , stage='grey' , project_id=2`） mr 表中的关键信息.

A:

```sql
select count(mr_id) as 'MR 数',pa_name as 'PA',sum(changed_file) as '修改文件数', 
sum(additions) as '新增代码行数', sum(deletions) as '删除代码行数' 
from mr where version_id in (select v.id from 
(select * from version where version='5.26.0' and stage='grey' and project_id=2 order by build limit 1) as v) 
group by pa_name;
```

结果集:
```bash
+--------+-----------------+-----------------+--------------------+--------------------+
| MR 数  | PA              | 修改文件数      | 新增代码行数       | 删除代码行数       |
+--------+-----------------+-----------------+--------------------+--------------------+
|      3 | commercial      |               3 |                  3 |                  3 |
|      6 | community       |              19 |               3821 |                 18 |
|      1 | mobile-platform |               1 |                  1 |                  1 |
|      1 | smart-community |               1 |                  1 |                  1 |
+--------+-----------------+-----------------+--------------------+--------------------+
4 rows in set (0.02 sec)
```

#### 合并查询(union)

现有另一张表 `diff`, 其中某些字段类型 和 `mr` 表的一些字段(pa_name, changed_file, additions, deletions)含义类似. 结构如下:

```bash
mysql> desc diff;
+------------------+---------------------+------+-----+-------------------+-----------------------------+
| Field            | Type                | Null | Key | Default           | Extra                       |
+------------------+---------------------+------+-----+-------------------+-----------------------------+
| id               | bigint(20) unsigned | NO   | PRI | NULL              | auto_increment              |
| project_id       | int(11)             | NO   |     | NULL              |                             |
| module_name      | varchar(64)         | NO   |     | NULL              |                             |
| version_from     | varchar(128)        | YES  |     |                   |                             |
| version_to       | varchar(128)        | YES  |     |                   |                             |
| version_id       | int(11)             | NO   |     | NULL              |                             |
| product_id       | int(11)             | YES  |     | NULL              |                             |
| testcase         | varchar(512)        | YES  |     | NULL              |                             |
| description      | text                | YES  |     | NULL              |                             |
| reject           | tinyint(11)         | NO   |     | 0                 |                             |
| failed           | tinyint(11)         | NO   |     | 0                 |                             |
| author           | varchar(64)         | NO   |     | NULL              |                             |
| jira_key         | varchar(64)         | NO   |     |                   |                             |
| changed_file     | int(11) unsigned    | YES  |     | 0                 |                             |
| additions        | int(11) unsigned    | YES  |     | 0                 |                             |
| deletions        | int(11) unsigned    | YES  |     | 0                 |                             |
| created_at       | timestamp           | NO   |     | CURRENT_TIMESTAMP |                             |
| updated_at       | timestamp           | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
| pa_name          | varchar(32)         | YES  |     | NULL              |                             |
| severe_bug_count | int(11) unsigned    | NO   |     | 0                 |                             |
| bug_count        | int(11) unsigned    | NO   |     | 0                 |                             |
| bug_list         | text                | YES  |     | NULL              |                             |
+------------------+---------------------+------+-----+-------------------+-----------------------------+
22 rows in set (0.02 sec)
```

Q: 现需要获取, Android 某个版本(如: 5.26.0) 灰度(stage=grey) 所有 `mr` 与 `diff` 表中的 `changed_file, additions, deletions` 总和 结果以 `pa_name` 升序排列.

A:

```sql
select t.pa_name as 'PA', sum(t.changed_file) as '修改文件数', 
sum(t.additions) as '新增代码行数', sum(t.deletions) as '删除代码行数' 
from (select version_id,pa_name,changed_file, additions, deletions 
from mr union all select  version_id,pa_name, changed_file, additions, deletions from diff) t
where t.version_id in 
(select v.id from 
(select * from version where version='5.26.0' and stage='grey' and project_id=2 order by build limit 1) as v) 
group by t.pa_name;
```

```bash
+-----------------+-----------------+--------------------+--------------------+
| PA              | 修改文件数      | 新增代码行数       | 删除代码行数       |
+-----------------+-----------------+--------------------+--------------------+
| commercial      |               4 |                  4 |                  4 |
| community       |              19 |               3821 |                 18 |
| mobile-platform |               1 |                  1 |                  1 |
| smart-community |              59 |               2061 |                220 |
+-----------------+-----------------+--------------------+--------------------+
4 rows in set (0.02 sec)
```

涉及到 `union all` 组合查询.

`union` 会把重复的记录从结果集中去除掉;
`unoin` 会把所有的记录返回, 所以效率比上一个高.

### 常见时间日期操作

现有 `downtime` 表, 结构如下:

```bash
mysql> desc downtime;
+----------------+---------------------+------+-----+---------------------+----------------+
| Field          | Type                | Null | Key | Default             | Extra          |
+----------------+---------------------+------+-----+---------------------+----------------+
| id             | bigint(20) unsigned | NO   | PRI | NULL                | auto_increment |
| downtime_id    | varchar(128)        | NO   |     | NULL                |                |
| title          | varchar(128)        | NO   |     | NULL                |                |
| author         | varchar(32)         | NO   |     | NULL                |                |
| status         | varchar(32)         | NO   |     | NULL                |                |
| level          | varchar(32)         | NO   |     | NULL                |                |
| introduce_type | varchar(32)         | NO   |     | NULL                |                |
| end_type       | varchar(32)         | NO   |     | NULL                |                |
| teams          | text                | YES  |     | NULL                |                |
| start_time     | timestamp           | NO   |     | CURRENT_TIMESTAMP   |                |
| end_time       | timestamp           | NO   |     | 0000-00-00 00:00:00 |                |
| created_at     | timestamp           | NO   |     | 0000-00-00 00:00:00 |                |
| updated_at     | timestamp           | NO   |     | 0000-00-00 00:00:00 |                |
+----------------+---------------------+------+-----+---------------------+----------------+
13 rows in set (0.02 sec)
```

e.g.1

Q: 以 `level` 为维度统计本年度(2018) `downtime` 表中的故障信息

A:

```sql
select count(*) as '数量', level as '等级', year(created_at) as '创建时间' 
from downtime where year(created_at)=2018 group by level, year(created_at) order by level, year(created_at) asc;
```

```bash
+--------+--------+--------------+
| 数量   | 等级   | 创建时间     |
+--------+--------+--------------+
|     36 | P0     |         2018 |
|     66 | P1     |         2018 |
|     97 | P2     |         2018 |
|     67 | P3     |         2018 |
|     42 | P4     |         2018 |
|      5 | P5     |         2018 |
+--------+--------+--------------+
6 rows in set (0.29 sec)
```

使用了 内置的  `year` 函数. `year` 函数根据 表中存储的时间戳(如: '2018-08-28 14:58:00'), `year(2018-08-28 14:58:00)` 返回 `2018`.

e.g.2

Q: 求本年度downtime平均时长

使用 `TIMESTAMPDIFF` 来计算两个时间段之间的差值.

这个mysql中的函数 可以用来计算2个时间段差值。第一个参数是精确单位： YEAR/ MONTH/QUARTER/WEEK/DAY/HOUR/MINUTE/SECOND/FRAC_SECOND

> FRAC_SECOND: 毫秒

A:

```sql
select avg(TIMESTAMPDIFF(HOUR, start_time, end_time)) from downtime where year(created_at)=2018;
```

e.g.3

Q: 以周为维度统计本年度 downtime 信息(P2 +)

A:

```sql
select concat('第', week(created_at,1), '周') as 'Week', count(*) as '新增 Downtime 数量', 
sum(if(level in ('P0', 'P1', 'P2'), 1, 0)) as '新增 P2 以上 Downtime 数量' 
from downtime where year(created_at)=2018 group by week(created_at,1);
```

使用 week函数，第二个参数 1 代表 从每周从 Monday开始计算(mysql默认无参数表示从 sunday周日 算起 为一周开始).

```bash
+----------+------------------------+----------------------------------+
| Week     | 新增 Downtime 数量     | 新增 P2 以上 Downtime 数量       |
+----------+------------------------+----------------------------------+
| 第2周    |                      5 |                                2 |
| 第3周    |                     10 |                                5 |
| 第4周    |                      6 |                                6 |
| 第5周    |                      7 |                                2 |
| 第6周    |                      3 |                                1 |
| 第9周    |                      4 |                                2 |
| 第10周   |                      8 |                                6 |
| 第11周   |                      3 |                                1 |
| 第12周   |                      8 |                                2 |
| 第13周   |                      5 |                                3 |
| 第14周   |                     10 |                                4 |
| 第15周   |                     10 |                                7 |
| 第16周   |                      7 |                                5 |
| 第17周   |                      9 |                                7 |
| 第18周   |                      3 |                                3 |
| 第19周   |                      9 |                                7 |
| 第20周   |                     10 |                                6 |
| 第21周   |                     11 |                                8 |
| 第22周   |                      9 |                                8 |
| 第23周   |                     10 |                                6 |
| 第24周   |                      8 |                                6 |
| 第25周   |                      9 |                                6 |
| 第26周   |                     10 |                                7 |
| 第27周   |                     13 |                               10 |
| 第28周   |                     10 |                                9 |
| 第29周   |                      5 |                                5 |
| 第30周   |                      8 |                                5 |
| 第31周   |                     15 |                                8 |
| 第32周   |                      8 |                                4 |
| 第33周   |                      7 |                                2 |
| 第34周   |                      5 |                                2 |
| 第35周   |                     13 |                                9 |
| 第36周   |                      4 |                                2 |
| 第37周   |                      8 |                                6 |
| 第38周   |                     14 |                                7 |
| 第39周   |                     13 |                                9 |
| 第41周   |                      6 |                                5 |
| 第42周   |                     10 |                                6 |
+----------+------------------------+----------------------------------+
38 rows in set (0.03 sec)
```

e.g.4

Q: 以月为维度统计本年度 downtime 信息(P2 +)

A:

```sql
select concat('第', month(created_at), '月') as 'Month', count(*) as '新增 Downtime 数量', 
sum(if(level in ('P0', 'P1', 'P2'), 1, 0)) as '新增 P2 以上 Downtime 数量' 
from downtime where year(created_at)=2018 group by month(created_at);
```

使用 `month` 函数， 该函数默认返回的是当前时间对应的月份(数字 1~12)

`monthname函数` 函数可以获得对应的英文格式的月份.

A:

```sql
select monthname(created_at) as 'Month', count(*) as '新增 Downtime 数量', 
sum(if(level in ('P0', 'P1', 'P2'), 1, 0)) as '新增 P2 以上 Downtime 数量' 
from downtime where year(created_at)=2018 group by month(created_at)
```

结果集:

```bash
+-----------+------------------------+----------------------------------+
| Month     | 新增 Downtime 数量     | 新增 P2 以上 Downtime 数量       |
+-----------+------------------------+----------------------------------+
| January   |                     26 |                               14 |
| February  |                      7 |                                3 |
| March     |                     26 |                               13 |
| April     |                     36 |                               23 |
| May       |                     40 |                               31 |
| June      |                     39 |                               26 |
| July      |                     44 |                               33 |
| August    |                     39 |                               20 |
| September |                     40 |                               25 |
| October   |                     16 |                               11 |
+-----------+------------------------+----------------------------------+
10 rows in set (0.28 sec)
```

e.g.5

Q: 以季度为维度统计本年度 downtime 信息(P2 +)

A:

```sql
select concat('Q-', quarter(start_time)) as '季度', count(start_time) as '新增 Downtime 数量', 
sum(if(level in ('P0', 'P1', 'P2'), 1, 0)) as '新增 P2 以上 Downtime 数量' 
from downtime where year(start_time)=2018 group by quarter(start_time);
```

结果集:

```bash
+--------+------------------------+----------------------------------+
| 季度   | 新增 Downtime 数量     | 新增 P2 以上 Downtime 数量       |
+--------+------------------------+----------------------------------+
| Q-1    |                     68 |                               36 |
| Q-2    |                    115 |                               83 |
| Q-3    |                    113 |                               69 |
| Q-4    |                     10 |                                8 |
+--------+------------------------+----------------------------------+
4 rows in set (0.03 sec)
```

季度统计，主要使用 `quarter` 函数.

MySQL时间日期函数参考: http://wiki.jikexueyuan.com/project/mysql/useful-functions/time-functions.html
