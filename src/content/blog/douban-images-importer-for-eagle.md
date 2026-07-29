---
title: "豆瓣图片批量导入插件 for Eagle"
date: 2026-07-29
categories: 
  - "软件"
tags: 
  - "Eagle"
  - 豆瓣
  - 插件
description: "一键导入，就是这么简单！"
photos:
  - https://media.kaerozhi.com/2026/07/853a01ede9822a520c925b105252c0b1.png
---
因为之前已经做过一个 Tumblr 的导入插件，所以这次的开发过程就不赘述了，需求丢给 Gemini，调试了两轮就成功，前后花了不到一小时。

项目已经上传到 Github，请自行下载：[https://github.com/kaerozhi/eagle-douban-importer](https://github.com/kaerozhi/eagle-douban-importer)

使用本插件的前提是安装了 [Eagle](https://eagle.cool/)，作为图片管理软件，虽然收费，但物有所值，强烈推荐。

## 安装步骤

1. 可以直接下载源代码，也可以使用 Git 命令：
    ```
    git clone https://github.com/kaerozhi/eagle-douban-importer.git
    ``` 
2. 在 Eagle 软件中打开开发者模式。
3. 主菜单 > 插件 > 开发者中心 > 导入本地项目，选择刚刚下载的文件夹，即可在插件列表中找到「豆瓣艺人图片」。

## 使用说明

![插件主界面](https://media.kaerozhi.com/2026/07/47252210052d3d38414e1404b20556a7.png)

用起来比较简单，找到你喜欢的艺人，进入图片页面，比如青霞姐姐的图片页地址是：[https://www.douban.com/personage/27250502/photos/](https://www.douban.com/personage/27250502/photos/)，将对应的地址复制粘贴到豆瓣相册链接中。

Cookie 的获取稍微麻烦一点，不知道是不是 Chrome 的版本更新了，所以与之前不同，我获取的方式是：

1. 在豆瓣页面上按 `F12` 打开浏览器检查器，最上面一排标签，选择「网络」；
    ![检查器的「网络」页签](https://media.kaerozhi.com/2026/07/711cecda820fe0ae383b373b677e713b.png)
2. 第二排有个搜索小图标，点击会进入一个搜索界面，输入 `cookie`，会出来一串结果，拖到下方，就能找到好几个 cookie 字符串，理论上复制哪个都行。
    ![image.png](https://media.kaerozhi.com/2026/07/d7db9f316db28ea22e8c3e5389da59c6.png)
3. 填好 cookie，然后设置好页数（不要太贪杯），就可以愉快地下载了。