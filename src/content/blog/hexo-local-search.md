---
title: 给 Hexo 添加搜索模块
date: "2023-07-17"
categories:
  - Sitelog
  - Coding
tags:
  - Hexo
description: 即便是静态博客，站内搜索功能也是必须的。
photos:
  - 'https://media.kaerozhi.com/2025/06/3aebd3c625e5eeee7f2447b6af41cbd2.webp'
---
咳咳，作为受益无穷的免费用户，我不是在抱怨，但除了一个合适的框架以外，Acorn 的功能确实过于简略。这几天先后搞定了 Github 同步以及评论系统，但仔细想来，网站亟需完善的功能和模块还有以下几个：

- [x] ~~添加评论系统，已达成~~；
- [x] ~~添加搜索模块~~；
- [x] ~~目前的组图功能不太完善，考虑移植 Justfied Gallery~~；
- [ ] 增加更多可选 Layout，比如黑色背景与全屏宽度；
- [ ] 能否将视频作为头图的可选项？
- [ ] 首页与影像、案例页面的内容梳理；

确实是任重道远，扶额。
<!-- more -->

## 安装插件

首先，我们需要安装 [hexo-generator-search plugin](https://github.com/wzpan/hexo-generator-search)，输入命令：

```bash
$ npm install hexo-generator-search --save
```

编辑 Hexo 根目录下的配置文件 `_config.yml`，添加以下代码：

```yaml
search:  
  path: search.xml  
  field: post  
  content: true
```

`field` 指定搜索的覆盖范围，可选项有 `post / page / all`，分别覆盖文章、页面，`all` 则两者兼顾，个人偏向 all 选项，各位可以自行选择。

但插件装好之后，就会发现它除了在根目录生成 `search.xml`，并不提供搜索的交互界面，需要我们自行添加。

## 新增搜索界面

打开 [hexo-search-plugin-snippets](https://github.com/barretlee/hexo-search-plugin-snippets)，下载 `snippets` 文件夹内的三个文件，分别放到对应的文件夹：

 - `search.ejs` >  `/themes/acorn/layout/search.ejs`;
 - `search.js` > `/themes/acorn/source/js/search.js`;
 - `search.stylus` > `/themes/acorn/source/css/_partial/search.styl`。

接着打开 `/themes/acorn/layout/_partial/menu.ejs`，因为我们打算把搜索框放到顶部的导航栏，在 `</ul>` 的闭合标签之前插入：

``` javascript
  <li>
    <%- partial('_partial/search', {wrapStyle: '', inputStyle: ''}) %>
  </li>
```

然后打开 `/themes/acorn/layout/_partial/after-footer.ejs`，找个合适的地方插入：

```javascript
// 引用 JQuery
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
// 移动设备侦测
var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

if ($('.local-search').resize() && !isMobile.any()) {
	$.getScript('/js/search.js', function() {
	  searchFunc("/search.xml", 'local-search-input', 'local-search-result');
	});
}
</script>
```

再打开 `/themes/acorn/source/css/style.styl`，插入：

```css
@import "_partial/search"
```

Acorn 主题用户请注意，一定要把文件名从 `search.stylus` 改为 `search.styl`。稳妥起见，最好把语法重新整理一遍，否则可能会出现渲染错误。

最后 `hexo clean && hexo g`，搜索模块应该就出现了，调整一下外观样式，收工。

---

## 参考

- [Create Local Search for Your Hexo Blog](https://qiuyiwu.github.io/2019/01/25/Hexo-LocalSearch/)
- [hexo-search-plugin-snippets](https://github.com/barretlee/hexo-search-plugin-snippets)
