---
title: highcharts plotOptions issue
date: 2017-06-18 15:36:58
tags: [highcharts]
categories: study
description: 解决highcharts饼图/图例文字过长
---

## highcharts饼图/图例文字过长

> 因为某些原因，`highcharts`绘制的饼图上显示的文字或图例文字过长导致显示错乱问题。

错误❌截图如下:

<div class="img" align="center">
    <img src="https://git.oschina.net/uploads/images/2017/0717/175446_4f3a37a8_1120068.png">
    <p>图例文字过长</p>
</div>

<div class="img" align="center">
    <img src="https://git.oschina.net/uploads/images/2017/0718/150746_3781df17_1120068.png">
    <p>饼图上的显示文字过长</p>
</div>

### 图例文案过长解决

> 图例控制在 `legend` 中.

```js
labelFormatter: function () {
    var legendMsg;
    legendMsg = '<a title="' + this.name + '">';
    if (this.name.length > 5) {
        legendMsg += (this.name).substring(0, 3);
        legendMsg += '...';
        legendMsg += (this.name).substring(this.name.length - 2, this.name.length);
    } else {
        legendMsg += this.name;
    }
    legendMsg += '</a>';
    return legendMsg;
}
```

完整的legend配置
```js
var legend = {
    //图例位置
    layout: 'vertical', //显示形式，支持水平horizontal和垂直vertical
    align: 'right', //对其方式，默认为center
    verticalAlign: 'top',
    borderWidth: 0,
    itemStyle: {
        'fontSize': '10px',
        'font-family': 'Microsoft YaHei'
    },
    useHTML: true, //必须要设为TRUE，默认为FALSE
    labelFormatter: function () {
        var legendMsg;
        legendMsg = '<a title="' + this.name + '">';
        if (this.name.length > 5) {
            legendMsg += (this.name).substring(0, 3);
            legendMsg += '...';
            legendMsg += (this.name).substring(this.name.length - 2, this.name.length);
        } else {
            legendMsg += this.name;
        }
        legendMsg += '</a>';
        return legendMsg;
    }
};
```


### 饼图文字过长解决

> 饼图上显示的数据和文案在 `plotOptions` 里控制.


```js
formatter: function() {
    var text;
    if (this.point.name.length > 3) {
        text = '<a title="' + this.point.name + '">' + this.point.name.substring(0, 2) + '</a>';
    } else {
        text = this.point.name;
    }                            
return text + ": " + this.percentage.toFixed(2) + "%";      
}
```

```js
var plotOptions = {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            useHTML: true, //必须要添加
            maxStaggerLines: 1,
            //format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                fontFamily: 'Microsoft YaHei',
                fontSize: '8px'
            },
            formatter: function () {
                var text;
                if (this.point.name.length > 3) {
                    text = '<a title="' + this.point.name + '">' + this.point.name.substring(0, 2) + '</a>';
                } else {
                    text = this.point.name;
                }
                return text + ": " + this.percentage.toFixed(2) + "%";
            }
 
        },
        showInLegend: true //图例
    }
};
```


参考API：

https://api.hcharts.cn/highcharts#legend.labelFormatter

https://api.hcharts.cn/highcharts#plotOptions.pie.dataLabels.formatter


附：

```js
//绘制饼图完整方法

angular.module('xxModule').factory('xxxService', function(){
    return {

        //method xxx...

        _createPie: function(Title, documentID, arrayData) {
            var chart = {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            };
            var title = Title;

            var tooltip = {
                shared: true,
                useHTML: true,
                style: {
                    color: 'orange',
                    fontSize: '8px',
                    fontWeight: 'normal',
                    fontFamily: 'Microsoft YaHei'
                },
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            };
            var plotOptions = {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        maxStaggerLines: 1,
                        //format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                            fontFamily: 'Microsoft YaHei',
                            fontSize: '8px'
                        },
                        formatter: function() {
                            var text;
                            if (this.point.name.length > 3) {
                                text = '<a title="' + this.point.name + '">' + this.point.name.substring(0, 2) + '</a>';
                            } else {
                                text = this.point.name;
                            }
                            return text + ": " + this.percentage.toFixed(2) + "%";
                        }

                    },
                    showInLegend: true //图例
                }
            };
            var legend = {
                //图例位置
                layout: 'vertical', //显示形式，支持水平horizontal和垂直vertical
                align: 'right', //对其方式，默认为center
                verticalAlign: 'top',
                borderWidth: 0,
                itemStyle: {
                    'fontSize': '10px',
                    'font-family': 'Microsoft YaHei'
                },
                useHTML: true,
                labelFormatter: function() {
                    var legendMsg;
                    legendMsg = '<a title="' + this.name + '">';
                    if (this.name.length > 5) {
                        legendMsg += (this.name).substring(0, 3);
                        legendMsg += '...';
                        legendMsg += (this.name).substring(this.name.length - 2, this.name.length);
                    } else {
                        legendMsg += this.name;
                    }
                    legendMsg += '</a>';
                    return legendMsg;
                }
            };
            var series = [{
                type: 'pie',
                name: '百分比: ',
                data: arrayData
            }];
            var credits = {
                enabled: false
            };

            var json = {};
            json.chart = chart;
            json.title = title;
            json.tooltip = tooltip;
            json.series = series;
            json.plotOptions = plotOptions;
            json.legend = legend;
            json.credits = credits;
            $(documentID).highcharts(json);
        }

        //method xxxx...
    };
});
```