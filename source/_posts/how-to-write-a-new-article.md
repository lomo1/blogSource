---
title: Hexo如何新创建新博文
date: 2016-02-24 13:40:48
tags: write
categories: essay
---

## 命令生成初始文章
```bash
$  hexo n "how to write a new article"
```
然后即可在`./source/_posts` 目录下创建对应的.md文件，例如我的：
  
  `~/Documents/Blog/source/_posts/how-to-write-a-new-article.md`

同时，会在创建一个文件夹同名的文件夹，这个文件夹一般用来存放这篇博文相关的图片、自定义样式css、或其他js脚本文件等.

截图如下：
    ![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/how-to-write-article.png)

   -->>  注意观察命令行参数与所生产文件及文件夹名的对应关系！

123222
然后即可开始撰写文字。
一般地，其格式如下：

    `title: hexo post #可以改成中文的，如“新文章”
	date: 2015-01-14 21:31:42 #发表日期，可自定义修改排序
	categories: blog #文章文类
	tags: [博客,文章] #文章标签，可以加入多标签
	---`

