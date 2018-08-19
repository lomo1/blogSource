---
title: LAMP开发环境搭建[手记]
date: 2016-09-21 15:05:46
tags: [centOS, Linux, LAMP, PHP, MySQL, Apache]
categories: write
---
## LAMP开发环境
    硬件：VPS
    系统环境：CentOS 6.5
    
## Apache安装
```bash
$ yum install httpd httpd-devel
```
控制台有提示y/n时，输入y回车等待安装完成即可。
### 启动ApApache
`/etc/init.d/httpd start`
如果此时提示错误，像下图所示：
![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/start-error.png)

  【解决方案：
     `vi /etc/httpd/conf/httpd.conf`

     去掉 #注释，把domain改为localhost. (默认：www.example.com)

将Apache设置为开机启动：
`chkconfig httpd on`


## MySQL安装
```bash
$  yum install mysql mysql-server mysql-devel
```

### 启动MySQL：
`/etc/init.d/mysqld start`

### 设置密码
`mysql`

`use mysql`

`UPDATE user SET Password=PASSWORD('root') WHERE user='root';`

以上方法设置MySQL的密码可能无效(本地机器远程连接此VPS的数据库时)


方案2：

登录此远程机器，执行MySQL安全配置：
`mysql_secure_installation`

如图：

![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/mysql-secure.png)

接着按照控制台提示输入root密码；

其它选项修改见以下截图配置，包括：匿名登录、是否允许从远端以root账户登录该数据库等。

![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/mysql-other-settings.png)

### 创建远程登录账户
```bash
$  CREATE USER '用户名'@'%' IDENTIFIED BY '密码';
$  GRANT ALL PRIVILEGES ON *.* TO '用户名'@'%';
```
完成创建，即可远程以非root账户登录该数据库，访问其全县范围内的资源。



## PHP安装
```bash
$  yum install php php-mysql php-common php-gd php-mbstring php-mcrypt php-devel php-xml 
```

### Apache配置：

配置Apache使其支持解析PHP类文件

`vi /etc/httpd/conf/httpd.conf`

如下图：

![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/apache-config-PHP.png)

重启Apache：

`/etc/init.d/httpd restart`


### web/php默认文件目录修改

`vi /etc/httpd/conf/httpd.conf`

默认存放目录为：`/var/www/html` , 将httpd.conf文件中的该目录修改为自己需要的目录即可。

给自己创建的文件目录加权：`chmod -R 755 路径`

重启Apache。

在自定义的目录下，创建PHP测试文件，以此来测试Apache是否可以正确加载并解释PHP。

`cd 自定义目录`

`touch phpinfo.php`

`vim phpinfo.php`

`<?php   phpinfo();  ?>`



### 后记

LAMP 常见安装路径

#### Apache
```bash
如果采用RPM包安装，安装路径应在 /etc/httpd目录下
apache配置文件:/etc/httpd/conf/httpd.conf
Apache模块路径：/usr/sbin/apachectl
web目录:/var/www/html
如果采用源代码安装，一般默认安装在/usr/local/apache2目录下
```

#### PHP
```bash
如果采用RPM包安装，安装路径应在 /etc/目录下
php的配置文件:/etc/php.ini
如果采用源代码安装，一般默认安装在/usr/local/lib目录下
php配置文件: /usr/local/lib/php.ini
或/usr/local/php/etc/php.ini

```

#### MySQL
```bash
如果采用RPM包安装，安装路径应在/usr/share/mysql目录下
mysqldump文件位置：/usr/bin/mysqldump
mysqli配置文件:
/etc/my.cnf或/usr/share/mysql/my.cnf
mysql数据目录在/var/lib/mysql目录下
如果采用源代码安装，一般默认安装在/usr/local/mysql目录下
```