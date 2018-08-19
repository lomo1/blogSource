---
title: linux/centos 常用系统命令
date: 2014-05-06 11:13:09
tags: [Linux, CentOS, 命令行]
categories: program
---

## 系统
```bash
# uname -a               # 查看内核/操作系统/CPU信息
# head -n 1 /etc/issue   # 查看操作系统版本
# cat /proc/cpuinfo      # 查看CPU信息
# hostname               # 查看计算机名
# lspci -tv              # 列出所有PCI设备
# lsusb -tv              # 列出所有USB设备
# lsmod                  # 列出加载的内核模块
# env                    # 查看环境变量
#dmidecode | grep "Product Nmae"   #查看服务器型号

# date '+%Y-%m-%d %H:%M:%S' #查看系统时间
# ps -ef #查看运行进程
# uptime #查看服务器开机时长，用户数，平均负载
# lsmod #查看所有加载的模块
# crontab -l #查看计划任务

#who -b 查看最后一次系统启动的时间
#who -r 查看当前系统运行时间
#last reboot可以看到Linux系统历史启动的时间
#last reboot | head -1 #查看最后一次Linux系统启动的时间
```

## 资源
```bash
# free -m                # 查看内存使用量和交换区使用量
# df -h                  # 查看各分区使用情况
# du -sh <目录名>        # 查看指定目录的大小
# grep MemTotal /proc/meminfo   # 查看内存总量
# grep MemFree /proc/meminfo    # 查看空闲内存量
# uptime                 # 查看系统运行时间、用户数、负载
# cat /proc/loadavg      # 查看系统负载
```
## 磁盘和分区
```bash
# mount | column -t      # 查看挂接的分区状态
# fdisk -l               # 查看所有分区
# swapon -s              # 查看所有交换分区
# hdparm -i /dev/hda     # 查看磁盘参数(仅适用于IDE设备)
# dmesg | grep IDE       # 查看启动时IDE设备检测状况
```

## 网络
```bash
# ifconfig               # 查看所有网络接口的属性
# iptables -L            # 查看防火墙设置
# route -n               # 查看路由表
# netstat -lntp          # 查看所有监听端口
# netstat -antp          # 查看所有已经建立的连接
# netstat -s             # 查看网络统计信息

#查看网卡型号
# lspci |grep Ethernet

#DNS配置
# cat /etc/resolv.conf

# iptables -L #查看防火墙规则
# route -n #查看路由表
# netstat -s #查看网络统计信息
```

## 进程
```bash
# ps -ef                 # 查看所有进程
# top                    # 实时显示进程状态
```

## 用户
```bash
# w                      # 查看活动用户
# id <用户名>            # 查看指定用户信息
# last                   # 查看用户登录日志
# cut -d: -f1 /etc/passwd   # 查看系统所有用户
# cut -d: -f1 /etc/group    # 查看系统所有组
# crontab -l             # 查看当前用户的计划任务

# whoami #查看当前登录用户名
# id #查看当前用户及其属组
# w #查看当前登录的用户及运行的命令
# last #查看最近登录用户
# cat /etc/passwd|awk -F: '{print $1}' #查看服务器上面所有用户
```

## 服务
```bash
# chkconfig --list       # 列出所有系统服务
# chkconfig --list | grep on    # 列出所有启动的系统服务
#sshd 0:关闭 1:关闭 2:启用 3:启用 4:启用 5:启用 6:关闭
#httpd 0:关闭 1:关闭 2:关闭 3:启用 4:关闭 5:关闭 6:关闭

#chkconfig xxx on #设置某个服务开启启动
```

## 程序
```bash
# rpm -qa                # 查看所有安装的软件包
```