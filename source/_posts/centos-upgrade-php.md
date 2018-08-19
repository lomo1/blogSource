---
title: centos upgrade php
date: 2016-10-25 09:32:14
tags: [CentOS, PHP]
categories: read
---

## CentOS 升级PHP

### 卸载、删除旧依赖

  1. 查看系统版本，方便后边选择对应的包

    `lsb_release -a`

  2. 停止服务

    `service httpd stop`

  3. 卸载安装包

    `看图⬇`

    ![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/uninstall-old-php.png)

    删除依赖
    ![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/rpm-dependencies.png)

    删除一些其它相关包
    ![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/delete-others.png)

### 更新安装源

```bash
	Centos 5.X：
		rpm -Uvh http://mirror.webtatic.com/yum/el5/latest.rpm
	CentOs 6.x
		 rpm -Uvh http://mirror.webtatic.com/yum/el6/latest.rpm
	CentOs 7.X
		rpm -Uvh https://mirror.webtatic.com/yum/el7/epel-release.rpm
		rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm

```

### 安装制定版本PHP

```bash
 ##5.5版本PHP
  yum install php55w.x86_64 php55w-cli.x86_64 php55w-common.x86_64 php55w-gd.x86_64 php55w-ldap.x86_64 php55w-mbstring.x86_64 php55w-mcrypt.x86_64 php55w-mysql.x86_64 php55w-pdo.x86_64
 ##5.6版本PHP
  yum install php56w.x86_64 php56w-cli.x86_64 php56w-common.x86_64 php56w-gd.x86_64 php56w-ldap.x86_64 php56w-mbstring.x86_64 php56w-mcrypt.x86_64 php56w-mysql.x86_64 php56w-pdo.x86_64
 ##7.0版本PHP
  yum install php70w.x86_64 php70w-cli.x86_64 php70w-common.x86_64 php70w-gd.x86_64 php70w-ldap.x86_64 php70w-mbstring.x86_64 php70w-mcrypt.x86_64 php70w-mysql.x86_64 php70w-pdo.x86_64
```

### 安装FPM
```bash
 ## 选择对应版本即可
 	yum install php55w-fpm 
	yum install php56w-fpm 
    yum install php70w-fpm
```


