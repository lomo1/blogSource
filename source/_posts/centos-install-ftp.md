---
title: CentOS 6.5 安装FTP
date: 2016-12-21 12:33:02
tags: [CentOS,FTP]
categories: study
description: CentOS安装FTP及其基本配置
---
记录下在CentOS 6.5上安装FTP的过程及其注意事项.

## Install FTP
```bash
$  yum -y install ftp vsftpd  #yum安装ftp vsftpd
$  rpm -qa|grep ftp  #检查是否安装成功
$  chkconfig vsftpd on  #设其为开机启动
$  rpm -qc vsftpd  #查看配置文件所在路径
$  vi /etc/sysconfig/iptables #修改防火墙
##  -A INPUT -p tcp -m state --state NEW -m tcp --dport 21 -j ACCEPT
## 添加该记录到iptables文件.
##  esc -> wq -> enter回车保存退出.
$  service vsftpd restart #更新FTP服务
```
### 匿名用户处理
禁止其登陆.
    `vi /etc/vsftpd/vsftpd.conf`
    `(INSERT)anonymous_enable=YES 改为 anonymous_enable=NO`
	保存退出.
	
###  添加远程登录用户

例如：
	   在root组中加入一个htmler账户用来ftp到/var/www/html并给它添加密码

```bash
->useradd -g root -M -d /var/www/html -s /sbin/nologin lomo
->passwd lomo
->输入密码

```
重启服务，`service vsftpd restart`, 即可远程访问FTP资源. 
URL like： ftp://lomo.space  或 ftp://127.0.0.1

### 常用命令
```bash 
启动vsftpd:  service vsftpd start
停止vsftpd:  service vsftpd stop
重启vsftpd:  service vsftpd restart
```

### 常见问题
1. 上传文件：553 Could not create file？
    解决方案：
        `getsebool -a|grep ftp`
    查看：
        `ftpd_disable_trans ftp_home_dir allow_ftpd_full_access` 
        是否为on, 不是则修改为on.
        
2. 其它修改：
    `setsebool allow_ftpd_full_access 1`
    `setsebool allow_ftpd_use_cifs 1`
    `setsebool allow_ftpd_use_nfs 1`
    `setsebool ftp_home_dir 1`
    `setsebool httpd_enable_ftp_server 1`
    `setsebool tftp_anon_write 1`
    最后：
    `service vsftpd restart`
查看修改是否生效：
    `getsebool -a|grep ftp`
若还是Fail,则
`vi /etc/vsftpd/vsftpd.conf
`
添加：
`local_root=/data`

kill -9 +进程ID，杀死进程，重启服务.

3.  getsebool:  SELinux is disabled ？
    `vi /etc/selinux/config`
    `SELINUX=1`
    `reboot`


Reference:
    http://www.111cn.net/sys/linux/45542.htm
    


