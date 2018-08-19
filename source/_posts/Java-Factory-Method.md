---
title: Java Factory Method
date: 2016-03-25 18:36:53
tags: [java, DesignPatterns]
categories: study
description: Java设计模式之工厂模式, 一般工厂, 多工厂, 静态工厂
---

## Java设计模式之工厂模式[笔记]

### 简介
>设计模式就是一个软件的设计思想，从大型软件架构出发，为了升级和维护方便

### 分类

三大类[主要]：

	一、创建型模式(5种)
		①工厂方法
		②抽象工厂
		③单例
		④创建者
		⑤原型
		
	二、结构型模式(7种)
		①适配器模式
		②装饰器模式
		③代理模式
		④外观模式
		⑤桥接模式
		⑥组合模式
		⑦享元模式
		
	三、行为型模式(11种)
		①策略模式
		②模板方法模式
		③观察者模式
		④迭代子模式
		⑤责任链模式
		⑥命令模式
		⑦备忘录模式
		⑧状态模式
		⑨访问者模式
		🔟中介者模式
		①①解释器模式



其他两大类：
```bash
 一、并发型	
 二、线程池
```

### 工厂模式
	工厂模式，类的创建依赖于工厂类，
		a. 一般工厂模式
		一般，将工厂模式里的类设置为static静态的，不需要创建，直接调用。[静态工厂模式]
		一个工厂类里就一个工厂方法，根据传入字段创建不同类的实例；
		
		b. 多个工厂模式
		将a升级，一个工厂类中声明多个工厂方法，不同的方法产生不同类的实例；
		
		c. 静态工厂模式
		将b升级，工厂类中的多个工厂方法声明为static类型，使用时不用new对象，直接使用工厂类名.方法名即可；
		
		相比较a,b,c， 通常选择c 静态工厂方法模式；


### 实例

> 所有实例及分析基本都在代码及其注释中，便于阅读理解其含义！

#### 一般工厂模式
```java
package javaClassExercise.designPatterns.factoryMethod.generalFactoryMethod;

/**
 * Created by lomo.
 * 创建一个发送邮件和发送短信共用的一个接口Sender
 */
public interface Sender {
    public void send();
}
```

```java
package javaClassExercise.designPatterns.factoryMethod.generalFactoryMethod;

/**
 * Created by lomo.
 * 实现Sender接口中的send()方法
 */
public class SmsSender implements Sender {
    @Override
    public void send() {
        System.out.println("这是另一个Sender接口实现类 -- SmsSender ！！！");
    }
}
```

```java
package javaClassExercise.designPatterns.factoryMethod.generalFactoryMethod;

/**
 * Created by lomo.
 * 实现Sender接口中的send()方法
 */
public class MailSender implements Sender {

    @Override
    public void send() {
        System.out.println("这是Sender接口实现类 -- MailSender !!!");
    }
}

```

> 工厂类

```java
package javaClassExercise.designPatterns.factoryMethod.generalFactoryMethod;

/**
 * Created by lomo.
 *
 * 【定义】普通工厂模式：就是建立一个工厂类，对实现了同一接口的一些类进行实例的创建。
 *
 *
 * 发送消息的工厂类, 这个工厂类的作用就是对实现Sender接口的2个类：MailSender类和SmsSender类 **进行实例(new）的创建** -- Sender类型的produce方法.
 *
 * 此实例中的普通工厂模式 即：只有一个工厂类【这个工厂类里对多个方法类进行了new操作】, 对各个类方法new时需要根据传入参数区分来创建对应的实例.
 *
 */

public class SendFactory {
    /*
    根据传入的type类型 返回不同类的实例，而这2个类都是实现了同一个接口(类)，所以produce方法类型即为自定义类型：Sender类型.
     */
    public Sender produce(String type) {
        if ("mail".equals(type)) {
            return new MailSender();
        } else if ("sms".equals(type)) {
            return new SmsSender();
        } else {
            System.out.println("请输入正确的type ！");
            return null; //思考🤔：此处退出程序为什么需要返回null? 那么return, return 0可以吗?
        }
    }
}
/*
答：
produce方法定义其返回类型必须为Sender类的引用类型，只有null可以，直接return是无返回类型void， return 0的必须要求produce方法定义的返回类型为int或Interger类型.
*/
```
> 首先，Java中是对**大小写敏感**, 只有null, 无NULL、Null这类写法。null也是Java中的关键字; 就像其它类型一样，每种原始类型都有其默认值，int类型默认值0，boolean默认值false； 而<font color="orange"><b>null是任何引用类型的默认值</b>, 在Java中任何引用类型变量(Integer、Short、Double等,但是int、short、double这些则不可!)将null作为默认值</font>

