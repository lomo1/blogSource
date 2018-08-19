---
title: WebDriver maxsize Chrome window
date: 2017-05-10 11:04:49
tags: [WebDriver, Chrome]
categories: program
description: WebDriver自动化测试,Chrome浏览器窗口最大化
---

## WebDriver最大化Chrome浏览器窗口

### 问题

> 升级最新WebDriver，在用Chrome最新版自动化测试时，遇到2个问题，
> 第一个：driver打开浏览器后，Chrome左上角感叹号❗️设置提示不安全操作
> 具体信息：
```bash
Chrome is being controlled by automated test software
```
> 第二个问题：浏览器最大化问题。

### Solutions

问题一、 

很好解决：
```java
ChromeOptions options = new ChromeOptions();
options.addArguments("disable-infobars=true");
//或
//options.addArguments("disable-infobars");

```

问题二、

```java
ChromeOptions options = new ChromeOptions();
options.addArguments("test-type");
options.addArguments("start-maximized");
//options.addArguments("start-fullscreen");
options.addArguments("kiosk");

//options.addArguments("--js-flags=--expose-gc");
//options.addArguments("--enable-precise-memory-info");
//options.addArguments("--disable-popup-blocking");
//options.addArguments("--disable-default-apps");
//options.addArguments("credentials_enable_service=false");
```

`options.addArguments("kiosk"); `会完全全屏最大化，导致浏览器的地址栏都看不到(Mac Pro 13 上测试)，前2个选项基本不会使浏览器最大化，driver启动时多大就多大；

`driver.manage().window().maximize();` 也不会起作用 ！！！

### Chrome Driver

最新版Chrome Driver 2.29 支持Chrome v56-58.

最新版下载：

https://chromedriver.storage.googleapis.com/index.html?path=2.29/


历史版本支持查询：

https://sites.google.com/a/chromium.org/chromedriver/downloads

