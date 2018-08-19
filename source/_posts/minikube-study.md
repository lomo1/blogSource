---
title: 迷你版k8s
date: 2018-03-17 23:57:23
tags: [docker, k8s]
categories: study
description: 迷你版Kubernetes(k8s)
---

### 关于Kubernets

> 一个流行的容器编排引擎、自动化容器操作的开源平台。

主要是针对集群，包含但不限于：对容器的部署、调度、节点集群扩展等等功能。


### 关于minikube

> 迷你版minikube（来自阿里云）。方便本地部署学习Kubernetes(k8s)。

### 安装minikube

#### 预置

> 以Mac OSX上实验为例。

1> 安装Kubectl 

Kubectl安装直接使用`brew`即可。

参考： https://kubernetes.io/docs/tasks/kubectl/install/?spm=a2c4e.11153940.blogcont221687.19.7dd57733VzYIPy

2> 安装VM(Virtual Box虚拟机)

官网下载`.dmg`文件双击安装即可。

3> minikube

```bash
# 执行以下命令即可
curl -Lo minikube http://kubernetes.oss-cn-hangzhou.aliyuncs.com/minikube/releases/v0.26.1/minikube-darwin-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
```

<div align="center">
    <img src="https://gitee.com/uploads/images/2018/0518/000555_415e4353_1120068.png">
</div>

4> 启动

> minikube默认使用virtual box启动本地 Kubernetes 环境（利用本地虚拟机部署 Kubernetes环境）。所以前面要求安装VM，否则执行到该步骤会报错.

```bash
# terminal exec
minikube start --registry-mirror=https://registry.docker-cn.com
``` 

此时，会看到控制台下载了一些镜像文件。

<div align="center">
    <img src="https://gitee.com/uploads/images/2018/0517/192017_cfe6328c_1120068.png">
</div>

下载完后：

<div align="center">
    <img src="https://gitee.com/uploads/images/2018/0517/193332_430b4643_1120068.png">
</div>


5> 启动web UI(Dashboard)

```bash
minikube dashboard
```

执行后，会自动打开浏览器跳至URL `http://192.168.99.100:30000/#!/overview?namespace=default`

如图:

<div align="center">
    <img src="https://gitee.com/uploads/images/2018/0517/193743_2b725ce3_1120068.png">
</div>


### 最后

通过控制台`console`发现，`minikube`前端是使用`Angular`开发(1.6.6版本，😁)

后续继续研究 `k8s` ... ... 