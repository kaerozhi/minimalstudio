---
title: "aeroom 重装上线"
date: "2009-06-30"
categories: 
  - "玩艺"
  - 网站
tags: 
  - "wordpress"
  - Theme
  - plugins
  - widget
  - "网站更新"
---
熬过异常忙碌的两个月之后，一时兴起，将网站翻新了，只花了一周时间，低调，神速。主要是收缩了左侧的空白区，这样阅读区就变得更宽。上一版太窄，空间浪费了不说，也影响内容的阅读体验。配色力求简洁淡雅，并且大范围使用圆角，亲和力应该有所提升？作为 Web Designer，雕琢网站美感，提升使用体验，这无疑都是长期训练得来的职业本能。

<!-- more -->

## 插件与 Widget 的取舍

启用 [Flickr Photo Album](http://www.tantannoodles.com/toolkit/photo-album/) 替换了过于臃肿的 NextGen Gallery，同时用其自带的 Widget 取代了 FlickrRSS，具体效果请参见现在的 [Albums](/gallery/ "Albums")。

因为社会主义特殊国情，Flickr 在国内的速度不太稳定，但除去国情的影响，这款插件可谓优雅而强大。但是千万不要追求过分的华丽，一旦启用任何 AJAX Slideshow 效果，看照片都有可能发狂——因为真的太卡了，虽然也可能是特殊国情造成的。插件的模板其实很容易定制，只要调整 `/tantan-flickr/templates/photoalbum-index.php` 就够了。

弃用 Quoter，启用了一个回复评论的通知插件：[Mail to Commentor](http://www.thinkagain.cn/archives/989.html)。个人感觉邮件通知真的很必要，及时回复有利于形成友好的讨论氛围。还有一个相似的插件是 [Wordpress Thread Comment](http://blog.2i2j.com/plugins/wordpress-thread-comment)，功能或许更加强大，只是回复时会改动表单的位置，破坏原本的布局，所以只能放弃了。

小规模启用 [Fancybox](http://fancy.klade.lv/)，目前只在图片较多的 [Portfolio](/portfolio/) 页面开放。虽然 IE8 上偶尔会没有响应，不过仍然很喜欢它的样式。

## 为不同页面配置专属的侧边栏

现在的博客主题有个通病，每个页面都挂着同样的侧边栏，显得非常呆板单调。网站的首页，与不同的分类，与具体的某篇文章，它们的边栏怎么能一样呢？Post 和 Page之间也应该有些区别才对。

不过稍事研究，发现要解决这个问题也很容易。一般主题都只有一个或两个边栏，但按照我的想法，首页、分类页、Post 和 Page，这起码需要不同的四个边栏才够，我们按照以下步骤进行设置：

1. 打开主题文件夹里面的 `functions.php`，搜索 `register_sidebars()` 函数，它应该以这样的形式存在的：  
    ```
    register_sidebars( 1, $p );
    ``` 
    数字「1」就是现在的边栏数，将其改为 4（*可以是你想要的任何数字*）。
2. 进入 Wordpress 后台，此时就能在 “外观 > 小工具” 界面中看到 4 个可用的边栏了，你可以按照自己的想法，给这 4 个边栏配置不同的 Widget。
3. 刷新主题，会发现所有页面仍然共用一样的边栏。别着急，打开主题文件夹内的 `sidebar.php`，找到 `<div class=”sidebar”>…</div>`，复制 3 次，总数就变成了 4 个，然后分别赋予其不同的ID，保存，然后刷新，之前在后台设置的 4 个边栏都出现了——但仍然不是我们想要的效果，因为每个页面还是相同的，只不过数量从 1 个变成了 4 个。
4. 接下来让这四个边栏归属到各自的页面。我们给每个边栏加上一点代码，以判断它是否应该在某个页面显示。比如首页的边栏，需要首尾添加以下 PHP 代码：
    ```
    <?php if( is_home() || is_front_page() ) { ?>  
	    <div id=”home_sidebar” class=”sidebar”> … </div>  
    <?php } ?>
    ```
    如此一来，这个边栏就只会在首页显示了。
5. 同样的，给 Page 专用的边栏加上 `is_page()` 的条件判断， Post 边栏则加上 `is_single()`，最后刷新，搞定。

更多条件的判断可以参考 Wordpress 官方文档中的 [Conditional Tags](http://codex.wordpress.org/Conditional_Tags "Conditional Tags")。

**注意：**`query_posts()` 函数会导致某些判断无效，为了避免该状况发生，请务必在它后面加上 `wp_reset_query()` 函数。

## 一些问题

IE6 正式被放弃，PNG 的透明问题实在懒得去解决了，不过除此之外，似乎并没有出现让人明显的布局问题。 好久没有接触过 CSS，不得不说 IE8 还是一个可圈可点的浏览器，IE6 和 IE7 长期保持的经典 BUG：input 元素的 `text-indent` 无效以及无法正确解析 `float: right` 的问题，IE8 都被修复了。

不过 Windows Live Writer 还是不能正确加载新主题，真奇怪。家里的 WLW 还因此而崩溃了，至今没有修复。

好像要说明的就这些了，请大家帮忙反馈 BUG。
