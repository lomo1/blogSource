---
title: git tag
date: 2017-04-01 14:47:31
tags: git
categories: study
description: git增加删除tag
---

## Git--Tag操作

### 增加
```bash
git tag -a tag名 -m "备注信息..." #含附注类型的tag
git tag tag名 #tag名通常以版本号命名[简写版]
```

```bash
git tag #查看所有tag
```

> 注: 打tag标签操作, 是在我们commit修改到本地仓库后!

### 删除

删除本地Tag:
```bash
git tag show  # show 为tags中的一个
```

删除远端仓库的Tag:
```bash
git push origin :refs/tags/show
# 或
git push lomo :refs/tags/show
# lomo 为另一个git远端仓库地址别名
```


### 标签推送
```bash
git push origin master --tags #推送所有tag
git push lomo master -tag tag名 #推送指定的tag到制定的远端仓库
```

