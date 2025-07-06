---
title: 一个奇怪的问题
date: 2006-06-22T00:00:00.000Z
categories:
  - 玩艺
  - 网站
---

大家可以用 [Firefox](http://www.mozilla.net.cn/) 或者 [Opera](http://www.opera.com/) 打开 [aeroom 的首页](http://www.aeroom.org)，是不是发现中间的大图片下面有一条多余出来的空白？虽然很早就发现这个 BUG，不过因为是自己的网站，也就不愿意去深究，毕竟碍不碍眼也只是自己的东西，没人去管，嘿嘿。

今天做 [iNewS 网站](http://www.justdn.org/_114/_115/)的时候，发现这条可恨的空白又出现了，实在令我的心情非常之不爽。在 Google 上面查找一下，也很难找到确切的相关信息，只好自己慢慢解决罢。

更新：居然发现去掉样式的时候也会有这样的问题，我靠！！！

又更新：已经搞定了，原来是 DTD 的问题，我这段时间一直用 XHTML 1.1 的 DTD，改成 XHTML 1.0 Transitional 就没问题。等有时间来查一下 XHTML 1.1 的参考文档。
