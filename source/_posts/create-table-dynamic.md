---
title: create table dynamic
date: 2015-07-09 12:31:34
tags: [js, table]
categories: study
description: 根据接口返回动态创建表格
---

## JS动态创建Table表

接口返回JSON示例
```json
{
    "BugCount": {
        "fieldExplain": {
            "month": "月份",
            "totalCount": "整体BUG数量",
            "online": "纯线上Bug数量",
            "offline": "线下bug",
            "onlinePercent": "纯线上Bug占比",
            "offlinePercent": "线下Bug占比"
        },
        "BugCountDetail": [{
            "month": "2017-03",
            "totalCount": "1564",
            "online": "291",
            "offline": "1273",
            "onlinePercent": "36.82%",
            "offlinePercent": "81.39%"
        }, {
            "month": "2017-04",
            "totalCount": "1214",
            "online": "311",
            "offline": "903",
            "onlinePercent": "25.62%",
            "offlinePercent": "74.38%"
        }, {
            "month": "2017-05",
            "totalCount": "1267",
            "online": "249",
            "offline": "1118",
            "onlinePercent": "18.22%",
            "offlinePercent": "81.78%"
        }, {
            "month": "2017-06",
            "totalCount": "1572",
            "online": "278",
            "offline": "1294",
            "onlinePercent": "17.68%",
            "offlinePercent": "82.32%"
        }]
    },
    "OnlineBug": {
        "fieldExplain": {
            "month": "月份",
            "totalCount": "整体BUG数量",
            "online": "纯线上BUG数量",
            "online_P0": "纯线上Bug-P0",
            "online_P1": "纯线上Bug-P1",
            "online_P2": "纯线上Bug-P2",
            "online_Others": "纯线上Bug-其他",
            "online_P0P1": "纯线上P0P1",
            "online_P2P3": "纯线上P2P3",
            "online_P012": "纯线上P012",
            "P0P1_Percent": "P0P1占比"
        },
        "OnlineBugDetail": [{
            "month": "2017-03",
            "totalCount": "1564",
            "online": "291",
            "online_P0": "25",
            "online_P1": "84",
            "online_P2": "156",
            "online_Others": "26",
            "online_P0P1": "109",
            "online_P2P3": "182",
            "online_P012": "265",
            "P0P1_Percent": "37.46%"
        }, {
            "month": "2017-04",
            "totalCount": "1214",
            "online": "311",
            "online_P0": "30",
            "online_P1": "78",
            "online_P2": "187",
            "online_Others": "16",
            "online_P0P1": "108",
            "online_P2P3": "203",
            "online_P012": "295",
            "P0P1_Percent": "34.73%"
        }, {
            "month": "2017-05",
            "totalCount": "1367",
            "online": "249",
            "online_P0": "21",
            "online_P1": "68",
            "online_P2": "147",
            "online_Others": "13",
            "online_P0P1": "89",
            "online_P2P3": "160",
            "online_P012": "236",
            "P0P1_Percent": "35.74%"
        }, {
            "month": "2017-06",
            "totalCount": "1572",
            "online": "278",
            "online_P0": "36",
            "online_P1": "79",
            "online_P2": "140",
            "online_Others": "23",
            "online_P0P1": "115",
            "online_P2P3": "163",
            "online_P012": "255",
            "P0P1_Percent": "41.37%"
        }]
    }
}
```

`fieldExplain` 为表头 `thead`，`BugCountDetail` 和 `OnlineBugDetail` 为表格内容即: `tbody`。

### js遍历Json
```js
var jsonData = "month":"2017-03","totalCount":"1564","online":"291","offline":"1273","onlinePercent":"36.82%","offlinePercent":"81.39%"},{"month":"2017-04","totalCount":"1214","online":"311","offline":"903","onlinePercent":"25.62%","offlinePercent":"74.38%"},{"month":"2017-05","totalCount":"1267","online":"249","offline":"1118","onlinePercent":"18.22%","offlinePercent":"81.78%"},{"month":"2017-06","totalCount":"1572","online":"278","offline":"1294","onlinePercent":"17.68%","offlinePercent":"82.32%"}];

for(var i=0; i<jsonData.length ;i++){
    //循环多少个{}json串

    for(var key in jsonData[i]){
        //循环遍历一个{...} json串, 
        //如:{"month":"2017-04","totalCount":"1214","online":"311","offline":"903","onlinePercent":"25.62%","offlinePercent":"74.38%"}
        console.log(key+':'+jsonData[i][key]);
        //key 即为json中的key, jsonData[i][key] 对应其值
    }
}
```

