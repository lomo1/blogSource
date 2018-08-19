---
title: Java String/StringBuffer/StringBuilder
date: 2016-03-13 14:42:35
tags: [java, String]
categories: study
description: Java数据类型, String类, ==与equals区别
---

## Java 数据类型[学习笔记]

### Java数据类型

#### 基本数据类型

> int 、short、float、double、long、byte、boolean、char

> 其中char类型变量，声明初始化时用单引号` '' `

#### 包装类

> Integer、Short、Float、Double、Long、Byte、Boolean、Character

#### String类型

>String类型数据 声明初始化时 使用双引号 ` "" `

> **String不是基本数据类型**；它是由final修饰的，所以也不可以继承；

> String类型变量的2种赋值方式:
```java
		//一种直接赋值，例如
        String a = "hello world"；
		//另一种是用构造方法，例如 
        String b = new String ("hello world");

```

String 类型的可以认为有三种：String、StringBuffer、StringBuilder

##### String类

###### 定义

如：

```java
    String s = "chen";
```

JVM的栈内存中保存变量s ,  堆内存中保存字符串"chen"对象，s 指向字符串chen的地址.

JVM在处理该类字符串时，会进行缓存，比如，如果再声明一个
```java
     String t = "chen";
```

则t和s指向的是同一个对象的地址，故：s == t // 输出true；

###### 特征
> String声明的字符串长度是不可变的，当一个String对象完成创建后，该对象的内容就固定；

###### String类常用方法

使用`.length` 获取字符串长度


##### StringBuffer

> 可变字符串类，长度不固定；
> 使用StringBuffer()时，默认开辟16个字符的长度的空间；

> StringBuffer和StringBuilder都一样，且都继承了AbstractStringBuilder类

```java
	StringBuffer sb = new StringBuffer("hello");  
	StringBuffer sb2 = new StringBuffer("hello");  
	System.out.println(sb.equals(sb2));  
	//输出: false

```

> ***分析***：
> String类重写了Object类的equals方法，所以只需要看内容是否相等；但是StringBuffer类没有重写Object类的equals方法，此处的equals()仍然是调用Object类的，所以，调用StringBuffer类的equals()，只有地址和内容都相等的字符串，结果才会返回true.

> Java中字符串拼接最安全的方式是使用StringBuffer的apped方法.
> String类在追加的时候，源字符串不变（这就是为什么说String是不可变的字符串类型），和新串连接后，重新开辟 一个内存。这样就会造成每次连接一个新串后，都会让之前的串报废，因此也造成了不可避免的内存泄露.


##### StringBuilder

>可变字符串类，长度不固定；

StringBuilder类的初始化和主要常用方法和上述的StringBuffer相同.



##### 三者之间的区别

1. StringBuffer是线程安全，大多数方法前面都有关键字synchronized，这样就会有一定的性能消耗。

2. StringBuilder是非线程安全的，所以效率是三个中最高的。String是效率最低的


### ==和equals区别

#### String类的==和equals

e.g.1 

```Java
	public class StringInit {  
	  
	    public static void main(String[] args) {  
	          
	        String s = "hello world";  
	        String s1 = new String("hello world");  
	        String s2 = new String("hello world");  
	        String s3 = new String("hello");  
	        String s4 = "hello world";  
	          
	        System.out.println(s.equals(s1));;  
	        System.out.println(s1.equals(s2));  
	        System.out.println(s1.equals(s3));  
	        System.out.println("------------------");  
	        System.out.println(s == s1);  
	        System.out.println(s == s3);  
	        System.out.println(s == s4);  
	    }  
}  
```
输出：

```bash
	true
	true
	false
 ------------------
	false
	false
    true
```
查看源码发现，String类重写了Object类的equals方法：
```java
			public boolean equals(Object anObject) {
				    if (this == anObject) {
			            return true;
			        }
			        if (anObject instanceof String) {
			            String anotherString = (String) anObject;
			            int n = value.length;
			            if (n == anotherString.value.length) {
			                char v1[] = value;
			                char v2[] = anotherString.value;
			                int i = 0;
				                while (n-- != 0) {
				                    if (v1[i] != v2[i])
				                            return false;
				                    i++;
				                }
			                return true;
			            }
			        }
			        return false;
			}
```
所以：

