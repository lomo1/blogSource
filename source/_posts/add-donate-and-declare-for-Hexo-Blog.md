---
title: add donate and declare for Hexo Blog
date: 2017-02-19 19:32:04
tags: [Hexo, donate]
categories: [write]
description: 为基于Hexo的Blog设置打赏和版权署名
---

## 博客增加打赏和版权署名

### 打赏功能

1. 保存支付宝和微信收款二维码图片至
`themes/使用的主题名/source/img`目录下

2. 创建打赏功能模板文件`donate.ejs`

> 在`themes/主题名/layout/_partial/post` 目录下，

> 注：post目录下的.ejs文件均为博客文章内容的模板文件

`donate.ejs`

```javascript
<div class ="post-donate">
    <div id="donate_board" class="donate_bar center">
        <a id="btn_donate" class="btn_donate" href="javascript:;" title="打赏下Lomo呗"></a>
        <span class="donate_txt">
           ↑<br>
		   <%=theme.donate_message%>
        </span>
        <br>
      </div>  
	<div id="donate_guide" class="donate_bar center hidden" >
		<!-- 支付宝打赏图案 -->
		<img src="/img/zhifubao.jpg" alt="支付宝打赏" title="支付宝扫一扫打赏Lomo"> 
		<!-- 微信打赏图案 -->
		<img src="/img/weixin.jpg" alt="微信打赏" title="微信扫一扫打赏Lomo">  
    </div>
	<script type="text/javascript">

		document.getElementById('btn_donate').onclick = function(){
			$('#donate_board').addClass('hidden');
			$('#donate_guide').removeClass('hidden');
		}

        <!-- 鼠标离开打赏区域后自动隐藏二维码 -->
        var x = document.getElementById("donate_guide");
        x.addEventListener("mouseleave", function(){
            $('#donate_board').removeClass('hidden');
			$('#donate_guide').addClass('hidden');
        });

	</script>
</div>
```

打赏的主要功能模板文件创建完成. 接下来，创建样式文件.

> 注：博客主题的全部样式文件存于 `/themes/xxxName/source/css/_partial` 目录下, 在该目录下创建`donate.styl`文件，内容容下：

```css
.donate_bar {
	text-align: center;
	margin-top: 5%
}

.donate_bar a.btn_donate {
	display: inline-block;
	width: 82px;
	height: 82px;
	margin-left: auto;
	margin-right: auto;
	background: url(http://img.t.sinajs.cn/t5/style/images/apps_PRF/e_media/btn_reward.gif)no-repeat;
	-webkit-transition: background 0s;
	-moz-transition: background 0s;
	-o-transition: background 0s;
	-ms-transition: background 0s;
	transition: background 0s
}

.donate_bar a.btn_donate:hover {
	background-position: 0 -82px
}

.donate_bar .donate_txt {
	display: block;
	color: #9d9d9d;
	font: 14px/2 "Microsoft Yahei"
}
.donate_bar.hidden{
	display: none
}

.post-donate{
	margin-top: 40px;
}

#donate_guide{
	height: 210px;
	width: 420px;
	margin: 0 auto;
}

#donate_guide img{
	height: 200px;
	height: 200px;
}

#donate_guide>img:nth-child(2){
    margin-left:35px;
}
```

打赏模板的样式设置完毕，接着，在样式主文件`style.styl`中引入对该新样式文件的引用：
```css
@import '_partial/donate.styl'
```

主题配置文件`_config.yml`文件中设定对该功能模块的控制：

> `/themes/_config.yml`文件：

```yaml
#是否开启打赏功能
donate: true
#打赏文案
donate_message: 有收获, 还不错? 求鼓励,求支持!
```

关于打赏功能的模板文件、样式文件、配置文件, 已全部创建OK，最后一步，在博客文章主题中引入即可。

`/thems/xxName/layout/_partial/post` 目录下的`article.ejs`文件的`<article`标签中:

```javascript
<% if (!index && theme.donate){ %>
	  <%- partial('donate') %>
    <% } %>
```

Done.

—> Console， 运行gulp 测试查看页面的底部即可看到该功能.


### 文章版权署名

1. `themes/xxName/layout/_partial/post/`目录下创建模板文件`declare.ejs`，如下：
```javascript
<pre>
    <code>
    <b>    
        版权声明</b>:
        本文由<b><a href="<%= config.root %>about" target="_blank" title="<%= config.author %>"><%= config.author %></a></b>创作和发表,采用<b>署名(BY)</b>-<b>非商业性使用(NC)</b>-<b>相同方式共享(SA)</b>国际许可协议进行许可,
        转载请注明作者及出处,本文作者为<b><a href="<%= config.root %>about" target="_blank" title="<%= config.author %>"><%= config.author %></a></b>,本文标题为<b><a href="<%- config.root %><%- item.path %>" target="_blank" title="<%= item.title %>"><%= item.title %></a>.</b>
    </b>
    </code>
</pre>

```

2. 主题配置文件中`_config.yml`设定功能控制
```yml
show_declare: true
```

3. `article.ejs`文件中引入：
```javascript
<% if (theme.show_declare) { %>
		<%- partial('declare') %>
		<% } %>
```

Done.

### Hexo博客二次开发总结

基于Hexo的Blog二次开发，主要是针对博客功能、文章周边的一些开发，比如：可以嵌入的评论、高亮、微博秀、tag等这类使用前纯端技术的功能.

其整个框架，`/themes/xxName/layout`目录下的都是模板文件，包括页面、页头header、页底footer、小挂件widget... `/themes/xxName/source`目录下都是资源文件，如：img、css(.styl)、字体font、js库--jQuery等等，一般都是修改这其中的文件或增加文件于其中.

