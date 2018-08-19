---
title: jquery get data from table
date: 2016-04-08 00:44:36
tags: [jquery, js]
categories: program
description: 使用jQuery获取表格行首列数据
---

## jQuery获取table数据

> 当鼠标点击某一行时，需要获取该行的第一列数据或被点击的这一整行或部分数据，然后传递给API。

jQuery的两个函数：`closet()` 和 `find()`

 closet()函数，从根开始遍历DOM树，第一个发现的即元素即所查找的元素,closet会包含自己

 find()函数，查看对应的元素。不包含自己！

 ```html
 	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8"> 
		<title>Bootstrap 实例 - 基本的表格</title>
		<link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">  
		<script src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
		<script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	</head>
	<body>
	
	<table class="table table-responsive table-hover" id="table">
		<caption>基本的表格布局</caption>
	   <thead>
	      <tr>
	         <th>名称</th>
	         <th>城市</th>
			  <th>Get</th>
	      </tr>
	   </thead>
	   <tbody class="tbody">
	      <tr>
	         <td class="name">Tanmay</td>
	         <td >Bangalore</td>
			   <td>
				   <button type="button" class="btn btn-default">Get1</button>
			  </td>
	      </tr>
	      <tr>
	         <td class="name">Sachin</td>
	         <td>Mumbai</td>
			   <!--<td onclick="alert(this.rowSpan);">-->
			  <td>
				   <button type="button" class="btn btn-default">Get2</button>
			  </td>
	      </tr>
	   </tbody>
	</table>
	
	</body>
		<script>
			$(".btn.btn-default").click(function() {
	    var $row = $(this).closest("tr");    // Find the current row
	    var $text = $row.find(".name").text(); // Find the text by the className
	    
	    // test it out
	    alert($text);
	});
	</script>
		
	</html>
 ```

 如下图:

 <div>
 <img src="http://oluzh4sa6.bkt.clouddn.com/GitHubPages/article/table-test.png" width="75%"/>
 </div>


关于HTMLTableCellElement 参考

> https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement

从这些API只能获取一些基本信息，通常都用不到(比如 rowSpan, colSpan, cellIndex)

其它参考： <a href="http://stackoverflow.com/questions/14460421/jquery-get-the-contents-of-a-table-row-with-a-button-click" target="_blank"> Stack Overflow </a>