---
title: java reflect
date: 2016-10-14 00:05:20
tags: [java,reflect]
categories: program
description: Java反射学习笔记
---

## Java反射学习笔记

### 基本概念

> 在Java应用程序**运行中**，对于任意一个类，都能知道这个类的所有属性和方法；对于任意一个对象，都能调用它的任意一个方法和属性。
这种动态获取信息和动态调用对象的方法的功能, 称为反射.

反射的核心就是提供了一种在 应用程序运行时去操作这个类的成员属性、成员方法 的方法.

Reflection(反射), 在Java中，是指我们可以在运行时去加载、探知、使用编译期间未知的classes，就是说，Java程序可以加载一个运行时才得知名称的class，获得其构造，并生成对象实体.

### 反射的功能

Java反射机制主要提供了以下功能： 

①运行时判断一个对象所属的类； （通过一个对象获得该对象的完整的包名和类名）

②运行时构造一个类的对象；

③运行时判断任意一个类所具有的属性、方法；

④运行时调用任意一个对象的方法；

⑤生成动态代理

### 反射示例

示例1 -- 运行时判断一个对象所属的类/获得该对象的完整的包名和类名

```java
public class TestReflect {
    public static void main(String... arg) {
        TestReflect testReflect = new TestReflect();
        System.out.println(testReflect.getClass()); // class javaClassExercise.fanshe.TestReflect
        System.out.println(testReflect.getClass().getName()); // javaClassExercise.fanshe.TestReflect (包名+类名)

        System.out.println(testReflect.getClass().getSimpleName());  //  TestReflect, 直接获取类名
        System.out.println(testReflect.getClass().getPackage());  // package javaClassExercise.fanshe, 直接获取包名

        System.out.println(testReflect.getClass().getSuperclass()); // class java.lang.Object
        System.out.println(testReflect.getClass().getClass()); // class java.lang.Class
    }
}
```

### 通过反射创建对象

见另一篇 <a href="http://lomo.space/2016/10/14/Java-Create-Object-By-Reflect/">文章</a>


### 反射的意义

为什么存在反射？

一般地，自定义的类，知道其内部信息：属性、方法，或需要使用的类import进来或在同一个包内，使用时直接new一个该类的对象；

反射是不知道类的具体内部情况，可能存在无参构造器也可能是含参构造器，那么我们如何获得该类的对象呢？new? new的时候构造器如何处理呢？如果是含参数的构造器，那么参数类型呢？参数个数呢？

所以，Java的提供了反射机制来避免、解决此问题，借用反射机制不用去考虑某个类(通常是框架中的而非自己写的)来获取这个类的实例对象。

关于 无参、含参构造器的类，利用反射创建其实例，参考博文 -- 通过反射创建类实例对象：
http://lomo.space/2016/10/14/Java-Create-Object-By-Reflect/


### 反射相关的类

反射中可能用来的类：
	分别是：Field、Constructor、Method、Class、Object；


* Field类：提供有关类或接口的属性的信息，以及对它的动态访问权限。反射的字段可能是一个类（静态）属性或实例属性，简单的理解可以把它看成一个封装反射类的属性的类。 
	
* Constructor类：提供关于类的单个构造方法的信息以及对它的访问权限。
	这个类和Field类不同，Field类封装了反射类的属性，而Constructor类则封装了反射类的构造方法。 
	
* Method类：提供关于类或接口上单独某个方法的信息。所反映的 方法可能是类方法或实例方法（包括抽象方法）。 这个类不难理解，它是用来封装反射类方法的一个类。 
	
* Class类：类的实例表示正在运行的 Java 应用程序中的类和接口。枚举是一种类，注释是一种接口。每个数组属于被映射为 Class 对象的一个类，所有具有相同元素类型和维数的数组都共享该 Class 对象。 
	
* Object类：每个类都使用 Object 作为超类。所有对象（包括数组）都实现这个类的方法。
