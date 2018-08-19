---
title: CentOS upgrade Git
date: 2017-03-20 11:46:31
tags: git
categories: write
description: CentOS6.5升级git至最新版
---

## CentOS6.5升级Git[编译方式]

### 卸载旧版git
```bash
git --version
# 1.7.X

#卸载
yum remove git
```

### 下载/解压源码

```bash
wget https://github.com/git/git/archive/v2.9.2.tar.gz

#解压
tar zxvf v2.9.2.tar.gz
cd git-2.9.2
```

### 编译、安装

```bash
make configure
./configure --prefix=/usr/local/git --with-iconv=/usr/local/libiconv
make all doc
sudo make install install-doc install-html
```

`make configure`产生Makefile文件并进行编译

`./configure --prefix=/usr/local/git` 通过configure命令对安装进行控制，将git安装到`/usr/local/git`目录下。

`make all doc` 编译生成doc文件

`sudo make install install-doc install-html` 安装程序文件

### 环境变量配置

```bash
sudo vim /etc/profile

export PATH=/usr/local/git/bin:$PATH

source /etc/profile # 生效修改
```

```bash
git --version
#git version 2.9.2
```

> 如果机器部署了其它需要依赖Git的服务(比如：GitLab、git、gogs等)，升级后，需要重启下服务。本机安装的gogs在升级git后未重启服务进入项目就会提示`An error has occurred : exec: "git": executable file not found in $PATH` 错误信息.



