---
title: "iNewS Tags Manager 发布"
date: 2006-02-16 10:17:52
categories:
  - "案例"
tags:
- dreamweaver
- plugins
- iNewS
---
哈哈，现在向您介绍我的新产品：iNewS Tags Manager，该产品用蜂蜜、川贝、桔梗，再加上天山雪莲配制而成，无须冷藏，也没有防腐剂，除了毒性猛烈之外，味道还很好吃！

嘿嘿，其实这只是一个 Dreamweaver 的插件，用于在 iNewS 企业内容管理系统中插入各种标签。点击下面的地址下载试用：

- [插件下载地址](/downloads/iNews.mxp) 
- [未封装的源文件](/downloads/iNews.rar)

如果想了解 iNewS 企业内容管理系统及 iNewS 标签，请查看 iNewS 的在线帮助文件：http://inews.com.cn/doc/

<!-- more -->

安装本插件以后，可以像普通的 HTML 标签那样，在 Dreamweaver 中直观地插入和编辑 iNewS 标签。开发过程涉及到以下 Dreamweaver 扩展 API：

1. 插入面板对象（Insert Bar Objects）； 
2. 命令（Commands）； 
3. 属性检查器（Property Inspectors）； 
4. 翻译器（Data Translators）；

技术并不复杂，只要有一定的 JavaScript 基础，对 HTML、DOM 和正则有了解，做出一个这样的插件难度并不大。 

下面是已经测试过的 Dreamweaver 版本兼容性记录，其中大部分的问题都已经解决。以下如未特别说明，测试所用的 Dreamweaver 默认为中文版：

## Dreamweaver 4： 

1. **Dreamweaver 4 的插件不会安装到用户的 Application data 文件夹。** 实际上，Dreamweaver 4 并不会在用户的 Application Data 文件夹里创建任何文件，而是会直接安装到 Dreamweaver 的程序文件夹。这可能和 Extension Manager 版本有关，与 Dreamweaver 4 一起安装的是 Extension Manager  1.3.002，它甚至不能识别 Dreamweaver 8 和 Flash 8。插件第一次安装时报错，第二次安装则成功，因为没有反复地尝试，所以也不能确定第一次的报错是不是偶然。 

2. **插入面板上的图标不显示，但显示顺序正确**。因为没有搜索到 `insertBar.xml` 或名称类似的文件，所以错误的原因也无从判断，但标签能够按照预定的顺序而不是按照文件名称的顺序来显示，证明还是有相关的配置文件。插入菜单则正常显示，并且也找到了 `menus.xml`。 

3. **插入对话框完全正常，** 返回的代码目前尚未发现错误，替换代码的图标也可以显示，但看样子 Dreamweaver 4 不支持带 alpha 通道的透明 PNG，图片中的阴影都变成了丑陋的黑色。选中该段代码时，属性检查器不会启动，不过所有的属性检查器文件都可以在 `Inspectors` 文件夹里面找到。检视 Dreamweaver 4 的相关帮助，属性检查器的 API 似乎和最新版本并无不同之处，看来只要继续深入研究，实现 Dreamweaver 4 的兼容还是有可能的，就算不能完全兼容，在现在的基础再修改出一个能在 Dreamweaver 4 中使用的插件，应该也比较容易。 

4. **2 月 17 日更新，决定放弃对 Dreamweaver 4 的兼容性支持。** 刚刚发现最新的 Extension Manager 也没有提供对 Dreamweaver 4 的支持，既然官方都放弃了，我们自然也不必继续耗费精力研究啦。

## Dreamweaver MX： 
1. 感谢小荷的帮助，因为我没有安装此版本，所以只知道**插入面板上的图片不能正确显示**。猜测这可能是图标格式导致的，Dreamweaver 图标支持 `.gif` 格式，但不确定是否支持包括 `.png` 在内的其他格式。看来想在低版本中实现华丽的投影效果困难重重。Update：已证实更换 .gif 格式后可以正常显示。 

2. **属性检查器能正常启动，但是文本框的高度太高了。** 这是因为 Dreamweaver 8 的默认高度有些过窄，看上去很小气，所以我擅自将其定义为 18px。

## Dreamweaver MX 2004： 
1. 尚未经过测试，但是对该版本的兼容性持乐观态度。 

2. 该版本开始支持 .png 图像的透明效果，但是属性检查器的文本框过高的问题仍然存在。 
3. 该版本开始将插件安装在用户的 `Application data` 文件夹内。

## Dreamweaver 8： 
这是我用来开发插件的平台，最少在我和我同事的系统上面没有发现兼容问题。但要说明的是，属性检查器的反应会比较慢，使用时可能会遇到一些延迟现象。Macromedia 官方推荐用 C 或者 C++ 来开发属性检查器，因为 JavaScript 的效率……你懂的，但遗憾的是，我完全不懂 C 或者 C++，所以只能做到这个程度啦。

---

欢迎大家帮我测试！虽然我没有强调英文版 Dreamweaver 及英文操作系统上面的兼容性，但是非常欢迎英文版 Dreamweaver 的用户朋友们把问题反馈给我——因为没有使用 UTF-8 的编码，我怀疑可能会出现乱码——并一起探讨 Dreamweaver 插件开发的相关问题，我会慢慢地把我的经验和心得写出来，谢谢大家^_^