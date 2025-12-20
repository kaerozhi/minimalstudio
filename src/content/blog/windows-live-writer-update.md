---
title: Windows Live Writer 更新
date: "2007-08-04"
categories:
  - 软件
tags:
  - Windows Live Writer
  - Blog Tools
---

在使用过程中，又发现 Windows Live Writer 的更多新功能。

![Windows Live Writer](https://media.kaerozhi.com/2025/06/8db9801a3dfe34e3d48738089da5f17e.webp)

[Blogger](http://www.blogger.com "Blogger")不支持图片上传，Live Writer 会提醒你是否要配置一个FTP服务器，与[Zoundry](http://cn.zoundry.com/ "非常不错的Blog离线发布工具")、[ScribeFire](http://www.scribefire.com/ "Firefox的Blog发布扩展，前身是PerFormancing")多个 Blog 共用一个 FTP 账号不同，Live Writer 允许你为每个 Blog 配置不同的FTP，自由度大了很多。

虽然大多数人可能都只有一个FTP账号，但凡事总有例外。之前在数据引擎买了一个 ASP 空间，装上了 [PJBlog](http://www.pjhome.net "国内比较流行的ASP Blog程序")；然后又眼馋 Dreamhost 的巨大空间，去年也下手一份，安装了 Lifetype。所以我既不想把PJBlog 的图传到 Dreamhost 服务器，也不想把 Lifetype 的图传到数据引擎的服务器。况且共用一个 FTP 的话，如果一个服务器出问题，两个 Blog 的图片都得变大红叉。

Live Writer 会自行判断 Blog 是否支持 API 上传，不过 PJBlog 上传失败，不知道 Lifetype 如何。对 Live Space 的支持自然是最完善的，Zoundry、ScribeFire 都没办法向 Live Space 上传图片，Live Writer 表示毫无压力。但因为 Live Space 本身的限制，大图会自动压缩到 600px 以内。

在图片处理方面 ，Live Writer 提供一些了一些常用功能，比如加边框，调整图片的尺寸和亮度，简单易用，是体验加分的地方。

不过与 Lifetype 还存在兼容性问题。Lifetype 最大的特色是账号多开，Zoundry、ScribeFire 和 Contribute CS3 都可以一次性添加账号所属的多个 Blog，Live Writer 虽然能识别，但不能复选，必须逐个手动添加。我雄心勃勃地在 Lifetype 里面建了七个 Blog，于是就重复操作了七次，囧rz

还有链接词汇表这个功能，我本以为会像 PJBlog 那样自动识别，没想到还是半手动的操作，只不过会帮你自动填入参数。虽然比纯手动有所提升，但总是嫌它麻烦。

最后还需要测试的是：能否完美支持 Lifetype 的上传？
