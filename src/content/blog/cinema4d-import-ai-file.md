---
title: "Cinema 4D 导入 .ai 文件"
date: "2019-03-13 21:00:53"
layout: 
categories: 
  - "玩艺"
  - 软件
tags: 
  - cinema 4D
description: ""
photos:
  - https://media.kaerozhi.com/2025/06/1d63cc3b071384afdc51f541f9bf0e30.webp
---
## 导入之前的准备工作

首先请注意，`.ai` 文件的版本必须另存为 Illustrator 8，这是 C4D 唯一能读取的版本，其他版本皆不能正常导入。

文件内的路径最好在 Illustrator 内就整理妥当，该合并的形状合并，该分离的形状分离，C4D 也能处理形状，但效率就低太多了。

另外，复合形状导入到 C4D 内并不好用，大部分情况下，将形状扩展是更好的选择。  

英文版通过主菜单 `File > Merge` 导入 `.ai` 文件，中文版对应的路径是文件 > 合并。注意，不是导入，是合并。初学者难免跟我一样摸不着头脑找不到门径，各大软件厂商的翻译习惯没有统一标准，习惯之后便好了。

导入的设置可以再研究一下，第一次姑且按照默认设置继续下一步。

## CV-ArtSmart  

推荐一个非常好用的插件，[**CV-ArtSmart Object**](https://www.cineversity.com/vidplaylist/cv-artsmart/artsmart_download) ，可以自动识别、分离 AI 文件内的形状，并且保持形状的颜色，超省事的。另外请注意，这个插件虽然下载免费，但需要先注册一个帐号。

### 手动安装方法

主菜单 `编辑 > 设置`，找到对话框左下方的“打开配置文件夹”，在配置文件夹内找到 plugins 文件夹，将下载到的文件解压缩之后拷贝到该文件夹内，重启 C4D 即可使用。
