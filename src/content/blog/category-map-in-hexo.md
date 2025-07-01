---
title: "Hexo 里面的 category_map"
date: 2024-07-24 21:36
layout: 
categories: 
  - "玩艺"
  - "网站"
tags: 
  - "Hexo"
description: ""
---
如诸君所见，本站的分类名，比如文字、游历、案例，都是中文。但我又有个需求，希望每个分类能有一些特别的小设计，最简单的当然是设置单独的 CSS class。代码如下：

``` html
<body class="category-<%= page.category %>">
...
</body>
```

按照以上代码，再进入本站的「文字」分类页，对应的 body class 将会是 `category-文字`，在 CSS 中并不能用。所以我们需要在 `config.yml` 中指定 category_map，给中文的分类设置一个对应的英文名。这个英文名默认用来生成每篇文章的链接地址，毕竟中文并不通行于国际互联网，我们把这个英文利用起来，岂不美哉？

如何取得此值呢？尝试之后，在列表页中比较简单，改进代码如下：

``` html
<body class="category-<%= config.category_map[page.category] %>">
...
</body>
```

刷新文字列表页面，如愿得到 `category-writings` 的类名，Nice！

但对应到具体的文章，则远比列表页复杂，用 `config.category_map[post.categories]` 是无法获取文章分类的，因为一篇文章可能对应好几个分类。而官方提供的 `list_categories()` 函数局限性太强，完全没法达到我们的预期。

用 console.log() 查看 `site.categories.data`，其中一个分类的内容如下：

``` json
_Document {
  name: '文字',
  id: 'cknidonz40000q816bzz340ez',
  slug: [Getter],
  path: [Getter],
  permalink: [Getter],
  posts: [Getter],
  length: [Getter]
},
```

可见其类型是 object。

了解其结构之后就比较简单了，在 `archive-post.ejs` 中增加以下代码：

``` javascript
<% post.categories.forEach(function(data) { %>
  cate-<%= config.category_map[data.name] %>
<% }) %>
```

以本文为例，其得到的结果是 `cate-playground` / `cate-web` 两个分类名，问题解决。

如果不嫌麻烦，tag_map 也可以通过同样的思路解决来处理。