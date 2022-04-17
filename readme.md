# Read Me Doc

## Local Prepare

```bash
# gulp、hexo
npm install gulp-cli -g  # sudo
npm install gulp -g  # sudo

npm install hexo -g  # sudo
```

## Usage

Run in Local:

> gulp

run in local(it will open Browser automatically)

Auto generate resource files, and package source file: `.html`, `.css`, `.js` & `img` type.

Deploy(github):

> gulp deploy

deploy the page source to github pages

New Article:
> hexo n 'wda usage docs'

## Reference

https://blog.csdn.net/qiqi_zhangzz/article/details/106599233

## Other issue

1、本地安装依赖出现错误提示时, 一般是安装依赖或 hexo 版本与 node 版本不兼容导致. hexo 版本与 node 版本关系, 参考{https://hexo.io/zh-cn/docs/index.html#Node-js-%E7%89%88%E6%9C%AC%E9%99%90%E5%88%B6}

2、本地安装 node_modules 提示无权限问题, 解决办法: `sudo chown -R $(whoami) /usr/local/lib/node_modules`

3、hexo 最新版本为 `6.0`, 对应 Node.js 最新为 `12.13.0`, 参考上面「1」中的文档连接

4、评论插件: https://valine.js.org/avatar.html

5、本地配置

```bahs
node -v  # v12.22.12

npm -v  # 6.14.16
```