例如：
```java
Object object = null; //正确✔
Object object = NULL; //错误❌
Object object = Null; //错误❌，IDE直接报错d
```
> 关于Java中null的九件事, <a href="http://www.importnew.com/14229.html" target="_blank">点击查看</a>.

<br>
> 测试类

```java
package javaClassExercise.designPatterns.factoryMethod.generalFactoryMethod;

/**
 * Created by lomo.
 * 创建一个测试工厂方法类的测试类
 * 工厂类中已经实现了对Sender接口类的创建， 这个工厂类的作用就是实现了对 实现同一个接口 但是不同方法类的创建/new
 */
public class GeneralFactoryMethodTest {
    public static void main(String... args) {
        SendFactory sendFactory = new SendFactory(); //new实例化一个SendFactory工厂类
        Sender sender = sendFactory.produce("sms");
        sender.send(); //这是另一个Sender接口实现类 -- SmsSender ！！！

        Sender sender1 = sendFactory.produce("mail");
        sender1.send(); //这是Sender接口实现类 -- MailSender !!!
    }
}

/*
  思考: 这样设计一个Sender 发送功能的接口，然后再创建2个发送邮件和发送短信的功能类，再创建一个工厂类对这2个功能类进行实例化创建， 有什么好处？？？
  如何不这样设计呢？
  如果现在需要增加一个发送即时消息(和短信类似)的功能，那么如果不按照这种设计模式写，代码会是怎样的呢？
  按照常有的思考模式: 创建一个类，类中包含三个方法，一个是发送邮件、一个发送短信、加上新增的发送即时消息的方法，测试使用时，需要new这个类，然后再调用对应的方法。
  这样写下去，如果以后还有其它好多个发送类的方法需要扩展，则需要修改这个原始类文件，使得这个类变得臃肿，难以维护.
  而， 使用工厂模式呢？ 多有发送类的具体方法都属于各自的类(这些类又实现自同一个Sender接口类)，这个发送类的方法不用考虑是否影响其他类功能，
  只需要专注实现、完美自己的功能，然后再在对应的工厂类中实现对应实例的创建，在调用的时候只需new工厂类，通过工厂类去创建对应方法的实例，
  实现层级化(层级清晰，不是传统的流水账模式)，同时便于拓展、维护！
 */
```

#### 多个工厂模式

> 对一般工厂模式中的工厂类升级

```java
package javaClassExercise.designPatterns.factoryMethod.manyFactoryMethod;

/**
 * Created by lomo.
 *
 * 多个工厂类模式，对普通工厂模式(一个工厂类)升级, 普通工厂模式中的工厂类中只有一个方法并依据传入的参数进行对应方法类的new
 * 多个工厂类模式，针对不用方法类定义不同的方法进行对应方法类的实例化new
 * 这样一来，就方便使用什么发送方法就调用这个工厂类中对应方法即可.
 *
 */
public class ManyFactoryMethod {
    public Sender produceMail() {
        return new MailSender();
    }
    public Sender produceSms() {
        return new SmsSender();
    }
}
```

测试类：

