---
title: java serialize yaml file
date: 2017-01-21 23:51:41
tags: [java, yaml]
categories: study
description: Java序列化yaml文件
---

## Java处理yaml文件

1. yaml文件格式如下:
```yaml
--- !dataBean.pc.overduequery.OverdueBean
id: 'default'
mobileNumber: '15711101521'
```

2. DataBean类：

> DataBean类用来set和get数据，并对外提供public级别访问权限以使可以读写数据

```java
package dataBean.pc.overduequery;

import dataBean.IDataBean;

public class OverdueBean implements IDataBean {

    private String id;

    private String idCardNo;
    private String mobileNumber;


    @Override
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }



    public String getIdCardNo() {
        return idCardNo;
    }

    public void setIdCardNo(String idCardNo) {
        this.idCardNo = idCardNo;
    }


    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
       this.mobileNumber = mobileNumber;
    }

}
```

3. 解析

`DataFactory.java`

```java
package dataTool;

import dataBean.IDataBean;
import dataBean.pc.overduequery.OverdueBean;
import org.ho.yaml.Yaml;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class DataFactory {

    // yaml file's path should be same with bean's path
    public static <T> T GetData(Class<T> objectClass) throws FileNotFoundException {
        String objectClassName = objectClass.getName();
        if (null != objectClassName) {
            objectClassName = objectClassName.replace(".", "/").replace("dataBean", "yaml");
        }
        String path = objectClassName + ".yaml";
        InputStream inStream = ClassLoader.getSystemResourceAsStream(path);
        T tObject = Yaml.loadType(inStream, objectClass);
        return tObject;

    }

    public static <IDataBean> List GetDataList(Class<IDataBean> objectClass) {
        String objectClassName = objectClass.getName();
        if (null != objectClassName) {
            objectClassName = objectClassName.replace(".", "/").replace("dataBean", "yaml");
        }
        String path = objectClassName + ".yaml";
        InputStream inStream = ClassLoader.getSystemResourceAsStream(path);
        List<IDataBean> objList = new ArrayList<IDataBean>();
        for (Object obj : Yaml.loadStream(inStream)) {
            objList.add((IDataBean) obj);
        }

        return objList;
    }

    /**
     * 
     * @param objectClass
     *            you want to get the bean's class object.
     * @param id
     *            selector for id
     * @return
     * @throws Exception
     */

    public static <T extends IDataBean> T getObject(Class<T> objectClass, String id) throws Exception {
        List<IDataBean> DataList = DataFactory.GetDataList(objectClass);
        for (IDataBean dataBean : DataList) {
            if (dataBean.getId().equals(id))
                return (T) dataBean;
        }
        throw new Exception("No data by use id in this yaml file!!!!");

    }

    //Test
    public static void main(String[] args) throws Exception {
        OverdueBean overdueBean = new OverdueBean();
        overdueBean = DataFactory.getObject(OverdueBean.class, "default");
        System.out.println(overdueBean.getMobileNumber()); //输出：15711101521
    }
}

```

> yaml文件路径要与其对应的Bean类文件路径一致.