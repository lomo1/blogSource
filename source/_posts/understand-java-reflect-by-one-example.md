---
title: understand java reflect by one example
date: 2016-12-20 23:16:46
tags: [java, reflect]
categories: program
description: 一个例子简析Java里的反射
---

## 简析Java反射

> 通过一个简单的实例，来理解Java反射。

### 前言-类型类(关于getClass/.class)

在Java中，一切都是对象，就像JavaScript一样，一切都是对象。所以我们所使用的对象都直接、或间接地继承自Object类。

Object类中包含一个名为`getClass`的方法，利用这个方法可以获得一个实例(对象)的类型类。

**类型类**：就是指 代表一个类型的类，一切皆是对象，所以类型也是对象、不例外，Java中使用这种称为类型类的东东来表示一个类型。

而**所有的类型类都是Class类的实例**! 可看后面实例部分里的`Demo2`

e.g.1
```java
//假设A类已声明
A a = new A();
if(a.getClass() == A.class) {
    System.out.println("OK!");
}else {
    System.out.println("Not OK !");
}
//输出：OK!
```
> 分析，对象a是类A的一个实例，A是一个已声明的类，使用`.getClass()` 返回的正是A的 类型类，Java中表示一个特定类型的 类型类 可以使用`类型.class`方式获得
a.getClass()返回的是A的类型类也就是A.class， 所以输出上述结果。

查看`.getClass()`方法源码，看到如下，调用的是一个native方法。
```java
public final native Class<?> getClass();
```

再假设，如果A类是B类的子类，又有如下示例2

e.g.2
```java
A a = new A();
if(a.getClass == B.class){
    System.out.println("OK!");
}else {
    System.out.println("NOT OK!");
}
//输出：NOT OK!
```
> 分析可知，**类型类** 是一一对应的，父类的类型类和继承自父类的子类的类型类是不同的！！！

如果知道一个实例对象，那么可以通过.getClass来获得该对象的类型类，如果知道一个类型，那么就可以使用.class来获得该类型的类型类。

获取 类型类 后，可以调用其中的一些方法获得类型的信息。如：

| 方法名          | 返回类型 |  描述|
| :----------    | :----: | ----:|
|getName()       | String     |获得该类型的全名称 |
|getSuperClass() | Class      |获得该类型的直接父类，如没有则返回null |
|getInterfaces() | Class[]    |获得该类型实现的所有接口    |
|isArray        |  boolean      | 判断是否为数组    |
|isEnum()      | boolean      | 判断类型是否为枚举类型      |
|isInterface()    |  boolean      |判断是否为接口       |
|isPrimitive()      |boolean       |判断该类型是否是基本类型 -> int, boolean, double，float类   |
|isAssignableFrom(Class cls) |boolean |判断这个类型是否是福类型cls的父类或父接口  |
|getComponentType()  | Class       |如果该类型是一个数组，那么返回该数组的组件类型     |
|asSubclass(Class cla)  | Class       | ?     |



### 定义

Java反射机制: 简言之，就是能够动态获取信息、以及能否动态调用对象的方法。
>传统的编程要求程序必须在编译阶段决定使用的类型，如C。

它是在程序运行状态中，对于任意一个类，都能知道这个类的所有属性和方法；对于任意一个对象，都能调用它的任意一个方法；


### 实例

① 接口类`ActionInterface`
> 接口类定义了一个动作方法，具体实现由继承实现该接口类的子类去实现。
```java
interface ActionInterface{
    public void walk(int m);
}
```

② `Person`类 -- 父类

```java
/**
 *
 * Person类包含2个构造器，一个无参构造器，一个含参构造器
 *
 */
class  Person{
    private int age;
    private String name;

    //无参构造器
    public Person(){

    }

    //含参构造器
    public Person(int age, String name){
        this.age = age;
        this.name = name;
    }

    /* 提供对外访问Person类中私有变量 age、name属性的方法 */

    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
```

③ `SuperMan`类  --  子类
> SuperMan了继承自Person类

```java
/**
 * SuperMan子类继承自Person类 同时实现接口ActionInterface
 */
class SuperMan extends Person implements ActionInterface
{
    private boolean BlueBriefs;

    public void fly()
    {
        System.out.println("超人会飞耶～～");
    }

    public boolean isBlueBriefs() {
        return BlueBriefs;
    }

    public void setBlueBriefs(boolean blueBriefs) {
        BlueBriefs = blueBriefs;
    }

    @Override
    public void walk(int m) {
        System.out.println("超人会走耶～～走了" + m + "米就走不动了！");
    }
}
```

