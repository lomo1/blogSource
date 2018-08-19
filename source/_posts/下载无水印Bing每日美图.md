---
title: 下载无水印Bing每日美图
date: 2015-04-28 10:25:17
tags: Bing
categories: essay
description: 如何无水印地下载Bing每日美图
---

## 下载Bing每日美图(无水印版)

http://cn.bing.com 微软Bing每天首页背景都有很多美图，可以轮播，还有的可以动态播放，和短视频一样。

Bing右下角已提供了下载壁纸按钮，但是都是带水印的，那么如何下载无水印版呢？

方法1：查源码。

利用chrome的审查元素工具，例如需要下载某张图时，打开审查元素工具，选中或搜索定位到id为`hp_container`的元素，该元素下的第一个子元素id为`bgDiv`，即可。

如下图：
<div align="center">
 <img src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/bing-download-source.png" width="80%" />
</div>

根据source提供的美图URL Path部分，加上host：cn.bing.com，就能获得无水印版下载地址。

如：
http://cn.bing.com/az/hprichbg/rb/CivitadiBagnoregio_ZH-CN12942138675_1920x1080.jpg

http://cn.bing.com/az/hprichbg/rb/MirrorBeach_ZH-CN12835554220_1920x1080.jpg


方法2：chrome的开发者工具

利用开发者工具查看请求。

具体看图。

![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/bing-process.png)


方法3：Charles/Fiddler

利用抓包工具，查看请求的URL即可。和方法2利用开发者工具查看网络请求基本一样。
