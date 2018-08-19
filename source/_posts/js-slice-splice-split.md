---
title: js slice splice split
date: 2015-09-19 10:55:45
tags: js
categories: study
description: JavaScript的三个易混淆函数slice/splice/split
---

## JavaScript的三个易混淆函数slice/splice/split

### slice 截取数组

对数据进行截取，并返回一个数组副本。


语法：
    
`array.slice(startNo, endNo);`
参数start是截取的开始数组索引，end参数等于你要取的最后一个字符的位置值加上1.

e.g.1
```js
var arr = ['lomo', 2, 3, 7, 9, 12, 'dong'];

var arr2 = arr.slice(1,3);
console.log(arr2); // [2, 3], 数组小标从0开始
//如果你要从arr中截取出12，dong 这2个，那么应该这样：
var arr3 = arr.slice(5, 7); 

console.log(arr.slice(3)); //[7, 9, 12, "dong"], 表示从数组下标3开始截取到最后结束。
```

### slice 截取字符串

```js
var s = "lomo.space";
s.slice(3); // 输出：o.space

s.slice(1, 4); // omo
s.slice(1, 5); // omo.
s.slice(1, 6); // omo.s
```


### splice 截取数组

> `splice()` 方法从Array中移除一个或多个数组元素，并用新的item替换。

语法：

`array.splice(start, deleteCounts, item....);` 

参数start是从数组array中移除元素的开始位置(开始数组索引)。参数deleteCount是要移除的元素的个数, 有额外的参数item，那么item会插入到被移除元素的位置上。

该函数返回一个包含被移除元素的数组。

e.g.2
```js
var arr = [1,3, 5, 9, 'lomo', 2.5];

var a = arr.splice(1, 2); // a -> [3, 5] , 变量a存储的是从arr中移除的元素并按顺序形成新的数组a

console.log(arr); //[1, 9, "lomo", 2.5] , 数组arr被移除第二个和第三个元素后的结果

var b = arr.splice(1, 2, 'ch', 'don');
console.log(b); //[9, "lomo"], b存储被arr移除出来的2个元素

console.log(arr); // [1, "ch", "don", 2.5], arr数组第二个元素3(数组小标为1) 和第三个元素5被移除并被新的元素 'ch' 和 'don' 依次替换。

```

```js
var arr = [1,3, 5, 9, 'lomo', 2.5];

var c = arr.splice(1, -2, 'f', 'ff');  // c.length = 0

console.log(arr); //[1, "f", "ff", 3, 5, 9, "lomo", 2.5]

```

```js
var arr = [1,3, 5, 9, 'lomo', 2.5];

var c= arr.splice(-1, 2, 'ee', 'ef');

console.log(c); // [2.5]

console.log(arr); // [1, 3, 5, 9, "lomo", "ee", "ef"]


var arr = [1,3, 5, 9, 'lomo', 2.5];

arr.splice(-1, 3, 'e', 'ee', 'eee'); //[2.5]

console.log(arr); // [1, 3, 5, 9, "lomo", "e", "ee", "eee"]


var arr = [1,3, 5, 9, 'lomo', 3.5]; //arr.length = 6;

arr.splice(-2, 2, 'e', 'ee', 'eee'); // 6 +(-2) = 4; ["lomo", 3.5], 所以从数组小标为4的第五个元素lomo开始截取替换

console.log(arr); // [1, 3, 5, 9, "f", "ff"]

```

可以看到`splice()`函数第一个参数为负数，看注释。


### split

语法：

`string.split(分隔符，optionnalLimit);` 第一个参数必选，第二个可选，该函数用来分割字符串并产出一个分割后的新数组；

```js
var a = '23324324'
a.split(''); // ["2", "3", "3", "2", "4", "3", "2", "4"]

var b = a.split('', 3);
console.log(b); //["2", "3", "3"]
```


参考：

http://www.jb51.net/article/81663.htm
