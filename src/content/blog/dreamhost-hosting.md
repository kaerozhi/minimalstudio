---
title: 真倒霉，该死的DreamHost
date: 2007-07-30T00:00:00.000Z
categories:
  - 玩艺
  - 网站
tags:
  - dreamhost
  - 虚拟主机
  - lifetype
photos:
  - dreamhost-banner.png
---
把网站升级到了 LifeType 1.2.4，一开始想用 PerFormancing 来发布日志，然而失败。闷头折腾了老半天，无果。在网上找了好久的解决办法，也没有什么线索。当时也看到一条，说 PHP 5.2.2 的 Bug 会导致 Lifetype 的 XMLRPC 失败，但当时也没有太在意，因为是特定版本的 PHP，没这么倒霉 DreamHost 装的就是这个版本吧？

今天又下载了 Zoundry 来尝试，结果还是失败。又找了半天的资料，现在已经是深夜一点半，绝望中想起那个版本 bug，抱着死马当活马医的心态打开 Dreamhost 后台一看，妈的！果然是 PHP 5.2.2。

好在 DreamHost 还提供了 PHP 4.7.7 可以，虽然是回退旧版本，不过至少没有奇怪的 bug，现在总算正常了。
