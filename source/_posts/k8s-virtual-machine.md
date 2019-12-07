---
title: k8s-virtual-machine
date: 2018-12-07 21:45:48
tags: k8s
categories: study
description: k8s之机器配置[一]
---

## K8S 学习笔记之开山篇--虚拟机配置

### 准备工作

所需软件: VirtualBox(测试所用物理机为 MBP 顶配)

> 本地虚拟机集群, 所有机器均借助 VirtualBox 和 CentOS7 实现.

虚拟主机系统统一采用：CentOS-7-x86_64-Minimal-1804.iso

iso 下载地址: <http://mirrors.aliyun.com/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-1804.iso>

1. 新建三台虚拟机分别设置 `hostname` 为 `k8s-master`, `k8s-node01`, `k8s-node02`

> 设置 hostname 使用 hostnamectl 命令即可

如: `hostnamectl set-hostname k8s-node01`

> 虚拟机启动后, 窗口调整快捷键为: command + c

虚拟机安装使用可参考: <https://blog.csdn.net/yang_yun_hao/article/details/87917657>

2. 虚拟机无法连接外网问题解决:

1> virtualbox 设置

偏好设置 -> 网络 -> 添加新 NAT 网络, 双击并勾选启用网络、支持 DHCP

![image](https://user-images.githubusercontent.com/18479611/70375745-9a8ebf80-193c-11ea-8a5f-0083d5aa19ca.png)

3. CentOS 网络设置

```bash
sudo vim /etc/sysconfig/network-scripts/ifcfg-enp0s3
# 将 ONBOOT = no 改为 yes

# 再重启
reboot

# 或重启网卡服务即可
service network restart
```

默认情况下, 虚拟机的 `IP` 由 VirtualBox的 `DHCP` 服务动态分配, 这在多态虚拟机的情况下不好管理, 最好一台机器固定一个 `IP`, 这时就需要配置静态 `IP`.

管理 -> 主机网络管理器，点击创建按钮即可。

![image](https://user-images.githubusercontent.com/18479611/70375829-97e09a00-193d-11ea-9467-a94dd5e8b1d1.png)

然后每个虚拟机配置上该网卡即可。

> ip addr|grep inet

4. ssh login 配置

配置这个, 是为了方便直接在物理机登陆虚拟机系统, 方便操作.

方式1:
使用 `ssh-copy-id` 命令将 key 写到远程机器的 ~/.ssh/authorized_key 文件中.

(该方法必须2端操作时为同一个用户名)

方式2:

将 本地机器的 rsa copy 至所需登陆的服务机器上.

> scp ~/.ssh/id_rsa.pub root@192.168.56.101:.ssh/id_rsa.pub

在B上的命令 (先于 A执行，A - 为本地机器):

> touch /root/.ssh/authorized_keys # (如果已经存在这个文件, 跳过这条)

将id_rsa.pub文件从 A本地机器上 上传到 B 机器后再执行该操作：

> cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys # (将id_rsa.pub的内容追加到authorized_keys 中)

测试登陆:

ssh root@k8s-master

ok.

添加 alias 更方便登陆:

```bash
vim ~/.bash_profile
# k8s 集群信息
alias k8s_master="ssh root@k8s-master"
alias k8s_node01="ssh root@k8s-node01"
alias k8s_node02="ssh root@k8s-node02"
```

### 系统基础软件安装&配置

#### 系统软件

> 每台机器都安装

```bash
yum install -y epel-release
yum install -y conntrack ntpdate ntp ipvsadm ipset jq iptables curl sysstat libseccomp wget
```

#### 系统设置

2.1 关闭防火墙

```bash
systemctl stop firewalld && systemctl disable firewalld

# 输出
Removed symlink /etc/systemd/system/multi-user.target.wants/firewalld.service.
Removed symlink /etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service.
```

2.2 关闭 selinux

```bash
setenforce 0 && sed -i "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config
# 此处无输出任何内容哈.
```

2.3 关闭 swap

单纯的执行 `swapoff` 只是临时关闭, 下次重启后还是会打开. 因此需要修改文件: 

> vim /etc/fstab # 将 swap 分区一行注释即可.

![image](https://user-images.githubusercontent.com/18479611/70375981-505b0d80-193f-11ea-9a5d-e09261ddfdd5.png)

使用命令行关闭方式:

```bash
swapoff -a && sed -i "s/\/dev\/mapper\/centos-swap/\#\/dev\/mapper\/centos-swap/g" /etc/fstab
```

#### docker

1. 安装
为了加速在国内安装, 使用阿里云镜像:

> wget -O /etc/yum.repos.d/docker-ce http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

安装 docker（所有机器执行）：
> yum install docker-ce -y

但是提示没有可用软件包(-_-||):

![image](https://user-images.githubusercontent.com/18479611/70376041-d4ad9080-193f-11ea-96cb-906972bd2a1e.png)

解决方案1:

```bash
# 依次执行如下命令: 
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum makecache fast
yum install docker-ce -y  # 非一般的速度就下载安装完毕 docker

# 测试
docker -v

# 输出:
Docker version 19.03.4, build 9013bf583a
```

解决方案2:

```bash
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

sudo yum install docker-ce -y
```

![image](https://user-images.githubusercontent.com/18479611/70376091-3d950880-1940-11ea-88cf-90500216dc43.png)

2. 配置(master、node 均需要)

启动 docker 并设定随机启动: `systemctl enable docker && systemctl start docker`

![image](https://user-images.githubusercontent.com/18479611/70376119-7e8d1d00-1940-11ea-9e88-970bb1541e40.png)

调整 `docker` 部分参数

```bash
mkdir -p /etc/docker
vi /etc/docker/daemon.json
# 添加如下内容:
```

```json
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ],
  "registry-mirrors": [
    "https://5twf62k1.mirror.aliyuncs.com"
  ]
}
```

修改前：
确认 docker 的 Cgroup Driver 信息：

> docker info |grep Cgroup

> 默认是  Cgroup Driver: cgroupfs

修改后：
> Cgroup Driver: systemd

重启 docker:

```bash
# mkdir -p /etc/systemd/system/docker.service.d
systemctl daemon-reload
systemctl restart docker
```

![image](https://user-images.githubusercontent.com/18479611/70376181-21de3200-1941-11ea-9f73-5f6f07dd7824.png)