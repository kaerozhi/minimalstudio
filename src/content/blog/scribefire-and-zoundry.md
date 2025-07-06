---
title: 无辜的 ScribeFire 与牛逼的 Zoundry
date: 2007-08-02T00:00:00.000Z
categories:
  - 玩艺
  - 软件
tags:
  - Blog Tools
  - ScribeFire
  - Zoundry
---

添加Blog账号的时候，ScribeFire 连不上我的 Blogger，但之前 Zoundry 是可以的，所以颇感失望，对 ScribeFire 的好感摇摇欲坠。

不过仔细研究之后，有了一点头绪，ScribeFire 默认的 Blogger XMLRPC 地址是：`http://BLOGNAME.blogspot.com/feeds/posts/full`，但众所周知，blogspot.com 这个域名在国内无法正常访问。

原因似乎找到了，不过有一点仍旧费解，为什么 Zoundry 就可以正常获取 Blogger 的信息呢？于是我又去检查了一下 Zoundry 用的 XMLRPC 地址，是这样的：`http://www.blogger.com:80/feeds/default/blogs`，难怪可以！于是我欣然释然，果然还是推出了官方中文版的 Zoundry 更了解社会主义特殊国情呀。照搬这个地址，那 ScribeFire 自然也可以药到病除了吧？

不过把这个地址填入 ScribeFire 以后，居然还是出错。我的 Blogger 博客名也是"雪庵"，而 ScribeFire 连接之后获取的却是"风愁予's Blogs"，这也太奇怪了。

继续深挖下去，发现地址还是错的。正确的地址应该是 `http://www.aeroom.info`，这是我闲置很久的一个域名，所以就给 Blogger 用了，但 ScribeFire 获取的地址却是：` http://www.blogger.com/profile/06238804575430062537`，所以 Zoundry 是怎么突破这些重重障碍获得正确信息的？

总结一下，ScribeFire 大概率是无辜的，但他们和我一样，错在对环境的复杂缺乏认识，对社会主义制度的优越性理解得不够透彻，所以还能怎么说呢？只能说 Zoundry 牛逼！
