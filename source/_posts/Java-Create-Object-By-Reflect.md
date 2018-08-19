---
title: Java Create Object By Reflect
date: 2016-10-14 18:40:41
tags: [java, reflect]
categories: program
description: 通过Java反射创建类实例
---

## 通过反射创建类实例

通常有2种方式，使用Class类的newInstance方法，或使用Constructor类的newInstance方法。

但是，Class类的newInstance方法通常只能适用于无参构造器的类。Constructor类的newInstance方法既可用于无参构造器，也可用于有参构造器.

> 推荐使用后者

直接看示例。

`demo.java`

> demo类：一个显式的无参构造器, 2个含参的构造器, public、protected、private级别的方法各一个, 另一个public级别的重载

```java
package javaClassExercise.newObjectStyle;

/**
 * Created by lomo.
 */
public class demo {
    private demo() {
        System.out.println("demo's constructor is called.");
    }

    private demo(int a, int b) {
        System.out.println(a+b);
    }

    private demo(String s, Integer i) {
        System.out.println(s + i);
    }

    public void printSth() {
        System.out.println("demo Class printSth...");
    }

    public void printSth(String s) {
        System.out.println(s);
    }

    private void printa() {
        System.out.println("private method called");
    }

    protected void printa(Integer a) {
        System.out.println(a);
    }
}
```

`demoTest.java`

> 将Class.NewInstance() 和 Constructor.newInstance() 两种创建新实例的方式进行了简单的“面向过程式”的封装[之所以说是面向过程，是因为这2个简单封装的方法，严格来讲未达到是封装的标准，里面很多参数都是写的固定的!!!]

```java
package javaClassExercise.newObjectStyle;

import java.lang.reflect.Constructor;

/**
 * Created by lomo.
 *
 * 推荐使用 通过Constructor.newInstance()创建新的类实例
 */
public class demoTest {

    public static void main(String[] args) {
        demoTest demoTest = new demoTest();
        System.out.println("通过Class.NewInstance()调用私有构造函数:");
        demoTest.newInstanceByClassNewInstance();   //失败, 如果无参构造器为public的就可以调用.

        System.out.println("通过Constructor.NewInstance()调用私有构造函数:");
        demoTest.newInstanceByConstructorNewInstance();  // 同时调用demo类的无参和有参构造器
        //输出：
        // demo's constructor is called.
        // 9

    }

    /*通过Class.NewInstance()创建新的类示例*/
    public void newInstanceByClassNewInstance() {
        try {
            /* 当前包名为javaClassExercise.newObjectStyle，必须使用全路径 */
            demo demo = (demo)Class.forName("javaClassExercise.newObjectStyle.demo").newInstance();
        }catch (Exception e) {
            System.out.println("通过Class.NewInstance()调用私有构造函数【失败】");
            //e.printStackTrace();
        }
    }

    /*通过Constructor.newInstance()创建新的类示例*/
    public void newInstanceByConstructorNewInstance() {
        try {

            Class c = Class.forName("javaClassExercise.newObjectStyle.demo");


            Constructor c0 = c.getDeclaredConstructor();  // 获得构造器对象
            c0.setAccessible(true); // 关闭JDK安全检查，提升反射速度
            

            //调用私有、无参构造函数
            demo demo0 = (demo)c0.newInstance();
            demo0.printSth("lomo");

            demo0.printa(6666);  // protected级别的可以直接调用
            //printa 这个private级别的方法无法被直接调用

            /*
            Method[] c2 = c.getDeclaredMethods();
            for(int i = 0; i < c2.length; i++) {
                //System.out.println("函数名：" + c2[i].getName()); //获得除构造器以外的所有函数名，包括private
                //System.out.println("函数名：" + c2[i].getReturnType()); //获得除构造器以外的所有函数的返回类型，包括private
                //System.out.println("函数名：" + c2[i]);  // 获得所有方法(除构造器)的方法体不包括{}
                System.out.println("函数名：" + Modifier.toString(c2[i].getModifiers()));  // 获得所有函数的访问权限
            }
            */


            /* 调用参数、私有构造函数*/
            //传入参数
            Constructor c1 = c.getDeclaredConstructor(new Class[] {int.class, int.class});
            c1.setAccessible(true);
            demo demo1 = (demo)c1.newInstance(new Object[]{4,5});
            demo1.printSth();


        }catch (Exception e) {
            System.out.println("通过Constructor.NewInstance()调用私有构造函数【失败】");
            //e.printStackTrace();
        }
    }
}
```

运行输出结果：
```bash
通过Class.NewInstance()调用私有构造函数:
通过Class.NewInstance()调用私有构造函数【失败】
通过Constructor.NewInstance()调用私有构造函数:
demo's constructor is called.
lomo
6666
9
demo Class printSth...
```

通过`Class.newInstance()` 方式创建新实例失败，因为demo类构造函数为私有，如果demo类无显式声明的构造函数，或显式声明无参构造器，则可以使用这种方式创建新实例。

修改demo类的无参构造器为public，就可以在demoTest中通过上述方式创建新实例。
```java
 public demo() {
        System.out.println("demo's constructor is called.");
    }
```
```bash
# 运行第一种创建实例的方式 输出：
通过Class.NewInstance()调用私有构造函数:
demo's constructor is called.
```

通过`Constructor.newInstance()` 方式创建新实例，无论demo类的构造器是否private、无论是否有误参数 都可以。

> 反射机制的使用：工厂模式中，Factory类中使用反射机制，添加新类时，就不需要需改工厂类。

> 关于setAccessible， <a href="https://my.oschina.net/swearyd7/blog/167822" target="_blank">点此查看</a>