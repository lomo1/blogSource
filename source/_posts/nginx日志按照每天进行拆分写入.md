---
title: nginx日志按照每天进行拆分写入
date: 2016-09-21 11:59:36
tags: nginx
categories: write
description: Nginx日志按日期进行拆分写入
---

## Nginx日志拆分

系统环境：
CentOS 6.5

```bash
nginx -v 
#nginx version: nginx/1.10.2

which nginx
#/usr/sbin/nginx

locate nginx.pid
#/var/run/nginx.pid

```

### 辅助工具-crontab

> crontab命令常见于Unix和Linux的操作系统之中，用于设置周期性被执行的指令

Install 
```bash
yum -y install vixie-cron
yum -y install crontabs
```

> vixie-cron 软件包是 cron 的主程序；crontabs 软件包是用来安装、卸装、或列举用来驱动 cron 守护进程的表格的程序。

常用命令：
```bash
service crond start     #启动服务
service crond stop      #关闭服务
service crond restart   #重启服务
service crond reload    #重新载入配置
service crond status    #查看crontab服务状态
```

添加进程为系统服务：
```bash
chkconfig --level 345 crond on
```

常用命令：
```bash
proj-21-032:~ # crontab -h
crontab: invalid option -- 'h'
crontab: usage error: unrecognized option
usage:	crontab [-u user] file
	crontab [-u user] [ -e | -l | -r ]
		(default operation is replace, per 1003.2)
	-e	(edit user's crontab)
	-l	(list user's crontab)
	-r	(delete user's crontab)
	-i	(prompt before deleting user's crontab)
	-s	(selinux context)
```

`crontab -e` 进入编辑模式；


### 准备Nginx日期拆分脚本

```bash
#假定拆分脚本文件及其存放位置：/etc/init.d/nginx_log.sh

#!/bin/bash
# 设置日志文件存放目录
logs_path="/var/log/nginx/"
# 设置pid文件
pid_path="/var/run/nginx.pid"

# 重命名日志文件
mv ${logs_path}access.log ${logs_path}access_$(date -d "yesterday" +"%Y%m%d").log
# 向nginx主进程发信号重新打开日志
kill -USR1 `cat ${pid_path}`
```
> `pid_path` 通过locate 命令查找，很多版本、安装方式不一致导致位置可能不太一样！

> `kill -USR1 `cat ${pid_path}` ` 命令是为了`mv`完成后向nginx发出信号重新打开日志文件并创建一个新的access.log文件用于记录本日的日志... 当时间达到今晚24点后又被mv了，如此循环备份。


将该脚本加入定时任务管理`crontab`中。

```bash
crontab -e

#进入edit界面配置脚本任务

*/5 * * * * /usr/sbin/ntpdate 100.65.0.1  >> /dev/null 2>&1
*/2 * * * * /bin/bash /etc/titanagent/agent_update_exception.sh >> /var/log/titanagent/check.o.log 2>> /var/log/titanagent/check.e.log
*/2 * * * * /bin/bash /etc/titanagent/agent_monitor.sh >> /var/log/titanagent/edog.o.log 2>> /var/log/titanagent/edog.e.log
1 * * * * /bin/bash /etc/titanagent/agent_update.sh >> /var/log/titanagent/check.o.log 2>> /var/log/titanagent/check.e.log

# Nginx日志拆分脚本
00 00 * * * /bin/bash  /etc/init.d/nginx_log.sh

```
> 每天 24点/零点整进行日志拆分.

crontab其它时间日期指令可参考：

http://www.cnblogs.com/longjshz/p/5779215.html





