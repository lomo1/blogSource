---
title: php operate Object
date: 2016-06-09 11:00:07
tags: PHP
categories: program
description: PHP操作Object对象
---

## PHP操作Object对象

> 如： 通过curl请求获取到JOSN数据后，其为JSON 字串，通过gettype()获得其类型是string类型!
> 能否像js里操作对象一样，直接使用xx.key就可以获得其属性值呢？


通过curl获取到的json数据:
```json
{
    "error": {
        "returnCode": "0",
        "returnMessage": "success"
    },
    "data": {
        "allRisk": "3",
        "list": [
            {
                "type": "1",
                "title": "Bug未收敛",
                "count": "0"
            },
            {
                "type": "2",
                "title": "提测Delay",
                "count": "0"
            },
            {
                "type": "3",
                "title": "沟通问题",
                "count": "0"
            },
            {
                "type": "4",
                "title": " 流程问题",
                "count": "0"
            },
            {
                "type": "5",
                "title": "环境问题",
                "count": "0"
            },
            {
                "type": "6",
                "title": "需求变更",
                "count": "0"
            },
            {
                "type": "7",
                "title": "项目计划问题",
                "count": "0"
            },
            {
                "type": "8",
                "title": "其他",
                "count": "3"
            }
        ]
    }
}
```

此数据为string类型；

```php
$obj = json_decode($response);
```
转换为Object对象，默认 `json_decode`未加参数`true`则转换后的为Object类型，反之为Array；

获取对象中的属性值;

```php
print_r($obj->{"error"}) ; //打印对象error属性
```
输出：
```
stdClass Object ( [returnCode] => 0 [returnMessage] => success )
```

或
```php
var_dump($obj->{"error"});
```
输出：
```array
/Users/xxx/xx/xx../xx/api/processQualityReport/reportDataDetail.php:54:
object(stdClass)[2]
  public 'returnCode' => string '0' (length=1)
  public 'returnMessage' => string 'success' (length=7)
```

> 输出对象属性只能用 `print_r()` 函数或 `var_dump()`函数.

### 以json字串形式输出Object对象属性

```php
echo json_encode($obj->data); //将Object对象中的Data属性以JSON字串形式输出
```
输出：
```json
{
    "allRisk": "3",
    "list": [
        {
            "type": "1",
            "title": "Bug未收敛",
            "count": "0"
        },
        {
            "type": "2",
            "title": "提测Delay",
            "count": "0"
        },
        {
            "type": "3",
            "title": "沟通问题",
            "count": "0"
        },
        {
            "type": "4",
            "title": " 流程问题",
            "count": "0"
        },
        {
            "type": "5",
            "title": "环境问题",
            "count": "0"
        },
        {
            "type": "6",
            "title": "需求变更",
            "count": "0"
        },
        {
            "type": "7",
            "title": "项目计划问题",
            "count": "0"
        },
        {
            "type": "8",
            "title": "其他",
            "count": "3"
        }
    ]
}
```

获取data中的risk属性:

```php
echo json_encode($obj->data->allRisk);
```
输出："3"

```php
echo json_encode($obj->data->list[1]); //获取第二组数据，因为list已经是个数组
```

输出：
```json
{
    "type": "2",
    "title": "提测Delay",
    "count": "0"
}
```