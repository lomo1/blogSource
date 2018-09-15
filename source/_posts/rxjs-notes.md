---
title: rxjs notes
date: 2018-09-05 17:32:02
tags: [rxjs, js]
categories: program
description: RxJS 笔记📒
---


### rxjs

#### 什么事RxJS

RXJS 是 ReactiveX编程理念/思想的 JavaScript实现版本. 其它语言里, 如 Java 有对应的 RxJava[https://github.com/ReactiveX/RxJava]

> ReactiveX是一种针对异步数据流的编程; ReactiveX 是由微软xx架构师创造.

ReactiveX 参考: http://reactivex.io/intro.html


#### RxJS主要成员(核心概念)

+ `Observable`
> 数据生产、传播

+ `Observer`
> 数据消费

+ `Subscriber`
> 连接 Observable 和 Observer

+ `Operator`
> 数据流、传播途中对数据值进行操作/转换的操作符

+ `Subject`
> 包含 Observable 和 Observer


#### Example

```bash
mkdir rxjs_exercise
cd rxjs_exercise

npm init

# or -g
npm install --save-dev ts-node
# must
npm install rxjs --save
```

##### Observable 创建
e.g. 1 【from】

app.ts

```ts
import { Observable, } from 'rxjs';
import 'rxjs/add/observable/from';  # 操作符 from

let persons = [
    { name: 'Dave', age: 34, salary: 2000 },
    { name: 'Nick', age: 37, salary: 32000 },
    { name: 'Howie', age: 40, salary: 26000 },
    { name: 'Brian', age: 40, salary: 30000 },
    { name: 'Kevin', age: 47, salary: 24000 },
];

let index = 0;

Observable.from(persons).subscribe(
    person => {
        console.log(++index, person);
    },
    error => console.log(error),
    () => console.log('stream end/// ')
);

```

```bash
ts-node app

# 输出结果

1 { name: 'Dave', age: 34, salary: 2000 }
2 { name: 'Nick', age: 37, salary: 32000 }
3 { name: 'Howie', age: 40, salary: 26000 }
4 { name: 'Brian', age: 40, salary: 30000 }
5 { name: 'Kevin', age: 47, salary: 24000 }
stream end///
```

`subscribe`方法里有三个方法参数, `from` 操作符用来读取 `person` 对象, `subscribe`里的方法开始执行时, `Observable` 才开始想它推送 (person)对象数据.


e.g. 2 [create]

```ts
import {Observable} from 'rxjs/Observable';

// generateData 对象
function generateData() {
    const people = [
        { name: 'David', age: 3, salary: 2000 },
        { name: 'Dav', age: 17, salary: 12000 },
        { name: 'Lomo', age: 20, salary: 16000 },
        { name: 'Dev', age: 20, salary: 10000 },
        { name: 'Amy', age: 7, salary: 34000 },
    ];

    return Observable.create(
        observer => {
            let i = 0;
            people.forEach( p => { 
                console.log('推送第 ' + (++i) + ' 条数据');
                observer.next(p)
            });
            observer.complete();
        }
    );
}

generateData().subscribe(
    people => {
        console.log(people.name + '--' + people.age + '--' + people.salary);
    },
    error => { console.log(error); },
    () => { console.log('消费完了.'); }
);
```

```bash
# ts-node create 运行结果如下:

推送第 1 条数据
David--3--2000
推送第 2 条数据
Dav--17--12000
推送第 3 条数据
Lomo--20--16000
推送第 4 条数据
Dev--20--10000
推送第 5 条数据
Amy--7--34000
消费完了.
```

`Observable.create()` 方法接受一个 `function` 方法参数. 通过运行结果发现， 当订阅者每消费一条数据, `observable` 就会推送一条数据, 并逐次推送对象里的数据给消费者, 直到 `complete()`, 从而形成 `流式`.

尝试将 `.subscriobe()` 方法里的三个方法注释掉,
```ts
generateData().subscribe(
    // people => {
    //     console.log(people.name + '--' + people.age + '--' + people.salary);
    // },
    // error => { console.log(error); },
    // () => { console.log('消费完了.'); }
);
```
运行结果:
```bash
推送第 1 条数据
推送第 2 条数据
推送第 3 条数据
推送第 4 条数据
推送第 5 条数据
```

整个数据流的传递 只有 `Observable` 在被订阅(`.subscribe()`)消费时才会去推送数据流(不管订阅者是否处理消费, 只要订阅了 就给你推送).

