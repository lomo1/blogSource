---
title: docker deploy
date: 2018-12-02 19:12:08
tags: docker
categories: study
description: Docker 应用部署问题记录
---

## Docker 部署问题记录

> 主要是针对容器内应用网络访问问题的一次小记.

### 缘由

由于种种缘由，使用了一个开源的 BI 服务 ( Metabase )。起初，该服务在测试环境部署时毅然选择了当下主流技术：Docker。测试环境部署以及使用了一段时间后，产生了一些数据，这些数据也需要随之迁移至线上环境。该服务写了一个数据在宿主机的磁盘上，以 `.db` 文件的形式存在。

### 上线过程折腾

#### 镜像迁移

将测试环境的容器镜像 `commit` 出来一个新的镜像，然后将该镜像部署至线上机器的容器中。

```bash
sudo docker ps -a

# commit 镜像
sudo docker commit e7afe xx/xx-bi
    sha256:49f050dcb3 ... ...

# 保存镜像
sudo docker save -o /home/xx/xx-bi.tar xx/xxxx-bi

```

然后，将新 `commit` 出来的镜像 `.tar` 包文件弄出来，什么 `scp`, `ftp` 之类的。

当然使用 `docker save`后保存的文件再被 download 时可能提示权限问题，使用 `chmod` 命令解决即可。

> 推荐使用 docker save/load, 使用 docker export/import 可能有一些问题，二期导出来的包内容也不一样，可自行比较。

#### 镜像部署

机器：xxxx

线上域名：xxx.xx.com

将上面的镜像搞到线上机器后，使用 `docker load` 命令将该镜像加载.

Nginx 配置：

```json
upstream ${server_name} {
    server xxx.xxx.com:3000;
}
```

然后，创建容器，启动。

```bash
sudo docker run -d -p 3000:3000 -v ~/metabase-data:/metabase-data -e "MB_DB_FILE=/metabase-data/metabase.db" --name 容器名 镜像名

```

#### 坑的排除

> `sudo docker ps -a` 可以看到启动的容器，但是该服务链接数据库时，就是链接不上 ！！！

进入容器，`sudo docker exec -it xxx /bin/bash`, `ping` 数据库发现无法连通。但是在测试环境该方式是正常的。

怀疑环境隔离问题，新搞一个 `mysql` 容器服务来测试一下.

`mysql` 镜像直接使用阿里的即可，参考：https://www.cnblogs.com/loovelj/p/7823093.html

启动该容器，进入容器内使用 `mysql` 链接时，发现还是无法链接。查看官方文档了解到 `docker network`: https://docs.docker.com/network/

重新创建一个 `mysql` 容器服务，并指定 `network`, `--net host`, 成功链接。

最后，删除原来的容器服务，重新创建容器并指定 `network`, 至此问题解决。


