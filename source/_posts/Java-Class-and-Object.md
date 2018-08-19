---
title: Java Class and Object
date: 2016-11-11 22:25:18
tags: java
categories: study
description: Java类与对象, 类对象初始化顺序, TestNG原理
---

## Java类和对象[学习笔记]

### 简介

类, 是抽象的;
> 将对象的属性和方法封装在一起就组成了类。

对象, 是具体的;
> 在面向对象编程中，主要思想：一切皆为对象！以对象为单位进行coding

### 提出问题

> 为什么Java中的main函数必须是static静态的？

> 为什么main方法中必须带有参数而且是不定参数String[] value形式？

这是自己学习以来经常会在脑海里出现的问题，现在进行系统学习后，简单进行总结，答案在最后。


### 类的创建和初始化

#### 创建

```Java
class 类名 {

    //构造函数
    public 类名() {
        //do sth...
    }
}
```

> 默认地，如果一个类没有显式地申明构造函数，则在编译执行过程中会自动创建一个构造函数!

> 而构造方法是一个类被初始化过程中必须执行的方法！！


##### 类的创建规则：
> 一个.java文件中可以有多个类，但是 **至多** 只能有一个public类 一般情况，该类里放置main方法，作为程序入口!

> 可以有0个public的类, 那么.java文件的名可以与其中任何一个类名字相同即可

> 如果有public类，则.java文件名字必须与该public类名相同！！！

关于编译:

> 编译时，会为每个.java文件创建一个对应的.class文件


#### 初始化

> 一般，通过类的构造器来创建对象, 构造器即：构造函数，是一个与类同名的方法；在new时对其传递一些参数完成初始化.

```java
类名  变量名 =  new 类名("参数");
```

> E.g.

```Java
public class classTest {

    String name;
    int age;
    double height;
    double weight;
    String interest;
    boolean sex;

    public classTest(String name, int age, double height, double weight, String interest, boolean sex) {
        this.name = name;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.interest = interest;
        this.sex = sex;
        //还有其它很多公有属性
    }

    public static void main(String[] args) {
        classTest test = new classTest("Lomo", 25, 165.00, 110.0, "read", true);
        String  male;
        if(test.sex) {
            male = "男";
        }else {
            male = "女";
        }

        System.out.print("Name: " + test.name + "，Age: " + test.age + "，Height: " + test.height + "，Weight: "+ test.weight + "，Interest" + test.interest + "，Sex: " + male);
    }

}
// 运行输出: Name: Lomo，Age: 25，Height: 165.0，Weight: 110.0，Interestread，Sex: 男
```

> 【总结】 初始化/实例化一个类 这个new 的过程:

> 编译器会首先检查类中是否有显式地申明构造函数，若有，则new的时候会直接调用该定义的构造器/构造函数;  若没有显式地申明构造函数，则编译器会自动为该类增加一个无参数的空构造方法：类名(){};

#### 构造方法和变量的初始化顺序: 

> 类在被初始化new的过程中, 构造方法和变量的初始化顺序?

结论：

> 无论类中的(类)变量申明在方法/构造方法前面或者后面，变量都会优先于一般方法/构造方法 执行！！！

> 无论类变量在类中相对于方法的位置是在方法前或后，只要在方法的外部，就一定会先初始化变量！！！

E.g.1
`Person.java`

```Java
public class Person {

    public String t = "lomo";

    //构造器/构造函数
    public Person(int id) {
        System.out.println("Person: " + id);
    }

    public static void main(String[] args) {
        Build b = new Build();
    }
}

class Build{

    Person p1 = new Person(1);

    public Build() {
        System.out.println("这是Build类的构造函数！");
        Person p2 = new Person(2);
    }

    Person p3 = new Person(3);
}

// 输出：
        // Person: 1
        // Person: 3
        // 这是Build类的构造函数！
        // Person: 2
```

> **分析** 
> 运行时，找到main方法，从main方法作为入口开始执行程序，在main方法中new了一个Build类对象b, 再看Build类, Build类中有两个变量p1, p3 和 一个Build类的显式声明的无参数的构造函数, 根据开头的结论：类变量初始化优先于构造函数初始化, 所以在main函数中new一个Build类实例时，会先初始化Build类的类变量p1, p3， 所以依次输出 `Person: 1`, `Person: 3`, 然后执行构造器的初始化, 打印了构造方法Build的结果 `这是Build类的构造函数！`, Build构造函数中第二行语句又new了一个Person类的实例，所以此时又按照刚才所述，同理先初始化类变量，此时Person类中无类变量，所以根据给new时给传入的参数2 执行Person类的构造方法，输出`Person: 2`.

