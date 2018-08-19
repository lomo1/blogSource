---
title: MacOXS Install JDK 1.7-1.8
date: 2016-10-14 10:01:37
tags: [Mac, JDK]
categories: write
Description: OSX共存1.7和1.8版本JDK
---

## Mac OSX同时安装JDK 1.7/1.8

### 准备工作
1. JDK 1.7按照常规安装完毕。

2. 环境变量配置

`~/.bash_profile` 配置如下：

```bash
	JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_79.jdk/Contents/Home
	PATH=$JAVA_HOME/bin:$PATH
	MAVEN_HOME=/Users/lomo/env/apache-maven-3.3.9
	PATH=$MAVEN_HOME/bin:$PATH
	export ANDROID_HOME=/Users/lomo/Documents/IntelliJ/sdk/android-sdk-macosx
	export PATH=${PATH}:/Users/lomo/Documents/IntelliJ/sdk/android-sdk-macosx/tools
	export PATH=${PATH}:/Users/lomo/Documents/IntelliJ/sdk/android-sdk-macosx/platform-tools
	export HOMEBREW_CASK_OPTS="--caskroom=/opt/homebrew-cask/Caskroom"
	alias mysql=/usr/local/mysql/bin/mysql
	alias mysqladmin=/usr/local/mysql/bin/mysqladmin
	PATH=/Applications/MongoDB.app/Contents/Resources/Vendor/mongodb:$PATH
			
	export MAVEN_HOME
	export JAVA_HOME
	export PATH
	export TRAVIS=1

```

3. 下载安装JDK 1.8

> http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

下载后双击安装1.8即可。

安装完后，在`/Library/Java/JavaVirtualMachines` 可以看到多出来的JDK 1.8版的目录文件夹.

### 配置多版本JDK环境变量

```bash
	export JAVA_7_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_79.jdk/Contents/Home
	export JAVA_8_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_121.jdk/Contents/Home
	MAVEN_HOME=/Users/lomo/env/apache-maven-3.3.9
	PATH=$MAVEN_HOME/bin:$PATH
	export ANDROID_HOME=/Users/lomo/Documents/SDK/sdk/android-sdk-macosx
	export PATH=${PATH}:/Users/lomo/Documents/SDK/sdk/android-sdk-macosx/tools
	export PATH=${PATH}:/Users/lomo/Documents/SDK/sdk/android-sdk-macosx/platform-tools
	export HOMEBREW_CASK_OPTS="--caskroom=/opt/homebrew-cask/Caskroom"
	alias mysql=/usr/local/mysql/bin/mysql
	alias mysqladmin=/usr/local/mysql/bin/mysqladmin
	alias jdk7='export JAVA_HOME=$JAVA_7_HOME'  # 使用alias轻松切换JDK版本
	alias jdk8='export JAVA_HOME=$JAVA_8_HOME'
	PATH=/Applications/MongoDB.app/Contents/Resources/Vendor/mongodb:$PATH
			
	export MAVEN_HOME
	export PATH
	export TRAVIS=1
    export JAVA_HOME=$JAVA_7_HOME
```
> 默认还是使用JDK1.7版本

配置完毕！

### 测试

终端输入alias，即可切换系统环境的默认JDK版本。如图：

<div align="center"> <img width="75%" src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/osx-jdk-multi-version.png"/> </div>


### IDE配置

Eclipse 或 Intellij Idea的JDK 需要手动配置对应的Project的JDK，默认新建的是使用之前默认的JDK1.7，所以可以手动切换一下。

如下：

[Step1:

<div align="center"> <img width="75%" src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/intellig-file.png" /> </div>

[Step2:

<div align="center"> <img width="75%" src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/intellijIdea-jdk-settings.png" /> </div>