---
title: Java Singleton Patterns
date: 2016-03-26 19:00:37
tags: [java, DesignPatterns]
categories: study
description: Java设计模式之单例模式
---

## Java设计模式之单例模式[笔记]

### 定义

一个类有且仅有一个实例，并且自行实例化向整个系统提供实例调用。

> 在应用中，单例模式可以使得单例对象保存在JVM中，该对象只有一个实例存在。

### 应用场景
	1. 某些类创建频繁(对于大型对象如果每次都去new对象，将会增大系统开销)
	2.省去new操作符，降低内存使用频率，减轻GC(垃圾回收)的压力
    3.保证核心功能实例对象可以控制整个系统流程


### 示例

> One

```java
package javaClassExercise.designPatterns.singleton;

/**
 * Created by lomo.
 *
 * 单例模式
 *
 */
public class Singleton {
    /* 私有静态变量instance, 防止被引用; instance变量在此处赋值为null, 实现延迟加载 -- 有的类比较大 延迟加载提升性能*/
    private static Singleton instance = null;

    /* 定义私有类型的构造函数(默认为public级别)， 可以防止被实例化new*/
    private Singleton() {}

    /*public访问级别、静态static类型的返回类型为Singleton引用类型的getInstance方法； getInstance方法作用：获取本类实例*/
//    public static Singleton getInstance() {
//        if (instance == null) {
//            return new Singleton();
//        }
//
//        return instance;
//    }
    //第一次改进后的：
    //加了synchronized关键字保证了同步性，只需要在创建时上一次锁，(也避免每次调用该方法时对调用对象上锁)
    //此时，调用的时候是不需要加锁，当instance为null，并创建对象时才需要加锁，
    //问题：此时还是存在问题，当2个线程同时需要调用该方法时，第一个线程访问后，在内存里创建了实例对象，
    // 但是由于JVM的一些优化机制，导致线程2调用Singleton实例时，发现Singleton未被实例，获取不到内存中保存的实例对象，就会报错
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    return new Singleton();
                }
            }
        }

        return instance;
    }

    public Object readResolve() {
        return instance;
    }

//    public static void main(String... args) {
//        System.out.print(Singleton.getInstance().hashCode());
//        System.out.println(instance); //null
//        System.out.println(instance instanceof Singleton); // false
//        Singleton singleton = new Singleton(); //Exception in thread "main" java.lang.NullPointerException, 空指针异常
//        Singleton singleton1 = new  Singleton();
//    }

}

// 当多个线程同时调用该单例类的方法时，对于无保护的这种类，如何改进避免出现异常问题？

```

> Two
> 使用一个内部类来维护、创建单例类的实例

```java
package javaClassExercise.designPatterns.singleton;

/**
 * Created by lomo .
 *
 * 对Singleton类升级 -> 一个完整的单例类
 *
 */
public class CompleteSingleton {
    /* 定义私有类型的构造函数(默认为public级别)， 可以防止被实例化new*/
    private CompleteSingleton(){}

    /* 使用一个内部类来专门维护单例类 */
    private static class SingletonFactory{
        private static CompleteSingleton instance = new CompleteSingleton();
    }

    /* 获取单例类的实例 */
    public static CompleteSingleton getInstance() {
        return SingletonFactory.instance;
    }

    /* 如果该对象被用于序列化，可以保证对象在序列化前后保持一致 */
    /* 序列化：就是讲Java对象转换为字节序列的过程 */
    /* 序列化作用：将Java对象序列化成字节 然后保存于磁盘 或用于在网络传送字节 */
    public Object readResove() {
        return getInstance();
    }
}
```

> Three
> 使用synchronized关键字，提供一个单例类实例创建的方法

```java
package javaClassExercise.designPatterns.singleton;

/**
 * Created by lomo.
 */
public class SingletonTest {
    /* 私有静态变量instance, 防止被引用; instance变量在此处赋值为null, 实现延迟加载 -- 有的类比较大 延迟加载提升性能*/
    private static SingletonTest instance = null;

    /* 私有构造函数，防止被new实例化 */
    private SingletonTest() {}

    /* syncInit方法用来初始化单例类实例(限于单例内的内部) */
    // 同步性，synchronized关键字锁定的是对象
    private static synchronized void syncInit() {
        if (instance == null) {
            new SingletonTest();
        }
    }

    /* public级别的可供外部内访问的方法，用来获取单例类实例对象 */
    public static SingletonTest getInstance() {
        if (instance == null) {
            syncInit();
        }

        return instance;
    }

}
```