> 分析完毕!!!


> 【实际使用】过程中，构造函数：通常 构造函数是为了在new创建类实例(对象)时就可以直接获取该类的一些属性.

##### static与非static区别

首先，对E.g.1改造：

```Java
public class Person {

    //构造器、构造函数
    public Person(int id) {
        System.out.println("Person: " + id);
        //Lomo lomo = new Lomo("LOMO");
    }

    /**
     * static 静态代码块
     */
    static {
        System.out.println("这是static静态代码块！");
    }

    /**
     * 非静态块
     */
    {
        System.out.println("这是非静态代码块！");
    }
    // 主函数、程序执行入口
    public static void main(String[] args) {
        Build b = new Build();
    }
}

class Build {

    Person p1 = new Person(1);

    public Build() {
        System.out.println("这是Build类！");
        Person p2 = new Person(2);
    }

    Person p3 = new Person(3);
}

// 运行，输出：
//这是Person类中的static静态代码块！


//这是Person类中的非静态代码块！
//Person: 1

//这是Person类中的非静态代码块！
//Person: 3

//这是Build类！

//这是Person类中的非静态代码块！
//Person: 2

```
> **分析**

> Tips: 类中的static静态代码块或静态变量、静态方法，在初始化该类时，无论new多少，都只初始化一次然后保存在内存中，供使用！！！

> 从main函数入口开始执行程序代码，被static修饰的变量或方法也属于e.g.1中分析所述的类变量、类方法(且 **只被初始化一次**)，所以在main函数开始执行时，Person类对应的.class已被装载完毕，等待main函数去执行，Java解释器会提前装载好main函数所在的Person类，而Person类中static声明的代码块就被初始化/执行, 打印出`这是Person类中的static静态代码块！`, 接着执行非静态代码块； 然后执行Build类对象b的初始化, 按照之前所述的原则, 初始化对象b时，调用的是Build类，所以要先对Build类的类变量p1初始化，执行new Person(1); new Person操作又是对Person类初始化，该初始化需要先执行Person类中的非静态代码块，所以先输出 `这是Person类中的非静态代码块！`, Person类中此时无其它类变量、类方法，所以就会执行Person的构造方法输出`Person: 1`, 此时可以理解为：主函数main方法中的第一部分执行完毕，即：` Person p1 = new Person(1);` , 按照之前所述规则，继续执行类变量p3初始化, 同上, 一次输出`这是Person类中的非静态代码块！` 和 `Person: 3`, 此时相当于主函数的第二部分执行完毕; 到此 Build类中的类变量全部初始化完毕; 第三部分: 执行Build类的构造函数, 顺序执行输出 `这是Build类！`, `Person p2 = new Person(2);` 再按照之前的规则, 一次输出: `这是Person类中的非静态代码块！`, `Person: 2`。

> 分析完毕！！！

> 【总结】

> 被声明为static的变量或者方法，或者前面说的块，都属于类变量、类方法.

> static 静态数据特点(static变量、方法)：初始化只在类的装载过程中只执行一次！！！
整个过程中只进行一次初始化，在内存中只开辟一个空间，不论在哪儿调用，值保持一致。一旦被修改，所有引用它的地方都会跟着修改。 一般直接通过类名进行调用。

> 类变量、类里的方法，外部对象对他们的引用还可以直接使用类名.变量名或类名.方法名 进行引用(在一个类中引用另一个类的变量,则该变量在另一个类中必须定义为private类型, 且范围不能是private修饰的).

> 非静态块： 每new实例化一个对象时，就会执行一次非静态对象！！！


对E.g.2 添加一行代码，在main函数中

E.g.3

