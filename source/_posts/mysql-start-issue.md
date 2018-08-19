---
title: mysql start issue
date: 2017-04-03 23:39:41
tags: mysql
categories: study
description: mysql在Mac上无法启动问题解决
---

## MySQL在Mac上无法启动

> warning: The /usr/local/mysql/data directory is not owned by the 'mysql' or '_mysql' user.

如图： 

<div align="center">
    <img src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/mysql-issue.png" width="75%" />
</div>


解决办法：

`sudo chown -R _mysql:wheel /usr/local/mysql/data`

重新启动MySQL即可。