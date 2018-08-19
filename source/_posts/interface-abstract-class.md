---
title: interface-abstract-class
date: 2018-05-27 22:39:11
tags: java
categories: study
description: Java中接口、抽象类、类区别
---

## 接口、抽象类、类的区别

### 写在前面

昨天被问到Java中接口、抽象类、类的区别/差异。突然懵逼了，只是简单回答了成员属性以及方法声明的简单差异（太尴尬了，其实这个问题很简单~~）
> 反思下: 因为确实很久没有写`Java`代码了(大学又非CS专业，第一份工作中基本没有用到过`Java`)，Java知识还是来到现东家后靠自己业余时间现学现用。

Notes For 2018-05-26(PM) and for study !


### 三者区别

先上代码（show me the code, no bb😁）

e.g.

```java
<!-- 接口 actionList -->
package javaClassExercise.javaInterface;
/**
 * Created by lomo.
 */
public interface actionList {

    //默认访问级别为public，变量默认为static/final类型常量！
    String author = "Lomo";

    void eat();

    void listen(String s);

    void walk(Double x);

    Integer studyScore(int num);
    // static {
    // }
}
```

```java
<!-- 抽象类 -->
package javaClassExercise.javaInterface;

/**
 * Created by lomo.
 */

public abstract class peopleAction implements actionList{
    // 构造器/构造函数
    peopleAction() {
        System.out.println("Author: " + author);
    }

    //重写的方法必须加修饰符，因为这在类中！
    public void eat() {

    }
    // 重载eat方法
    void eat(String s) {
        System.out.println("i ate" + s);
    }

    public void listen(String s) {
        System.out.println("i listened" + s);
    }

    public void walk(Double s) {

    }

    public Integer studyScore(int num) {
        return num;
        //System.out.println("i get score: " + num);
    }
    // 抽象方法
    protected abstract String abstractTestMethod(String s);

}
```

```java
<!-- 普通类 -->
package javaClassExercise.javaInterface;

/**
 * Created by lomo.
 */
public class peopleActionTest extends peopleAction {

    //在对子类进行初始化的时候，会先调用父类的构造器
    peopleActionTest() {
        super();  // 手动显式调用上面👆抽象类的peopleAction构造函数
        System.out.println("子类");
    }

    @Override
    protected String abstractTestMethod(String s) {
        return s;
    }


    @Override
    public void walk(Double s) {
        System.out.println("Lomo has been walked " + s + "km");
    }

    //重载walk方法
    public void walk(String Name, Double s) {
        System.out.println(Name + "had been walked " + s + "km ...");
    }

    public static void main(String[] args) {
        peopleAction p = new peopleActionTest();
//        peopleAction pp = new peopleAction();
        p.eat("米饭");
        p.walk(2.5);

        peopleActionTest ps = new peopleActionTest();
        ps.walk(4.2);
        ps.walk("chenqiao", 7.8);

    }

}
```

**Update**
针对第⑥点总结示例:

```java
/**
* 接口中不能有`main`主函数方法，而抽象类、普通类可以有
*/
// 单纯声明一个包含main方法的抽象类
abstract class staticAbstractClass {
    staticAbstractClass() {
        System.out.println("抽象类的构造函数被调用了...");
    }

    abstract void printSth(String s);

    public static void main(String[] args) {
        System.out.println("包含main方法的抽象类");
    }
}
```
在ide中调试直接运行, 可以发现可以被执行了。输出
```bash
包含main方法的抽象类
```
即 调用了抽象类的main方法。

对其进一步改进:
```java
public class abstractStaticMethod extends staticAbstractClass{
    abstractStaticMethod() {
        System.out.println("abstractStaticMethod被调用了");
    }

    void printSth(String s) {
        System.out.println(s);
    }

    public static void main(String ...args) {
        System.out.println("Lomo 168 aa aa...");
        abstractStaticMethod asm = new abstractStaticMethod();
        asm.printSth("lomo178");
    }
}

abstract class staticAbstractClass {
    staticAbstractClass() {
        System.out.println("抽象类的构造函数被调用了...");
    }

    abstract void printSth(String s);

    public static void main(String[] args) {
        System.out.println("包含main方法的抽象类");
    }
}
```
右键运行`abstractStaticMethod`方法，输出结果
```bash
Lomo 168 aa aa...
抽象类的构造函数被调用了...
abstractStaticMethod被调用了
lomo178
```
可以看到运行该`public`时，其并没有调用父类抽象类的`main`方法，而是只执行本类的`main`方法。(此外，构造函数执行顺序：父类(抽象类)->子类(本类) ).

通常，`抽象类`中定义`main`方法好像意义不大!



① 关于成员属性(变量)方面:
> 接口中的成员属性一般为`static final`修饰，即：默认访问权限为public且接口中声明的成员属性一般为写死的(final)不能为修改.


② 关于static关键字方面:
> 接口中不能包含static修饰的方法或static静态代码块. 可以手动尝试，在接口中声明一个static 代码块或方法，IDE就会直接报错！😁



③ 关于方法的声明方面:
> 接口中的所有方法均无方法体(即无具体的方法实现逻辑、运算过程...)，抽象类中一般都包含抽象方法(即无具体方法体的方法，只声明了函数名以及函数访问修饰符、返回值类型、参数个数、参数类型)，但是抽象类中可以包含有具体实现的方法也可以包含静态代码块(接口则不行)。抽象类的抽象方法修饰符一般为`public`或`protected`(无private, 如果是private则无法被继承的类去继承重写该方法!)且抽象方法也没有具体的方法体实现，只有声明，与接口中的类似.

④ 关于继承方面:
> 一个普通类一次只能继承`extends`一个类(该类可以是普通类、抽象类)，但是可以同时实现`implements`多个接口，继承抽象类时，需要在该类中实现抽象类中的所有抽象方法，实现几个接口就要重写实现接口中的所有(抽象)方法.

另, `一个接口可以同时继承多个其它接口`。 但是，`一个接口不能实现另一个接口!!!`
```java
// 单一接口继承多个接口
// 预定义 接口bInterface, cInterface, dInterface
interface A extends bInterface, cInterface, dInterface {
    // TODO ...
}
```


⑤ 关于构造器方面：
> 接口无构造器; 抽象类、类可以有(手动显式/默认隐式)


⑥ main方法方面:
> 接口中不能有`main`主函数方法，而抽象类可以有(见上例)、普通类可以有.


⑦ 添加新方法方面:
> 接口中添加新方法，需要考虑那些实现了该接口的类(必须要改变、操作实现了该接口的类)，而添加在抽象类中，则可以给出默认具体实现而不必去修改该类的子类.

另，Java是单继承!!!