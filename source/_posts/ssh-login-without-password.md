---
title: ssh login without password
date: 2016-10-18 17:13:51
tags: [SSH, Login]
categories: program
---

## SSH远程免密码登录Linux主机

A为本地主机(即用于控制其他主机的机器) ;

B为远程主机(即被控制的机器Server), 假如ip为100.73.21.32 ;

A和B的系统都是Linux。

### A机器

在A机器(本地机器)上：

  First,

`$ ssh-keygen -t rsa`

连续三次回车,即在本地生成了公钥和私钥,不设置密码;

    Second,

`$ ssh root@你的Linux主机IP地址 "mkdir .ssh"  ##输入密码`

    Third,

`scp ~/.ssh/id_rsa.pub root@你的Linux主机IP地址:.ssh/id_rsa.pub ##输入密码`

在B机器(远端Linux)上:

### 在B机器

`touch /root/.ssh/authorized_keys`

`cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys`
    
将id_rsa.pub的内容追加到authorized_keys 中;


### A机器

返回A机器终端：

`ssh root@远端机器IP` 

成功登陆！

也可以在本地机器加入alias，如：

`alias clientTools="ssh root@IP地址`







