---
title: use tree command list project contents
date: 2017-03-02 10:52:00
tags: [tree,osx]
categories: study
description: 使用tree命令列出项目或文件夹的目录树
---

## OSX使用tree命令列出项目(文件夹树结构)

### alias方式

`alias tree="find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'"`

此种方式会遍历目录下的所有文件及其文件夹📂下的文件。

### 第三方tree命令

`brew install tree`

安装完成后在对应的项目目录或文件夹目录下使用`tree`的 `-L`参数指定遍历层级

将tree命令遍历的层级结构导出到readme.md文件中：

```bash
#README.md文件处于输入命令时同级目录下
tree -L 2 >README.md
```

示例：

`tree -L 2`
列出当前目录及其下一级目录

```bash
# >tree -L 2
├── 403.html
├── 404.html
├── 500.html
├── AppMessagePush
│   ├── App\ Push.xlsx
│   ├── README.md
│   ├── apns-dist.pem
│   ├── appMsgPush.html
│   ├── ck_1019.pem
│   ├── resources
│   └── send2.php
├── AppPerformance
│   ├── README.md
│   ├── assets
│   ├── backup
│   ├── data
│   ├── demo.html
│   ├── index.html
│   ├── page-403.html
│   ├── page-404.html
│   └── page-500.html
├── IdCard
│   ├── README.md
│   ├── assets
│   └── index.html
├── JDBAPI
│   ├── 404.html
│   ├── API-xx.json
│   ├── API.json
│   ├── README.md
│   ├── admin-apiCheck.html
│   ├── admin-commonParams.html
│   ├── admin-form.html
│   ├── admin-index.html
│   ├── admin-table.html
│   ├── adminPanel
│   ├── assets
│   └── login.html
├── ProcessQualityReport
│   ├── README.md
│   ├── Temp
│   ├── app
│   ├── bower.json
│   ├── bower_components
│   ├── build
│   ├── data
│   ├── gulpfile.js
│   ├── node_modules
│   ├── package.json
│   └── reportTemplates
├── ProcessQualityReport_demo
│   ├── app
│   ├── bower.json
│   ├── bower_components
│   ├── dist
│   ├── gulpfile.js
│   ├── node_modules
│   ├── package.json
│   └── test
├── QRCode
│   ├── index.html
│   └── resources
├── api
│   ├── appMessagePush
│   ├── jenkins
│   ├── messageTips
│   ├── oAuth
│   ├── phpNotice
│   ├── processQualityReport
│   └── versionNotice
├── assets
│   ├── css
│   ├── image
│   └── js
├── favicon.ico
├── index.html
├── messageTips
│   ├── README.md
│   ├── index.html
│   └── resources
├── metro
│   ├── README.md
│   ├── animation
│   ├── css
│   ├── download.html
│   ├── image
│   ├── img
│   └── js
├── oAuth
│   ├── README.md
│   ├── assets
│   ├── index.html
│   ├── register.html
│   └── test
├── robots.txt
└── versionNotice
    ├── index.html
    ├── node
    ├── resources
    ├── simple.json
    └── simpleTwo.json

53 directories, 48 files
```

`tree -L 1`
```bash
├── 403.html
├── 404.html
├── 500.html
├── AppMessagePush
├── AppPerformance
├── IdCard
├── JDBAPI
├── ProcessQualityReport
├── ProcessQualityReport_demo
├── QRCode
├── api
├── assets
├── favicon.ico
├── index.html
├── messageTips
├── metro
├── oAuth
├── robots.txt
└── versionNotice

13 directories, 6 files
```