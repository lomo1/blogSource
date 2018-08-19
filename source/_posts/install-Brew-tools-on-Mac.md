---
title: install Brew tools on Mac
date: 2016-05-23 19:09:24
tags: [Mac, Brew, zsh]
categories: read
---

## Mac安装Brew
```bash
$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

安装 cask — 基于homebrew的一个增强工具

`brew tap phinze/cask`

`brew install brew-cask`





homebrew-cask是一套建立在homebrew基础上的Mac软件安装命令行工具.

同时安装4个软件sublime-text  skitch dropbox  google-chorme

`brew cask install sublime-text skitch dropbox  google-chrome`

### brew常用命令

```bash
brew cask search    #列出所有可以被安装的软件
brew cask search drop  #查找所有和 *drop* 相关的应用
brew cask info xxx  #查看 xx 如：*迅雷* 应用的信息，这货安装的可是最新版本的迅雷哦！
brew cask uninstall qq  #卸载 *QQ*
brew update && brew upgrade  #更新所有应用程序
brew cask ls   #列出通过brew cask 安装的软件
brew cask cleanup    #清除下载缓存及链接信息

```


homebrew-cask是将应用程序放置在 
`/opt/homebrew-cask/Caskroom/` 


### Mac命令行增强工具

安装oh-my-zsh

```bash
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
`cat /etc/shells`

即可看到刚才安装的zsh;

切换到最新安装的bash:

`chsh -s /bin/zsh`

### zsh问题：

切换shell 从bash切换至zsh后， `~/.bash_profile`里的环境变量失效解决：

在~/.zshrc添加 `source ~/.bash_profile`

### zsh主题

https://github.com/robbyrussell/oh-my-zsh/wiki/themes

在此选择好主题后，

`vim ~/.zshrc`

找到`ZSH_THEME=` 修改其为需要的主题名即可.

