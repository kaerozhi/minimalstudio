---
title: 从 Firefox 到 Google Chrome
date: 2010-03-11T00:00:00.000Z
categories:
  - 日常
tags:
  - browser
  - chrome-extensions
  - firefox
  - firefox-扩展
  - google-chrome
---

昨天为了找 [Google Calendar](http://calendar.google.com/) 的客户端，从搜索结果里面转到了 [Google Chrome Extensions](https://chrome.google.com/extensions/)，当时不由大吃一惊：早前虽然听说过 Chrome 开通扩展机制的消息，却没想过它已经达到了这样的规模。Firefox 上以前有 [Google Calendar Notifier](https://addons.mozilla.org/en-US/firefox/addon/2528)，非常好用，可惜老早便停止更新，印象里自从 Firefox 3 以后的版本就没有兼容过。Google Calendar 的用户数量应该也很多了，但是同类型的插件却始终没有，既然 Chrome 有相关的扩展，于是就开始捣鼓 Chrome 了。

作为一个 Firefox 的老用户，捣鼓的标准自然就是怎么让 Chrome 用起来与 Firefox 更像而已，而 Firefox 最独特也是最具魅力的方面当然得数它品种繁多无所不有的插件了。我给 Firefox 安装的插件也不算太多，掐指一算也才区区 12 个，结果证明 Chrome 扩展一点没有让我失望，除了一两个插件没有找到完美的替代品之外，其他基本上都 OK 了。且待我把所安装的 Firefox 插件与 Chrome 上面的替用品细细数来：

1. [**AdBlock Plus**](http://adblockplus.org/en/) 广告已成往事！著名的广告过滤插件，而 [Adblock for Chrome](https://chrome.google.com/extensions/detail/gighmmpiobklfepjocnamgkkbiglidom) 则应该是 Chrome 上面最早推出的插件之一，功能也几乎和 Firefox 版本一致，除了不能方便地自定义过滤名单之外（呃……）。

2. [**AutoProxy**](http://autoproxy.org/) Firefox 上面有了 [MyEntunnel](http://nemesis2.qx.net/pages/MyEnTunnel) + AutoProxy，GFW 几乎就不构成上网阻碍了。关于如何使用这对神器的组合翻墙可以参考这里：[http://goo.gl/jKL7](http://goo.gl/jKL7 "http://goo.gl/jKL7")。当然，你也可以把MyEntunnel换成 [Tor](www.torproject.org/index.html.zh-cn)、[Puff](http://www.erights.net/)、或者是无界和自由门等等……等，你说什么，你不翻墙？在 Chrome 上面我们有 [Proxy Switchy!](https://chrome.google.com/extensions/detail/caehdcpeofiiigpdhbabniblemipncjj)可以完美代替 AutoProxy，而且必须配合 AutoProxy GFWList PAC 才能发挥它的最大效能。其实 AutoProxy 的开发者都推荐过 Proxy Switchy 这个Chrome扩展，并且非常友好大度地提供了这个教程：[在 Chrome + Switchy 下使用 AutoProxy gfwList PAC](http://autoproxy.org/zh-CN/node/61)。好人啊，必须五星推荐！！

3. [**Coral IE Tab**](http://coralietab.mozdev.org/) 在我们这个神奇的国度，IE 浏览器的市场份额仍在 90% 以上，IE Only 的网站更是无处不在。所以在 Firefox 和 Chrome 这样的非 IE 核心浏览器上，IE Tab 是无论如何也不能不装的扩展。Coral IE Tab 是 IE Tab 的加强版本，它在原插件基础上增加了“同步 Cookies”和“支持 AdBlock Plus”这样的实用功能，而[IE Tab for Chrome](https://chrome.google.com/extensions/detail/hehijbfgiekmjfkfjpbkbammjbdenadd) 就略逊一筹了，它只实现了浏览器核心的简单切换。

4. [**Delicious Bookmarks**](http://delicious.com/help/quicktour/firefox) 如果说我现在对 Firefox 还有什么留恋的话，我觉得 [Delicious](http://delicious.com/) Bookmarks 插件绝对是其中很重要的一个原因。Delicious Bookmarks 完美代替了 Firefox 自身的书签功能，你可以很方便地在公司添加书签，然后在家里打开它，还可以决定要不要把这个收藏公开出来，共享给你的朋友和同好。Delicous Bookmarks 插件还提供了友好的界面让你非常便捷地管理和查找你数量庞大的书签库。Google 用户可能要问了，Google 也提供了 [Google Bookmarks](https://www.google.com/bookmarks/) 啊，用 Google Toolbar 同步起来也很方便呢。但是 Google Bookmarks 和 Delicous 除了都收藏书签之外，两者的理念其实截然不同。Google Bookmarks 只是一个功能单一的在线收藏，以便你在不同的电脑之上同步；Delicious 则完全是社会性的共享网络，你不光可以收藏自己喜欢的网站，还可以将你的发现分享给其他人，更可以在此基础上发掘更多你感兴趣的资源。 而同样是 Delicious 官方推出的 [Delicious Bookmarks Extension(Beta)](https://chrome.google.com/extensions/detail/lnejbeiilmbliffhdepeobjemekgdnok) 就非常简陋了，它除了最基本的添加书签之外就只剩下一个同步 Chrome 书签的功能了。而且这个同步简直非常可笑，要知道 Delicious 的一个强大之处是因为它提供的 Tag 定义功能，但是 Chrome 书签是没有这个概念的（Google Bookmarks 也同样没有Tag，所以检索起来应该很困难，你只能在各个文件夹里逐个翻阅，要不然就得凭借模糊的印象来搜索），所以同步之后所有你定义过的 Tag 都不见了，全部书签都被堆放在一个名为“delicious\_not\_delete”的文件夹里面。我已经在 Delicious 上面收藏了数千个网页，看着这个文件夹我差点崩溃呢。
    
Chrome 扩展似乎有一个通病，那就是几乎都没有设置快捷键。我不知道这是由于 Chrome 的安全机制不允许这样做，还是因为我用过的扩展太少所以还不曾发现，反正我觉得这个缺憾对我的操作体验有很大影响。在 Firefox 里面我按 Ctrl + D 就能把当前网页收藏到 Delicious，但是在 Chrome 里我只能移动鼠标去点地址栏上的 Delicious 扩展按钮了。（Ctrl + D 在 Chrome 上是添加到 Chrome 自有书签）

当然，Chrome 上面还有许多第三方开发的 Delicious 扩展，我觉得跟 Delicous Bookmarks 功能最接近的应该是这个：[Chromelicious](https://chrome.google.com/extensions/detail/jhjeaonknehkebginocakiakmiogeblg)，它可以提供简单的 Tag 检索功能。

但是不能把搜索条件设为多个 Tag。因为 Delicious 里面一个收藏可以设置多个 Tag，譬如你给一个网页同时指定了 _music、Rock、U2_ 等三个 Tag，如果你同时使用其中 2 个或者 3 个标签来搜索的话，那准确率将会大大提高，这个优势在收藏数量越大的情况下越容易体现。

1. [**Echofon**](http://echofon.com/twitter/firefox/)（原来的 TwitterFox） Echofon 是老牌的 [Twitter](http://twitter.com/) 客户端了，发展到现在已经非常成熟，不过官方版本仍然不提供自定义 API 的功能，在祖国大陆这绝对是个非常致命的缺陷（幸好有可以自定义 API 的修改版）。而 Chrome 上面的 Twitter 客户端则要丰富得多，我试用过并且印象不错的就有3个：[Metrist](https://chrome.google.com/extensions/detail/aefaeloiencfjnaljicdoieoekoecmha)，[Chromeb Bird](https://chrome.google.com/extensions/detail/encaiiljifbdbjlphpgpiimidegddhic)，[Chrowety](https://chrome.google.com/extensions/detail/ffcbeckjmgmgigkmnhmgjplmomcpfall)。最后我选择了 Metrist，首先是界面清爽看着最舒服，其次能够回车直接发推（Chromed Bird 看界面就会让你觉 得非常牛逼但就是不能直接回车发推，残念～我大概对一切不能使用任何快捷键的软件有排斥心理），最后是可自定义 API。
2. 
3. [**Firebug**](http://getfirebug.com/) 绝对是网页前端开发者必备的神器啊，有多少互联网从业者留着 Firefox 就是因为它了。当然， Chrome 上面也有，不过是个阉割版，看名字就知道了：[Firebug Lite](https://chrome.google.com/extensions/detail/bnbbfjbeaefgipfjpdabmpadaacmafkj)。
4. [**FlashGot**](http://flashgot.net/) 呃，下载用的，一个非常棒的功能是可以自动嗅探 Flv、Mp3、Mov 等多媒体文件，到目前为止我还没有 Chrome Extensions 里面找到类似的扩展。只是下载方面我没有很强烈的需求，反正下载不多而且 Chrome 自带的下载功能速度也不算慢。不过有一个插件绝对值得大力推荐：[http://goo.gl/GEYr](http://goo.gl/GEYr)，它能将迅雷、QQ 旋风、快车等下载软件的专用链接自动转换为真实下载地址，这个太管用了。
5.  [**Gmail Notifier**](http://www.nexgenmedia.net/extensions/) 原则上来讲下面几个都得略过，毕竟都是 Google 自家的产品，相关的扩展能没有么？不过也由此产生了一个问题：相关的扩展太多了，在一大堆里面选择一个适合自己的还真不容易。Gmail 扩展我推荐 [Google Mail Checker Plus](https://chrome.google.com/extensions/detail/gffjhibehnempbkeheiccaincokdjbfe)，它能直接在扩展界面上对未读邮件做简单处理，譬如删除、存档、标记为已读这些常用操作。
6.  **goo.gl Lite** goo.gl 是 Google 推出的短网址服务，[Google URL Shortener](https://chrome.google.com/extensions/detail/iblijlcdoidgdpfknkckljiocdbnlagk) 就挺不错，支持生成以后直接粘贴。
7.  [**GoogCal**](http://www.bitdrip.com/) GoogCal 其实就是个快捷方式而已，如果你还在使用经典的 Firefox 老版本，我还是建议你去试试 [Google Calendar Notifier](https://addons.mozilla.org/en-US/firefox/addon/2528)。就算是 Chrome 上面我也没有找到比它更好的同类型扩展，Google 官方推出的[Google Calendar Checker](https://chrome.google.com/extensions/detail/ookhcbgokankfmjafalglpofmolfopek) 过于简单，而 [DayHiker for Google Calendar](https://chrome.google.com/extensions/detail/emambmpgicpidmncfacjkeicobamadod) 应该采用了即时加载数据的方式所以打开非常慢。综上所述，最后我只能勉为其难地选择了 [Google Calendar for Today](https://chrome.google.com/extensions/detail/mkaaneppndljkmpgdcglnpfagfhjhipc)。
8.  [**Google Reader Watcher**](http://ajnasz.hu/google-reader-watcher) 这个我选用的替代品是 Google 官方推出的 [Google Reader Notifier](https://chrome.google.com/extensions/detail/apflmjolhbonpkbkooiamcnenbmbjcbf)，支持预览最新未读项目的标题。
9.  [SearchStatus](http://www.quirk.biz/searchstatus/) SearchStatus 是个非常简洁的 SEO 插件，通过该插件你可了解到当前页面的 Google Pagerank 值和 Alexa 排名信息。虽然 Alexa 排名对我来说就是浮云啊浮云，不过 [Pagerank](https://chrome.google.com/extensions/detail/pneoplpmnpjoioldpodoljacigkahohc) 扩展我还是装了一个的。

除了这些 Firefox 插件的备用品以外，我还装了其他几个扩展，像可以读取个人网站最新评论的 [Wordpress Comments Notifier](https://chrome.google.com/extensions/detail/gcdeddgdojngjlkjjheckcdoclboipln)，可以自动将 PDF、PPT 和其他文档转到 Google Docs 打开的 [Docs PDF/PowerPoint Viewer](https://chrome.google.com/extensions/detail/nnbmlagghjjcbdhgmkedmbmedengocbn)。另外一个意外发现就是 Chrome 居然没有内建自动识别和订阅 RSS 的功能，这真是不可思议，所以我还得装一个 [RSS Subscription Extension](https://chrome.google.com/extensions/detail/nlbjncdgjeocebhnmkbbbdekmmmcbfjd)。

总体来讲 Chrome Extensions 了里面的扩展足够多也基本能满足我的需求，但是界面却相当地不友好，我既没办法切换排序方式，也没有类别可供浏览，我能做的就是逐个逐个去翻，或者利用搜索。（貌似这也是 Google Bookmarks 的浏览方式？）另外千万不要安装太多扩展，我一共装了 15 个扩展，内存占用率惊人啊。每个扩展占用 10～30M 不等，下面是截图，还在使用 1G 以下内存的同学就别看了，会吓着你的……

如图所示，占用内存总量保守估计在 300～400M 之间，这是什么概念？以前都说 Firefox 内存泄漏怎么严重，可一般也就在 100～150 之间，跟 Chrome 一比都可以颁个“节能先锋”的大奖了。好吧， Google 告诉大家这样进程之间不会互相干扰，崩溃一两个没事，可是这也太夸张了。说不定还会有人一声冷笑，鼻孔一哼道：谁叫你傻乎乎装这么多插件来着？活该！

不过 Chrome 相比 Firefox 还是有不少优点的，譬如上面说的进程间各自独立，譬如安装或者卸载扩展不需要重启，譬如启动速度贼快贼快，等等。在 Chrome 开启了扩展机制之后，Firefox 独一无二的插件优势就被消解于无形了，这两者对于用户群的争夺也几乎到了近身肉搏的程度，所以以上那些看起来不是那么明显的优势都有可能成为影响用户取舍的因素。虽然同为 IE 的强劲对手，不过现在的情形也恰恰印证了那句话：最亲密的伙伴往往就是最危险的敌人。想到这里我对 Firefox 的前景颇有些悲观，毕竟比起 IE 和 Chrome，背靠的资源差距也太悬殊了。但是用户就是用户嘛，我们为什么要去计较这个呢，再说这种情况不正好给目前市场份额还在领先的 Firefox 增加创新的压力与动力么？
