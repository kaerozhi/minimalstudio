---
title: Astro 启动!
date: 2025-06-28T00:00:00.000Z
description: "本站又又又一次巨大改版！"
toc: true
featured: true
categories:
  - Sitelog
  - Coding
tags:
  - astro
  - node.js
photos:
  - https://media.kaerozhi.com/2025/07/6a5a19aba6e534907f36be1e24ea9868.webp
---
从 Wordpress 转到 Hexo 之后，至今已经两年多，本地写写 Markdown，生成静态文件再推送到 Github，流程非常简洁。但我的 Hexo 安装在黑群晖上，经常出现各种奇奇怪怪的问题，比如想升级到最新版没空间之类的，就算不是 Hexo 自身的原因，终究有一些恼人。

搜索解决方案时，偶然刷到这篇文章：[Hexo 的表演该落幕了，让它退场吧
](https://stblog.penclub.club/posts/removeHexo/)，虽然我对性能的要求不高，但还是受到了一些震动，于是一次波澜壮阔的~~冒险之旅~~瞎折腾又又又开启了！

## 快速安装 Astro

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

如果没有发生意外，按照提示，打开 `http://localhost:4321` 就可以预览你的 Astro 网站了，接下来略作修改，然后就可以写 Markdown 更新了。当然，如果你也生命不息折腾不止，那按照自己的想法肆意魔改就行了。

在这里需要提到的是，Astro 对主题的处理与 Wordpress、Hexo 天差地别，后两者都有文件夹专门放主题文件，换主题皮肤的时候网站结构是不变的。但 Astro 不一样，它没有主题的概念，也就是说，要换主题就会在 Astro 下面重新建一个新的子文件夹，然后再把 `/src/content/` 转移过去。哈哈，Wordpress 老用户估计挺难习惯的。

## 版面规划

![上一个版本](https://media.kaerozhi.com/2025/07/aa8038e12914f64d4453c1840094a126.webp)

与上一个版本相比，虽然也有另外的计划，但实施起来需要时间，暂且还是原版的样子，略作改动而已：

- **影像**  - 展示摄影作品，后续打算独立出来，毕竟 `waxa.pictures` 这个域名也不能浪费。但实施起来还需要时间，先做个简易版的放着。
- **设计** - 设计以后也计划独立出去，个人网站还是要简单克制一点。
- **游历** - 比较简单，稳定的图文输出。
- **文字** - 这几年不怎么写诗，位置只能继续往后挪，旧体诗可以作为传统竖排的试验田。
- **Blog** - 用心记录，提高产出。
- **关于** - 介绍自己，一直没有好好整理过，需要完善。
- **预约拍摄** - 新增的功能，打算把摄影作为一项业务来开展，未来和影像模块一起独立出去。

作为个人网站，还是过于芜杂了，克制！克制！[Anders Norén](https://andersnoren.se/) 是我很喜欢的 Wordpress 主题设计师，其个站朴实无华，非常耐看——但他的 logo 不太好，哈哈。

前两天找参考，还有一个网站令我印象深刻，[sanju.sh](https://www.sanju.sh/)，什么是真正的 Minimalism？设计师的网站做成这样不也挺好的吗？可惜我就是舍不得不放自己那几张破图。

另外 Hexo 主题计划整理一下，开源到 Github 上面，虽然流量小得可怜，但毕竟自己从开源社区获益良多，是时候回馈了。

## 主题与设计

刷了一圈，最后选择了 Lexington 的 [Minimal Studio](https://github.com/michael-andreuzza/microstudio) 作为自己的初始主题。精致，大字与细节的对比非常强。

![Minimal Studio 预览](https://media.kaerozhi.com/2025/07/cd1139ebfe95e32019db6a422685ae34.webp)

不过下载到本地之后才发现，这个主题就是个纯静态的单页展示，并不支持 Makrdown 的自动渲染，自然也无法作为 Blog 使用。犹豫了片刻，决定还是在此基础上手搓代码，自力更生，正好也试试 AI 辅助写代码威力几何——别说，真的太好用了！

顺便也更新了一下个人品牌的 logo 图形，之前的形状过于复杂，小尺寸下看起来非常不好，这次就走 Minimalism 路线了，由 ”Z“ 与 ”7” 组合而成。

![](https://media.kaerozhi.com/2025/07/0a48d79d30257f78a411d755cd9cde3f.webp)

每天手握 Nikon Z6 III 的我表示好像很面熟……

![Logo 的更新历史](https://media.kaerozhi.com/2025/07/b35078cbcef5b88687e3c06fb0f5552c.webp)

前两年因为合适的 logo， Hexo 导航栏上都直接摆上了 KZ 的字母缩写，现在好歹有个像模像样的图形，看起来舒服多了。

## 功能补完计划

Minimal Studio 除了一个设计框架，那真是一穷二白要啥没啥，只能白手起家。还好有万能的 ChatGPT，强大，宽容，即便是面对我这样的菜鸟，也从来没有表露出不耐烦的语气，永远专业且友善，以至于在它的强力辅助之下，感觉自己日益膨胀，脑子里满满都是自己编程很强的幻觉。来吧，区区 Astro 算什么？没有在下实现不了的奇思妙想！

以下是想实现的一些功能，进度随时更新，也有可能增加新的项目。

- [x] 配置文件，0629 完成
- [x] 动态路由，0706 完成
- [x] 分类，0708 完成，列表未分页
- [x] 标签，0708 完成，列表未分页
- [x] 相关文章，0706 完成
- [x] TOC，0707 完成
- [x] 给图片增加 figcaption，0706 完成
- [ ] 相册
- [x] 评论系统，0708 完成
- [ ] 搜索
- [x] RSS 订阅，0709 完成
- [ ] Dark Mode
- [ ] 尝试滚动动画
- [x] 豆瓣数据展示，因为豆瓣的反爬虫机制，目前还有一些问题，最后的解决方案是在抓取 RSS 数据不成功的时候随机展示一部备选电影，0708 更新。
- [x] Strava 骑行展示，0702 完成
- [ ] Spotify 音乐分享
- [ ] 小宇宙播客分享
- [x] Github Activity 分享，0709 完成
- [ ] 预约功能，感觉难度较大，不如做一个独立 App
- [ ] 首页信息完善
- [ ] 旧体诗竖排
- [ ] 影像重新排版
- [x] 设计作品重新排版，0709 完成
- [x] 部署到 Cloudflare Pages 不成功，跳船到 Vercel，0709 完成，已经将 https://kaerozhi.com 指向至本项目
- [ ] 移动端兼容性全面检查

看看七月底能不能全部完工，加油！

## 部署到网络

部署到网络需要提前安装适配器。注意，通常来说，Astro 只能部署到一个平台，如果配置的是 Cloudflare 的适配器，那在 Vercel 上是无法成功编译的，当然也有麻烦一点的办法可以解决这个问题。

Astro 提供了非常详细的部署指南：

- [部署你的 Astro 站点至 Cloudflare](https://docs.astro.build/zh-cn/guides/deploy/cloudflare/)
- [部署你的 Astro 站点至 Vercel](https://docs.astro.build/zh-cn/guides/deploy/vercel/)

我是按照以下步骤部署的：

1. 安装对应的适配器，此处以 Vercel 为例：
```bash
npx astro add vercel
```

   修改 `astro.config.mjs`，指定适配器：
   
```javascript
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
...
export default defineConfig({  
  output: 'server',
  adapter: vercel(),
  ...
});
```
    
2. 将代码推送到 Github。
    
3. 转到 Vercel 的项目管理界面，[导入你的项目](https://vercel.com/new) 至 Vercel。
    
4. Vercel 将自动检测 Astro 项目并自动为其配置正确的设置。
    
5. 部署完成！如果有独立域名，配置一下 DNS 替换 Vercel 的二级域名即可。

一开始我想部署到 Cloudflare，但折腾了很久都莫名其妙不成功，编译时间长达 20m+，最后一次显示部署成功了，然而打开还是报错 `ERROR 522`，实在是没有办法了，只好试试 Vercel，结果一次就成功了，编译只花了45s。

我能说什么呢？

## 一些要注意的点

成功部署到 Vercel 发现一些在本地预览时不会出现的小问题。

1. 用 `<img src="/assets/logo.svg" />` 形式引用的 SVG 文件，在 Vercel 上不能正常显示，还是得直接写入代码。
    
2. 在 `.astro` 文件中引用 CSS 文件，`<link rel="stylesheet" href="xxx.css" />` 是不会生效的，要 `import "@/styles/xxx.css"` 才行。
    
3. 我在 `/src/content/config.ts` 配置了所有的版面，然后通过`/src/pages/[collection]/index.astro` 读取这些版面并动态路由。然后单独设计了「[设计](/design)」版面的样式，单独写了 `/src/pages/design/index.astro` 接管这部分的动态路由。
   
   如此，在本地自然显示正常，因为单独配置的动态路由比 `[collection]` 的全局路由优先级更高。但部署至 Vercel 之后，发现全部版面都是通用样式，设计的单独样式并没有生效，只好在 `/src/pages/[collection]/index.astro` 手动删除了 `design`，不知道是怎么回事，回头有空再研究一下。