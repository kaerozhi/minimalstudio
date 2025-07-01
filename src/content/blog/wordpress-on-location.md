---
title: "本地搭建 WordPress"
date: "2006-11-21"
categories: 
  - "玩艺"
tags: 
  - "blog-tools"
  - "wordpress-theme"
  - "网站更新"
---

捣鼓了好半天，终于把 WordPress 搭建起来了。因为数据引擎的空间没有提供 MySQL 的数据库（需要另行购买），所以也就只能在本地尝试。借助花生壳，你可以通过动态域名访问它：[http://aeroom.vicp.net/wordpress/](http://aeroom.vicp.net/wordpress/)。当然，打不开是正常现象，大概率是我关机了，囧rz

目前在用的皮肤是 [UtomBox](http://utombox.com/) 下载的 4U 海明威中文版，感恩。不过自己的皮肤也在构思当中，而且方向也差不多有了，嘿嘿。

另外还遇到一个 PHP + MySQL 的奇怪问题：PHP 和 MySQL 已经各自安装好，并且测试无误，但尝试连接 MySQL 就会报错。经过各种搜索尝试，解决办法如下：

> 配置好系统目录中的 `php.ini`以后，再另外复制一份到 PHP 的安装目录。

颇为诡异。之前安装 PHP 的时候，也从来没人提过需要这么操作，但的确就这样解决了。