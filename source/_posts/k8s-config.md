---
title: k8s-config
date: 2018-12-10 22:31:26
tags: k8s
categories: study
description: k8s之集群初始化&配置[二]
---

## K8S 学习笔记之--集群配置

> 借助 kubeadm 这一工具快速完成搭建与学习.

### 安装初始化工具

主要是: kubeadm, kubelet, kubectl （所有机器上都需要）

创建 `repo` 源:

```repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
```

安装:

> yum install -y kubelet kubeadm kubectl --disableexcludes=kubernetes

![image](https://user-images.githubusercontent.com/18479611/70376288-4981ca00-1942-11ea-972a-1bf115d5e1b7.png)

启动初始化工具并设定随机启动:

> systemctl enable kubelet && systemctl start kubelet

解除防火墙限制:

```bash
vi /etc/sysctl.d/k8s.conf

# 加入以下内容
net.bridge.bridge-nf-call-ip6tables = 1 net.bridge.bridge-nf-call-iptables = 1

# 刷新配置使其生效
sysctl --system
```

![image](https://user-images.githubusercontent.com/18479611/70376344-07a55380-1943-11ea-88b9-5376a45301ac.png)


预下载/拉取镜像（Master 机器执行):

> kubeadm config images list # 查看集群初始化所需镜像及依赖版本号

![image](https://user-images.githubusercontent.com/18479611/70376349-2572b880-1943-11ea-9651-e3289921ff0d.png)

一般会失败，需要手动拉取，从阿里云拉取。使用脚本统一一次性拉取:

```bash
mkdir scripts
vi k8s_base_image.sh

```

脚本具体内容: <https://gitee.com/lomospace/k8s/blob/master/scripts/k8s_base_image.sh>

执行脚本:

```bash
cd scripts
. k8s_base_image.sh # 或 source k8s_base_image.sh
```

![image](https://user-images.githubusercontent.com/18479611/70376401-a6ca4b00-1943-11ea-9a94-fe8cfe0ec62d.png)

通过 `kubeadm config images pull` 确认镜像拉取成功:

![image](https://user-images.githubusercontent.com/18479611/70376414-c6fa0a00-1943-11ea-8b5b-40d987a8471d.png)

### 初始化 kubeadm(master)

```bash
kubeadm init --kubernetes-version=v1.16.2 --apiserver-advertise-address=192.168.56.104 --pod-network-cidr=192.168.0.0/16
```

报错了:
![image](https://user-images.githubusercontent.com/18479611/70376431-00327a00-1944-11ea-8c03-6ba098d738bb.png)

解决方案: 修改 虚拟机 CPU，重启后重新执行`kubeadm init`操作即可.

init 常用主要参数:

- --kubernetes-version: 指定Kubenetes版本，如果不指定该参数，会从google网站下载最新的版本信息
- --pod-network-cidr: 指定pod网络的IP地址范围，它的值取决于你在下一步选择的哪个网络网络插件
- --apiserver-advertise-address: 指定master服务发布的Ip地址，如果不指定，则会自动检测网络接口，通常是内网IP。
- --feature-gates=CoreDNS: 是否使用CoreDNS，值为true/false，CoreDNS插件在1.10中提升到了Beta阶段，最终会成为Kubernetes的缺省选项

Init 过程日志输出:

![image](https://user-images.githubusercontent.com/18479611/70376474-60c1b700-1944-11ea-9297-0ec5c9b41d63.png)

> 默认情况下, 生成的 token 有效期为 24h

继续:

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

该步骤必须执行, 否则会提示: `The connection to the server localhost:8080 was refused - did you specify the right host or port?`

查看 `pods` 状态

> kubectl get pods -n kube-system

![image](https://user-images.githubusercontent.com/18479611/70376523-b6965f00-1944-11ea-8117-9312230305d7.png)

### Node 加入

在上面 `init` 最后, 输出了形如: `kubeadm join 192.168.56.104:6443 --token ........ `, 复制，然后在 node 机器上执行即可.

查看所有 `nodes`:

> kubectl get nodes

此时发现均为 `NotReady` 状态, 因为 `master` 节点还未安装网络插件.

### 安装网络插件(master)

> kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml

部署完成后， 过一会即可看到它自动刷新后的结果:

![image](https://user-images.githubusercontent.com/18479611/70376586-39b7b500-1945-11ea-8225-4f39afb2c207.png)

注意: 集群中的master和node节点的hostname不能重复，否则会加入集群失败!!!

### 相关操作命令

删除集群中的 `node`:

> kubectl delete node node3

重新创建 token:

> kubeadm token create

查看 token:

> Kubeadm token list

查找 hash:

> openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.* //'
