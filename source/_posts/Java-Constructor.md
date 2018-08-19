---
title: Java Constructor
date: 2016-04-14 15:41:07
tags: java
categories: study
description: Java构造器以及继承关系
---

## Java构造器及其子类构造器

### 定义

与类名相同。提供对象初始化赋值等操作，使得new一个对象时就可以获取该类的一些固有属性（new时就自动加载了构造器保存于内存中）

> 构造函数不能直接被调用,必须用在new表达式里.

> 方法名必须与类名相同；不要声明返回类型；不能被static、final、synchronized、abstract、native等修饰.可以处于public、protected、private和默认default四种访问级别之一。

如果一个类中，未显式地声明构造器，则初始化该类时会自动调用系统默认的无参构造器;

如果一个类中，显式地声明了构造器，则初始化该类时会调用声明的构造器。

> 一个类中，可以根据参数类型、列表等声明多个构造器。

### 构造器与继承

结论1：
> 当父类手动创建了构造器后，继承的子类就会首先调用父类的构造器.[如果父类中只显式地声明了带参构造器，那么子类的构造函数必须首先调用父类带参数的构造器，使用`super(xx);` 方法并传入一致的参数]

结论2：
> 一个类中只显式声明了有参构造器后，系统默认的无参构造器将会自动消失！！！

当父类中显式地声明了无参构造器和多个有参构造器，那么子类中，可以调用显示地使用`super()`方法调用父类无参构造器，或子类的构造器中什么也不做，同样在执行时，也会默认调用父类的无参数构造器.

> 子类不继承父类的构造函数，只是显式(子类构造函数内第一行 使用super(xx), 传入和父类中构造函数一致的参数)或隐式(默认的无参，系统会默认调用父类无参构造函数super(); )地调用。

示例1
```java
public class Dog extends Animal{
    public Dog(){
        //super();
    }

    public static void main(String[] args) throws Exception{
        //或使用new的方式创建对象
        Dog dog = (Dog)Class.forName("javaClassExercise.constructorTest.Dog").newInstance(); // 1
        //无论在Dog 这个子类中是否使用super()方法去调用父类的无参构造器，都是调用父类的无参数构造器并输出1.
        //当然，子类不显式声明构造函数时，此时 也可以new对象。因为：父类中有无参构造器，子类即使未声明构造器，在执行子类时，也会使用系统默认的构造器
        
    }
}
class Animal {
    private String name;
    private int age;

    public Animal() {
        System.out.println("1");
    }

    public Animal(String name) {
        this.name = name;
    }

    public Animal(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }
}
```

结论3：
> 如果父类中只显式声明了带参构造器，那么父类默认的无参构造器就会不存在了，子类的构造器就必须在其首行使用super(xx);传入一致的参数去显式调用父类的构造器.

示例2
```java
public class Dog extends Animal{
    public Dog(){
        super(123);
        //或
        //super("Lomo");
    }

    public static void main(String[] args) throws Exception{
        Dog dog = (Dog)Class.forName("javaClassExercise.constructorTest.Dog").newInstance(); 
        System.out.println(dog.getAge()); //123
        //注释父类Animal() 这个无参数的构造器后，Dog这个子类执行时，由于继承自父类，要先初始化父类的有参构造器，所以子类Dog中若未显式声明带参构造器就不会通过编译。
        //当父类Animal类没有无参构造器时，继承该类的子类Dog类中，必须显式声明构造器，可以是无参数的，但是必须使用super(xx)传入与父类一直的参数，然后初始化父类的有参构造器后才可,否则编译都无法通过！
    }
}

class Animal {
    private String name;
    private int age;

//    public Animal() {
//        System.out.println("1");
//    }

    public Animal(String name) {
        this.name = name;
    }

    public Animal(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

总结：

> 通常，在父类中声明有参构造器，子类继承该父类后，就必须在子类构造器中使用super(xx)，来执行初始化父类的构造器，然后通过父类有参构造器获取一些属性。

