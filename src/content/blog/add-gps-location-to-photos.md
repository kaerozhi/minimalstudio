---
title: 给照片添加 GPS 信息
date: 2024-04-30T00:00:00.000Z
categories:
  - 摄影
  - 软件
tags:
  - Lightroom
  - GPS
description: 让阉割的 GPS 信息重回相机！
---
现在大多数的照片管理 App，都有根据位置自动归类的功能。最近启用的 Immich 就是如此，简单直观，尤其是出门旅游的照片，去过哪里拍过哪些，打开地图一目了然。

![Immich 的地图功能](https://media.kaerozhi.com/2025/06/540ee075ba3d118ab6280d863367ac41.png)

然而奇怪的是，在手机拍照如此便捷的当下，相机的 GPS 功能仍然被各种限制，有 GPS 记录功能的机型寥寥无几。上面地图里的数据，绝大部分来自手机，小部分出于 GoPro 和无人机，这些年用相机拍过的照片大概有十万张上下，只是很遗憾，没一张出现在这里。

对于咱们这样的收纳强迫症来说，每次打开这个功能都会觉得很难接受，难道就没有办法可以解决？

做完功课之后，发现基本上有这么几种玩法：

## 一、外接 GPS 设备

尼康在单反时代推出过外接的 GPS 模块，型号有 GP-1、GP-1a 等等，基本上都停产了，淘宝或者闲鱼上仍然可以搜索到相关的二手信息，售价300至600不等。按照我搜索到的资料，尼康无反 Z 系列是可以兼容这些老设备的。

![来自 DPReview 论坛的[帖子](https://www.dpreview.com/forums/thread/4552793)](https://media.kaerozhi.com/2025/06/7de48698771e197953aea4f2b43106ae.png)


然而遗憾的是，因为国内相关法规的限制，尼康单反全系列都屏蔽了 GPS 功能，即使外接 GPS 模块仍然无法使用，需要刷机才能解锁。至于 Z 系列无反相机，还不能确定是否采用了相同的屏蔽策略。如果你买的是港行或者日行，没准可以收一个来试试，但外接模块需要占用冷靴接口也是要考虑的一个因素。

## 二、App 同步 GPS 信息

现在主流的玩法是 App 同步 GPS 信息，各家的操作大同小异，此处以尼康 Z63 配合尼康官方的 Snapbridge 为例。尼康官方有相关的[帮助文档](https://nikonimglib.com/snbr/onlinehelp/cn/bluetooth_pairing_4.html)，但 Snapbridge 版本有点老，跟新版长得有点不一样，还是得自己走一遍操作流程。

首先手机上安装 SnapBridge，打开 App，默认界面长这样：

![SnapBridge 默认界面](https://media.kaerozhi.com/2025/06/947e59e572f6e2ab1916b3588d54d37a.png)

然后点击中间的「连接至照相机」，选择自己的相机型号：

![选择对应机型](https://media.kaerozhi.com/2025/06/daf53c76e92d1c67b271162475b3251d.png)

连接类型选蓝牙：

![选择配对 (Bluetooth)](https://media.kaerozhi.com/2025/06/682642a2a6d09fb6e2daad8d6571cde4.png)

同时打开相机，进入相机的蓝牙配对界面：

![网络菜单 > 连接至智能设备](https://media.kaerozhi.com/2025/06/592658003e7d765fe021914ba94bb898.png)

![同样选择「配对 (Bluetooth)」](https://media.kaerozhi.com/2025/06/5306733da275bc41a3a44dd5875c9978.jpeg)

然后 Snapbridge 会搜索到你的相机：

![我的相机是 Z63](https://media.kaerozhi.com/2025/06/bd2d246f2048b82cca736e5852c3cdff.png)

同时在相机和 Snapbridge 上确认，开始配对：

![正在配对](https://media.kaerozhi.com/2025/06/5755948eb29bed28aad014f78925a77e.png)

配对完成之后，界面是这样的：

![默认界面出现相机](https://media.kaerozhi.com/2025/06/5755948eb29bed28aad014f78925a77e.png)

点击右上角的小齿轮，出现弹出界面：

![](https://media.kaerozhi.com/2025/06/c40c916f52b2e838aaffd9815b87c323.png)

选择「下载位置数据」，搞定。尝试拍一张照片，地图位置信息就出现了！

需要注意的是，如果你的手机开了 VPN，蓝牙大概率会连不上，关掉 VPN 即可。

另外，此处的「下载位置数据」大概是一次性的，也就是说如果你拍完还要去下一个地方——旅游几乎都是这种移动的状况，记得在新地点重新下载位置数据。但没有养成习惯的话很容易忘记，所以我们还有更方便的第三种办法。

## 三、导出 GPX 数据后用 Lightroom 插件同步

这里介绍一个 Lightroom 插件：[Jeffrey’s “Geoencoding Support” Plugin for Lightroom](https://regex.info/blog/lightroom-goodies/gps)，虽然这个插件不提供中文，但操作很简单，基本不需要汉化包，千万不要产生任何畏难心理。

### 安装插件

首先点击插件页面右侧的 「Quick Links」，选择 Latest Download 下面的 zip 压缩包：

![点击「gps-20250122.361.zip」开始下载](https://media.kaerozhi.com/2025/06/c28b39cd324ec35c207d20b0048c08b4.png)

下载完成之后解压缩，得到名为「gps-jfriedl.lrplugin」的文件夹。打开 Lightroom，选择主菜单「文件 > 增效工具管理器」：

![Lightroom 增效工具管理器](https://media.kaerozhi.com/2025/06/15eea746d8b4b44817094ec485985456.png)

点击左下角的「添加」，找到之前下载的「gps-jfriedl.lrplugin」文件夹：

![](https://media.kaerozhi.com/2025/06/505ef095bca641f52fe2ce0bf25380b5.png)

点击「选择文件夹」，插件就安装好了。

### 通过插件给照片写入 GPS 信息

通过主菜单的「文件」，然后选择「增效工具额外信息」，点击「Geoencode」：

![打开 Geoencode](https://media.kaerozhi.com/2025/06/e178daef6696c85544da0f4a6cfbbaf9.png)

打开插件主界面，点击界面中的「Browse」，找到对应的数据文件（通常是 .GPX 格式），然后点击界面下方的「Geoencode Image」，即可完成 GPS 信息的写入。

![插件主界面](https://media.kaerozhi.com/2025/06/caaa6243ba3446842cee0d756876f1d3.png)

### 获取 GPX 数据

关键的来了，此处插件所需的 GPX 文件是什么？查网络可知：

> GPX（英语：GPS eXchange Format，GPS交换格式）**是一个XML格式，为应用软件设计的通用GPS数据格式**。 它可以用来描述路点、轨迹、路程。 这个格式是免费的，可以在不需要付任何许可费用的前提下使用。 它的标签保存位置，海拔和时间，可以用来在不同的GPS设备和软件之间交换数据。

那么该如何获取呢？

#### 手机上安装 GPS 记录软件

在手机上安装相关软件是最简单的，比如我用的是安卓手机，安装了「Geo Tracker」：

![Google Play 上的 Geo Tracker](https://media.kaerozhi.com/2025/06/d9d181dff16705f027a1b253091c1bc9.png)

早上出门，打开界面，点击右下角的红色按钮，开始记录行走轨迹：

![点击右下方的红色按钮](https://media.kaerozhi.com/2025/06/20416553b2025bf5a4485e93a02c360f.png)

回家后再点一下，就停止记录，GPX 数据文件也准备好了，把 GPX 文件分享到电脑上，就能在插件里面使用了。

此 App 在苹果的 App Store 里面也有提供，直接搜索即可，反而是我的 Vivo 应用商店里找不到，需要大家自行获取，或者找同类软件平替。

另外记得给此类 App 开通后台权限，否则进程被系统误杀就尴尬了。

#### 智能手表

手机给 App 开后台，首先有电池焦虑，其次可能会被系统误杀，如果你有智能手表的话，那还有另外一种方式。

以我的 Amazfit GTR 4 为例，出门选择「健走」，然后开始记录，到家打开 Zepp，选择「运动」，即可找到之前的记录：

![Zepp 的运动记录页面](https://media.kaerozhi.com/2025/06/c4542c6991cd6dbddf619282588e2494.png)

点击进入运动记录：

![运动记录内页](https://media.kaerozhi.com/2025/06/e47e5c22966712205cf68ab9eb55defb.png)

点击右上角的三个点，选择「导出数据」：

![选择「导出数据」](https://media.kaerozhi.com/2025/06/dcc72d3740c180e9bfcc06fc0da0fde7.png)

选择「GPX格式」，就能得到对应的 GPX 文件。

![选择 GPX 格式](https://media.kaerozhi.com/2025/06/b1ea2e5c914ede17ba85397d92bbdf37.png)

最后导入 Lightroom 通过插件写入到照片中就搞定了。

大部分的智能手表应该都具备类似的导出数据功能，大家研究一下应该都能搞定，只不过 Vivo Watch 除外。这种方式应该比手机更方便，稳定可靠还省电，甚至在手机没电的情况下仍可记录，相对来说比较完美了。
