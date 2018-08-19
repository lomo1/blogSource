---
title: observable
date: 2018-02-24 19:11:51
tags: [observable, DesignPatterns]
categories: study
description: 设计模式之订阅者模式
---

## 设计模式之订阅者模式

> 简单记录Observable. 该设计模式是RxJS的核心之一。


### 定义

> 一个目标对象 管理者所有依赖于它的观察者对象，当它(该目标对象)发生改变时，它会主动发出通知，告知所有订阅了该目标对象的观察者对象，进而使这些观察者对象自我更新。


示例：

很多媒体、新闻网站都会有订阅功能，网友通过订阅该网站的某些栏目或类别的信息，就会定期收到更新的内容通知，网友就可以进行阅览。当网友取消订阅，就不会再接收任何消息。

在该过程中：
    
    该网站 => 目标对象；
	网友 => 观察者；

这是一个简单的一对多模型。


### 应用场景

1. RxJS

2. 常见的Web应用中对DOM添加事件监听( `addEventListener` )。

### 示例

```ts
// 目标对象类，被订阅者
class Subject {

    private observerCollection: Array<any>;

    constructor() {
        this.observerCollection = [];
    }
    // 注册订阅者
    registerObserver(observer: Observer) {
        this.observerCollection.push(observer);
    }
    // 移除订阅者
    unregisterObserver(observer: Observer) {
        // 查找订阅者
        let index = this.observerCollection.indexOf(observer);
        if (index >= 0)
            // 去除该订阅者
            this.observerCollection.splice(index, 1);
    }
    // 通知所有订阅者
    notifyObservers() {
        this.observerCollection.forEach((observer: Observer) => observer.notify());
    }
}

// 观察者类，观察者
class Observer {
    private name: any;
    constructor(name) {
        this.name = name;
    }

    notify() {
        console.log(`${this.name} has been notified.`);
    }
}


// 创建目标对象
let subject = new Subject();

// 创建观察者对象
let observer1 = new Observer('lomo0');
let observer2 = new Observer('lomo1');

// 注册订阅者(给观察者对象添加订阅)
subject.registerObserver(observer1);
subject.registerObserver(observer2);

// 1. 通知注册者(观察者对象)
// lomo0 has been notified.
// lomo1 has been notified.
subject.notifyObservers();

// 2. 移除订阅者
subject.unregisterObserver(observer1);
// 验证移除是否Ok
// lomo1 has been notified.
subject.notifyObservers();
```


### Angular中的应用

> ng2+中; 后续添加项目应用code.
