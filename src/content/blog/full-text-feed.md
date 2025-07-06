---
title: RSS 全文输出的格式问题
date: 2009-04-14T00:00:00.000Z
categories:
  - 日常
tags:
  - feed
  - rss
  - wordpress-plugin
---

未知出于何种原因，本站的 RSS Feed 一直没有格式化，其实细心的我早就注意到了，只不过工作太忙人太懒_（可能后者更关键些）_，一直抽不出时间解决，所以也就只能听之任之。不过良心却总是折磨着我，天下苦秦久矣！本站的 RSS 订阅者们已经忍受了太长时间的不分段、无图片，还看不到视频，是时候挺身而出拨乱反正，还大家一个清平世界了。

首先祭出的武器是 [Simple Feed Copyright](http://www.quickonlinetips.com/archives/simple-feed-copyright-wordpress-plugin/) 这个插件，其实它主要功能是在 RSS Feed 的文章末尾加一段版权信息，但是据说也可能产生意想不到的效果。

OK，现在就发布这篇日志来测试一下效果如何。另外再请教一下各位达人如何在不发布新日志的情况下刷新 Feed 输出……

**Update：**看来 A 计划已经可耻地失败了……不过无须气馁，我们还有 B 计划： [Full Text Feed](http://cavemonkey50.com/code/full-feed/)。

不过这两个插件的共同点是都没有设置页面，看起来不甚可靠，所以依然前途叵测。

**Update 2：**果然又失败了，难道不是全文输出的问题？

再次 Google，大部分的结果都指向一个可能：Feed 输出格式是 RSS 0.9 而非 RSS 2。可是这个 RSS2 应该在哪儿设置呢？我找了老半天还真没找着相关选项。

**Update 3：**果然是这样……正确的订阅地址应该是：[http://kaero.org/feed/](http://kaero.org/feed/ "http://kaero.org/feed/")，另外一个正确的：[http://kaero.org/feed/rss2/](http://kaero.org/feed/rss2/ "http://kaero.org/feed/rss2/")，而我自己订阅的偏偏是那个会丢失格式的 RSS 0.9：[http://kaero.org/feed/rss](http://kaero.org/feed/rss "http://kaero.org/feed/rss")

感情折腾了老半天，是我在庸人自扰，囧rz。
