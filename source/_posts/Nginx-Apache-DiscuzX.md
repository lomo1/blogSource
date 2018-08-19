---
title: Nginx+Apache+DiscuzX
date: 2017-03-04 19:41:24
tags: [nginx, discuzX]
categories: study
description: 基于Apache+Nginx在Linux上搭建PHP的bbs
---

## Nginx反向代理PHP应用

### 缘由

> 在Linux上搭建基于PHP应用discuzX, 由于之前使用的是LAMP+Nginx, Nginx做前端与后端Apache服务的中间层，所以现在搭建的这个PHP应用，使用http:///www.xxxxx.com/xxplatform/discuz 去访问时，只有首页可以正常。

当使用http:///www.xxxxx.com:8080/xxplatform/discuz , 去访问站点的资源时就正常。

so, 这就是问题，然后解决。

### 解决方案

在Nginx配置文件`xxx.conf`文件中加入以下配置：

```bash
location ~ /xxplatform/discuz {
	    proxy_pass http://IP:8080;
	    proxy_set_header Host $host;  #必须！
}
```

重启Nginx, `nginx -s reload`, 刷新服务器查看即可。

`proxy_set_header`，必须要设置，否则会发现页面中js/img/csss等很多相对路径的资源的host还是代理之前的。

`proxy_set_header`, 自定义http消息中的头，然后传送给后端真实的服务器(这里即解释PHP程序的Apache)。

通过这种方式设置后，后端程序获取客户端的地址就永远是Nginx层所在服务器的地址了。

例如：
```php
$ip = getenv("REMOTE_ADDR");
echo $ip;
```
> 以本环境为例，通过Nginx代理隐藏了Apache的8080端口后，访问：
http://domainxxx.com:8080/testip.php, 获取到的IP是来访者的真实IP，这种访问时未经过Nginx层。

http://domainxxx.com/testip.php, 经过Nginx代理后，隐藏了端口，访问经过了Nginx，http发生了变化，此时获取的客户IP是Nginx所在IP。

这段PHP获取来访者用户真实IP地址，在Apache层前未使用Nginx时，可以获得，但是使用Nginx后就获取的是Nginx服务层所在地址。那么如何解决呢？

后续~~


