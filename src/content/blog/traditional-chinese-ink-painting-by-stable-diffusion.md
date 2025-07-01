---
title: "用 Stable Diffusion 尝试传统水墨画"
date: 2023-07-06 13:25:07
categories: 
  - "玩艺"
  - "Stable Diffusion"
tags: 
  - 竹子
  - 中国水墨画
  - AIGC
  - stable diffusion
description: ""
photos: 
  - https://media.kaerozhi.com/2025/06/6656c56ee77584a3b2440bf915052c7a.webp
---
最近的项目与传统文化相关，主题又含有竹子元素，所以就想着如何用 Stable Diffusion 来输出合适的素材。作为传统的梅兰竹菊四君子之一，竹一直都是文人画里非常重要的元素，找一些相关的素材并不难，不过外面找的毕竟不如自己炼制来得好玩。

参考知乎上的 [Ai 绘画有哪些有趣的 prompt？ - 董步云的回答](https://www.zhihu.com/question/589056030/answer/2979794738)，水墨风格的关键词如下，顺便分解一下词组：

~~~
sumi-e style, // 日语水墨
(expressive brush strokes):1.2, // 提升笔触的精致感
ink wash, gradation, monochromatic, // 水墨的层次感，保持黑白色调
poetic atmosphere, delicate balance, // 诗意，平衡
fluid motion // 液态的流动感
~~~

所以输出的是这样的例图，就可以预见了。

![版权所有 董步云@知乎](https://media.kaerozhi.com/2025/06/d5716ab6dd6b839fc2a57e8695fd3a53.webp)

<!-- more -->

我们先按照上面的 prompts 来尝试一下，把女孩主题换成我们想画的竹子：

~~~
masterpiece, best quality, highres, 8k, 
bamboo, falling bamboo leaves, blowing wind, (no humans:1.2), 
traditianal chinese ink painting, sumi-e style, (expressive brush strokes):1.2,
ink wash, gradation, monochromatic,
poetic atmosphere, delicate balance,
fluid motion
~~~

依旧是 DreamShaper 作为底模，分辨率 768 x 512px，输出如下：

<div class="justified-gallery">

![](https://media.kaerozhi.com/2025/06/67893492b0d13d80ff79e8a70ff034bf.webp)
![](https://media.kaerozhi.com/2025/06/610e6c091d205d697cecf34f821254bb.webp)
![](https://media.kaerozhi.com/2025/06/48a31b237238e8512504fffb818ecbd8.webp)
![](https://media.kaerozhi.com/2025/06/2fb0993b8bafe5c6611bb90f54ac0b5e.webp)

</div>

确实有点意思了。不过 *fluid motion* 还是导致了一些意外的结果。如以下图：

<div class="justified-gallery">

![](https://media.kaerozhi.com/2025/06/af0f01506b6bb1b1e8f15d18a214c1cb.webp)
![](https://media.kaerozhi.com/2025/06/95f0905ff8d0a85a12ea196cc03500c0.webp)
![](https://media.kaerozhi.com/2025/06/ec3a43479915544a91a5560f37777d90.webp)

</div>

过于强调流动感，画面的冲击力是有了，但不太符合我们想要的传统美学。我们去掉 *fluid motion*，同时将 *monochromatic* 更换为 *turquoise theme*，增加假山，这样就可以将黑白的水墨画换成青绿色主题，看看效果如何？

~~~
masterpiece, best quality, highres, 8k, 
bamboo, falling bamboo leaves, chinese style rock garden, blowing wind, (no humans:1.2), 
traditianal chinese ink painting, sumi-e style, (expressive brush strokes):1.2,
ink wash, gradation, (turquoise theme),
poetic atmosphere, delicate balance,
~~~

其他参数不变，输出如下：

<div class="justified-gallery">

![](https://media.kaerozhi.com/2025/06/a67b8ca0ff6d6efc36e0549f0a6fef0d.webp)
![](https://media.kaerozhi.com/2025/06/fa2186fbd7931b7569fd7c86419b5b7c.webp)
![](https://media.kaerozhi.com/2025/06/8eac9b134df7515b4fff8fd1a6c15d8b.webp)
![](https://media.kaerozhi.com/2025/06/2d20655dcc41dff3fe8d19d5288ea205.webp)

</div>

意境不错，但假山园林的比重太高了。不如化繁为简，专注于竹子，假山可以后期合成。去掉假山的关键词，重新输出：

<div class="justified-gallery">

![](https://media.kaerozhi.com/2025/06/6656c56ee77584a3b2440bf915052c7a.webp)
![](https://media.kaerozhi.com/2025/06/416337067998d5db2d944de4a8b540da.webp)
![](https://media.kaerozhi.com/2025/06/b6026c4ee6829394028b095b87ff7816.webp)
![](https://media.kaerozhi.com/2025/06/89015e01dc6092e6341e4629784cbb83.webp)
![](https://media.kaerozhi.com/2025/06/e82f72129b3f2afc1fd4d264f03c34b1.webp)

</div>

基本上成功。唯一的缺憾是始终没有画出风中飘洒的竹叶，不知道是哪里出了问题。

突然想起东坡的朱竹，又尝试了一下，结果怎么说呢？有点怪怪的，因为红色的竹子不符合常识，所以AI 很容易偏离到枫叶主题：

<div class="justified-gallery">

![](https://media.kaerozhi.com/2025/06/e3a5e6d17450eaf59d0abc0c5a1ef3af.webp)
![](https://media.kaerozhi.com/2025/06/b103183027ab66d0e3862f3f5f1e95f4.webp)

</div>

除了竹子之外，画面中还需要一些辅助元素。将竹子替换成流云和烟雾，得到：

<div class="justified-gallery">

![](https://media.kaerozhi.com/2025/06/1ddefff5e723e8408b41ff86421e72ce.webp)
![](https://media.kaerozhi.com/2025/06/e5bdf091441697a9499d7fcf48bcdf9f.webp)
![](https://media.kaerozhi.com/2025/06/7bb089acbc64d9717ba457c0ee46929d.webp)

</div>

再将主体换成假山和石头，得到：

<div class="justified-gallery">

![](https://media.kaerozhi.com/2025/06/946e727ee64f8855ffc2de35d0cb571f.webp)
![](https://media.kaerozhi.com/2025/06/a8ca4aefbb984e6e5a72ec90fcf8701f.webp)
![](https://media.kaerozhi.com/2025/06/9f1ccb6d3cdf8bcf2209342ebf1ee383.webp)
![](https://media.kaerozhi.com/2025/06/558489269eedcfcd0af4769e1c228408.webp)

</div>

感觉 AI 对假山还是有误会，本人的英文水平也不太够用，没有找到合适的单词来描述文人画里那些嶙峋奇崛的石头。不过这些也差不多够用了，就此收工。