```Java
Build b = new Build();
System.out.println("第二次new Build 类!"); //为了区分便于查看输出结果
Build b2 = new Build();  //见下边的总结6）

//输出结果:

//这是Person类中的static静态代码块！

//这是Person类中的非静态代码块！
//Person: 1
//这是Person类中的非静态代码块！
//Person: 3
//这是Build类！
//这是Person类中的非静态代码块！
//Person: 2

// 第二次new Build 类!

//这是Person类中的static静态代码块！

//这是Person类中的非静态代码块！
//Person: 1
//这是Person类中的非静态代码块！
//Person: 3
//这是Build类！
//这是Person类中的非静态代码块！
//Person: 2

```


#### 对象创建(new)过程总结

> 1) 装载.class文件，创建class对象，对由static声明的变量、方法进行初始化 且 只初始化一次！

> 2) new实例化时，在堆内存进行空间分配

> 3) 执行非静态块

> 4) 执行 所有方法外定义的(类)变量的初始化

> 5) 执行构造器/构造函数(方法)  [ 基本可以认为 构造函数是   一个类new过程中最后执行的 ]

> 6) 针对同一个类，同时new多个该类的对象实例，则每次new的过程都遵循、并按顺序执行 上述原则



#### 问题1、2 答案

##### Q1

> Java中main函数为何必须是static修饰符？


针对上述static分析、总结，现在来解释 开头的问题1：

> Java中main函数为何必须是static修饰符？

个人 + 网上各类博客文章 总结：

> 运行Java应用程序时，需要依赖JVM的运行。

> 当 Run某个类时，会启动虚拟机去执行该类中的main方法. JVM运行Java应用程序时，首先会去调用main方法, 而不必实例化main函数所在的这个类
(不用去new一个对象), 通过类名来调用需要限制为`public`, 同时JVM规定main函数不能有返回值，因此返回类型为`void`.

此外，main方法是Java解释器调用，那时候还未产生任何对象，作为程序的入口，必须提前加载好；[main是一个可以被JVM识别的特殊单词，而不是关键字]
    static修饰的类属性可以直接使用，而无需new一个实例化对象去调用；

> [可以没有main方法而去执行Java代码]


##### Q2

> Java中main函数为何必须使用String[] args形式的不定参数(数组作为参数)？

A: 程序运行时, JVM会首先调用`main`函数，而`main`函数传入的是String数组，示例
```java
public class Main {

    public static void main(String[] args) throws Exception{
        System.out.println(args);
    }
}
// 运行输出：[Ljava.lang.String;@21780f30
// 每次运行发现@后的字符串值都不一样!
``` 

修改输出
```java
System.out.println(args.length);
// 输出为0，说明传入的实体数组长度为0(实体数组而非null !!!), 相当于传入的是 `new String[0]`
```

尝试输出数组某个值
```java
System.out.println(args[0]);
```
运行，报错 `Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 0`, 越界错误❌. 

说明args这个数组中没有元素啊！！！那JVM传递这个实体数组干什么？

```java
public class TestMain {
    public static void main(String[] args) throws Exception{
        for(int i=0;i<args.length;i++)
            System.out.println(args[i]);
    }
}
```
在终端，进入该.java文件所在目录，然后 `javac` 编译该文件, 产生一个执行的class文件.

然后，我们使用java命令运行该测试类，并传入参数 1 2 4

> 如果，该函数在某一个包下，则终端路径需要回退到包目录去执行，类似于
```bash
javaStudy/src % java javaClassExercise.TestMain 1 2 4
#输出: 
# 1
# 2
# 4
```
使用`java`命令调用虚拟机，并手动传入值，调用方式：java 类名 参数。同时，JVM将类后面的这些数据存入了数组！

> main方法里面的args的参数原来是接收的java运行参数。

> 可简单认为 -- 解释: 按照Java规定入口函数必须这样写，就这么记！！而且参数必须为String类实例化的数组.


关于Java main函数相关解析还可参考博文:

> http://stackoverflow.com/questions/146576/why-is-the-java-main-method-static
> http://www.cnblogs.com/xwdreamer/archive/2012/04/09/2438845.html

#### 附:无main函数运行Java代码

 ***问题：***
> Java程序中, 无main函数作为入口函数, 程序是如何运行的呢？

A:

> 利用Junit或TestNG 测试框架，以@Test注解在测试方法上的形式 实现无main函数也可以运行Java代码.

> 参考： http://www.ibm.com/developerworks/cn/java/j-cq08296/


