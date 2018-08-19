---
title: js operate cookie
date: 2016-10-30 00:36:08
tags: [cookie, js]
categories: program
description: JavaScript对Cookie相关操作
---

## JavaScript操作Cookie

> JavaScript操作cookie 通常都是增删改查和对数据库的常用操作方法类似.

```javascript
//define cookieAction to manage all the actions for cookie on client
//current Unix timestamp : Math.round(new Date().getTime()/1000)
//getTime()返回数值的单位是毫秒
//For PRC, using GMT->UTC not accurate


var cookieAction = {

  /**
   * [setCookie create and save cookie]
   * @param {[type]} c_name     [description]
   * @param {[type]} value      [description]
   * @param {[type]} expiredays [description]
   */
  setCookie: function(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
      ((expiredays === null) ? "" : ";expires=" + exdate.toString() +
        ";path=/");
  },

  /**
   * [getCookie get the cookie in browser, if it's still available]
   * @param  {[type]} c_name [description]
   * @return {[type]}        [description]
   */
  getCookie: function(c_name) {
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1)
          c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return "";

  },


  //how to check cookie is available or if it is expired?
  //if the cookie exist, there must be could using getCookie Fn to get the value, if it expired, it wouldn't get it.


  /**
   * [removeCookie description]
   * @param  {[type]} c_name [description]
   * @return {[type]}        [description]
   */
  removeCookie: function(c_name) {
    cookieAction.setCookie(c_name, "", -1);
    // var oDate = new Date();
    // oDate.setDate(new Date().getDate() - 1);
    // document.cookie = c_name + "=123;expires=" + oDate + ";path=/";
  },


  checkCookie: function(c_name) {
    var info = cookieAction.getCookie(c_name);
    if (info == "") {
      return false;
    } else {
      return info;
    }
  }


};

```

> 以上对Cookie的常用操作进行了基本封装，添加`setCookie`、删除`removeCookie`、检查是否有效/存在`checkCookie`、获取cookie值`getCookie`， 基本就是这几种方法对cookie的反复操作.

