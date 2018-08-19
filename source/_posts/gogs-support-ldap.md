---
title: gogs support ldap
date: 2017-08-15 15:50:50
tags: [gogs, git, ldap]
categories: study
description: gogs版git仓库支持ldap
---

## 配置Gog支持LDAP登录

认证名称：随意写。

安全协议：选择-> `Unencrypted`


主机地址：(通常是一个内网IP地址)


主机端口：389(通常是)


绑定DN: 域管理员提供DN（如：LDAP.yunwei@xxxcompany.com）

绑定密码：(同上,和上面的对应)


用户搜索基准：（一般为：dc=xxx..xx,dc=com）


用户搜索基准：`(&(objectClass=user)(sAMAccountName=%s))`

管理员过滤规则：不用填

用户名属性：sAMAccountName（和搜索基准里的一致）


名字、姓氏属性都不用填写。。。



邮箱属性：mail



最后2项：
```bash
从 Bind DN 中拉取属性信息
该授权认证已经启用
```
全部勾选☑️。

保存或点击更新认证即可立刻生效。

登录时只需要使用域账号的前缀即可（不用谢@及其后缀）。