> 简单分析下，SuperMan属于子类，其继承自Person类，Person类中显式地声明了无参构造器和含参构造器，当创建子类对象时，对构造器的一些初始化调用(关于构造器可查看: http://lomo.space/2016/04/14/Java-Constructor/)


测试类Main :

> 测试类种 简单写了8个方法分别说明Java反射中的一些知识和使用。

```java
public class Main {
    /**
     * 为了看清楚Java反射部分代码，所有异常都最后抛出来给虚拟机处理！
     * @param args
     * @throws ClassNotFoundException
     * @throws InstantiationException
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     * @throws IllegalArgumentException
     * @throws NoSuchFieldException
     * @throws SecurityException
     * @throws NoSuchMethodException
     */
    public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException, SecurityException, NoSuchFieldException, NoSuchMethodException {

        //Demo1.  通过Java反射机制得到类的包名和类名
//        Demo1();
//        System.out.println("===============================================");
//
//        //Demo2.  验证所有的类都是Class类的实例对象
//        Demo2();
//        System.out.println("===============================================");

        //Demo3.  通过Java反射机制，用Class 创建类对象[这也就是反射存在的意义所在]，无参构造
//        Demo3();
//        System.out.println("===============================================");

        //Demo4:  通过Java反射机制得到一个类的构造函数，并实现构造带参实例对象
//        Demo4();
//        System.out.println("===============================================");

        //Demo5:  通过Java反射机制操作成员变量, set 和 get
//        Demo5();
//        System.out.println("===============================================");

        //Demo6: 通过Java反射机制得到类的一些属性： 继承的接口，父类，函数信息，成员信息，类型等
//        Demo6();
//        System.out.println("===============================================");

        //Demo7: 通过Java反射机制调用类中方法
        Demo7();
        System.out.println("===============================================");

//        //Demo8: 通过Java反射机制获得类加载器
//        Demo8();
//        System.out.println("===============================================");

    }

    /**
     * Demo1: 通过Java反射机制得到类的包名和类名
     */
    public static void Demo1()
    {
        Person person = new Person();
        System.out.println("Demo1: 包名: " + person.getClass().getPackage().getName() + "，"
                + "完整类名: " + person.getClass().getName());

        //System.out.println(String.class); // 获取String的类型类，输出：class java.lang.String
        //System.out.println(Person.class.getName()); //javaClassExercise.fanshe.Person
    }

    /**
     * Demo2: 验证所有的类都是Class类的实例对象
     * @throws ClassNotFoundException
     */
    public static void Demo2() throws ClassNotFoundException
    {
        //定义两个类型都未知的Class , 设置初值为null, 看看如何给它们赋值成Person类
        Class<?> class1 = null;
        Class<?> class2 = null;
        //Class<?> class3 = null;

        //写法1, 可能抛出 ClassNotFoundException [多用这个写法]
        class1 = Class.forName("javaClassExercise.fanshe.Person");
        System.out.println("Demo2:(写法1-.forName) 包名: " + class1.getPackage().getName() + "，"
                + "完整类名: " + class1.getName());

        //写法2
        class2 = Person.class;
        System.out.println("Demo2:(写法2-.class) 包名: " + class2.getPackage().getName() + "，"
                + "完整类名: " + class2.getName());

        //System.out.println(class1 == class2); // true
    }

    /**
     * Demo3: 通过Java反射机制，用Class 创建类对象[这也就是反射存在的意义所在]
     * @throws ClassNotFoundException
     * @throws IllegalAccessException
     * @throws InstantiationException
     */
    public static void Demo3() throws ClassNotFoundException, InstantiationException, IllegalAccessException
    {
        Class<?> class1 = null;
        class1 = Class.forName("javaClassExercise.fanshe.Person");
        //由于这里不能带参数，所以你要实例化的这个类Person，一定要有无参构造函数哈～
        Person person = (Person) class1.newInstance();
        person.setAge(25);
        person.setName("Lomoa");
        System.out.println("Demo3: " + "Name：" + person.getName() + " , Age: " + person.getAge());
    }

    /**
     * Demo4: 通过Java反射机制得到一个类的构造函数，并实现创建带参实例对象
     * @throws ClassNotFoundException
     * @throws InvocationTargetException
     * @throws IllegalAccessException
     * @throws InstantiationException
     * @throws IllegalArgumentException
     */
    public static void Demo4() throws ClassNotFoundException, IllegalArgumentException, InstantiationException, IllegalAccessException, InvocationTargetException
    {
        Class<?> class1 = null;
        Person person1 = null;
        Person person2 = null;

        class1 = Class.forName("javaClassExercise.fanshe.Person");
        //得到一系列构造函数集合
        Constructor<?>[] constructors = class1.getConstructors();

        person1 = (Person) constructors[0].newInstance();
        person1.setAge(20);
        person1.setName("lomoch");

        person2 = (Person) constructors[1].newInstance(23,"chenD");

        System.out.println("Demo4: " + person1.getName() + " : " + person1.getAge()
                + "  ,   " + person2.getName() + " : " + person2.getAge()
        );

    }

    /**
     * Demo5: 通过Java反射机制操作成员变量, set 和 get
     *
     * @throws IllegalAccessException
     * @throws IllegalArgumentException
     * @throws NoSuchFieldException
     * @throws SecurityException
     * @throws InstantiationException
     * @throws ClassNotFoundException
     */
    public static void Demo5() throws IllegalArgumentException, IllegalAccessException, SecurityException, NoSuchFieldException, InstantiationException, ClassNotFoundException
    {
        Class<?> class1 = null;
        class1 = Class.forName("javaClassExercise.fanshe.Person");
        Object obj = class1.newInstance();

        Field personNameField = class1.getDeclaredField("name");
        personNameField.setAccessible(true);
        personNameField.set(obj, "Lomoa");


        System.out.println("Demo5: 修改属性之后得到属性变量的值：" + personNameField.get(obj));

    }


    /**
     * Demo6: 通过Java反射机制得到类的一些属性： 继承的接口，父类，函数信息，成员信息，类型等
     * @throws ClassNotFoundException
     */
    public static void Demo6() throws ClassNotFoundException
    {
        Class<?> class1 = null;
        class1 = Class.forName("javaClassExercise.fanshe.SuperMan");

        //getSuperclass取得父类名称
        Class<?>  superClass = class1.getSuperclass();
        System.out.println("Demo6:  SuperMan类的父类名: " + superClass.getName());

        System.out.println("===============================================");


        Field[] fields = class1.getDeclaredFields();
        for (int i = 0; i < fields.length; i++) {
            System.out.println("类中的成员作用域: " + fields[i]);
        }
        System.out.println("===============================================");


        //getDeclaredMethods取得类方法
        Method[] methods = class1.getDeclaredMethods();
        for (int i = 0; i < methods.length; i++) {
            System.out.println("Demo6,取得SuperMan类的" + "第" + i + "个" + "方法：");
            System.out.print("函数名：" + methods[i].getName());
            System.out.print("函数返回类型：" + methods[i].getReturnType());
            System.out.print("函数访问修饰符：" + Modifier.toString(methods[i].getModifiers()));
            System.out.println("函数代码写法： " + methods[i]);
        }

        System.out.println("===============================================");

        //取得类实现的接口,因为接口类也属于Class,所以得到接口中的方法也是一样的方法得到哈
        Class<?> interfaces[] = class1.getInterfaces();
        for (int i = 0; i < interfaces.length; i++) {
            System.out.println("实现的接口类名: " + interfaces[i].getName() );
        }

    }

    /**
     * Demo7: 通过Java反射机制调用类方法
     * @throws ClassNotFoundException
     * @throws NoSuchMethodException
     * @throws SecurityException
     * @throws InvocationTargetException
     * @throws IllegalAccessException
     * @throws IllegalArgumentException
     * @throws InstantiationException
     */
    public static void Demo7() throws ClassNotFoundException, SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, InstantiationException
    {
        Class<?> class1 = null;
        class1 = Class.forName("javaClassExercise.fanshe.SuperMan");

        System.out.println("Demo7: \n调用无参方法fly()：");
        Method method = class1.getMethod("fly");
        method.invoke(class1.newInstance());

        System.out.println("调用有参方法walk(int m)：");
        Method method1 = class1.getMethod("walk",int.class);
        method1.invoke(class1.newInstance(),99);
    }

    /**
     * Demo8: 通过Java反射机制得到类加载器信息
     *
     * 在java中有三种类类加载器。[这段资料网上截取]

     1）Bootstrap ClassLoader 此加载器采用c++编写，一般开发中很少见。

     2）Extension ClassLoader 用来进行扩展类的加载，一般对应的是jre\lib\ext目录中的类

     3）AppClassLoader 加载classpath指定的类，是最常用的加载器。同时也是java中默认的加载器。
     *
     * @throws ClassNotFoundException
     */
    public static void Demo8() throws ClassNotFoundException
    {
        Class<?> class1 = null;
        class1 = Class.forName("javaClassExercise.fanshe.SuperMan");
        String nameString = class1.getClassLoader().getClass().getName();

        System.out.println("Demo8: 类加载器类名: " + nameString);
    }

}
```

运行Demo1(); 输出: `Demo1: 包名: javaClassExercise.fanshe，完整类名: javaClassExercise.fanshe.Person`

Demo1()方法
```java
 public static void Demo1()
    {
        Person person = new Person();
        System.out.println("Demo1: 包名: " + person.getClass().getPackage().getName() + "，"
                + "完整类名: " + person.getClass().getName());
    }
```

在Demo1中，以new关键字的方式创建了Person对象person, 通过该对象person的getClass()方法获得该person对象的Class，在通过此Class获得包名和类名。

Demo2()方法
> 通过forName方法获得类型类；

```java
public static void Demo2() throws ClassNotFoundException
    {
        //定义两个类型都未知的Class , 设置初值为null, 看看如何给它们赋值成Person类
        Class<?> class1 = null;
        Class<?> class2 = null;

        //写法1, 可能抛出 ClassNotFoundException [多用这个写法]
        class1 = Class.forName("javaClassExercise.fanshe.Person");
        System.out.println("Demo2:(写法1) 包名: " + class1.getPackage().getName() + "，"
                + "完整类名: " + class1.getName());

        //写法2
        class2 = Person.class;
        System.out.println("Demo2:(写法2) 包名: " + class2.getPackage().getName() + "，"
                + "完整类名: " + class2.getName());
        System.out.println(class1 == class2); // true
    }
```
> 分析，forName()方法是Class类中的静态方法，作用是返回一个类(要求JVM查找并加载制定的类);

Demo3()方法
> 通过反射 创建类对象。
```java
public static void Demo3() throws ClassNotFoundException, InstantiationException, IllegalAccessException
    {
        Class<?> class1 = null;
        class1 = Class.forName("javaClassExercise.fanshe.Person");
        //由于这里不能带参数，所以要实例化的这个类Person，一定要显式地声明无参构造函数，如果只声明含参构造器那么默认的无参构造器就被覆盖,只有显式地声明才可以～
        Person person = (Person) class1.newInstance();
        person.setAge(25);
        person.setName("Lomoa");
        System.out.println("Demo3: " + person.getName() + " : " + person.getAge());
    }
```
> newInstance()方法是Class类中的一个泛型方法。

> Person person = (Person) class1.newInstance(); //newInstance返回的是一个对象，用缺省构造函数创建一个该类的对象，并将新创建的这个对象强转为Person类的类型；

如果只定义了含参构造器呢？参考博文，通过反射创建类实例的2种方式 -- Java Create Object By Reflect. 

或看Demo4().


Demo5() 操作成员属性示例
> 主要利用了反射相关类里的Field类。更多反射相关类，点此查看：http://lomo.space/2016/08/14/java-reflect/

`Filed类`提供了接口/类的属性信息操作方法

`Class类`的`getDeclaredField`方法返回一个Field类型对象。

```java
Class<?> class1 = null;
class1 = Class.forName("javaClassExercise.fanshe.Person");
Object obj = class1.newInstance(); //创建类对象obj

Field personNameField = class1.getDeclaredField("name");  //获取的是String类型属性, set时也要传入String类型值，如果是age为int型，下面的set就应传入int型
personNameField.setAccessible(true); // 关闭JDK安全检查，提升反射速度
personNameField.set(obj, "Lomoa"); //使用Field类的set方法给对象obj添加属性值"Lomoa"（上一步getDeclaredField获取的是String->name属性）
```

由于Person类中声明的两个**私有属性** `private int age;` 和 `private String name;`, 所以`personNameField.setAccessible(true);`必须设置为true

如果Person类添加一个public属性如：

`Person`类
```java
//...
public String gender;
//....
```
`Main`测试类
```java
 public static void Demo5() throws IllegalArgumentException, IllegalAccessException, SecurityException, NoSuchFieldException, InstantiationException, ClassNotFoundException
    {
        Class<?> class1 = null;
        class1 = Class.forName("javaClassExercise.fanshe.Person");
        Object obj = class1.newInstance();

        Field personNameField = class1.getDeclaredField("gender"); // public级别的
        personNameField.setAccessible(false); // 可以为FALSE，为true也可以，但是设置为true最好。
        personNameField.set(obj, "Lomoa");
        
        System.out.println("Demo5: 修改属性之后得到属性变量的值：" + personNameField.get(obj));

    }
```

然后此项设置为false，也可以通过编译成功执行。

所以得到的Field类型对象后，就可以对该类型的对象personNameField进行操作set操作设置属性值，通过get(obj)获取属性值。



Demo6 获得类的属性
```java
public static void Demo6() throws ClassNotFoundException
    {
        Class<?> class1 = null;
        class1 = Class.forName("javaClassExercise.fanshe.SuperMan");

        //getSuperclass 取得父类名称
        Class<?>  superClass = class1.getSuperclass();
        System.out.println("Demo6:  SuperMan类的父类名: " + superClass.getName());

        System.out.println("===============================================");


        Field[] fields = class1.getDeclaredFields();
        for (int i = 0; i < fields.length; i++) {
            System.out.println("类中的成员作用域: " + fields[i]);
        }
        System.out.println("===============================================");


        //getDeclaredMethods 取得类方法
        Method[] methods = class1.getDeclaredMethods();
        for (int i = 0; i < methods.length; i++) {
            System.out.println("Demo6,取得SuperMan类的" + "第" + i + "个" + "方法：");
            System.out.print("函数名：" + methods[i].getName());
            System.out.print("函数返回类型：" + methods[i].getReturnType());
            System.out.print("函数访问修饰符：" + Modifier.toString(methods[i].getModifiers()));
            System.out.println("函数代码写法： " + methods[i]);
        }

        System.out.println("===============================================");

        //取得类实现的接口,因为接口类也属于Class,所以得到接口中的方法也是一样的方法得到哈
        Class<?> interfaces[] = class1.getInterfaces();
        for (int i = 0; i < interfaces.length; i++) {
            System.out.println("实现的接口类名: " + interfaces[i].getName() );
        }

    }
```
输出：
```
Demo6:  SuperMan类的父类名: javaClassExercise.fanshe.Person
===============================================
类中的成员作用域: private boolean javaClassExercise.fanshe.SuperMan.BlueBriefs
===============================================
Demo6,取得SuperMan类的第0个方法：
函数名：isBlueBriefs函数返回类型：boolean函数访问修饰符：public函数代码写法： public boolean javaClassExercise.fanshe.SuperMan.isBlueBriefs()
Demo6,取得SuperMan类的第1个方法：
函数名：setBlueBriefs函数返回类型：void函数访问修饰符：public函数代码写法： public void javaClassExercise.fanshe.SuperMan.setBlueBriefs(boolean)
Demo6,取得SuperMan类的第2个方法：
函数名：fly函数返回类型：void函数访问修饰符：public函数代码写法： public void javaClassExercise.fanshe.SuperMan.fly()
Demo6,取得SuperMan类的第3个方法：
函数名：walk函数返回类型：void函数访问修饰符：public函数代码写法： public void javaClassExercise.fanshe.SuperMan.walk(int)
===============================================
实现的接口类名: javaClassExercise.fanshe.ActionInterface
===============================================
```

Demo7 通过反射调用类方法
```java
public static void Demo7() throws ClassNotFoundException, SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, InstantiationException
    {
        Class<?> class1 = null;
        class1 = Class.forName("javaClassExercise.fanshe.SuperMan");

        System.out.println("Demo7: \n调用无参方法fly()：");
        Method method = class1.getMethod("fly");
        method.invoke(class1.newInstance());

        System.out.println("调用有参方法walk(int m)：");
        Method method1 = class1.getMethod("walk",int.class);
        method1.invoke(class1.newInstance(),99);
    }
```

`getMethod()`源码：

```java
public Method getMethod(String name, Class<?>... parameterTypes)
        throws NoSuchMethodException, SecurityException {
        checkMemberAccess(Member.PUBLIC, Reflection.getCallerClass(), true);
        Method method = getMethod0(name, parameterTypes);
        if (method == null) {
            throw new NoSuchMethodException(getName() + "." + name + argumentTypesToString(parameterTypes));
        }
        return method;
    }
```

Method类的invoke()方法？

`invoke()`方法属于Method类中的方法, 该方法返回类型为Object类型。
所以使用invoke方法调用的就是Method类代表的方法

参考：
http://www.cnblogs.com/onlywujun/p/3519037.html

那么为什么要使用反射？

反射可以使得在不知道类的内部结构情况下，根据配置的字符串去调用一个类的方法。
很多框架代码都是这样去实现的。但是一般的编程，是不需要这样做的，因为类都是自己写的，怎么调用，怎么生成都是清楚的。

