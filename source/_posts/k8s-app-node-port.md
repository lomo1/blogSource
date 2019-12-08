---
title: k8s-app-node-port
date: 2018-12-18 22:09:37
tags: k8s
categories: study
description: K8S之应用部署[四]
---

## K8S 应用部署之 NodePort

使用 `run` 命令直接创建一个简单的 `deployment`:

> kubectl run nginx-deployment --image=nginx

需要控制台会输出一些提示:

```bash
kubectl run --generator=deployment/apps.v1 is DEPRECATED and will be removed in a future version. Use kubectl run --generator=run-pod/v1 or kubectl create instead.
deployment.apps/nginx-deployment created
```

提示, `run` `deployment` 的方式未来会被舍弃掉.

查看  pods:

![image](https://user-images.githubusercontent.com/18479611/70387256-20167c00-19de-11ea-809f-ca07609e011d.png)

第一个即为刚创建的 pod. 第二个是之前测试 yml 方式创建的 pod（只是一个 pod, 具体参照 nginx-pod.yml 文件）

查看 `deployments`:

> kubectl get deployment -o wide

![image](https://user-images.githubusercontent.com/18479611/70387264-36bcd300-19de-11ea-9d88-495e20c63d7e.png)

查看 `svc`:

> kubectl get svc

![image](https://user-images.githubusercontent.com/18479611/70387279-4a683980-19de-11ea-9d4f-09220132b9ca.png)

目前还只有一个之前 `kubernetes` 这一个.

查看 `rs`:

> kubectl get rs

![image](https://user-images.githubusercontent.com/18479611/70387288-6e2b7f80-19de-11ea-8ebb-73827716d5d9.png)

### 负载均衡

1. 修改 `replicas` 的方式。

```bash
kubectl scale --replicas=2 deployment/nginx-deployment
# output
deployment.apps/nginx-deployment scaled
```

查验 `rs` 和 `pods`:

![image](https://user-images.githubusercontent.com/18479611/70387320-e72ad700-19de-11ea-98e2-e92f30b481b2.png)

查看 `deployments`, 也变为2个了 (`kubectl get deployments`)

注意: 这时删除 `pod` 时，直接删除 pod 会触发 replicas 的确保机制, 从而导致删除 pod 失败. 正确做法是直接删除 pod 对应的 deployment.

2. 通过 svc

```bash
kubectl expose deployment nginx-deployment --port=30001 --target-port=80
# 输出
service/nginx-deployment exposed
# 查看
kubectl get svc 或 kubectl get services
# 输出
NAME               TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)     AGE
kubernetes         ClusterIP   10.96.0.1       <none>        443/TCP     14d
nginx-deployment   ClusterIP   10.100.28.184   <none>        30001/TCP   4s
```

> kubectl get pod -o wide

输出

```bash
NAME                                READY   STATUS    RESTARTS   AGE     IP             NODE         NOMINATED NODE   READINESS GATES
nginx-deployment-6c94df7599-gdcdn   1/1     Running   0          3m42s   192.168.1.23   k8s-node01   <none>           <none>
nginx-deployment-6c94df7599-nhp7g   1/1     Running   0          7m7s    192.168.1.22   k8s-node01   <none>           <none>
nginx-pod                           1/1     Running   1          14d     192.168.1.19   k8s-node01   <none>           <none>
```

> Cluster-ip 是集群内部分配的地址，通过 curl 10.100.28.184:30001 即可访问.

此时, 还不能在集群外访问内部的服务.

### 对外服务

编辑 `deployment` 的类型:

> kubectl edit svc nginx-deployment

![edit-deployment](https://user-images.githubusercontent.com/18479611/70387379-a8e1e780-19df-11ea-8f22-9c1e15963544.png)

`tpye` 默认是 **ClusterIP**.

保存后, 可以看到控制台输出: `service/nginx-deployment edited`

注：保存后，在无语法错误的前提下，该文件会被修改，如，里面的 nodePort: 30260, 即为集群对外暴露的访问端口，30001 是集群内访问端口号.

```bash
# 查看 svc:
kubectl get svc -o wide

# 输出：
NAME               TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)           AGE     SELECTOR
kubernetes         ClusterIP   10.96.0.1       <none>        443/TCP           14d     <none>
nginx-deployment   NodePort    10.100.28.184   <none>        30001:30260/TCP   3m27s   run=nginx-deployment
```

当然, pod/deployment 也可以 edit.

> kubectl edit deployment nginx-deployment
> kubectl edit pod nginx-pod

测试访问:

![image](https://user-images.githubusercontent.com/18479611/70387413-037b4380-19e0-11ea-8947-e3e6eb6766a7.png)

### 资源对象创建方式

1. `Run` 命令，通常是通过命令行方式去创建。

> kubectl run nginx-deployment --image=nginx:1.7.9 --replicas=2

2. `Apply` 方式

> kubectl apply -f nginx.yaml

`Nginx.yml` 文件内容：

```yaml
			apiVersion: extensions/v1beta1 #api的版本
			kind: Deployment          #资源的类型
			metadata:                 #资源的元数据
			  name: nginx-deployment  #资源的名称
			spec:                     #资源的说明
			  replicas: 2             #副本2个，缺省为1
			  template:               #pod模板
			    metadata:             #pod元数据
			      labels:            #标签
			        app: web_server    #标签选择器
			    spec:
			      containers:
			      - name: nginx
			        image: nginx:1.79
```

`kubectl apply` 不但能够创建 Kubernetes 资源，也能对资源进行更新。

Kubernets 还提供了几个类似的命令，例如 `kubectl create`、`kubectl replace`、`kubectl edit` 和 `kubectl patch`

#### 比较

1. 基于命令的方式：

  简单直观快捷，上手快。

  适合临时测试或实验

2. 基于配置文件的方式:

    配置文件描述了 具体是什么，即应用最终要达到的状态。

    配置文件提供了创建资源的模板，能够重复部署。

    可以像管理代码一样管理部署。

    适合正式的、跨环境的、规模化部署。

    这种方式要求熟悉配置文件的语法，有一定难度.