> 第二种和第三种大同小异，视情况选择.

### 实际项目分析

> 公司内部项目代码简单分析

`一条测试case`

```java
public class FinancialServicePageClickTest extends AbstractTestCases {

    @Test(testName = "xx001", description = "xxxx", groups = "pc")
    public void ClickJiuDingInvestmentTest() throws Exception {
        NavigationPage navigationPage = new NavigationPage(driver);
        EnterprisePCPage enterprisePCPage = navigationPage.clickEnterpriseLink();
        FinancialServicePCPage financialServicePCPage = enterprisePCPage.clickFinancialServiceLink();
        financialServicePCPage.GoToJiuDingInvestment();
        WebReporter.log(driver, driver.getTitle(), true, true);
    }
}
```

> 测试子类`FinancialServicePageClickTest`继承自`AbstractTestCases`类，父类AbstractTestCases实现了针对APP、PC端的driver的初始化(在执行具体的测试方法前就为测试类中的方法准备好必须的driver)


```java
//testng自定义的监听器
@Listeners({ filter.MethodSelector.class })
public class AbstractTestCases {
    public static WebDriver driver;
    public static AppiumDriver appiumDirver;

    /**
     * Init driver
     * 
     * @throws Exception
     */
    @BeforeMethod
    public void initDriver() throws Exception {
        switch (ConfigUtil.getConfigUtil().getConfigFileContent("deviceType")) {
        case "pc":
            driver = DriverFactory.createNewDriver();
            break;

        case "phone":
            appiumDirver = DriverFactory.createAppiumDriver();
            break;

        default:
            break;
        }
    }

    /**
     * Destory driver
     */
    @AfterMethod
    public void destoryDriver() {
        switch (ConfigUtil.getConfigUtil().getConfigFileContent("deviceType")) {
        case "phone":
            WebReporter.log(appiumDirver, true, true, true);
            DriverFactory.closeAppiumDriver();
            break;
        case "pc":
            WebReporter.log(driver, driver.getTitle(), true, true);
            DriverFactory.CloseDriver();
            break;
        default:
            break;
        }
    }

    /**
     * log message to TestNG result
     * 
     * @param str
     */
    public static void logMessage(String str) {
        Reporter.log(str, 5, true); // Making a log entry.
    }
}
```

> 关于TestNG的`@Listeners`注解：

看TestNG这个注解的源码：
```java
package org.testng.annotations;

import static java.lang.annotation.ElementType.TYPE;

import org.testng.IAnnotationTransformer;
import org.testng.IAnnotationTransformer2;
import org.testng.ITestNGListener;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

/**
 * This annotation lets you define listeners directly on a test class
 * instead of doing so in your testng.xml.  Any class that implements
 * the interface {@link org.testng.ITestNGListener} is allowed,
 * except {@link IAnnotationTransformer} and {@link IAnnoationTransformer2},
 * which need to be defined in XML since they have to be known before we even
 * start looking for annotations.
 *
 * Note that listeners specified this way are global to your entire suite, just
 * like listeners specified in testng.xml.
 *
 * @author Cedric Beust, Mar 26, 2010
 *
 */
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@Target({TYPE})
//TestNG的自定义注解
public @interface Listeners {
  Class<? extends ITestNGListener>[] value() default {};
}

```
> 关于TestNG此注解的详细，可<a href="http://testng.org/doc/documentation-main.html#testng-listeners">点我查看</a>

`DriverFactory`类：
>使用单例的设计模式实现对driver的初始化，使得在case运行过程中，都保障其操作都是一个driver实例.

