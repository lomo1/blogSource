---
title: k8s-app
date: 2018-12-12 23:07:49
tags: k8s
categories: study
description: K8S之应用部署[三]
---

## K8S学习笔记之应用部署

### 前置

核心相关知识点

![concept](https://user-images.githubusercontent.com/18479611/70387580-b4361280-19e1-11ea-8592-317ec7c3db8e.png)

Kubernetes集群（Cluster）也采用了典型的“主-从”架构。一个集群主要由管理组件（Master）和工作节点（Node）组件构成.

#### Master

Master组件提供所有与管理相关的操作，例如调度、监控、支持对资源的操作等。

Master会通过Node Controller来定期检查所管理的Node资源的健康状况，完成Node的生命周期管理.

#### Node

Node是实际工作的计算实例（在1.1之前版本中名字叫做Minion）。节点可以是虚拟机或者物理机器，在创建 Kubernetes 集群过程中，都要预装一些必要的软件来响应Master的管理。

Node节点有几个重要的属性:

`地址信息`、`阶段状态`、`资源容量`、`节点信息`

1. 地址信息包括：
  
- 主机名（HostName）：节点所在系统的主机别名，基本不会用到；
- 外部地址（ExternalIP）：集群外部客户端可以通过该地址访问到的节点；
- 内部地址（InternalIP）：集群内可访问的地址，外部往往无法通过该地址访问节点。

2. 段状态包括：

- 待定（Pending）：新创建节点，还未就绪状态，需要进一步的配置；
- 运行中（Running）：正常运行中的节点，可被分配Pod，会定期汇报运行状态消息；
- 终止（Terminated）：节点已经停止，处于不可用状态，判断条件为5分钟内未收到运行状态消息。

3. 资源容量：
+ 包括常见操作系统资源：
 - 如CPU、内存、最多存放的Pod个数等

4. 节点信息：
- 包括操作系统内核信息
- Kubernetes版本信息
- Docker 引擎版本信息等，会由kubelet定期汇报

#### 资源对象

1. 核心资源

- 容器组（Pod）：由位于同一节点上若干容器组成，彼此共享网络命名空间和存储卷（Volume）。Pod是Kubernetes中进行管理的最小资源单位，是最为基础的概念。跟容器类似，Pod是短暂的，随时可变的
- 服务（Service）：若干（往往是同类型的）Pod形成的对外提供某个功能的抽象，不随Pod改变而变化，带有唯一固定的访问路径， 如IP地址或者域名
- 复制控制器（Replication Controller）：负责启动Pod，并维护其健康运行的状态。是用户管理Pod的句柄
- 部署（Deployment）：创建Pod，并可根据参数自动创建管理 Pod的复制控制器，并且支持升级。1.2.0版本引入提供比复制控制器更方便的操作
- 横向Pod扩展器（Horizontal Pod Autoscaler，HPA）：类似云里面的自动扩展组，根据Pod的使用率（典型如CPU）自动调整一个部 署里面Pod的个数，保障服务可用性

2. 辅助概念

- 注解（Annotation）：键值对，可以存放大量任意数据，一般用来添加对资源对象的详细说明，可供其他工具处理
- 标签（Label）：键值对，可以标记到资源对象上，用来对资源进行分类和筛选
- 名字（Name）：用户提供给资源的别名，同类资源不能重名
- 命名空间（Namespace）：这里是指资源的空间，避免不同租户的资源发生命名冲突，另外可以进行资源限额
- 持久卷（PersistentVolume）：类似于Docker中数据卷的概念，就是一个数据目录，Pod对其有访问权限
- 秘密数据（Secret）：存放敏感数据，例如用户认证的口令等
- 选择器（Selector）：基于标签概念的一个正则表达式，可通过标签来筛选出一组资源
- Daemon集（DaemonSet）：确保节点上肯定运行某个Pod，一般用来采集日志和监控节点
- 任务（Job）：确保给定数目的Pod正常退出（完成了任务）
- 入口资源（Ingress Resource）：用来提供七层代理服务
- 资源限额（Resource Quotas）：用来限制某个命名空间下对资源的使用，开始逐渐提供多租户支持
- 安全上下文（Security Context）：应用到容器上的系统安全配置，包括uid、gid、capabilities、SELinux角色等
- 服务账号（Service Accounts）：操作资源的用户账号

### nginx 服务

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

### 相关命令

Q：创建 pod

A：命令：`kubectl apply -f nginx-pod.yaml`

Q：创建 service

A：命令：kubectl apply -f nginx-nodePort.yaml 发布该 service
  假设 service的 nginx-nodePort.yam文件如下
```yaml
		apiVersion: v1
		kind: Service
		metadata:
		  name: k8s-test-nginx-service
		spec:
		  selector:
		    app: nginx-pod
		    env: test
		  ports:
		    - port: 80			# 服务端口, 内部可访问
		      targetPort: 8080		# 目标端口, 此处指的是pod的8080端口
		      nodePort: 30080		# 节点端口, 外部可访问
		      protocol: TCP
		  type: NodePort
```

Q：删除 service

A：假设 service 创建时使用的是 nginx-nodePort.yaml，则删除时，直接：

> kubectl delete -f nginx-nodePort.yaml

Q：卸载 kubernets

A：kubeadm reset


### 部署方式

1. 传统方式

手动安装, 需要解决各种证书、依赖等等的问题

2. 简单的部署方式 （Kubeadm）

一种实现自我管理的方式，包括 k8s 本身自己。

Kubeadm 工具，k8s 官方提供的集群部署管理工具。

K8s 的组件均以容器方式运行。

Master 结点上的 4 个组件：

```bash
scheduler
Controller manage
Api server
Etcd
```

上述 master 四个组件也运行在 POD 上（静态 POD。

![image](https://user-images.githubusercontent.com/18479611/70387545-3b36bb00-19e1-11ea-9f6f-578246126925.png)

3. 一键部署(脚本)工具参考:

`kubeasz` 工具

<https://github.com/easzlab/kubeasz>

4. 生产环境部署

部署规模化生产环境的需求，推荐使用 `kops` 或者 `SaltStack` 这样更复杂的部署工具(根据张磊老师推荐)
