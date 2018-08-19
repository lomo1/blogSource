---
title: messy code in MySQL on Linux by chinese
date: 2017-05-17 11:17:06
tags: [MySQL, PHP]
categories: study
description: Linux上MySQL v5.7.16插入中文乱码
---

## MySQL字符编码问题

### 缘由

> 本地开发环境下数据库MySQL中插入中英文插入、读取都ok，无论是MySQL控制台下插入、读取还是借助第三方`GUI`工具都是ok的，但是部署到线上Linux机器后插入MySQL后，查看中文部分是乱码。

```bash
#development enviroment
PHP Version 7.0.15
MySQL 5.7.16
Apache 2.0 Handler
```

```bash
#online environment
PHP Version 7.0.19
Apache 2.0 + Nginx 1.10
MySQL 5.7.16
```

### 问题分析

MySQL相关封装
```php
#mysqlhelper.class.php

<?php

/**
 *
 * Class mysqlHelper
 * Author: Lomo
 * Email: lomo@lomo.space
 * URL: http://lomo.space
 * Date: 2017-05
 *
 */
    include_once 'sql.interface.php';

class mysqlHelper implements ISQLHelper{

    private $host;
    private $userName;
    private $passWord;
    //private $defaultDB;

    private $conn;

    /**
     * SqlHelper constructor.
     *
     * @param $host
     * @param $userName
     * @param $passWord
     */
    public function __construct($host, $userName, $passWord)
    {
        $this->host = $host;
        $this->userName = $userName;
        $this->passWord = $passWord;
        //$this->dbName = $defaultDB;
        $this->conn = new mysqli($this->host, $this->userName, $this->passWord) or die("Fail to Connect MySQL Server".mysqli_error());
    }

    /**
     * @param $db
     *  switch DataBase
     * @return new $conn
     */
    public function _selectDB($db) {
        mysqli_select_db($this->conn, $db);
    }

    /**
     * @param $sql
     * DQL - 执行SQL查询
     * @return object $res
     *
     * $res->num_rows; 返回查询结果集行数
     */
    public function _query($sql) {
        return mysqli_query($this->conn, $sql);
    }

    /**
     * 判断是否查询有结果, 有则返回TRUE,反之FALSE
     * @param $sql
     *
     * @return bool
     */
    public function isExistData($sql) {
        $result = $this->_query($sql);
        if($result->num_rows >= 1)
        {
            return true;
        }else{
            return false;
        }
    }

    /**
     * @param $sql
     * DQL - 查询并返回关联数组形式的查询结果
     * @return array
     */

    public function execute_dql2($sql){

        $arr = array();
        $i = 0;
        $res = mysqli_query($this->conn, $sql) or die(mysqli_error($this->conn));
        while ($row = mysqli_fetch_assoc($res))
        {
            $arr[$i++]=$row;
        }
        mysqli_free_result($res);
        return $arr;
    }

    /**
     * @param $sql
     * DML - 数据操作
     * @return int
     * 0 //操作失败
     * 1 //操作成功, 数据表受到影响
     * 2 //操作成功, 但是未修改任何数据
     */
    public function execute_dml($sql){

        $r = mysqli_query($this->conn, $sql);
        if(!$r){
            return 0;
        }else{
            if(mysqli_affected_rows($this->conn) > 0){
                return 1;
            }else{
                return 2;
            }

        }

    }

    /**
     * close connect
     */
    public function close_connect(){
        if(!empty($this->conn)){
            mysqli_close($this->conn);
        }
    }

}

```

本地run脚本插入读取带有中文的数据一切OK，本地run 链接远程数据库时，插入读取中文相关也ok。当把脚本放在online机器时就产生了乱码问题。


#### 检查MySQL配置文件`my.cnf`
```bash
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
[mysqld]
collation-server=utf8_unicode_ci
init-connect='SET NAMES utf8'
character-set-server=utf8
```

配置文件ok。

#### 修改链接层字符

`mysqli_query("set names utf8");`
尝试无果。

Bing搜索🔍查询，有一个PHP针对MySQL连接层字符编码设置 `mysqli_set_charset($link, );` [PHP官方推荐使用！]

源码定义：

```php
# PHP 5 >= 5.0.5, PHP 7

/**
 * Sets the default client character set
 * @link http://php.net/manual/en/mysqli.set-charset.php
 * @param mysqli $link A link identifier returned by mysqli_connect() or mysqli_init()
 * @param string $charset
 * @return bool
 */
function mysqli_set_charset ($link, $charset) {}
```
通过在连接层设置字符编码为`utf8`即可解决。

`mysqli_set_charset($this->conn, "utf8");`。

> 参考：https://stackoverflow.com/questions/26596294/set-names-vs-mysqli-set-charset-besides-affecting-mysqli-escape-string-are
