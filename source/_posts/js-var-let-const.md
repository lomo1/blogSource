---
title: js-var_let_const
date: 2016-06-21 11:54:39
tags: js
categories: study
description: JavaScript变量声明几种方式
---

## JavaScript变量声明之var/let/const

### const

`const a;` 错误❌的声明方式！！！

`const`声明的变量必须要初始化！

e.g. `const a = 1;` or `const a = '';`


### var

`var`定义的变量可以不用初始化（值为undefined）, 且不会报错；var定义的变量其值可以被修改！

### let

`let` 定义的变量拥有作用域，在函数内部定义let级变量，则其不会改变函数外部变量属性和值；

```js
let b = 2;

function test(){
    let b = 222;
    console.log("inner value: " + b);
}

console.log(b); //2
test(); //inner value: 222
```



