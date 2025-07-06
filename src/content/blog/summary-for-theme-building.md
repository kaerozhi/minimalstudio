---
title: 在白宫落成仪式上的总结致辞
date: 2008-12-10T00:00:00.000Z
categories:
  - 玩艺
  - 网站
tags:
  - plugin
  - wordpress
  - wordpress-theme
  - 网站更新
---

经过上周六至本周一的努力施工，俺的博客终于改造完成了。这个新主题的设计稿其实很陈旧了，还是大半年前的工作，代码则是基于 [Sandbox](http://www.plaintxt.org/themes/sandbox/) 改写的。咳咳，最终效果得到了品味高雅的 [Winging](http://www.xwingx.com/blog) 同学的认可与赞赏，感激～同时也受到了某些无耻之徒如[困妞](http://hi.baidu.com/%B7%EF%CE%E5%CF%C8%C9%FA)和[天台](http://tiantai.blog.tianya.cn/)等人的强烈嫉妒和刻意贬低，愤慨～他们表示看上去完全不咋的，或者干脆说是简陋，尤其是百度空间资深用户困哉，在得知这博客使用的是传说全宇宙最强的 WordPress 程序之后，他更是痛心疾首地控诉：配上你这套烂皮，真可谓暴殄天物啊！然后就皱着眉头摇着脑袋非常不满地把自己的百度Mac模板拿出来对比了。

首先得把新主题一个不太明显的功能拎出来示众一下，如下图左端红色部分所示：  
![image](http://i1.wp.com/kaero.files.wordpress.com/2008/12/200812110103071.pngwp-content/uploads/2008/12/image.png?resize=440%2C44)  
这里其实是一个 Previous Post 的跳转链接，相应的右端也有一道浅灰的区域，则是 Next Post 的跳转链接。因为设计时没有并考虑到这两个很必要的链接，在 Coding 的时候临时添加了这么个效果，但为了不至于影响文章标题喧宾夺主，做得比较低调可能容易被忽略，而 Sandbox 代码又不太好改动，所以连个提示都没办法加，只能希望鼠标翻转事件能够引导用户去点击了。

为了加快载入速度便于阅读，我把那些 Web 2.0 网站的应用都集中到首页了，内容页面中的 Sidebar 只保留了很简单的基本功能，另外放上了一个有趣的 Widget [WOWZIO](http://www.wowzio.com/) ，可以让你看到网站上的其他用户都在干嘛——虽然在罕有人迹的本站它可能一天也就动那么一两下，不过要是有一天俺成名了它就会像锯木厂工作台上的木屑一样飞迸啊。然而首页其实还有问题的，因为很多东西都转移过来这边，所以在拥挤的布局里我仅显示了最新的一篇文章。这样用户想继续阅读的时候就比较麻烦了，因为在附近范围内没有链接引导他们打开其他文章或者存档页列表。他们只能通过最顶部的导航来选择，这无疑是非常糟糕的体验啊。所以我还在考虑要不要在 Twitter 列表上面插入一个 Recent Posts 列表。

在改造的过程中也尝试了很多新的 WordPress 插件，下面就推荐几个我觉得不错并且最后保留下来的吧：

1） [Dynamic Content Gallery](http://www.studiograsshopper.ch/wordpress-plugins/dynamic-content-gallery-plugin-v2/)：就是首页上边那个 Slideshow 效果，看起来还不错吧？其实最早找到的是 [Featured Content Gallery](http://www.revolutiontwo.com/plugins/featured-content-gallery.htm)，这两个插件都是基于同一个JS框架开发的，效果非常类似，不过 FCG 弄了很久，始终停留在加载那一步就不能播放了，最后无奈放弃另选了 DCG。不过 FCG 有一个优点是可以任意指定一个2至10之间的图片数，而 DCG 则固定加载5张。另外 FCG 只能加载一个指定分类，DCG 在这方面则自由很多。

2） [Quoter](http://www.damagedgoods.it/wp-plugins/quoter/)：咳，对于俺的博客来讲这还是一个稍显奢侈的插件吧？效果如图所示：  
[![image](http://i0.wp.com/kaero.files.wordpress.com/2008/12/200812110103071.pngwp-content/uploads/2008/12/image-thumb.png?resize=446%2C119)](http://i0.wp.com/kaero.files.wordpress.com/2008/12/200812110103071.pngwp-content/uploads/2008/12/image1.png)  
你只要点击 Quote 就可以引用谁谁谁的发言了，这在那些引起热烈讨论的大人气话题里面还是相当管用的，否则在一大串的回复列表中你就可能陷于无的放矢无人理会的尴尬境地了。不过在评论数通常为零的本站，咳，不说也罢，人生真是很悲哀啊。

3） [MobilePress](http://www.mobilepress.co.za)：这是一个针对移动设备的插件，对于普通用户完全没有影响。不过在俺这个经常在地铁上上网的黑莓用户看来，它还是相当相当棒的。  
![20081211010307](http://i1.wp.com/kaero.files.wordpress.com/2008/12/200812110103071.pngwp-content/uploads/2008/12/20081211010307.png?resize=440%2C168)  
追加了黑莓上面 Opera Mini 的两张截图。和原貌呈现的 Winging 同学博客对比一下，还是各有千秋的吧？然则对于某些布局复杂的网站来说，用 MobilePress 优化一下输出可读性还是会强很多的。

以上总结完毕，最后感谢大家的支持，希望自己今后也能努力一点：）
