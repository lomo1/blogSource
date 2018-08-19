---
title: Establish Git Repository By Gogs
date: 2016-03-10 16:22:55
tags: [gogs, git]
categories: essay
description: 快速搭建一个Git仓库服务系统
---

## 搭建内网Git仓库

### Introduce
快速搭建内网或公司内部版的GitHub?

> Gogs, Google版GitHub. Gogs基于Go语言开发.
> Gogs 的目标是打造一个最简单、最快速和最轻松的方式搭建自助 Git 服务。使用 Go 语言开发使得 Gogs 能够通过独立的二进制分发，并且支持 Go 语言支持的 所有平台，包括 Linux、Mac OS X、Windows 以及 ARM 平台

> 一个树莓派的硬件配置即可使用Gogs快速搭建Git服务系统，便捷、快速、节省成本！！！

### 本地尝鲜

本地Mac系统先使用。

1. 下载Mac系统对应的Gogs版本并解压.

2. cd进入解压出来的目录.

3. 运行./gogs web 即可, 默认端口为3000, 打开http://localhost:3000 即可访问、注册、登录进行体验.

### CentOS 上安装

> CentOS 6.5/64bit

1. 下载对应CentOS架构的Gogs二进制安装包

2. 解压安装包

3. 进入解压后目录，./gogs web & 运行即可访问.

> 上述方式运行方式需要一直保持当前session窗口激活状态，如果关闭窗口，则运行的服务就被停止无法访问。

> 解决方案：

①. 使用nohup 进行后台运行命令即可。

②. 配置命令如下：
```bash
cd /data/website/gogs
nohup ./gogs web &
```

③. 关于nohup

> 在使用nohup命令的时候，经常由于输出nohup.out的路径没有写入权限，而无法使用nohup
<br>
4. 配置alias

`alias gogs="nohup /data/website/gogs/./gogs web &" `


### 配置Email服务

> 如果首次安装时未配置email服务，则可按照如下配置进行。
<br>

1. 第一步

>找到 `/custom/conf`目录，找到该目录下的app.ini文件，修改其配置即可，具体配置如下：

```bash
[mailer]
ENABLED = true  # 必须开启 设置为true
HOST = smtp.exmail.qq.com:465 #对应邮箱服务设置里找此配置项
FROM = xxx@qq.com
USER = xxx@qq.com
PASSWD = 邮箱密码或授权码

[service]
## 要求注册用户必须验证邮箱
REGISTER_EMAIL_CONFIRM = true
## 激活该选项来发送通知邮件给关注者，例如创建 issue 时
ENABLE_NOTIFY_MAIL     = true
## 激活该选项来禁止用户注册功能，只能由管理员创建帐号
DISABLE_REGISTRATION   = false
## 激活该选项以在用户注册时要求输入验证码
ENABLE_CAPTCHA         = true
## 激活该选项来要求用户必须登录才能浏览任何页面
REQUIRE_SIGNIN_VIEW    = true

```

<br>
2. 第二步

> 重启服务, 必须重启gogs服务!!!

> 以git账户运行. 

【ssh登录后默认的是root账户，所以需要su git 切换至git账户，然后再切换回root账户，su root， 输入roor账户密码；输入alias  gogs即可】

测试邮件激活服务：

重新注册账号，进入新注册邮箱，查看激活邮件。

![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/gogs-confirm-email.png)

点击链接， 确认激活即可。

查看数据库字段，再次确认是否激活。

> 未启动mailer之前，注册账号默认都是激活的, `is_active`字段默认为1.

![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/gogs-db-actived.png)


### CentOS 升级Gogs
1. 查看更新log决定是否更新：
> https://gogs.io/docs/intro/change_log

2. 官网下载最新Gogs二进制安装包
> https://gogs.io/docs/installation/install_from_binary

3. 备份旧版本整个gogs文件夹(以备不测)，解压新版本gogs
> 按照官网说法，只需要删除旧版本的templates文件夹，并用最新版本的templates覆盖，经过测试，是有问题和bug的，所以现小记自己的升级更新之笔记.

4. 经过上述操作完毕后, 可以单独备份/gogs根目录下的以下文件夹(alternative):
> 二进制可执行文件 gogs/gogs 
> [ 如果服务启动运行中,需要停止服务,否则会提示 'Text file busy'导致无法拷贝粘贴文件,使用 fuser /xx/xx/filename 查看进程ID并kill -9 ID即可 ]
> gogs/public 文件夹
> gogs/templates 文件夹
> gogs/scriptes 文件夹

5. 备份完毕，用最新版的对应文件替换上面备份过的文件夹即可。
> **二进制gogs可执行文件一定要更新，否则nohup.out文件里会提示相应错误**

6. 说明:
> templates 存放的都是前端模板 .tmpl文件，用来渲染数据
> public里面存的是最新样式相关资源js/css/img等, 【更新时需要同时更新，避免使用了新的CSS资源导致页面显示问题】
> 更新这些文件夹，基本不用kill之前开启的gog服务进程, 直接覆盖即可.

![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/gogs_upgrade_bk.png)

7. push

当push文件较大时，提示错误

```bash
error: RPC failed; HTTP 413 curl 22 The requested URL returned error: 413 Request Entity Too Large
fatal: The remote end hung up unexpectedly
....
fatal: The remote end hung up unexpectedly
```

解决办法：
使用ssh地址。

git remote remove xx(http://开头的)

git remote add xxx2(ssh地址)


或：

修改Nginx配置, 使其支持大文件传输：

`client_max_body_size 50m;`

参考：
http://stackoverflow.com/questions/7489813/github-push-error-rpc-failed-result-22-http-code-413/15021750#15021750
