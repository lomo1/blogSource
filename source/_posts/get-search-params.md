---
title: get search params
date: 2017-03-02 17:00:42
tags: js
categories: program
description: JS获取URL参数
---

## JS获取URL参数

### 根据key获取对应的value

> 根据参数key获取其value

```js
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam) {
        return decodeURI(sParameterName[1]);
      }
    }
}
```
e.g.
> https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=sfd&rsv_pq=ad648b7a000235a3&rsv_t=7ee4tKobFS9V4lkzlgILOqnqe%2FlzjpSDpgRqQz%2BwScYL5pedH%2F8K431swGM&rqlang=cn&rsv_enter=1&rsv_sug3=4&rsv_sug1=3&rsv_sug7=100&rsv_sug2=0&inputT=470&rsv_sug4=670

getUrlParameter('rsv_t');
//7ee4tKobFS9V4lkzlgILOqnqe%2FlzjpSDpgRqQz%2BwScYL5pedH%2F8K431swGM

getUrlParameter('tn');//baidu


### 序列化URL所有参数

```js
angular.module('utilsModule', []).factory('utilsService', function () {
    return {
        isEmptyObject: function(obj) {
            for (var t in obj)
                return !1;
            return !0;
        },
        GetRequestParams: function() {
            var url = location.search;
            var theRequest = {};

            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                }
            }
            console.log(this);
            if (!this.isEmptyObject(theRequest)) {
                return theRequest;
            } else {
                return false;
            }
        },
        //用于序列化URL参数，向后端以form形式传递参数
        reqParamSerialize: function(obj) {
            var query = '',
                name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        }
        
    };
});
```

 此方法定义为一个service，使用时，在对应的模块中注入即可。

 如：
```js
angular.module('myApp', ['utilsModule']).controller('myCtrl', function($scope, utilsService){
    
    if(utilsService.GetRequestParams())
    {
        //todo ...
    }
});
```