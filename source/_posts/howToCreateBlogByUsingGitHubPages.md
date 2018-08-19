---
title: 使用GitHub Pages创建个人博客
date: 2015-06-21 23:30:02
tags: [blog,GitHub,Hexo]
categories: essay # 配置categories
description:
---

## 基于Hexo+Pages创建Blog

基于GitHub Pages 加上自己的域名lomo.space创建个人博客，并将博客相关数据、文件免费托管于Github. 2013年左右时，个人博客是基于WordPress二次开发并自己购买空间、域名进行第三方付费托管于维护。

### 【第一部分】安装 Hexo + 服务 + 各类依赖
``` bash
$ npm install -g hexo-cli #全局安装cli
```
### 初始化 Hexo
```bash
$ hexo init +文件夹名
```
init过程可能遇到NPM warning 级别错误，提示deprecated swig的错误：
    ![img](http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/node-swig-error.png)

解决方案：
` npm install swig@latest `

### 安装 Hexo
```bash
$ npm install hexo --save    #非全局(-g)
```
### 生成静态资源文件
```bash
$ hexo g || hexo generate #生成静态可访问资源(html+css+js)，附带一个web示例
```
生成的示例可通过URL：http://localhost:4000/  进行访问。

### 尝试启动服务
```bash
$ hexo s || hexo serve  #启动本地服务器
```
由于是首次本地安装Hexo，故尝试起服务前，必须安装一个server依赖包，否则会报错！
使用NPM安装serve依赖包：
    ` npm install hexo-server --save
    `
再次重启服务：hexo g, hexo s -o, 自动打开浏览器，发现空白，只有一行提示：`Cannot get /` 这样的错误提示！
#### 针对以上错误 解决方案:
```bash
$  npm install hexo-renderer-ejs --save  #hexo依赖
$  npm install hexo-renderer-stylus --save  #hexo依赖
$  npm install hexo-renderer-marked --save  #hexo依赖
```
重新生成、部署本地服务，hexo g, hexo s。
浏览器重新打开URL：http://localhost:4000/ 访问OK，出现了基本页面。

至此，Hexo-cli、hexo 安装及基本依赖安装完毕。

## 【第二部分】主题 及theme配置、二次开发
选取自己喜欢的主题即可，可参考知乎或GitHub上自行索取。
    
### 主题安装
    ```bash 
    $ cd themes
    $ git clone https://github.com/wuchong/jacman.git  # 选用的主题
    ```
安装完主题后，在对应主题根目录下有一个和该Blog根目录下同名的 `_config.yml` 配置文件,注意区别！

二次开发部分此处省略，直接参考整个Blog代码。

## 【第三部分】常用功能模块配置

### 博客基本配置
首页默认展示文章形式(缩略：只显示部分)，可修改，在主题配置文件 `_config.yml`中：
`index:
  expand: false   #缩略显示
  excerpt_link: Read More 
`
#### 根目录_config.yml配置
为了便于deploy本地文件到GitHub上，在博客根目录的 `_config.yml` 文件中，找到deploy关键字，如果没有，则在文件最后加上如下：
    `	deploy:
			type: git
			repo: https://github.com/lomo1/lomo1.github.io.git  
			#自己的github page地址
        branch: master  #分支
    `
#### 快捷部署至GitHub
为了使用快捷部署功能：hexo d 或hexo deploy (hexo g本地生成最新public文件夹之后)，必须要先安装一个hexo依赖包：
` npm install hexo-deployer-git --save`
最后hexo d 即可将最新博客相关数据文件更新至GitHub Pages上。

### 主题基本配置
安装完主题后，博客根目录 `_config.yml` 启动新的主题：
`theme: jacman
stylus:
    compress: true
`

菜单部分配置对应主题文件夹下的_config.yml文件，可参考如下:
    `menu:`
      `Home: / ` 
      `Essay: /categories/essay`
      `Write: /categories/write`
      `Read:	/categories/read`
      `Study: /categories/study`
      `Code: /categories/program`
      `About: /about`
      
菜单按照如上配置后，在博客根目录下的 `source`目录下创建(若无)对应的目录，并在每一个folder下创建index.md 填充内容，否则在浏览器点击导航栏的Link后，跳转的页面是空白页。

### Widget配置
```bash

author:
  intro_line1:  "Lomo's Introduce One..."    ## your introduction on the bottom of the page
  intro_line2:  "Lomo's Introduce Two ...."  ## the 2nd line
  weibo:    ## 微博ID, http://weibo.com/527123733/home?wvr=5
  weibo_verifier:    
  tsina:    
  douban: chnhawk    
  zhihu: chan-donald     
  email: lomo@lomo.space     
  twitter: chnhawk   
  github:    ## e.g. for https://github.com/lomo1
  facebook:  
  linkedin:   
  google_plus:    ## e.g. "1111908813418008123", the "" is needed!
  stackoverflow:  ## e.g. 123221 
  ## 填写对应的社交账户的ID后，网站底部就会显示个人的社交主页链接，访客可直接点击访问个人对应社交主页.
```
#### 友情链接 配置
主题目录下的 `_config.yml` 文件：
    `#### Links`
`links:`
  `看雪: http://www.kanxue.com/`
  `GoogleCodeStyle: https://google.github.io/styleguide/`

#### Sina WeiBo 配置
1. 获取嵌入代码: http://app.weibo.com/tool/weiboshow, 选取样式，并copy iframe代码
2.  `cd /Users/lomo/Documents/Blog/themes/jacman/layout/_widget`
3. 编辑weibo.ejs（/theme/layout/widget/weibo.ejs）,paste刚才copy的 iframe代码
4. hexo g, hexo s 查看效果。

#### RSS配置
```bash
$  npm install hexo-generator-feed --save  #插件 install
```
1. 博客根目录下的`_config.yml` 文件做如下配置：
`			feed:
			  type: atom
			  path: atom.xml
			  limit: 20
  hub:
  `
2. 主题根目录下配置文件做如下修改：
    `rss: /atom.xml`
    
3. 重新生成、部署。

### 文章评论功能 设置
``` bash
duoshuo_shortname: lomo1   
## 多说注册时，要求填写的三级域名里的那个name
##如果名称和域名里的那个name不一致，则用域名里的那个name，否则评论数据会消失.

disqus_shortname:     
## 国外的dispus评论功能插件.
```
使用多说 -> http://duoshuo.com/



目前主要就这么多总结，给自己做笔记，留个备份，方便后用。后续问题再补充进来。
对了随时插入图片的问题，还没解决好，后续跟进...

