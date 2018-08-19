---
title: Linux安装PHP扩展小记
date: 2016-11-09 13:07:38
tags: [Linu, PHP, 扩展]
categories: study
---

## Linux 安装PHP扩展 手记

### 检查mysql拓展是否安装成功
```bash
$  php -i | grep mysql
```
### 自动安装.so库并配置php.ini
```bash
# 如安装mysql拓展 
  yum search mysql|grep php     
  #我们搜索到拓展名为 php-mysql.x86_64 
  sudo yum install php-mysql 
  #这样php-mysql拓展便安装好了
	
# 如果出现拓展版本和php版本冲突问题， 可安装如下任意yum源： 
  sudo yum install atomic-release.noarch 
  sudo yum install webtatic-release.noarch 
```

	这些源提供了其他版本的php拓展，同时每个源针对特定拓展都会提供多个版本，你只需安装一个源即可

### install

`php -v`

`yum search mysql|grep php`

如下：

![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/mysql-install.png)

```bash
$  yum install php55w-mysqlnd.x86_64
```

Done.


