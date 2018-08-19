---
title: java references type sort
date: 2017-02-17 16:41:58
tags: java
categories: study
description: Java Arrays类及引用类型排序
---

## Java Arrays学习笔记

八种基本数据类型:

> int 、short、float、double、long、byte、boolean、char

除了其中的boolean类型外，对于其它几种定义的Arrays都可以使用自带的`.sort()`方法进行排序(默认为升序排序).


### 基本排序.sort()方法

E.g.1

```java
package javaClassExercise.arrays;

import org.junit.Test;

import java.util.Arrays;

/**
 * Created by lomo.
 */
public class arraySortStudy {

    @Test
    public void intDataSort() {
        int[] data = {1,0,99,10,33,67,88,91,9,7,45,12};

        Arrays.sort(data);

        for (int i : data) {
            System.out.println(i);
        }
    }
    //0 1  7 9 10 12 33 45 67 88 91 99

    @Test
    public void charDataSort() {
        char[] data = {'A', 'g', 'c', 'D', 'C', 'f', 'F', 'Y'};
        Arrays.sort(data);

        for (char s : data) {
            System.out.println(s);
        }
    }

    // A C D F Y c f g
}

```

### 引用类型

一、  `referenceTypeSort.java`

```java
package javaClassExercise.referencesSort;

import org.junit.Test;

/**
 * Created by lomo.
 */
public class referenceTypeSort {

    @Test
    public void test() {
        User user = new User("lomo", "male", 25);
        System.out.println(user.getName() + " Is " +user.getGender()); //lomo Is male
    }


}

//User 类
class User {
    private String name;
    private String gender;
    private int age;

    //cmd+n 生成带参的构造函数, new时必须给参数, new完后就可以使用获得对应属性
    public User(String name, String gender, int age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
    }

    public void setName() {
        this.name = name;
    }

    public String getName() {
        return name;
    }


    public void setGender() {
        this.gender = gender;
    }

    public String getGender() {
        return gender;
    }


    public void setAge() {
        this.age = age;
    }

    public int getAge() {
        return age;
    }

}

```
<br>
二、 UserComparator类

> 实现Comparator接口

`UserComparator.java`

```java
package javaClassExercise.referencesSort;

import java.util.Comparator;

/**
 * Created by lomo.
 */

//User类的排序
public class UserComparator implements Comparator<User> {

    @Override
    public int compare(User o1, User o2) {
        return o1.getAge() - o2.getAge();
    }

}

```

<br>
三、 referencesTypeSortTest类

> 测试 + 测试结果

`referencesTypeSortTest.java`

```java
package javaClassExercise.referencesSort;

import org.junit.Test;

import java.util.Arrays;

/**
 * Created by lomo on.
 */
public class referencesTypeSortTest {

    public static void main(String[] args) {
//        User users = new User("lomo2", "female", 33);
//        System.out.println(users.getAge()); //33

        User[] users = new User[]{ new User("lomo", "male", 22),
                new User("lomo2", "female", 20), new User("cd", "gender", 18)};

        Arrays.sort(users, new UserComparator());

        for (User user : users) {
            System.out.println("姓名：" + user.getName() + " 性别：" + user.getGender() + " 年龄：" + user.getAge());
        }

        /** 输出：
         姓名：cd 性别：gender 年龄：18
         姓名：lomo2 性别：female 年龄：20
         姓名：lomo 性别：male 年龄：22
         */

    }

    @Test
    public void testReferenceTypeSort() {
        User[] users = new User[]{new User("name", "male", 22), new User("name2", "female", 18)};

        Arrays.sort(users, new UserComparator());
        for (User user : users) {
            System.out.println(user.getGender());
        }

        //输出：
        /**
         *   female
              male
         */

        for (User user : users) {
            System.out.println(user.getName());
        }
        //输出:
        /**
         * name2
           name
         */
    }

}

```


**Summary**

 >通过对Test测试，发现Arrays.sort排序好像是以其中的年龄进行升序排序，其实不，是因为：UserComparator类的排序方法声明就是以User类中的Age字段进行排序UserComparator类，其实现的是接口：Comparator，该接口中的方法compare声明如下：int compare(T o1, T o2); 
 
 > [接口中的方法默认为：public abstract修饰！]

