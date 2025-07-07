---
title: Astro 启动全记录
date: 2025-06-28T00:00:00.000Z
categories:
  - Sitelog
  - Coding
tags:
  - astro
---
从 Wordpress 转到 Hexo 之后，至今已经两年多，本地写写 Markdown，生成静态文件再推送到 Github，流程非常简洁。但我的 Hexo 安装在黑群晖上，经常出现各种奇奇怪怪的问题，比如想升级到最新版没空间之类的，就算不是 Hexo 自身的原因，终究有一些恼人。

搜索解决方案时，偶然刷到这篇文章：[Hexo 的表演该落幕了，让它退场吧
](https://stblog.penclub.club/posts/removeHexo/)，虽然我对性能的要求不高，但还是受到了一些震动，于是一次波澜壮阔的~~冒险之旅~~瞎折腾又又又开启了！

## Astro 的基本安装

Astro 官方有非常详尽的[新手教程](https://docs.astro.build/zh-cn/tutorial/0-introduction/)，如果愿意深入了解 Astro，也有学习时间，建议按照步骤操作一遍。

以下是个人超级简化版，我的操作系统是 Windows 11。

首先确认系统已经安装 Node.js 和 GIT，最好把 VS Code 也装了。[Node.js](https://nodejs.org/zh-cn) 和 [GIT](https://git-scm.com/) 的安装流程都可以参照菜鸟教程：

- [Node.js 安装配置](https://www.runoob.com/nodejs/nodejs-install-setup.html)
- [Git 安装配置](https://www.runoob.com/git/git-install-setup.html)

确保准备工作已经完成，接下来建立一个 Astro 专用的文件夹，我们这里就命名为 Astro 好了，默认放在 C 盘之外的硬盘中。

进入这个 Astro 文件夹，右键菜单选择「在终端中打开」，输入命令：

```bash
npm create astro@latest
```

此时好像什么都没有发生，不要急，接着输入命令：

```bash
git clone https://github.com/michael-andreuzza/microblog.git
```

该命令会下载 [Lexington Themes](https://lexingtonthemes.com/) 设计的一个免费主题 [Micro Blog](https://microblog.lexingtonthemes.com/)（*你可以点击前面的链接预览其效果*）。当然你也可以从以下两个渠道下载你喜欢的任意主题：

- [Astro Theme 官方主题站](https://astro.build/themes/1/)，记得勾选 Pricing 中的 Free，然后点击「View results」，新手上路当然只看免费；
- Github 搜索 [Astro Theme](https://github.com/search?q=astro%20theme&type=repositories)；

主题下载完成之后，在终端中运行 `cd microblog` 进入对应文件夹，接着输入初始化命令：

```bash
npm install
```

Node.js 会自动下载此主题的相关依赖包，等全部下载完之后，万事俱备，只需一条命令：

```bash
npm run dev
```

如果没有发生意外，按照提示，打开 `http://localhost:4321` 就可以预览你的 Astro 网站了，接下来按照自己的想法肆意折腾就行了。

在这里需要提到的是，Astro 对主题的处理与 Wordpress、Hexo 天差地别，后两者都有文件夹专门放主题文件，换主题皮肤的时候网站结构是不变的。但 Astro 不一样，它没有主题的概念，也就是说，要换主题就会在 Astro 下面重新建一个新的子文件夹，然后再把 `/src/content/` 转移过去。哈哈，这个 Wordpress 老用户估计挺难习惯的。

## 选择主题

## 版面规划

## 手搓代码

### site.config.ts

### 动态路由

### 分类与标签页面

### 相关文章

### TOC

### 自动相册

### CSS 优化

### 其他功能

