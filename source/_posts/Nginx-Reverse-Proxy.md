---
title: Nginx Reverse Proxy
date: 2016-10-13 00:00:40
tags: [nginx]
categories: study
description: 使用Nginx进行反向代理
---

## Nginx反向代理使用小记

> 只有一台服务器，这台服务器上部署了LAMP服务环境，占用了默认的80端口，而且本服务器有域名映射到本机，可以方便地使用域名访问资源.

除了上述的服务外

Q1. 本服务器部署了go语言开发的服务，占用了3000端口，每次访问都需要domain:3000来访问，觉得很别扭，希望可以省略掉端口号!
(假设该服务器domain为:lomo.space), 期望可以以lomo.space/go这种URL去访问。

Q2. 在另一个虚拟主机上部署了Java web应用， 需要使用和这台主机同样的域名去访问此应用服务
期望可以以lomo.space/another来访问这个Java应用，而不是IP地址的形式访问。

> Q: 如何解决这2个需求、问题？

> A: Nginx

### 简介

Nginx是一个俄罗斯人开发的高性能、轻量级的HTTP服务器、反向代理(Reverse Proxy)服务器、电子邮件代理服务器.

Nginx最初是俄罗斯人为Rambler.ru站点开发的服务器, 那么第一呢？哈哈，第一当然是Yandex.ru(已合并第二大mail.ru)。

Nginx特点：内存占用少、并发能力强, 还开源！

所以很多大公司的web服务器都是基于Nginx二次开发，比如淘宝的Tengine.

其它更多介绍请看维基百科.

### 安装

#### mac安装

Mac上安装，在本地测试Nginx相关服务功能。
```bash
brew install nginx
```

安装成功后的信息类似如下：
```bash
	Docroot is: /usr/local/var/www
			
	The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
	nginx can run without sudo.
			
	nginx will load all files in /usr/local/etc/nginx/servers/.
			
	To have launchd start nginx now and restart at login:
			  brew services start nginx
	Or, if you don't want/need a background service you can just run:
			  nginx
			==> Summary
🍺  /usr/local/Cellar/nginx/1.10.3: 8 files, 980.9KB
```

根据这些提示信息就可以得出相关信息，比如安装路径，配置文件等。

①Nginx服务**安装**路径：

`/usr/local/Cellar/nginx/1.10.3`

②配置文件路径：

`/usr/local/etc/nginx/nginx.conf`

③服务器默认资源文件等路径: 

`/usr/local/var/www`

④Nginx 日志log存放路径：

`/usr/local/var/log/nginx`

##### 配置测试

安装完后，就可以直接启动， `nginx`直接启动即可。

本地访问 http://localhost:8080/ 即可看到相关提示信息。

修改配置文件：

`/usr/local/etc/nginx/nginx.conf` 将监听端口改为8081

重启：`nginx -s reload` 重新加载配置文件即可.

测试， http://localhost:8081/, 查看效果。

默认，OSX系统通过brew安装的Nginx，所有配置文件未分类，为了便于管理，在`/usr/local/etc/nginx` 单独创建一个`conf.d`文件夹用来管理所有server配置文件。

```bash
cd /usr/local/etc/nginx
mkdir conf.d
cd conf.d
touch default.conf 
# 在此文件中将/usr/local/etc/nginx目录下nginx.conf里的默认server配置剪切到default.conf文件中
```

修改`/usr/local/etc/nginx/nginx.conf`文件：
```bash
include /usr/local/etc/nginx/conf.d/*.conf;
#表示默认加载conf.d文件夹下的所有配置文件.
```

`nginx -s reload`， 重新打开localhost:8080即可看到一样ok !

在之前新建的conf.d文件夹下创建一个`test.conf`文件，并测试一个请求转发功能。

```bash
server{
    listen 8081;
    server_name localhost;
    location / {
        proxy_pass https://www.baidu.com/;
    }
}

# 使用请求转发，使得访问localhost:8081时(也就是在本机上访问这个域名，实际可页面显示的是proxy_pass域名里的页面，其所有功能不受影响)

#http://localhost:8081
```
本机访问 localhost:8081发现，可以直接访问百度首页！！！😁


#### Linux安装

以CentOS 6.5上安装为例。

##### yum安装

`/etc/yum.repos.d` 目录下，创建 `nginx.repo` 文件；

在此repo文件写入一下内容：
```bash
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
```

安装 `yum install nginx -y` 

安装完后，`nginx -v ` 显示版本号即Ok。

显示已安装的版本是：nginx/1.10.2

##### 源码安装

参考网上示例即可.

##### 配置测试

安装后，相关配置配件位于：
```bash
/etc/nginx/config.d   #文件夹下[主配置文件]
/etc/nginx/default.d  #[用户配置文件]
```

Nginx 启动路径: 
`/etc/init.d/nginx start`

由于Linux上安装的Nginx默认监听的是80端口，而本机器之前已经部署了LAMP服务环境，80端口已被占用。

修改配置文件：
`vim /etc/nginx/conf.d/default.conf`

将端口改为81测试，重启提示错误，报错信息类似如下：
`nginx: [emerg] socket() [::]:81 failed (97: Address family not supported by protocol`

将server下的第二行`listen [::]:81`， 重新启动，显示[OK]，即可访问http://domain:81，看到Nginx欢迎页面.

如图示:

<div align="center">
    <img src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/nginx-centos.png" width="75%"/>>
</div>


而本服务器是虚拟机，只有一个IP地址，无法使用IP来共存80端口。


##### 解决问题Q1&Q2

解决方案: 将Apache监听的默认80端口该为8080端口，所有应用服务前都加一层服务器Nginx，用Nginx来监听80端口，使用Nginx做转发和代理。

即：将Apache默认的80端口改为8080，使用Nginx 去监听默认的80端口，将所有静态资源html/css/js 的http请求全部打倒Nginx，使用Nginx去做转发静态资源请求到Apache的8080。

step1:

`vi /etc/httpd/conf/httpd.conf` 修改Apache配置监听端口。


step2:

修改Nginx配置。

完整配置文件如下：

```bash
server{
		listen 80;
		server_name lomo.space;
		#静态资源html/css/js
		location / {
		    proxy_pass http://lomo.space:8080;
		}
		#php应用
		location ~ \.php$ {
			proxy_pass http://lomo.space:8080;
		}
		#java应用
		location /another/ {
			proxy_pass http://anotherIP:端口/xxx/xx/xxxx.jsp;
		}
		#go应用
		location /go/ {
			proxy_pass http://lomo.space:3000/;
		}
	}

```

此时，直接访问 lomo.space，查看发现Http返回信息的server变为了Nginx.

当通过浏览器或curl该URL时，Nginx通过proxy_pass 打到apache的8080上。

#### 自定义Error Page

使用Apache自定义:

`vim /etc/httpd/conf/httpd.conf`

找到`ErrorDocument` 关键词，然后根据提示信息配置即可。

完毕。


