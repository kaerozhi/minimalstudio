---
title: Astro 启动全记录
date: 2025-06-28T00:00:00.000Z
description: "你走上了歧途，白费周章永远没有结果！"
toc: true
categories:
  - Sitelog
  - Coding
tags:
  - astro
  - node.js
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

### 配置文件
从 Wordpress 时代养成的好习惯，万物之先，先建立网站的基本配置文件，避免高频信息反复修改。

Astro 有几个配置文件需要注意。

系统根目录下有 `astro.config.mjs`，主要用于管理插件。

然后是必要但系统并不默认生成的两个配置文件，一般会在 `/src/` 目录下新建 `site.config`，这个文件用于管理网站的基本信息，主要包括：

- 网站的基本信息：网站名称，Slogan，url / favicon / logo 等；
- SEO 相关信息：description / keywords / og:image 等；
- 网站的导航配置：以及社交网站的链接。如果有友情链接的需要，也可以在这里配置；
- 功能开关：列表页文章数 / 是否打开 TOC、评论系统、内置相册等等，根据自己的需要来。

Astro 的 Markdown 文件一般放在 `/src/content/` 目录下，我们需要在此新建 `config.ts` 来配置 collection，这个文件范例如下：

```javascript
import { defineCollection, z } from 'astro:content';

// 定义 'blog' 内容集合
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(128), // 标题，最长128字符
    date: z.date(), // 日期，注意格式
    description: z.string().max(256).optional(), // 描述，最长256字符，可选
    author: z.string().default('Kaero Zhi'), // 作者，默认值为 '匿名作者'
    tags: z.array(z.string()).default([]), // 标签数组，默认为空数组
    categories: z.array(z.string()).default([]), // 分类数组，默认为空数组
    photos: z.array(z.string()).optional(), // 图片路径数组，可选
    draft: z.boolean().default(false), // 是否为草稿，默认为 false
    featured: z.boolean().default(false), // 是否为精选，默认为 false
    toc: z.boolean().default(false), // 是否打开目录，默认为 false
  }),
});

// 导出所有内容集合
export const collections = { blog };
```

正常配置 blog 一个 collection 足矣，不太正常的人会配置五六七八个，自行复制修改即可。

### 动态路由

### 分类与标签页面

### 相关文章

### TOC

### 给图片增加 figcaption

我们写 Markdown 的时候，插入图片一般是这样的：

```markdown
![这是一张图片](/assets/a-photo.jpg)
```

但 Astro 默认渲染内容时，「这是一张图片」只是图片的 `alt` 属性，屏幕上并不显示。如果希望它作为 `<figcaption>` 出现在图片下方，渲染为：

```html
<figure>
  <img src="/assets/a-photo.jpg" alt="这是一张图片" />
  <figcaption>这是一张图片</figcaption>
</figure>
```

那我们就需要用到 rehype-figure 插件。首先安装该插件：

```bash
npm install rehype-figure
```

然后在 `astro.config.mjs` 中配置 `rehype-figure`，改动请参考：

```js
import { defineConfig } from 'astro/config';
import rehypeFigure from 'rehype-figure';

export default defineConfig({
  markdown: {
    rehypePlugins: [
      [rehypeFigure, { className: 'my-figure', figcaption: true }]
    ]
  }
});
```

代码中可以修改的配置：

- `className`: 给 `<figure>` 添加 CSS 类名，目前是 `my-figure`，之后就可以按照类名自行修改 CSS 的样式了；
- `figcaption: true`: 自动将 `alt` 转为 `<figcaption>`。

重启 Astro 就可以看到效果了。

### 相册

### 评论系统

参考：[为你的 Astro 博客添加评论功能](https://liruifengv.com/posts/add-comments-to-astro/)

### Dark Mode

### CSS Tricks

### 其他功能

## 推送

## 总结