```java
package javaClassExercise.designPatterns.factoryMethod.manyFactoryMethod;

/**
 * Created by lomo.
 *
 * 对个工厂方法模式测试
 * 多个工厂方法模式好处：调用哪个类的方法，是使用new的工厂类实例.那个对应的new这个类方法(工厂类里的方法)
 */
public class ManyFactoryMethodTest {
    public static void main(String[] args) {
        ManyFactoryMethod manyFactoryMethod = new ManyFactoryMethod();
        //System.out.println(manyFactoryMethod.produceMail().getClass());
        //class javaClassExercise.designPatterns.factoryMethod.manyFactoryMethod.MailSender
        Sender sender = manyFactoryMethod.produceMail();
        sender.send(); //这是Sender接口实现类 -- MailSender2 !!!

        Sender sender1 = manyFactoryMethod.produceSms();
        sender1.send(); //这是另一个Sender接口实现类 -- SmsSender2 ！！！
    }
}
```

总结:
> 多个工厂模式即：将一般工厂模式的一个工厂类中的一个方法进行升级改造，改写成一个工厂类多个方法，各个方法对应具体功能模块类的实例化new.

#### 静态工厂模式
> 将多工厂模式升级改造，将工厂类声明为static静态类型，使其不用实例化对象就可以直接调用对应的方法直接创建对应功能模块类的实例对象, 使用方式: `类名.方法名`.

`静态工厂类`
```java
package javaClassExercise.designPatterns.factoryMethod.staticFactoryMethod;

/**
 * Created by lomo on 2017/3/25.
 *
 * 静态工厂方法模式（静态static的、多个工厂方法类）
 * 静态工厂方法模式好处：不用new实例，直接调用， 工厂类名.方法名即可
 *
 * 顺便复习下static关键字
 */
public class StaticFactoryMethod {
    //static静态的返回类型为Sender类型的produceMail方法

    //类中的静态方法中对于本类而言：①只能访问本类的静态变量和类中其他静态方法 ②无this
    //private String name;
    public static Sender produceMail() {
        return new MailSender();
        //System.out.println(name); //报错, 静态方法中不能调用类外的非静态变量
        //test t = new test(); // 提示错误： nreachable statement, 无法访问的
    }

    public static Sender produceSms() {
        return new SmsSender();
    }

//    test t = new test(); //此处访问Ok
//    static {
//        System.out.print("静态static代码块中调用：");
//        test t = new test();  // 在static 代码块中访问也Ok.
//    }
//    public void noStaticMethod() {
//        test t = new test();  //非static里访问也OK
//        t.testC();
//        t.testD();  //非静态方法中访问其他类的非静态方法--ok!
//    }

//    public static void main(String[] args) {
//        test t = new test();
//        //输出:
//        //静态static代码块中调用：您调用了test类的构造方法 !
//        //您调用了test类的构造方法 !
//        //先执行的是本类中的static静态代码块，再执行new test()操作 -- test类中的构造函数.
//
////        t.testC();
////        //输出：
////        //您调用了test类中的非静态的testC() 方法 !
////        t.testD();
////        //输出：
////        //调用的是test类中的静态方法testD() 方法 !
//        // noStaticMethod(); // 主函数是static的，故也不可以调用非此静态方法
//    }
}

class test{
    public test() {
        System.out.println("您调用了test类的构造方法 !");
    }
    public void testC() {
        System.out.println("您调用了test类中的非静态的testC() 方法 !");
    }

    public static void testD() {
        System.out.println("调用的是test类中的静态方法testD() 方法 !");
    }
}

//无静态类，尝试创建static 的class时会自动报错
```

`测试类`
```java
package javaClassExercise.designPatterns.factoryMethod.staticFactoryMethod;

/**
 * Created by lomo.
 * 测试类：测试 静态工厂方法模式
 */
public class StaticFactoryMethodTest {
    public static void main(String... args) {
        //不需要创建实例，直接类型.方法名
        Sender sender = StaticFactoryMethod.produceMail();
        sender.send();  // 这是Sender接口实现类 -- MailSender3 !!!
        Sender sender1 = StaticFactoryMethod.produceSms();
        sender1.send();  // 这是另一个Sender接口实现类 -- SmsSender3 ！！！
    }
}
```

> 对于工厂模式，一般选择第三种: 静态工厂模式即可.