### 表头thead

```js
// 拆分; 表头部分
var json = {"month":"月份","totalCount":"整体BUG数量","online":"纯线上Bug数量","offline":"线下bug","onlinePercent":"纯线上Bug占比","offlinePercent":"线下Bug占比"};

  var tHead = '';
  //表头
  for(var k in tHeadObj) {
    tHead += '<th>' + tHeadObj[k] + '</th>'; 
  }
  tHead = '<thead><tr>' + tHead + "</tr></thead>";
  return tHead;
```

### tbody

```js
//表body部分
var jsonData = [{"month":"2017-03","totalCount":"1564","online":"291","offline":"1273","onlinePercent":"36.82%","offlinePercent":"81.39%"},{"month":"2017-04","totalCount":"1214","online":"311","offline":"903","onlinePercent":"25.62%","offlinePercent":"74.38%"},{"month":"2017-05","totalCount":"1267","online":"249","offline":"1118","onlinePercent":"18.22%","offlinePercent":"81.78%"},{"month":"2017-06","totalCount":"1572","online":"278","offline":"1294","onlinePercent":"17.68%","offlinePercent":"82.32%"}];


//创建表Body
var tBody = '';
var tBody_tr = '';

for(var i=0; i<jsonData.length; i++){
  tBody += '<tr>';
  for(var key in jsonData[i]){
    //alert(jsonData[i][key]);
    tBody += "<td>" + jsonData[i][key] + "</td>";
  }
  tBody_tr = tBody + "</tr>";
}
tBody = "<tbody>" + tBody_tr + "</tbody>";
console.log(tBody);
```

输出：
```html
<tbody><tr><td>2017-03</td><td>1564</td><td>291</td><td>1273</td><td>36.82%</td><td>81.39%</td><tr><td>2017-04</td><td>1214</td><td>311</td><td>903</td><td>25.62%</td><td>74.38%</td><tr><td>2017-05</td><td>1267</td><td>249</td><td>1118</td><td>18.22%</td><td>81.78%</td><tr><td>2017-06</td><td>1572</td><td>278</td><td>1294</td><td>17.68%</td><td>82.32%</td></tr></tbody>
```

将以上2部分合并为一个函数即可。

调用该函数时，主要传入`head`json数据和`body`所需的数组json即可.

```js
function createBugCountTable(captionTitle, tHeadObj, tBodyArr) {
    // 表格标题
    var caption = '<table class="table table-bordered table-hover "><caption class="text-muted h4">' + captionTitle +
        '</caption>';
 
    //TODO JS遍历json
    var tableHead = '<thead><tr><th>' + tHeadObj.month + '</th><th>' + tHeadObj.totalCount + '</th><th>' + tHeadObj.online +
        '</th><th>' + tHeadObj.offline + '</th><th>' + tHeadObj.onlinePercent + '</th><th>' + tHeadObj.offlinePercent +
        '</th></tr></thead><tbody>';
 
    var tableBody = '';
    for (var i = 0; i < tBodyArr.length; i++) {
        tableBody += '<tr><td>' + tBodyArr[i].month + '</td><td>' + tBodyArr[i].totalCount + '</td><td>' + tBodyArr[i].online +
            '</td><td>' + tBodyArr[i].offline + '</td><td>' + tBodyArr[i].onlinePercent + '</td><td>' + tBodyArr[i].offlinePercent +
            '</td></tr>';
    }
 
    return caption + tableHead + tableBody + '</tbody></table>';
}
 
var t = createBugCountTable("test", tHeadObj, tBodyArr);
console.log(t);
```