创建Maven工程：

`pom.xml`添加依赖：

```xml
<dependencies>
        <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>6.8.21</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.10</version>
        </dependency>
    </dependencies>
```

E.g. 

```Java
import org.testng.annotations.Test;

/**
 * Created by lomo
 */
public class noMainMethod {

    static {
        System.out.println("我是测试无main函数类中的第一个静态代码块");
//        System.exit(0);
    }

    @Test(description = "第一个", testName = "T1")
    public void test() throws Exception {
        System.out.println("123chendong");
    }

    @Test(description = "第二个测试例子", testName = "T2")
    public void test2() throws Exception {
        System.out.println("test 2");
    }

}

```

光标移动至test 或test2 上右键运行即可成功执行并输出对应结果:

```bin
我是测试无main函数类中的第一个静态代码块
[TestNG] Running: 
123Lomo
===============================================
Default Suite
Total tests run: 1, Failures: 0, Skips: 0
===============================================
```


或直接移动光标至类noMainMethod上运行，执行里面的2条Test并输出结果:

```bin
我是测试无main函数类中的第一个静态代码块
[TestNG] Running:  
123Lomo
test 2
===============================================
Default Suite
Total tests run: 2, Failures: 0, Skips: 0
===============================================
```

##### TestNG运行原理?

> 思考🤔: TestNG如何实现Java无main函数运行代码的? 

首先简单从`@Test` 作为入口，找到TestNG的`annotations`, 或者从测试方法的import包里找到TestNG的annotations包: `import org.testng.annotations`

可以看到org.testng包里除了annotations包外还有其它包: 断言asserts、log、junit、log4testng、xml...等等的包.

进入annotations包，发现很多编译好的 `.class` 文件，找到其中之一`Test.class`, 双击进入

```Java
package org.testng.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE, ElementType.CONSTRUCTOR})
public @interface Test {
    String[] groups() default {};

    boolean enabled() default true;

    /** @deprecated */
    @Deprecated
    String[] parameters() default {};

    String[] dependsOnGroups() default {};

    String[] dependsOnMethods() default {};

    long timeOut() default 0L;

    long invocationTimeOut() default 0L;

    int invocationCount() default 1;

    int threadPoolSize() default 0;

    int successPercentage() default 100;

    String dataProvider() default "";

    Class<?> dataProviderClass() default Object.class;

    boolean alwaysRun() default false;

    String description() default "";

    Class[] expectedExceptions() default {};

    String expectedExceptionsMessageRegExp() default ".*";

    String suiteName() default "";

    String testName() default "";

    /** @deprecated */
    boolean sequential() default false;

    boolean singleThreaded() default false;

    Class retryAnalyzer() default Class.class;

    boolean skipFailedInvocations() default false;

    boolean ignoreMissingDependencies() default false;

    int priority() default 0;
}
```

> **分析**

> 先粗糙地分析下，***待学完Java注解Anonation、反射等之后再深入总结下***.

> 根据其import的包是 `java.lang.annotation`, 就可以断言，TestNG的 @Test模式肯定也是基于Java的注解模式来实现无main函数运行的.

> 接着简单说说Test方法前3行代码:

```Java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE, ElementType.CONSTRUCTOR})
public @interface Test
```

> 1)Retention， 保留， 表示在什么级别保留此信息

`SOURCE:源码注解，注解仅存在代码中，注解会被编译器丢弃`

`CLASS:编译时注解，注解会在class文件中保留，但会被JVM丢弃`

`RUNTIME:运行时注解，VM运行期间也会保留该注解，因此**可以通过反射来获得该注解**`

> 2)Target，表示作用域，可能的ElementType参数包括：

`CONSTRUCTOR:构造方法声明`

`FIELD:字段声明`

`LOCAL_VARIABLE:局部变量声明`

`METHOD:方法声明`

`PACKAGE:包声明`

`PARAMETER:参数声明`

`TYPE:类，接口或enum声明`


> Test接口中，提供了很多 `@Test` 注解使用的属性，`@Test`标记一个类或方法作为测试的一部分。关于Test接口的详细属性列表参考：

> http://testng.org/doc/documentation-main.html#annotations

**小结**: TestNG 实现无main函数执行，是基于Java的注解，深究后续继续学习记录笔记.

Done!