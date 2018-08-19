---
title: 导航栏多级下拉菜单hover显示
date: 2017-01-28 00:50:46
tags: [js, css]
categories: program
description: 导航栏多级下拉菜单实现hover展示
---

## 导航栏多级下拉菜单hover展示

> 基于Bootstrap的`dropdown-menu`类实现的下拉菜单默认情况下需要鼠标点击才可以展开显示，显然不符合大部分需求，我们需要的是鼠标悬浮在对应的导航一级或二级或三级标题时，可以自动展示对应的子菜单。

```html
<nav class="navbar-collapse panel-collapse" id="navbar-main">
    <ul class="nav navbar-nav navbar-right">
        <li class="dropdown show-on-hover">
            <a class="dropdown-toggle" data-toggle="dropdown" href="index.html#">自助编辑<i class="fa fa-edit fa-fw"></i></a>
            <ul class="dropdown-menu">
                <li class="dropdown-submenu show-on-hover">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="destination-parent.html">Africa</a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Algeria</a></li>
                        <li><a href="#">Cape Verde</a></li>
                    </ul>
                </li>
                <li class="dropdown-submenu show-on-hover">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="destination-parent.html">Asia</a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Bhutan</a></li>
                        <li><a href="#">Cambodia</a></li>
                        <li><a href="#">Vietnam</a></li>
                    </ul>
                </li>
                <li class="divider"></li>
                <li class="dropdown-submenu show-on-hovered">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="destination-parent.html">Canada</a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Alberta</a></li>
                        <li><a href="#">Vancouver</a></li>
                    </ul>
                </li>
                <li class="dropdown-submenu show-on-hover">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="destination-parent.html">Central America </a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Honduras</a></li>
                        <li><a href="#">Nicaragua</a></li>
                        <li><a href="#">Panama</a></li>
                    </ul>
                </li>
                <li class="divider"></li>
                <li class="dropdown-submenu show-on-hover">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="destination-parent.html">Europe</a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Spain</a></li>
                        <li><a href="#">Ukraine</a></li>
                        <li><a href="#">United Kingdom</a></li>
                    </ul>
                </li>

                <li class="dropdown-submenu show-on-hover">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="destination-parent.html">United States</a>
                    <ul class="dropdown-menu">
                        <li><a href="#">New York</a></li>
                        <li><a href="#">Nevada</a></li>
                        <li><a href="#">Texas</a></li>
                    </ul>
                </li>
            </ul>
        </li>

        <li class="dropdown show-on-hover">
            <a class="dropdown-toggle" data-toggle="dropdown" href="index.html#">内容补充</a>
            <ul class="dropdown-menu">
                <li><a href="#">Adventure <i class="fa fa-pencil-square fa-fw"></i></a></li>
                <li><a href="#">Beaches</a></li>
                <li><a href="#">Culture &amp; History</a></li>
            </ul>
        </li>

        <li><a href="#">权限申请</a></li>
        <li><a href="#">Others</a></li>
    </ul>
</nav>
```

默认需要点击才可以展开下拉菜单：

<div align="center">
 <img src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/process.png" width="75%" />
</div>

### JS实现

通过本来就引入的库jQuery实现
```js
// =========================================================================
    // 展开或收敛导航栏一级下拉菜单按钮
    // =========================================================================
    //自动展开
    $('.nav .dropdown').mouseenter(function() {
        console.log("一级菜单展开了");
        $(this).addClass('open');
    });
    //自动关闭
    $('.nav .dropdown').mouseleave(function() {
        console.log("一级菜单离开了");
        $(this).removeClass('open');
    });

    // =========================================================================
    // 展开或收敛导航栏二级下拉菜单按钮
    // =========================================================================
    $('.nav .dropdown .dropdown-submenu').mouseenter(function() {
        console.log("二级菜单dropdown-submenu展开了");
        $(this).addClass('open');
    });
    //自动关闭
    $('.nav .dropdown .dropdown-submenu').mouseleave(function() {
        console.log("二级菜单dropdown-submenu离开了");
        $(this).removeClass('open');
    });
```

### CSS实现
```css
.navbar .nav>li .dropdown-menu {
    margin: 0;
}

.nav.navbar-nav.navbar-right>li:hover>.dropdown-menu {
    display: block;
}

.nav.navbar-nav.navbar-right ul.dropdown-menu>li.dropdown-submenu .dropdown-toggle:hover+.dropdown-menu {
    display: inline-table;
}
```