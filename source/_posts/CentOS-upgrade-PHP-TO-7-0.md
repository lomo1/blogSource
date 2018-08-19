---
title: CentOS upgrade PHP TO 7.0
date: 2017-02-10 11:39:06
tags: PHP
categories: write
description: CentOS升级PHP5.6到7.0
---

## 记录CentOS6.5升级PHP7.0

### 检查系统版本
```bash
cat /etc/centos-release

# CentOS release 6.5 (Final)
```

### 卸载旧版本
```bash
yum list installed |grep php

	php56w.x86_64           5.6.30-1.w6     @webtatic
	php56w-cli.x86_64       5.6.30-1.w6     @webtatic
	php56w-common.x86_64    5.6.30-1.w6     @webtatic
	php56w-gd.x86_64        5.6.30-1.w6     @webtatic
	php56w-ldap.x86_64      5.6.30-1.w6     @webtatic
	php56w-mbstring.x86_64  5.6.30-1.w6     @webtatic
	php56w-mysql.x86_64     5.6.30-1.w6     @webtatic
	php56w-odbc.x86_64      5.6.30-1.w6     @webtatic
	php56w-pdo.x86_64       5.6.30-1.w6     @webtatic
	php56w-soap.x86_64      5.6.30-1.w6     @webtatic
	php56w-xml.x86_64       5.6.30-1.w6     @webtatic
	php56w-xmlrpc.x86_64    5.6.30-1.w6     @webtatic
```
卸载：
```bash
yum remove php56w.x86_64 php56w-cli.x86_64 php56w-common.x86_64 php56w-gd.x86_64 php56w-ldap.x86_64 php56w-mbstring.x86_64 php56w-mysql.x86_64 php56w-odbc.x86_64 php56w-pdo.x86_64 php56w-soap.x86_64 php56w-xml.x86_64 php56w-xmlrpc.x86_64
```

### 更新源

```bash
# CentOS/RHEL 7.x:
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm

#CentOS/RHEL 6.x:
rpm -Uvh https://mirror.webtatic.com/yum/el6/latest.rpm

```

### 安装

```bash
yum install php70w
```

其它模块[optional]
```bash
 yum install php70w-bcmath php70w-dba php70w-devel php70w-embedded php70w-enchant php70w-fpm php70w-gd php70w-imap php70w-interbase php70w-intl php70w-ldap php70w-mbstring php70w-mcrypt php70w-mysql php70w-mysqlnd php70w-odbc php70w-opcache php70w-pdo php70w-pdo_dblib php70w-pear php70w-pecl-apcu php70w-pecl-imagick php70w-pecl-xdebug php70w-pgsql php70w-phpdbg php70w-process php70w-pspell php70w-recode php70w-snmp php70w-soap php70w-tidy php70w-xml php70w-xmlrpc
```

一次性安装可能有冲突报错，根据所需模块，逐个安装即可。
```bash
yum install php70w-bcmath  #支持大整数计算模块
yum install php70w-imap
yum install php70w-fpm
yum install php70w-ldap
yum install php70w-mbstring php70w-mcrypt
```