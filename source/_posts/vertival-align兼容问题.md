---
title: vertival-align兼容问题
date: 2016-12-06 17:24:22
tags: css
categories: study
description: vertical-align兼容问题
---


## vertical-align兼容性

```html
<div style="display:inline-line;">
    <a href="#" class="a-upload">
        <input type="file" id="uploadFile" value="" name="file" multiple="multiple" class="file" />选择文件
    </a>
</div>
```

选择文件后，后面展示的文件名并未对齐(在自定义这个选择文件Button后), 想到使用`vertical-align:middle;`属性, 测试发现，`Chrome`、`Firefox`、`Safari`三大浏览器表现情况各不一致. 

```CSS
.a-upload {
    vertical-align: middle;
    margin-top: 10px;
    margin-left: 32px;
    padding: 5px 10px;
    height: 20px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1;
    text-decoration: none;
}

.a-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer
}

.a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    /* font: bold 12px/20px arial, sans-serif; */
}


```

正确使用:

```css
span.showFileName {
    vertical-align: middle;   /*  */
    vertical-align: -webkit-baseline-middle;  /* Chorme/Safari */
    vertical-align: -moz-middle-with-baseline;  /* Firefox */
    margin-left: 10px;
    margin-top: 2px;
}
```

`vertical-align: -webkit-baseline-middle;` 在 `Safari`和`Chrome` 中均ok，`vertical-align: -moz-middle-with-baseline;`针对火狐。

效果图：

<div align="center">
    <img src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/firefox.png" >
</div>



```bash
#开发&测试环境
OS Sierra 10.12

#Safari
版本 10.0 (12602.1.50.0.10)

#Firefox
56.0.2 (64 位)

#Chrome
62.0.3202.94（正式版本） （64 位）
```

> 条件所限，IE未经测试!
