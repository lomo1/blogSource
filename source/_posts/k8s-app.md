---
title: k8s-app
date: 2019-12-12 23:07:49
tags: k8s
categories: study
description: K8S之应用部署[三]
---

## K8S学习笔记之应用部署

> 默认情况下, 集群对外暴露的端口范围为 30000 ~ 32767 之间.

以 `Nginx` 为例, 创建 nginx-pod.yaml 文件:

```yaml
apiVersion: v1      # 描述文件所遵循KubernetesAPI的版本
    kind: Pod           # 描述的类型是pod
    metadata:
    name: nginx-pod   # pod的名称
    labels:           # 标签
      app: nginx-pod
      env: test
    spec:
      containers:
        - name: nginx-pod     # 容器名
        image: nginx:1.15   # 镜像名称及版本
        imagePullPolicy: IfNotPresent   # 如果本地不存在就去远程仓库拉取
        ports:
          - containerPort: 80   # pod对外端口
      restartPolicy: Always
```

在 `master/cluster` 节点上执行:

```bash
kubectl apply -f /path/to/nginx-pod/yaml
```

查看:

> kubectl get pods -o wide

![all-pods](https://user-images.githubusercontent.com/18479611/70387047-4be43280-19db-11ea-8f4d-d15461f39e7c.png)

如何在集群外访问该服务？

方式1(端口转发):

> kubectl port-forward --address 0.0.0.0 nginx-pod 9999:80

访问 <http://192.168.56.104:9999/>

![nginx-visit-screenshot](https://user-images.githubusercontent.com/18479611/70387064-86e66600-19db-11ea-98f6-50cbba2c06da.png)

很容易发现， 通过端口转发的方式只适合本地测试使用,一旦 `port-forward` 的进程终止后, 服务就无法访问了.

当然通过 `nohup` 等类似方式实现进程后台运行也可以, 但是终究不够优雅, 这也不是官方推荐的, `prod` 环境下, 更不推荐如此的使用!
