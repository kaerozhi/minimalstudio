---
title: "Hexo 新主题：基于 Acorn 定制"
date: 2023-07-13 19:30
layout: 
categories: 
  - "玩艺"
  - "网站"
tags: 
  - "Hexo"
  - Theme
  - Acorn
  - "Web Development"
description: "更丰富的展示模块，更深度的细节定制。"
toc: true
photos:
  - https://media.kaerozhi.com/2025/06/89af8961b5a74090bf343f7806531ad6.webp
---
<div class="foreword">

离职以后，一直忙于搬家和新房装修，两头奔走，除了前期试水之外，后面就没找过工作。其实心里也早就做好了打算，一把年纪了，再去跟年轻人卷实在力有未逮，索性安定下来就转型自由设计师。

不过网站不能再和以前一样简简单单写博客，现在得展示更多的专业能力。出于这样的动机，去 [Hexo 官方主题站](https://hexo.io/themes/)里翻检了几遍，发现 [Acorn](https://acorn.imaging.xin/) 还挺合适的，下载到本地试着配置了一下，立马有改头换面的感觉，于是开始定制细节。

</div>
<!-- more -->

## 关于 Acorn

关于 Acorn 主题，官方是这样介绍的：

> Acorn 是一“颗”免费且开源的 [Hexo](https://hexo.io/) 主题，可适用于中小型企业门户或工作室等展示类网站的简单建设。如果你对 Hexo 基本操作已经很熟悉了，那么本文将会辅助你轻松使用 Acorn 主题搭建自己的网站， 亦或者你可以先阅读一下 [Hexo 文档](https://hexo.io/zh-cn/docs/)。
> 
> Acorn 未使用任何前端框架，所以优秀的小盆友们可以任意发挥，突破自我。

虽然确实没有用框架，但 Stylus 比 CSS 门槛还是高出那么一点点……

![Acorn 官方网站](https://media.kaerozhi.com/2025/06/b611990b326126fc01b5f5b7281dd131.webp)

因为设计的目标就是企业建站，所以 Acorn 的定制性基本满足需求。需要强调的是：**安装完之后，一定要立刻下载[配套数据包](https://github.com/zhwangart/acorn-sample-data)，光看文档是没办法顺利上手的。**

不过还是得吐槽，官方文档并不是特别完备，比如内置的几个插件，Swiper / TocBot 应该如何配置，「吃瓜妹子」绝对是毫无头绪的。即便是稍微进阶一点的用户如我，没有文档也需要研究很久。

## 修改列表样式

基本的字体和配色就略过了，根据个人喜好来就行。

![Acorn 原生的文章列表](https://media.kaerozhi.com/2025/06/0929bd2c8531a50272e03082880aaaab.webp)

Acorn 默认的图文列表中规中矩，效果尚可，但标题和正文会按照限定的行数自动裁切，我不太喜欢这样把文字切得细碎的处理方式，主题都交代不完整，所以就做了改动：把正文去掉，保留标题，标题最多容纳三行文字，除了特别长的英文标题，基本上都能正常显示。

图文列表的模板是 `/themes/acorn/layout/partial/archive-post.ejs`，打开源文件：

~~~ javascript
<div class="col-3">
  <article class="archive-article archive-type-<%= post.layout %>">
    <div class="card rounded">
      <%- partial('post/gallery') %> // 预览图
      <div class="card-body bg-light">
        <%- partial('post/title', {class_name: 'article-title mb-0 line-clamp line-clamp-1'}) %> // 标题，line-clamp-1 用 CSS 限定行数为 1
        <%- partial('post/date', {class_name: 'article-date', date_format: null}) %> // 日期
        <div class="card-text mt-3 line-clamp line-clamp-2"><%- post.excerpt %></div> // 正文摘抄，line-clamp-2 限定行数为 2
        <hr class="hr">
        <% if (theme.excerpt_link){ %> // 阅读更多的链接
        <div class="article-more-link">
          <a href="<%- url_for(post.path) %>#more"><%= theme.excerpt_link %></a>
        </div>
        <% } %>
      </div>
    </div>
  </article>
</div>
~~~

把横线、裁切过的正文和「阅读更多」的链接统统删除，在标题上面增加分类，调整过的代码如下：

~~~ javascript
<div class="col-3">
  <article class="archive-article archive-type-<%= post.layout %>">
    <div class="card rounded">
      <%- partial('post/gallery') %>
      <div class="card-body bg-light">
        <%- partial('post/category', {class_name: 'mb-1'}) %> // 增加分类
        <%- partial('post/title', {class_name: 'article-title mb-1 line-clamp line-clamp-3'}) %> // CSS 类改为 line-clamp-3，扩展为三行
        <%- partial('post/date', {class_name: 'article-date', date_format: null}) %> // 保留日期，其他删除
      </div>
    </div>
  </article>
</div>
~~~

修改之后的列表是这样的：

![修改后的列表](https://media.kaerozhi.com/2025/06/bebe06d3864202fa75a475960d100240.webp)

个人觉得清爽了不少。

此外还有一个问题，配置好 Acorn 之后，Archives 每页显示 10 篇文章，这个问题不大，但不知为何首页同样显示 10 篇，而不是我想要的 4 篇。在主题文件夹研究了半天，没找到线索，最后才发现这个是由 Hexo 的 `config.yml` 全局控制的：

~~~ yml
...
index_generator:
  path: ''
  per_page: 10
  order_by: '-date'
...
per_page: 10
...
~~~

`index_generator` 下面的 `per_page` 控制首页显示的条数，首页要显示一行四条，把 10 改成 4 即可，如果想显示两行，则可以改成 8。另外一个 `per_page` 则控制列表页每页显示的条数，我直接改成了 20。

## 默认预览图

之前的文章大部分没有配置预览图，没预览图的条目比有图的低一半左右，这样的列表页肯定不怎么好看。

![有预览图和没预览图的排在一行，低低高高，不太好看。](https://media.kaerozhi.com/2025/06/c2fb634fdf3830c6ac212b0646656abd.webp)

我们先准备好一张图，可以命名为 `post-preview.png`，丢在 `/source/images/` 文件夹里。此时有两种思路，其一是修改 `/themes/acorn/layout/partial/post/gallery.ejs`，这样不管是列表还是文章页，只要没有预览图，都会显示我们前面准备的这张  `post-preview.png`。但个人以为，列表页必须兼顾表现的一致性，才需要默认的预览图补位，但文章页搭配这张图没有多大意义，徒然浪费空间。

所以不如换另外一个思路，只改列表页就好，顺藤摸瓜，还是找到 `/themes/acorn/layout/partial/archive-post.ejs`，将 `<%- partial('post/gallery') %>` 替换为以下代码：

~~~ javascript
<% if (post.photos && post.photos.length){ %> // 如果配置了预览图就正常显示
  <%- partial('post/gallery') %>
<% } else {%>  // 如果没有，则显示 post-preview.png    
  <a class="card-img-link" href="<%- url_for(post.path) %>" rel="gallery_<%= post._id %>">
    <img class="card-img lazyload" data-src="/images/post-preview.png" itemprop="image" alt="gallery">
  </a>
<% } %>
~~~

测试之后发现没问题，搞定。

## 控制预览图比例

现在列表里的预览图都有了，但问题还在：Acorn 默认是不管你配置的是怎样的预览图，它都给你原样显示出来。但这些图的比例可能参差不齐，有纵向的，有横向的，有 4:3 的，有 16:9 的，没准还有正方形 1:1 的，所以我们得控制一下图片的比例。

这个倒是比较简单，不需要改模板，只要改 CSS 文件就好。打开 `/themes/acorn/source/css/_partial/archive.styl`，在 `.archives-wrap` 下面增加以下代码：

~~~ css
  .archives
    .row
      .card-img-link
        display: flex
        width: 100%
        aspect-ratio: 16 / 9 // 指定比例为 16:9
        overflow: hidden // 超过的部分不可见
        align-items: center // 纵向居中
        .card-img
          width: 100%
~~~

## 列表的节奏变化

现在图文列表显示都正常了，但还比较单调，我希望能有一点节奏变化。

一开始的思路是在 CSS 里面按照 `nth-child[]`来调整不同的样式，但尝试了一下，发现成本极高，因为要适配不同的屏幕尺寸。

然后就尝试在模板文件里加一个前置判断，原本所有的列表项，其类别都是统一的 `col-3`，调整之后，根据排序的不同，第一个的类别改成 `col-12`，第二至第五改成 `col-6`。这些类别 Acorn 已经做好了屏幕适配，不存在兼容性问题。

加判断虽然简单，但这个序号要如何取得？研究了老半天，最后发现只要调用模板的时候传递一个变量即可。在 `/themes/acorn/layout/_partial/archive.ejs` 找到这一行：

~~~ javascript
<%- partial('archive-post', {post: post, even: i % 2 == 0}) %>
~~~

增加一个变量 `orderid`，值等于 Query 循环里面的 i：

~~~ javascript
<%- partial('archive-post', {post: post, even: i % 2 == 0, orderid: i}) %>
~~~

然后再次打开 `/themes/acorn/layout/partial/archive-post.ejs`，将里面的 `<div class="col-3">`替换为：

~~~ html
<% if (is_home()){%> // 首页都是统一的小号样式
<div class="col-3">
<% } else { %>
  <% if ( orderid == 0){%> // 第一个大号
<div class="col-12">
  <% } else if ( orderid > 0 && orderid < 5){ %> // 二至四中号
<div class="col-6">
  <% } else { %> // 其他仍然小号
<div class="col-3">
  <% } %>
<% } %>
~~~

列表就变成现在的样子了，撒花~

当然这个结果并不完美，因为现在的列表会根据年份断开，导致 `col-6` 后面紧跟两个 `col-3`，还是不整齐，太纠结了。

## 启用 Tocbot

![Acorn 文档页面的目录](https://media.kaerozhi.com/2025/06/ee9ccacd71fe55b30b4189d284e91bbb.webp)

Acorn 内置了 [Tocbot](https://tscanlin.github.io/tocbot/)，技术文档也是有目录的，但本地如何启用？在 `/themes/acorn/_config.yml` 设置好 `toc: true`，发现没有效果。但也没有与之对应的模板，所以到底该怎么办呢？

打开 `/themes/acorn/layout/_partial/after-footer.ejs`，发现 tocbot 的相关代码确实已经加载好了：

~~~ javascript
<% if (theme.toc){ %>
	<script src="<%- url_for(theme.libs.tocbot) %>"></script>
	<script>
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: '.js-toc',
      // Where to grab the headings to build the table of contents.
      contentSelector: '.js-toc-content',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h2, h3',
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
    });
	</script>
<% } %>
~~~

对应的两个类分别是：`.js-toc` 用于挂载目录，`.js-toc-content` 则是需要生成目录的内容。我们试着将这两个类添加到 `/themes/acorn/layout/_partial/article.ejs`，找到这一行：

~~~ html
<div class="article-entry" itemprop="articleBody">
~~~

将它修改为：

~~~ html
<nav class="js-toc"></nav>
<div class="article-entry js-toc-content" itemprop="articleBody">
~~~

刷新，目录果然出现了。

当然，除非像本文一样啰嗦，大部分的文章篇幅都不长，并不需要目录，所以我们可以给目录设置一个开关。将上面的代码扩充一下，加一个判断：

~~~ html
    <% if ( post.toc == true){ %>
    <nav class="js-toc"></nav>
    <div class="article-entry js-toc-content" itemprop="articleBody">
    <% } else { %>
    <div class="article-entry" itemprop="articleBody">
    <% } %>
~~~

这样一来，默认不生成目录，但可以通过文章前面的 Front Matter 里加上一行 `toc: true` 手动加载，完美。

## 启用 Swiper

[Swiper](https://swiperjs.com/) 也是 Acorn 内置的组件，但既然官方没有说明怎么用，那就只能自力更生去查文档。

按照 Swiper 首页的范例，以下是最简单的用法：

~~~ html
<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js"></script>
<swiper-container>
  <swiper-slide>Slide 1</swiper-slide>
  <swiper-slide>Slide 2</swiper-slide>
  <swiper-slide>Slide 3</swiper-slide>
  <swiper-slide>Slide ...</swiper-slide>
</swiper-container>
~~~

试了一下，并无效果。然后文档里发现另外一个范例：

```html
<!-- Slider main container -->
<div class="swiper">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
    ...
  </div>
  <!-- If we need pagination -->
  <div class="swiper-pagination"></div>

  <!-- If we need navigation buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <!-- If we need scrollbar -->
  <div class="swiper-scrollbar"></div>
</div>
```

粘贴进来，发现框架已经搭好，但不能滑动，打开 `/themes/acorn/layout/_partial/after-footer.ejs`，发现触发的类名是 `oneSwiper`，加上之后就正常了。

<div class="swiper oneSwiper">
<div class="swiper-wrapper">
<div class="swiper-slide">

![](https://media.kaerozhi.com/2025/06/156989a4d5341d7356c3d5929ad5be83.webp)

</div>
<div class="swiper-slide">

![](https://media.kaerozhi.com/2025/06/9eee58c457ec580c0afd88b4980418e4.webp)

</div>
<div class="swiper-slide">

![](https://media.kaerozhi.com/2025/06/6b49a4c5ccf65bab92a9b266d5843d14.webp)

</div>
</div>
<div class="swiper-pagination"></div>
</div>

然而又发现了新的问题，与这些 HTML 代码混用之后，Markdown 无法渲染，图片自然也不能正常显示。研究了一下 [^1]，发现 Markdown 与 HTML 混用时，HTML 代码不能缩进，并且与 Makrdown 内容之间必须空一行，如下所示：

``` html
<div class="swiper oneSwiper">
<div class="swiper-wrapper">
<div class="swiper-slide">

![](https://media.kaerozhi.com/2025/06/156989a4d5341d7356c3d5929ad5be83.webp)

</div>
<div class="swiper-slide">

![](https://media.kaerozhi.com/2025/06/9eee58c457ec580c0afd88b4980418e4.webp)

</div>
<div class="swiper-slide">

![](https://media.kaerozhi.com/2025/06/6b49a4c5ccf65bab92a9b266d5843d14.webp)

</div>
</div>
<div class="swiper-pagination"></div>
</div>
```

刷新，搞定。

[^1]: 可参阅： https://daringfireball.net/projects/markdown/syntax