>equals比较的是对象的内容，即JVM堆内存中的内容, == 比较的是地址，即栈内存中的内容. 使用构造方法new 创建字符串时，和直接赋值是不一样的!

#### StringBuffer与StringBuilder类的==和equals

e.g.2

```java
public class equalsCompare {

    public static void main(String[] args) {
        String a = new String("cd");
        String b = new String("cd");

        System.out.println("String使用==比较的结果：" + (a == b) );  // false
        System.out.println("String使用equals比较的结果：" + a.equals(b)); //true

        StringBuffer sb = new StringBuffer("chen");
        StringBuffer sb2 = new StringBuffer("chen");
        System.out.println("StringBuffer使用==比较的结果：" + (sb == sb2) );  // false
        System.out.println("StringBuffer使用equals比较的结果：" + sb.equals(sb2) ); //false

        StringBuilder sbu = new StringBuilder("lomo");
        StringBuilder sbu2 = new StringBuilder("lomo");
        System.out.println("StringBuilder==的比较：" + (sbu == sbu2));  //false
//        try {
//            System.out.println("StringBuilder==的比较：" + (sbu == sbu2));  //false
//        }catch (Exception err){
//            System.out.println(err);
//        }
        System.out.println("StringBuilder使用equals比较：" + sbu.equals(sbu2)); // false
    }
}
```

> 可以看到，StringBuffer和StringBuilder的== 和 equals 比较使用的都是继承自Object类的equals方法，即：比较类型+值内容。

Object类的equals源码：
```java
	public boolean equals(Object obj) {
	        return (this == obj);
	 }

```

#### ==和equals区别总结：

> StringBuffer、StringBuilder，使用`equal`或 `==` 比较时，使用的Object的equals方法，比较是否为同一个对象，即 类型+值的比较；

> 这三个String、StringBuilder、StringBuffer里**只有String类重写**了Object类的equals方法，使用equals比较时，只比较值是否相等；==比较是否为同一个对象，比较类型+值。

> Double、Integer、Long这些包装类数据类型都重写了`Object`类的equals方法和hashCode方法, 进而其比较的是值内容!

> 总之，只有String类重写了Object的equals和hashCode方法使其用equals比较时只比较值内容是否相等!!!

==>>

[再次啰嗦总结]

八种包装数据类型：Integer、Short、Float、Double、Long、Byte、Boolean、Character 都重写了Object的equals方法，它们声明的变量使用equals比较时，都比较值的内容；

而对于`String、StringBuilder、StringBuffer`类型，只有String重写了`Object`类的equals方法，使用equals比较时(或使用 == 比较)只有String类型的比较值内容，其它两个比较都是类型+内容！

对于**基本数据类型**: int、double、float、char等比较，都是值比较.
<br>

#### 如何自定义类型

> 自造数据类型

```java
public class CustomDefineClaz{
	public void method() {
        //Todo 
    }
}

//使用：
CustomDefineClaz t = new CustomDefineClaz();

//调用其方法
t.method();
//或 直接：
new CustomDefineClaz().method();
```

==>>

变量定义：
```bash
类名 对象名 = new 类名();
```

方法定义：
```bash
修饰符 类名 方法名(参数xxx) {
    //
    // 返回类型，无则将方法声明为void
}
```

如：
```java
class Person {

}
class newObj {
    Person p1 = new Person();

    public void method() {
        //do sth..
        //no return data <- void
    }

    public static Person methods() {
        //do sth ...
        return new Person(); // return data 必须是Person类类型的对象，或者说返回类型必须是Person类对象/实例
    }
}
```

>思想：
java中一切都是class(类)，定义一个class，按需求填充所需属性、方法即可。
