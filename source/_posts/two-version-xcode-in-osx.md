---
title: two version xcode in osx
date: 2017-03-20 23:12:05
tags: [xcode, MacOSX]
categories: study
description: MacOSX 共存多版本Xcode
---

## MacOS Sierra系统多版Xcode共存

> 使用brew安装一些东西比如Nginx时，会提示Xcode版本太低的一些错误导致无法进行，恰好因为appium V1.5.3目前支持的是Xcode8以下，本机安装的是7.3.1版Xcode, 需要更新Xcode到最新版8.3即可.


> 安装新版Xcode时，备份下旧版本，直接在/Applications文件夹下降旧版本的Xcode.app加上后缀备份即可：`Xcode731.app`


Xcode最新按照正常流程更新即可.

安装完毕后，即可轻松切换Xcode版本， 使用`xcode-select`命令完成
```bash
lomo@LomodeMacBook-Pro:~ % xcode-select -h
Usage: xcode-select [options]

Print or change the path to the active developer directory. This directory
controls which tools are used for the Xcode command line tools (for example,
xcodebuild) as well as the BSD development commands (such as cc and make).

Options:
  -h, --help                  print this help message and exit
  -p, --print-path            print the path of the active developer directory
  -s <path>, --switch <path>  set the path for the active developer directory
  --install                   open a dialog for installation of the command line developer tools
  -v, --version               print the xcode-select version
  -r, --reset                 reset to the default command line tools path
```

根据`-help`文件即可切换对应所需的版本。

为了方便，使用`alias`来一键快速切换开发环境的Xcode版本.

编辑配置文件

`vim ~/.zshrc`

> 前提是已安装oh-my-zsh

加入以下alias即可:
```bash
sudo xcode-select -s /Applications/Xcode731.app
sudo xcode-select -s /Applications/Xcode.app
```
Done.

这样，就可以根据需要随时切换环境的的Xcode版本.
