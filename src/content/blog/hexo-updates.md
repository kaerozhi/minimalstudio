---
title: Hexo 后续补充
date: 2023-05-28T13:36:07.000Z
categories:
  - 玩艺
  - 网站
tags:
  - Hexo
  - Hexo Plugins
  - Markdown
photos:
  - 'https://media.kaerozhi.com/2025/06/08caf22b46ea32b42f97306d9331a4c8.webp'
---
<div class="foreword">
Hexo 用了两天，基本功能差不多弄清楚了。不过也发现一些问题，逐个记录，分享出来，没准能对 Hexo 的其他用户提供一些帮助。
</div>

<!-- more -->

## Markdown 支持

Hexo 对 Markdown 语法的支持尚不完备，比如将内容标记为高亮： `==highlight==`， Obsidian 已经支持，但 Hexo 尚未跟进。类似的还有 footnote，目前只能通过插件搞定。

### footnote 脚注

对一个业余文字爱好者来说，注释是免不了要加的。[hexo-footnotes](https://github.com/LouisBarranqueiro/hexo-footnotes)  可以为 Hexo 用户提供额外的 footnote 语法支持，直接命令行安装：
```
npm install hexo-footnotes --save
```
安装之后 Hexo 一般可以自动识别，此时在 Markdown 文件中添加注释即可。如果不能识别，则需要在 `_config.yml` 内手动配置：
```
plugins:
  - hexo-footnotes
```

footnote 的语法请自行搜索。个人体验下来，目前还有两个问题尚待解决：

1. ~~如果一条注释包含多个段落，则只有第一个段落会被识别，不知如何指定脚注的起讫范围？~~ 后续段落可以通过缩进来声明脚注的起讫，但仍然有个问题。第一段是纯文本，而后续段落都是 `<p>...</p>` 标签，导致第一段与第二段之间缺少段间距。
2. ~~不知是否与主题 css 存在冲突，脚注序号、内容与返回按钮分成了三行。~~此问题已经解决，办法是修改 `/Hexo/node_modules/hexo-footnotes/src/footnotes.js`，搜索 `display: inline-block;`，删除第二个结果。
3. 脚注的标记不支持中文，`[^1]` 正常，`[^注一]` 则不正常。

最终效果可以参考这篇文章：[鲁迅照片集](/writings/research/photos-of-luxun)

### Markdown 与 HTML 标签混用



## 内容嵌入

### Youtube 视频

Wordpress 里面插入 Youtube 视频很简单，网址粘贴进去，自动转换成视频播放界面。与之相比，Obsidian 还能找到 [Simple Embeds](https://github.com/samwarnick/obsidian-simple-embeds) 这样的插件，Hexo 简直太不方便了，反正我不怎么想在 Markdown 里面写这样的标签：
```
{% youtube video_id [type] [cookie] %}
```
作为互联网的老用户，平台或者软件搞私有标准的危害，我们可是太有体会了。还是希望 Hexo 能在 Markdown 通行标准的基础上发展，不要强推这种换个软件就无法识别的标签。

## 子页面

发现一个奇怪现象：[关于](/about/) 页面本来正常，但我想在这个页面下面再挂一份简历，计划的路径是 `/about/resume`。Hexo 官方没有子页面的信息，所以我就直接在 source 文件夹建了一个 `about` 子文件夹，然后在里面新增了一个 `resume.md`。没想到生成之后，这个简历倒是没有问题，主菜单点击关于页面报 403 错误了，令人一头雾水。

当然解决办法还是有的，将 `about.md` 移到 `about` 文件夹，并重命名为 `index.md`，虽然生成网页之后实际路径其实从 `/about.html` 变成了 `/about/index.html`，但这样一来，按照之前的路径访问就没有问题了。
