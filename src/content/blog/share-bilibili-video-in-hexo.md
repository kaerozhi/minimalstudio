---
title: 在 Hexo 中分享 Bilibili 视频
date: "2024-08-18"
categories:
  - Coding
tags:
  - Hexo
  - bilibili
description: 一些可以改善体验的细节
---
昨天拍了一条视频发在B站，见[贝斯表演：我的悲伤是水做的](/blog/bass-play-of-jingxi/)。分享时发现一些值得注意的地方，聊作记录，也希望能帮到有需要的 Hexo 用户。

## 从 Bilibili 分享

打开要分享的 B 站视频，点击下方的分享按钮：

![B站分享界面](https://media.kaerozhi.com/2025/06/e09002f102b7a6a2fbba4a2830ce9d2b.webp)

Hexo 不支持别的方式，只能选择嵌入代码，点击复制，直接粘贴至 markdown 文件内任意位置即可。

## CSS 配置

粘贴的代码一般是这样的：

```html
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=112977336403920&bvid=BV11HpZeWE9y&cid=500001652752861&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
```

然而主题一般不会特意去设置 iframe 的样式，所以插入这个视频之后，只有一个小小的播放框。为了正常观赏，我们给 iframe 加上属性 `class="video-box"`，然后在对应的 CSS 文件中插入以下代码：

```css
.article-entry iframe.video-box {
  width: 100%;
  aspect-ratio: 16 / 9;
}
```

这样我们的视频就和内容等宽，并且是 16 / 9 的常规视频比例了。

## 进一步定制视频参数

但现在的视频还是有问题，第一，它会自动播放；其二，默认是静音的。查了一通资料，解决起来也不难，基本上可以靠增加参数解决。

### 1. 是否自动播放

B站视频分享默认自动播放，这有点烦，在 src 尾部追加参数 `&autoplay=0`，即可关闭自动播放。反之，参数 `&autoplay=1`就是打开自动播放了。

### 2. 是否静音

B站视频分享默认静音播放，这个默认播放策略有些自相矛盾，悄悄的进村，打枪的不要？在 src 尾部追加参数 `&muted=0` 即可打开声音。同样的，`&muted=1` 就是静音了。

### 3. 指定时间点播放

我们还可以指定视频开始的时间点，跳过不必要的片头，比如小朋友的贝斯演奏，实际的开始时间在25秒，我们可以追加参数 `&t=25`，让视频播放时直接跳到这个地方。

最后我们的播放代码就变成了：

```html
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=112977336403920&bvid=BV11HpZeWE9y&cid=500001652752861&p=1&autoplay=0&muted=0&t=25" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" class="video-box"></iframe>
```

完美。