```java
public class DriverFactory {
    private static WebDriver driver = null;
    private static AppiumDriver appiumDriver = null;
    private static Logger log = LogFactory.getLogger(DriverFactory.class);
    private static ConfigUtil configUtil = ConfigUtil.getConfigUtil();
    private static String osType = System.getProperty("os.name").toLowerCase();

    //定义一个private访问级别的构造函数，防止被实例化new对象
    private DriverFactory() {
    }

    /**
     * create method to get OS type and auto choose the driver for it
     * 
     * @return
     */
    private static boolean isMacOS() {
        return osType.indexOf("mac") >= 0;
    }

    private static boolean isWindows() {
        return osType.indexOf("window") >= 0;
    }

    /**
     * Create a new driver for FF,CHROME,IE
     * 
     * @return WebDriver that you want style
     * @throws Exception
     */
    private static WebDriver CreateBroswerDriver() throws Exception {
        if (configUtil.getConfigFileContent("isRemoteDriver").equals("false")) {
            switch (configUtil.getConfigFileContent("broswerType")) {
            case "firefox":
                return new FirefoxDriver(switchLocalDriverPath());
            case "chrome":
                return new ChromeDriver(switchLocalDriverPath());
            case "ie":
                return new InternetExplorerDriver(switchLocalDriverPath());
            case "safari":
                return new SafariDriver(switchLocalDriverPath());
            default:
                return driver;
            }
        } else {
            URL remoteUrl = new URL(configUtil.getConfigFileContent("remoteDriverURL"));
            switch (configUtil.getConfigFileContent("broswerType")) {
            case "firefox":
                return new RemoteWebDriver(remoteUrl, switchLocalDriverPath());
            case "chrome":
                return new RemoteWebDriver(remoteUrl, switchLocalDriverPath());
            case "ie":
                return new RemoteWebDriver(remoteUrl, switchLocalDriverPath());
            case "safari":
                return new RemoteWebDriver(remoteUrl, switchLocalDriverPath());
            default:
                return driver;
            }
        }

    }

    //单例模式创建驱动Driver
    public static WebDriver createNewDriver() throws Exception {
        log.info("Current Driver is null : " + (driver == null));
        if (driver == null) {
            synchronized (WebDriver.class) {
                if (driver == null) {
                    driver = CreateBroswerDriver();
                    setUpDriverSize(driver).get(configUtil.getConfigFileContent("defaultURL"));
                    return driver;
                }
            }
        }
        return driver;
    }

    //提供一个获取Driver实例的方法
    public static WebDriver getCurrentDriver() throws Exception {
        return createNewDriver();
    }

    /**
     * Create a new Appium driver for iOS,Android
     * 
     * 
     * @return Appium drive that you want style
     */

    public static AppiumDriver createAppiumDriver() throws MalformedURLException {
        log.info("Current Driver is null : " + (appiumDriver == null));
        if (appiumDriver == null) {
            synchronized (WebDriver.class) {
                if (appiumDriver == null) {
                    DesiredCapabilities capabilities = new DesiredCapabilities();
                    capabilities.setCapability("platformName",
                            ConfigUtil.getConfigUtil().getConfigFileContent("phonePlatform"));
                    capabilities.setCapability("platformVersion",
                            ConfigUtil.getConfigUtil().getConfigFileContent("platformVersion"));
                    capabilities.setCapability("deviceName",
                            ConfigUtil.getConfigUtil().getConfigFileContent("deviceName"));
                    capabilities.setCapability("app",
                            ConfigUtil.getConfigUtil().getConfigFileContent("applactionLocation"));
                    if (ConfigUtil.getConfigUtil().getConfigFileContent("phonePlatform").equals("iOS")) {
                        capabilities.setCapability("autoAcceptAlerts", true);
                        appiumDriver = new IOSDriver(
                                new URL(ConfigUtil.getConfigUtil().getConfigFileContent("appiumDriverURL")),
                                capabilities);
                    } else
                        appiumDriver = new AndroidDriver(
                                new URL(ConfigUtil.getConfigUtil().getConfigFileContent("appiumDriverURL")),
                                capabilities);
                    return appiumDriver;
                }
            }
        }
        return appiumDriver;
    }

    //略去...
    //....
    //一些其它方法.....

    /**
     * Close broswer driver
     */
    public static void CloseDriver() {

        driver.quit();
        driver = null;
    }

    /**
     * Close appium driver
     */
    public static void closeAppiumDriver() {

        appiumDriver.quit();
        appiumDriver = null;

    }

}
```

> 在DriverFactory类中，分别实现了对PC Driver的初始化和对APP端包括iOS、Android的Driver初始化，其可以进一步使用抽象工厂设计模式，将其进一步优化.
