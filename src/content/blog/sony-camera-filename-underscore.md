---
title: SONY 相机文件名前缀的下划线
date: 2023-06-05T07:19:42.000Z
categories:
  - 玩艺
  - 器用
tags:
  - SONY
  - 相机
  - 文件名
---
我用 SONY 相机拍摄的照片，不知为何，文件名都有一条前缀的下划线，比如 `_DSC9527.jpg`。记得最早是没有的，但因为无伤大雅，就一直略过了。

最近改用 [Hexo](/playground/web/hexo-and-new-blog/)，前缀下划线 `_` 的文件，Hexo 默认是不处理的。这就导致了一个很尴尬的问题：直接把照片拖入 Obsidian 文档中，生成静态网页之后刷新却不显示。手动去除下划线，问题倒是暂时修复了，不过我还是想弄明白这其中的因果，毕竟照片那么多，也不可能每次都手动纠正。

一搜索，这个问题似乎确实微不足道，中文网络还不曾有人讨论过。改用英文搜索，很快就有了答案：原来因为把色彩空间设置成了 Adobe RGB。如果进入机身菜单，改回默认的 sRGB，下划线就会消失 [^1]。

[^1]: 原帖来自 [DPReview 论坛](https://www.dpreview.com/forums/thread/3976976) *（这么好的网站居然要 shut down 了，呜呼）*，答疑的大佬还给了 SONY 一个清白。因为这并非 SONY 一家的问题，DCF 就是这样规范的，而相机厂商都遵循相同的规范。因为我只有 SONY 的相机，所以无法验证别家的机器是否同样如此。有关 DCF 规范，详见 https://en.wikipedia.org/wiki/Design_rule_for_Camera_File_system

既然规范如此，我又不可能因此放弃 Adobe RGB，那岂不是无法可想，只能每次手动操作，任劳任怨？

其实也很简单，给文件批量重命名的方法有无数个，自选一种即可。之前给 Obsidian 安装过一个插件，叫做 [Custom Attachment Location](https://github.com/RainCat1998/obsidian-custom-attachment-location)，打开插件设置界面，将 `Automatically rename attachment files` 选项打开。这样每次把照片插入 Obsidian 时，插件就会按照时间码自动将其重命名。

之前因为命名规则太少，只有时间码和文件名两个参数可用，我嫌它不够灵活就没有考虑启用，没想到有些缘分终究逃不掉。

搞定收工。
