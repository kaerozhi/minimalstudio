---
title: 给 Hexo 增加 Gitalk 评论系统
date: 2023-07-16T10:42:00.000Z
categories:
  - 玩艺
  - 网站
tags:
  - Hexo
  - Gitalk
  - Github
photos:
  - 'https://media.kaerozhi.com/2025/06/ab63f898213b40e3f18fa22ae5e84ffe.webp'
---
原来的 Minos 主题自带 Disqus 评论系统，换到 Acorn 以后，默认不带评论功能，所以打算研究一下如何自行配置。考虑到已经同步到 GitPage 了，不如就用 Gitment 或者 Gitalk，兼容性应该可以做到最好。

<!-- more -->

按照 [Hexo 博客添加 Gitalk 评论系统 ](https://www.itfanr.cc/2019/04/30/hexo-add-gitalk-comment/) 的引导，流程非常顺利，细节满满。但因为大佬用的是 Swig 渲染器，而 Acorn 的渲染器是 EJS，所以细节略有不同，在此把过程分享出来，希望能对 EJS 用户有所启发。

## 创建 Github OAuth Apps

打开 Github 上的 [OAuth Apps](https://github.com/settings/developers)，点击右上角 `New OAuth App` ，逐项填写相应内容即可。

![注册界面](https://media.kaerozhi.com/2025/06/afd881e0c72ebd0f46d24bb7f06a8467.webp)

`Homepage URL` 即 Hexo 的主页地址，`Authorization callback URL` 为站点的回调地址，一般和主页相同即可。

提交之后，得到 `Client ID` 和 `Client Secret` 备用。

## 自定义主题配置

打开主题的配置文件，Acorn 的路径是 `/themes/acorn/_config.yml`，添加 Gitalk 相关参数：

``` yml
gitalk:
  enable: true
  ClientID: xxxxxx // 上一步得到的 Client ID
  ClientSecret: xxxxxxxxxxxx // 上一步得到的 Client Secret
  repo: kaerozhi.github.io // 仓库可以和 Hexo 一样
  owner: kaerozhi
  adminUser: kaerozhi
  IdPrefix: gitalk
  labels: gitalk
  perPage: 10
  pagerDirection: last
  createIssueManually: true
  distractionFreeMode: false
```


## Gitalk 模板

按照 Acorn 的文件结构，在 `/themes/acorn/layout/_partial/post/` 文件夹内添加 `gitalk.ejs`，代码如下：

``` javascript
<link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css">
<script src="https://unpkg.com/gitalk/dist/gitalk.min.js"></script>

<div id="gitalk-container"></div>

<script type="text/javascript">
    var gitalk = new Gitalk({
        clientID: '<%- theme.gitalk.ClientID %>',
        clientSecret: '<%- theme.gitalk.ClientSecret %>',
        repo: '<%- theme.gitalk.repo %>',
        owner: '<%- theme.gitalk.owner %>',
        admin: ['<%- theme.gitalk.adminUser %>'],
        id:'<%- theme.gitalk.IdPrefix || gitalk %>_<%- date(page.date, "YYYYMMDDHHmmss") %>',
        labels: '<%- theme.gitalk.labels %>'.split(',').filter(l => l),
        perPage: <%- theme.gitalk.perPage %>,
        pagerDirection: '<%- theme.gitalk.pagerDirection %>',
        createIssueManually: <%- theme.gitalk.createIssueManually %>,
        distractionFreeMode: <%- theme.gitalk.distractionFreeMode %>
    })

    gitalk.render('gitalk-container')           
</script>
```

因为所有参数都在主题配置文件里添加好了，这里直接调用，所以应该无需作任何改动。

按照我们的想法，只有文章页开启评论，其他页面不开启，所以打开 `/themes/acorn/layout/_partial/article.ejs`，找到 `<%- partial('post/tag') %>`，换行，添加以下代码：

``` javascript
  <% if (theme.gitalk.enable && is_post() && page.comments != false) { %>
	<section class="artile-comments gitalk">
	  <%- partial('post/gitalk') %>
	</section>
  <% } %>
```

这里为开启评论加了三个前置判断，分别是：

1. `theme.gitalk.enable`，主题配置中启用了 Gitalk 评论；
2. `is_post()`，仅文章页启用评论；
3. `page.comments != false` 只要在指定文章的 Front Matter 内加入 `comments: false`，则可以手动关闭评论。

## 初始化创建

至此前期的准备工作就完成了，重新生成并 Deploy 至 Github，就可以在文章底部初始化创建评论了。

如果你跟我一样，历史数据比较多，一篇一篇手动启用未免太累了，那也可以参考这篇文章：[Hexo Gitalk 评论自动初始化](https://blog.jijian.link/2020-01-10/hexo-gitalk-auto-init/)。
