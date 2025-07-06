---
title: 黑群晖照片视频解码问题
date: 2024-07-29T08:10:00.000Z
categories:
  - 玩艺
tags:
  - 黑群晖
  - NAS
---
家里的服务器主系统是 Unraid，然后装了个黑群晖专门用来备份照片，毕竟群晖的 Synology Photos 还是好用的。前两天从震泽回来，发现陶小婧的 iPhone 备份的照片和视频都不能正常解码，点击时提示「由于正在进行索引或转换，因此无法显示文件」。

![索引报错](https://media.kaerozhi.com/2025/06/c9291eb212a7727cb035881ed709ac8c.webp)

看了一下系统消息，一切正常。最近也没有升级系统，真是奇哉怪也，只能找攻略重新捣鼓一遍了。

但 File Station 查看这些照片又是正常的，所以这是什么状况？想了半天，只能是 Synology Photos 开了自动更新，最新版本搞出来这些个新特性？

## 方案一： 打 AME 补丁包

AME 即 Advanced Media Extensions 的简称，按照张大妈上的[这篇攻略](https://post.smzdm.com/p/a7pw05r9/)，下载破解补丁。操作步骤如下：

1. 打开系统的「关于」窗口，确认 DSM 版本是 7.1，于是下载 [ame71-2004.py](http://code.imnks.com/ame3patch/ame71-2004.py "http://code.imnks.com/ame3patch/ame71-2004.py")；
2. 把 ame71-2004.py丢进黑群晖的某个文件夹；
3. 打开 Windows Terminal，运行命令：`ssh username@192.168.1.xxx`，输入密码登录；
4. 转至 ame71-2004.py 所在的文件夹，运行  `python ame71-2004.py`，然后弹出提示，Successful, updating codecs...，运行一段时间之后，弹出了 Done，似乎大功告成；
5. 打开 Synology Photos，进入人物界面，提示「还有 646 张照片待发现」，然后我就去准备晚餐了。

很不幸的是，等我吃完饭回来，提示的数字丝毫没变，感觉不妙。回到主界面，确实没有解决，只能换个思路了。

![AME 显示已经 HEVC 解码包已经支持](https://media.kaerozhi.com/2025/06/39cbf9a85a5e3aa3345a8dddc58adbf9.webp)

但很奇怪的是，打开 AME，HEVC 解码包的支持已经显示 ok 了，File Station 里面 .heic 图片也正常显示，不知道是怎么回事？难道是因为我的黑群晖不是半洗白？
