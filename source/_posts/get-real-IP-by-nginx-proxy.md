---
title: get real IP by nginx proxy
date: 2016-06-22 10:16:06
tags: [nginx]
categories: study
description: Nginx反向代理后如何获取客户端真实IP
---

## Nginx反向代理后如何获取客户端真实IP

```bash
# 部分
location ~ \.php$ {
        proxy_pass http://xxxx.x.xxx.xx:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
```

> 如果只有一层Nginx代理，则添加如上的 `proxy_set_header` 配置后，使用`$_SERVER['HTTP_X_REAL_IP']` 即可获取客户端真实IP地址。

通过`var_dump($_SERVER);`查看报头信息，可以看到多了2项目： `HTTP_X_REAL_IP` 和 `HTTP_X_FORWARDED_FOR`。

<div align="center">
    <img src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/server_ip.png" />
</div>

另：

>PHP内置了web服务器，便于本地开发调试。

要求：PHP version >= 5.4
本地服务器启动：

```bash
php -S localhost:8000
```

本地启动后：
```bash
PHP 7.0.15 Development Server started at Thu Jun 22 10:39:52 2017
Listening on http://localhost:8000
Document root is /Users/lomo
Press Ctrl-C to quit.
[Thu Jun 22 10:39:57 2017] ::1:59794 [404]: / - No such file or directory
[Thu Jun 22 10:39:58 2017] ::1:59795 [404]: /favicon.ico - No such file or directory
```

