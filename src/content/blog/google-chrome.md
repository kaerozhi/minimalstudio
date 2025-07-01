---
title: "Google Chrome"
date: "2008-09-03"
categories: 
  - "日常"
tags: 
  - "browser"
  - "google"
  - "google-chrome"
---
Google Chrome 正式发布了。第一时间试了试，页面的加载速度真快啊，绝对比 Firefox 快1倍以上。WebKit 核心，印象中自称最快的 Apple Safari 也是基于这个开发的吧，也难怪这么快了。不过功能真是相当地少简洁，普通浏览之外的特色功能，只有一个快捷方式值得一提吧。Javascript 调试器还是挺不错的，源代码查看就简陋多了：不分行，代码上色也相当糟糕。

不管怎样，对于我来说 Firefox 仍然是默认浏览器，20多个扩展不能轻易就取代了。Google Chrome 还需要时间来观察，不知道会不会推出类似的扩展机制呢？

**Update**：所谓的“崩溃控制”，Google 官方是这样描述的：

> 您所使用的各个标签页都在浏览器中独立运行，因此，即使某一个应用程序崩溃，也不会影响到其他任何进程。[了解详情](http://www.google.com/support/chrome/bin/answer.py?answer=95672&hl=zh_CN)。

其实奥妙就每个标签都单独开了一个进程-\_-

**Update II**：在 Chrome 文件夹下面发现了名为 Plugins 的文件夹，不过暂时只有一个 gears.dll。这么看来，应该早晚会推出 Chrome 的扩展吧。Chrome 安装时不能选择安装位置（这也是 Google 的一贯作风了，一想到 Google Desktop 曾经塞了 N 个 G 的索引文件在俺的 C 盘里面，俺就恨恨不平），而且安装的位置非常隐蔽，你可以在这样的路径下找到它：

```
> C:\\Documents and Settings\\\[你的用户名称\]\\Local Settings\\Application Data\\Google\\Chrome\\
```

默认情况下 Local Settings 可是隐藏的，就是说不在文件夹选项里面改变设置的话你根本找不到 Chrome 这家伙……
