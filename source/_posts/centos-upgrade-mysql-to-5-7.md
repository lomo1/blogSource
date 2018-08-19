---
title: centos upgrade mysql to 5.7
date: 2016-11-09 13:07:20
tags: [MySQL, upgrade, CentOS]
categories: essay
---

## CentOS升级LAMP之MySQL至5.7

### 清理、卸载旧版MySQL
```bash
$  yum list installed | grep mysql	
$  yum -y remove mysql *
```

### 添加CentOS的RPM源
```bash
# wget dev.mysql.com/get/mysql-community-release-el6-5.noarch.rpm
# yum localinstall mysql-community-release-el6-5.noarch.rpm
# yum repolist all | grep mysql
# yum-config-manager --disable mysql55-community
# yum-config-manager --disable mysql56-community
# yum-config-manager --enable mysql57-community-dmr
# yum repolist enabled | grep mysql
```

### 检查MySQL源安装是否成功
```bash
$  yum repolist enabled | grep "mysql.*-community.*"
```

### 安装MySQL
```bash
$  yum install mysql-community-server
```
安装完后会获得一个初始密码，先记下此密码，后边用。

或直接查询安装完成后生成的零时密码：

`grep 'temporary password' /var/log/mysqld.log`

或 使用 mysql_secure_installation 进行安全设置 修改/充值 root 密码


### 启动
```bash
$  service mysqld start
```

### 设置自启动
```bash
$  chkconfig --list | grep mysqld  ##查看是否自启动
$  chkconfig mysqld on
```

### ROOT账户相关

mysql5.7默认安装了密码安全检查插件（validate_password），默认密码检查策略要求密码必须包含：大小写字母、数字和特殊符号，并且长度不能少于8位。否则会提示ERROR 1819 (HY000): Your password does not satisfy the current policy requirements错误。

### 密码设定策略
```bash
$  show variables like '%password%';
```

### 添加远程登录MySQL用户

参考上一篇文章，同初次安装时的设定。

### 修改默认编码

MySQL更新升级完后，需要修改默认编码方式。

```bash
$  show variables like "%character%";
```

如图：

![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/mysql-default-character.png)

接着，

`vi /etc/my.cnf`

在[mysqld] 下添加：

```bash
  character_set_server=utf8 
  init_connect='SET NAMES utf8'
```

然后重启MySQL服务:

`service mysqld restart`

再次查看默认编码，已改为utf-8，如下图：

![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/mysql-character-modified.png)
