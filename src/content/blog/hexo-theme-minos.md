---
title: Hexo 的主题定制
date: "2023-05-28"
categories:
  - Sitelog
tags:
  - Hexo
  - Hexo Theme
  - SCSS
photos:
  - 'https://media.kaerozhi.com/2025/06/da58218df67828b73fc106b7f7cfdfea.webp'
---
Hexo 的主题生态非常贫乏，官方的主题列表看起来有几十页，但其实都是极少数几个主题（如 [Next](https://theme-next.js.org/)）的变体，所以颇有些千篇一律。个人不太喜欢 Next 这种太典型的博客风格，让我一种梦回十几年前，博客大爆发时期的错觉。

我确实懂一些 CSS/SCSS，但 Node.js 就一无所知了，要根据 Hexo 的官方文档手撸初一个全新主题出来，肯定吃力不讨好。总之，找了一圈，最后选定了 [Minos](http://ppoffice.github.io/hexo-theme-minos/) 作为基础，来日方长，一步一步改造吧。

<!-- more -->

## hexo-renderer-sass 安装问题

不过 Minos 倒是给了我一个下马威。刚切换过来，提示需要安装 hexo-renderer-sass，但试过了才发现，这个 hexo-renderer-sass 压根就是装不上的。

一开始我尝试了好几种办法，包括但不限于给系统安装 Python 2，更新 request 和 tar，搜索 `ERR code 1` 是怎么回事，都没辙。最后找到这篇：[解决 hexo-renderer-sass 无法安装](https://sobaigu.com/hexo-renderer-sass-error.html)，才最终搞定。

原因倒是很简单，hexo-renderer-sass 上一次更新还在 2018 年，属于退版本的状态。我们可以用 hexo-renderer-sass-next 替代它：
```
npm uninstall hexo-renderer-sass  
npm i --save hexo-renderer-sass-next
```
然后打开 `/themes/minos/scripts/01_check.js`，搜索 `hexo-renderer-sass`，将其替换为 `hexo-renderer-sass-next`。重新渲染 Hexo，成功。

## 中文字体

从 Wordpress 某个版本开始，我就参考 [Fonts.css](https://github.com/zenozeng/fonts.css) 来配置中文字体了。该方案跨平台，不需要外挂 Web Font[^1]，样式囊括黑体、宋体、楷体与仿宋体，基本能覆盖排版所需。

如你所见，本站的标题一概用宋体，正文用黑体，文章前后的序语、题跋则用仿宋，行内注释与脚注则分配给了楷体，真可谓物尽其用。可惜的是，Markdown 本身支持的 HTML 标签有限，如果想在排版上做出区别，仍然需要手动指定 CSS 类。

比如文章前面的序言，我手动指定了 `class="foreword"`。但不知为何， 指定 `foreword` CSS 类之后，无论加几个换行，“**阅读更多**”的都会紧贴着，只能给 `foreword` 类加上 `margin-bottom: 1.2em` 强行拉开距离。

[^1]: 作为老用户，配置 Google Fonts 以后，网站的加载速度真是一言难尽。虽然特殊国情的影响更大，我自己也没有配置国内镜像。

当然，问题仍然存在：**当前几乎没有手机厂商会预装楷体和仿宋**。即便是国产厂商，也只会沿袭苹果、Google 开创的传统，预装几十种英文字体，而预装中文字体者寥寥无几——在社会风气日趋保守的当下，爱国是政治正确，亲美与西化倾向都难免非议，但这一点居然长期以来无人置喙，真乃咄咄怪事。

扯远了。虽然中文字体远比比英文字体大，但现在的手机动辄 128G 起步，一个 2M 左右的字体所占用的容量，还不如用户随手拍的一张照片大，所以字体的大小已不足以成为阻碍。但目前的状况就是，楷体、仿宋在大部分手机上都只能识别为 Serif，也就是宋体，这点只能看未来能否有国产手机厂商注意并纠正了。

## Gallery

我行文经常插入大量的照片，如何优雅地展示这些照片自然是必须考虑的事情。

Minos 自带 [Justified Gallery](https://miromannino.github.io/Justified-Gallery/) 插件，官方提供了[演示页面](http://ppoffice.github.io/hexo-theme-minos/Creating-a-Gallery-in-Minos/)，效果中规中矩，但实际应用之后才发现，其高度是固定的 120px，横向照片看上去还可以，但纵向照片就太小了。

参阅 Justified Gallery 的官方文档，打开主题文件夹下面的 `/minos/plugins/gallery.ejs`，搜索 `$('.justified-gallery').justifiedGallery();`，添加几个参数，将其修改为：

```javascript
$('.justified-gallery').justifiedGallery({
	rowHeight : 360, //照片高度 360px
	lastRow : 'nojustify', //最后一行不对齐
	margins : 5 //图片间隔 5px
});
```

重新生成 Hexo，刷新页面，OK。

Justified Gallery 可以手动调整的所有参数请参考此页面：[Options & Events](https://miromannino.github.io/Justified-Gallery/options-and-events/)。
