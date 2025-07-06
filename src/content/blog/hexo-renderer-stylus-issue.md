---
title: Hexo Stylus 渲染的奇怪问题
date: 2023-07-21T10:40:00.000Z
categories:
  - 玩艺
  - 网站
tags:
  - Hexo
  - Stylus
  - CSS
---
给网站首页加了一个满屏图文，不料遇上一个奇怪的问题。原本想根据屏幕宽度自动调整标题大小，`hero.styl` 是这样写的：

```stylus
  h2
	font-size: clamp(5em, 5em + 2.5vw, 10em)
	line-height: 1em
	letter-spacing: -0.05rem
```

但渲染出来的 styles.css 却是这样：

``` css
h2 {
	font-size: clamp(5em, 7.5em, 10em);
	line-height: 1em;
	letter-spacing: -.05rem
	}
```

不知为何，两个不同的单位直接相加了，原本的变量变成了固定的 `7.5em`，这转换得也太过耿直了吧。去看了一下 [hexo-renderer-stylus](https://github.com/hexojs/hexo-renderer-stylus) 的源代码，但搜了一下 `em`、`vw`，没有结果，所以也摸不着头绪，总之此时的效果是这样的：

![错误的呈现结果](https://media.kaerozhi.com/2025/06/8298ebe51c9a8551b422d27019e84716.webp)

而预想的结果，它应该是这样的：

![预想的呈现结果](https://media.kaerozhi.com/2025/06/fab9ea4a800d1d0c08d3c4a43c77fd97.webp)

<!-- more -->

换到另一个以 [Bootstrap](https://getbootstrap.com/) 为框架的主题，CSS 正常渲染。为了确认原因，将主题换成同样采用 Stylus 的 [Next](https://theme-next.js.org/)，果然出现了同样的问题，那应该没有疑问了，大概率就是 hexo-renderer-stylus 的锅。

不过试了一下，`font-size: clamp(5em, 5vw, 10em)` 倒是 OK，姑且先这么用着，从长计议，看看能不能解决这个奇怪的计算问题。

另一种办法是把变量存储在 `.yml` 或者 `.json` 里面，再通过 CSS 读取，Wordpress 主题已经很流行这么做了，也可以尝试。

最近发现另外一个渲染错误是 `transition`，连写必然出错。

