---
title: java multiThreads
date: 2018-05-28 23:08:56
tags: java
categories: study
description: Java创建多线程常见方式
---

## Java创建多线程的几种方法

> 前几天被问，只想起来第一种，其它几种忘记了，特此补补。

### 通过Thread类

> 第一种，通过继承Thread类，重写`run`方法。

```java
<!-- 测试类 -->
public class MultiThreads extends Thread {

    public static void main(String... args) {
        // Main m = new Main("Lomo1");
        // m.start();
        // Main m2 = new Main("Lomo2");
        // m2.start();
        Main m = new Main("Lomo1");
        Main m2 = new Main("Lomo2");
        m.start();
        // m.start(); 重复调用是会抛异常的！！！
        // m.run();  // 是可以的，直接调用了Main类重写后的run方法！
        m2.start();
        // 上面2个对象调用顺序无关 不影响结果
    }


}
<!-- 多线程实现类 -->
class Main extends Thread{
    private static int num = 5;
    private String name;

    Main(String s) {
        this.name = s;
        System.out.println("--子类Main--" + s);
    }

    //    多线程的处理逻辑 重写于此
    @Override
    public void run() {
        for (int i = 0; i < this.num; i ++) {
            System.out.println("线程" + this.name  + ": " + Thread.currentThread().getName() + " num = " + i);
        }
    }
}
```
结果：
```bash
--子类Main--Lomo1
--子类Main--Lomo2
线程Lomo1: Thread-0 num = 0
线程Lomo1: Thread-0 num = 1
线程Lomo1: Thread-0 num = 2
线程Lomo2: Thread-1 num = 0
线程Lomo1: Thread-0 num = 3
线程Lomo2: Thread-1 num = 1
线程Lomo1: Thread-0 num = 4
线程Lomo2: Thread-1 num = 2
线程Lomo2: Thread-1 num = 3
线程Lomo2: Thread-1 num = 4
```

> 每次运行，可以看到顺序并不同，说明多线程里，那个线程先执行、什么时候执行 均取决于CPU资源的调度。

在注释中`m.start();`是无法多次调用该方法实现多线程共享同一个对象资源的，因为：`start()`方法是启动/创建一个新线程，新线程会执行相应的run方法，其不能被同一个对象重复调用。


### 通过Runnable接口

> 通过实现Runnable接口重写其`run()`方法.

```java
/**
 * 第二种：通过实现Runnable接口实现多线程
 * Created by lomo.
 *
 */
public class MultiThreadsByRunNable {

    public static void main(String[] args) {
//        Mains ms = new Mains("lomoa");
//        // 第一个线程
//        new Thread(ms).start();
//        // 第二个线程
//        new Thread(ms).start();
// 或这样写(推荐！)
        new Thread(new Mains("lomoa")).start();
        new Thread(new Mains("lomoaa")).start();
    }
}

class Mains implements Runnable {
    private static int N = 5;
    private String name;

    Mains(String s) {
        this.name = s;
        System.out.println("constructor is called --" + s);
    }

    @Override
    public void run() {
        for (int i = 0; i < N; i ++) {
            System.out.println("线程" + this.name + ": " + Thread.currentThread().getName() + "运行了..." + i);
        }
    }
}
```

运行结果：

```bash
constructor is called --lomoa
constructor is called --lomoaa
线程lomoa: Thread-0运行了...0
线程lomoa: Thread-0运行了...1
线程lomoa: Thread-0运行了...2
线程lomoaa: Thread-1运行了...0
线程lomoa: Thread-0运行了...3
线程lomoaa: Thread-1运行了...1
线程lomoa: Thread-0运行了...4
线程lomoaa: Thread-1运行了...2
线程lomoaa: Thread-1运行了...3
线程lomoaa: Thread-1运行了...4
```

> 第一种，继承`Thread`类的实现方法，通过查看`Thread`的源码，发现其也是实现了`Runnable`接口方法，本质上是一样的。

通过实现`Runnable`接口实现方式的有点:
```bash
1. 避免Java中类单继承带来的问题。假设：某个类A已继承了类B，此时需要将类A放入多线程，那么通过实现接口的方式去实现是最好的(接口可以实现多继承)
2. 多个线程可以共享同一个对象资源。
```


### 通过Callable和Future

> 通过实现`Callable`接口的`call()`方法。该call方法作为多线程处理逻辑，类似前面的run方法。call方法要求有返回值.


```java
package javaClassExercise.multiThreading;

import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

/**
 * 第三种：通过Callable接口方式实现多线程
 * Created by lomo .
 */
public class MultiThreadsByCall implements Callable<Integer>{

    private static int N = 10;

    MultiThreadsByCall() {

    }

    // main函数会启动main线程.
    public static void main(String[] args) {
        MultiThreadsByCall multiThreadsByCall = new MultiThreadsByCall();
        FutureTask<Integer> futureTask = new FutureTask<Integer>(multiThreadsByCall);
//        new Thread(futureTask).start();

        for (int i = 0; i < MultiThreadsByCall.N; i ++) {
            System.out.println("线程 "+ Thread.currentThread().getName() + " 的当前循环变量值为：" + i);
            if (i == 5) {
                new Thread(futureTask, "有返回值的线程").start();
            }
        }

        try {
            System.out.println("子线程的返回值: " + futureTask.get());
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public Integer call() throws Exception {
        int i;
        for (i = 0; i < this.N; i ++) {
            System.out.println("线程: " + Thread.currentThread().getName() + " 调用了 " + i);
        }
        return i;
    }
}

```

运行结果:
```bash
线程 main 的当前循环变量值为：0
线程 main 的当前循环变量值为：1
线程 main 的当前循环变量值为：2
线程 main 的当前循环变量值为：3
线程 main 的当前循环变量值为：4
线程 main 的当前循环变量值为：5
线程: 有返回值的线程 调用了 0
线程: 有返回值的线程 调用了 1
线程: 有返回值的线程 调用了 2
线程: 有返回值的线程 调用了 3
线程: 有返回值的线程 调用了 4
线程: 有返回值的线程 调用了 5
线程: 有返回值的线程 调用了 6
线程: 有返回值的线程 调用了 7
线程: 有返回值的线程 调用了 8
线程: 有返回值的线程 调用了 9
线程 main 的当前循环变量值为：6
线程 main 的当前循环变量值为：7
线程 main 的当前循环变量值为：8
线程 main 的当前循环变量值为：9
子线程的返回值: 10
```