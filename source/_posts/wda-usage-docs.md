---
title: Appium/WDA Docs
date: 2019-09-07 17:39:11
tags: [appium, wda] 
categories: program
description: Appium 真机测试环境配置与使用
---

## Appium 环境配置

本文主要内容:
Mac 下 基于 `Appium` 的自动化测试环境配置笔记。(所有环境版本号以当前最新版本为基础)

### 环境准备

#### Mac 环境

```bash
# 系统环境
sw_vers
ProductName: Mac OS X
ProductVersion: 10.14.6
BuildVersion: 18G95

ruby -v
ruby 2.3.7p456

# brew 安装, brew 使用参考：https://brew.sh/
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Xcode App Store 直接安装最新版即可
xcodebuild -version
Xcode 10.3
```

其它依赖的开发软件:
Xcode、Android studio，Android Studio 安装完毕后，下载 SDK ( Android )。

#### Java/Android 基础环境

```bash
# Java，推荐使用 JDK8 或 JDK11，暂不推荐最新版 JDK12
# 注意: 目前官网下载 JDK 是需要 Oracle 账户
java -version
java version "1.8.0_221"

mvn -v
Apache Maven 3.6.1
```

Java 及其相关环境变量配置参考:

```bash
JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk1.8.0_221.jdk/Contents/Home/"
PATH=$JAVA_HOME/bin:$PATH
MAVEN_HOME="/Users/lomo/env/apache-maven-3.6.1"
PATH=$MAVEN_HOME/bin:$PATH

#Android environment
export ANDROID_HOME="/Users/lomo/Library/Android/sdk"
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools
export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk1.8.0_221.jdk/Contents/Home/"

export PATH=/usr/local/bin:/usr/local/sbin:~/bin:$PATH
```

### 系统依赖软件安装

#### Appium

Appium 安装有 2 种方式:

1.GUI 版

下载 dmg 文件安装即可.
该种方式对应的 WDA 文件路径:

> /Applications/Appium.app/Contents/Resources/app/node_modules/appium/node_modules/appium-xcuitest-driver/WebDriverAgent

2.无 GUI 版

> npm install -g appium

安装指定版本:

> npm install -g appium@1.13.0

此种方式的 WDA 路径:

> /usr/local/lib/node_modules/appium/node_modules/_appium-webdriveragent@1.2.0@appium-webdriveragent

如果 `npm` 较慢或者有其它问题，则使用 cnpm 即可.

> npm install -g cnpm --registry=https://registry.npm.taobao.org

#### iOS 真机环境相关

1.Carthage
套件管理工具，与 CocoaPods 类似。
详细说明可参考: https://gist.github.com/weihanglo/97e949a9dbf92deb111999b6e42e9654

> brew update && brew install carthage

2.ios-deploy

> 终端安装和调试iPhone应用的是第三方开源库

使用参考: https://www.jianshu.com/p/9b9136fa1444

安装通过 npm
> npm install -g ios-deploy

3.libimobiledevice
该开源工具包，支持 Linux 链接 iPhone 等 iOS 设备.

这个工具包的作用就是要做一个类似于 Android 中的 adb 命令行工具！！！

> brew update && brew install libimobiledevice --HEAD

查看 iOS 设备 uuid:
> idevice_id --list

4.ideviceinstaller
方便查看 iOS 设备上安装的 APP 的 bundleId
> brew install ideviceinstaller

使用:
ideviceinstaller --help
> ideviceinstaller -l # 列出本机安装的所有 app 的bundle id

安装 ipa:
> ideviceinstaller -i xxx.ipa

卸载 ipa
> ideviceinstaller -U [bundleID]

如果使用时报错类似如下信息:

```bash
Could not connect to lockdownd. Exiting.
```

解决方案:

```bash
brew uninstall -f libimobiledevice ideviceinstaller usbmuxd
# 或：
brew uninstall --ignore-dependencies libimobiledevice ideviceinstaller usbmuxd

# 再源码编译安装即可
brew install -v --HEAD  --build-from-source usbmuxd libimobiledevice ideviceinstaller
```

参考: https://github.com/libimobiledevice/ideviceinstaller

4.xcpretty
主要是增加 xcodebuild 输出可读性. 可选 !

> gem install xcpretty

Gem 是 Ruby 依赖包管理工具。类似于 iOS 开发中的 CocoaPods，Java 中的 maven、ant .....

#### Android 真机环境

配置好 JAVA、Android 相关的环境变量，安装一个 SDK，并选择同意相关的 License，然后就直接配置参数链接真机操作即可。

#### 编译 WDA

> 本地编译 WDA 主要是为了 iOS 解决相关证书问题。该步骤针对链接 iOS 设备是必经步骤！

桌面版/无 GUI 版，按照上述的安装路径，打开对应的 xcode 工程, 打开项目导航(点击最左侧导航栏文件夹按钮),然后右侧会展示 PROJECT 导航，选择 TARGETS 下的，分别选中 WebDriverAgentLib 和 WebDriverAgentRunner，修改其 `Signing` 签名，改为自己的 Apple ID 即可，同时修改 Build Settings 下 Packaging 下的 Bundle Identifier。

> 主要是将原来的 xxx.facebook.xx.wda.xx 中的 facebook 改一下即可，为了区分 bundleId

选择手机编译至对应的 iOS 设备上即可 (AgentRunner)。

注意: 如果 Build 真机还报错，则将下面的几个 Targets 页添加上, 主要是 bunlderId 修改和 Signing.

添加成功后，会看到签名对应处 `Signing Certificate iPhone Developer: 你的 Apple ID (Team ID: 一个长度为10的大写字母串)`

### iOS 真机配置

Desired Capabilities 配置如下:

```json
{
  "udid": "uuid",
  "platformName": "iOS",
  "automationName": "XCUITest",
  "bundleId": "APP的 bundleId",
  "platformVersion": "11.4.1",
  "deviceName": "设备名"
}
```

设备名称通过 `idevicename` 即可获取
uuid 通过 `idevice_id -l` 获取通过 USB 链接的 iOS 设备列表

### Android 真机配置

```json
{
  "platformName": "Android",
  "platformVersion": "7.1.1",
  "deviceName": "Lomo-note3",
  "noReset": true,
  "app": "/Users/lomo/Downloads/app-debug.apk"
}
```

### 框架设计

关注点:

```bash
1. 可扩展性
2. 可维护性
3. 可推广性
4. 投入/产出比
```

具体框架设计细节暂不赘述.
