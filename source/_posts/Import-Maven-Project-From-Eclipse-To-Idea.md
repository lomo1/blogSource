---
title: Import Maven Project From Eclipse To Idea
date: 2017-01-14 12:19:24
tags: [java, maven, idea]
categories: [study]
description: 快速将Maven项目导入intelliJ IDEA
---

## Eclipse Maven项目迁移至IntelliJ IDEA


> 操作系统： Mac OSX


### 前置工作 -- 安装IDEA


#### 通过Brew安装IDEA(one way)
> 下载安装(通过Brew安装)

```bash
brew cask install intellij-idea
```

如果未安装Brew管理工具，则：

```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null ; brew install caskroom/cask/brew-cask 2> /dev/null
```


#### .dmg安装IDEA(another way)

> 被GitHub DCMA了....

IDEA官网：

`https://www.jetbrains.com/idea/`


### Maven工程迁移

上述IDEA安装完毕后，即可放心地开始Maven工程迁移至IDEA.

操作步骤：

1. 将eclipse的多个maven项目copy至一个新目录中

2. 打开IntelliJ IDEA编译器，点击菜单 File->Open, 全选 刚刚的WorkSpace目录几个文件夹

3. 打开后, IDEA并没有自动识别Maven项目，这时候，需要手动在IDEA右侧的Maven Projects栏（如果没显示Maven Projects栏，则依次在IDEA工具栏View -> Tool Windows -> Maven Projects中打开）中添加项目的pom.xml文件，这样IDEA就能识别.

如图：

<div align="center">
    <img width="55%" height="30%" src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/idea-pom-file.png" />
</div>


> 按照图中红色框框中标示的 绿色`+` 加号，一次点击加入工程的`pom.xml` 即可，IDEA会在后台根据pom自动更新依赖.


### 后续
> 如果中央仓库更新后，本地`git fetch origin/master`, 然后 `git merge origin/master`后，idea显示某些包飘红，或提示 'can not resolve symbol', 点击idea右侧 `Maven Porject`，然后点击`Reimport All Maven Project` 逆时针按钮即可。