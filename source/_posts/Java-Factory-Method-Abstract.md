---
title: Java Factory Method Abstract
date: 2016-03-26 18:41:11
tags: [java,DesignPatterns]
categories: study
description: Java设计模式之抽象工厂模式
---

## Java设计模式之抽象工厂模式[笔记]

### 缘由
>工厂方法，对类的创建依赖于工厂类，如果要拓展程序，就要修改原来的这个工厂类，所以使用抽象工厂模式，创建多个工厂类，对于扩展的程序，增加一个对应的工厂类即可；
>其实，这相当于对工厂模式再次升级，将工厂里的方法进行再一次抽象(一般，将这个工厂类里的这个**公有方法抽象成另一个接口**)，然后再在这些工厂类里实现这个接口即可。

### 实例

`功能模块类接口interface 之Sender接口`
```java
package javaClassExercise.designPatterns.abstractFactory;
/**
 * Created by lomo.
 *
 * 实现各个功能模块的公有接口
 */
public interface Sender {
    public void send();
}
```

`工厂类公有方法抽象成的类接口interface 之Provider接口`
```java
package javaClassExercise.designPatterns.abstractFactory;

/**
 * Created by lomo.
 *
 * 提供一个工厂类共有的接口, 各个具体功能模块对应的工厂类实现该接口的方法即可
 * 调用时，只需要调用对象功能模块的工厂类即可获取对应功能类的实例
 * 拓展时，只需要增加一个功能模块类(实现功能公有的接口)，和另一个 工厂类(实现工厂类公有的接口) 即可。
 *
 * 为何声明返回类型为Sender类型？
 * 该接口声明一个返回类型为Sender类型的produce方法，实现该接口的类时必须实现对应的produce方法，
 * 这样一来，实现的工厂类 类中实现该produce方法即可获得对应功能模块的实例
 * 调用时只要new该工厂类实例，然后调用对应的方法即可获得对应的功能类实例;
 */
public interface Provider {
    public Sender produce();
}
```

`具体的功能模块类1：(实现Sender接口的)`
```java
package javaClassExercise.designPatterns.abstractFactory;

/**
 * Created by lomo .
 */
public class MailSender implements Sender {
    @Override
    public void send() {
        System.out.println("您调用了抽象工厂模式下的功能类MailSender里的send方法 -- 具体实现功能类1！！");
    }
}
```

`具体的功能模块类2：(实现Sender接口的)`
```java
package javaClassExercise.designPatterns.abstractFactory;

/**
 * Created by lomo.
 */
public class SmsSender implements Sender {
    @Override
    public void send() {
        System.out.println("您调用了抽象工厂模式下的功能类SmsSender里的send方法 -- 具体实现功能类2！！");
    }
}
```

`工厂类1, 实现了对功能类1 mail的实例化创建`
```java
package javaClassExercise.designPatterns.abstractFactory;

/**
 * Created by lomo.
 *
 * SendMailFactory工厂类 实现了 对MailSender功能类的实例创建
 */
public class SendMailFactory implements Provider {
    @Override
    public Sender produce() {
        return new MailSender();
    }
}
```

`工厂类2, 实现了对功能类2 sms的实例化创建`
```java
package javaClassExercise.designPatterns.abstractFactory;

/**
 * Created by lomo.
 *
 * 工厂类SendSmsFactory 实现了 对SmsSender类实例的创建
 */
public class SendSmsFactory implements Provider{
    @Override
    public Sender produce() {
        return new SmsSender();
    }
}
```

`测试类`
```java
package javaClassExercise.designPatterns.abstractFactory;

/**
 * Created by lomo.
 *
 * 测试抽象工厂类
 *
 * 详细解释见注释！！！
 */
public class abstractFactoryTest {
    public static void main(String[] args) {

        //创建一个工厂类SendMailFactory的实例provider
        Provider provider = new SendMailFactory();
        //获得一个MailSender类的实例sender
        Sender sender = provider.produce();
        sender.send();   //您调用了抽象工厂模式下的功能类MailSender里的send方法 -- 具体实现功能类1！！


        /* 详细注释 + 解释 */
        //通过 工厂类SendSmsFactory 创建一个provider1实例, 并将该实例存储在provider1对象中
        Provider provider1 = new SendSmsFactory();
        //通过对provider1这个对象的produce方法调用，可以获得SmsSender这个功能类的实例，并将其存储在sender1对象中
        Sender sender1 = provider1.produce();
        //调用sender1对象中存储的SmsSender实例的方法send()
        sender1.send();  //输出：您调用了抽象工厂模式下的功能类SmsSender里的send方法 -- 具体实现功能类2！！

    }
}
```