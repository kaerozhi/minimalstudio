---
title: "LORA 日推：梵高风格"
date: 2023-07-04 21:52:31
categories: 
  - "玩艺"
  - "Stable Diffusion"
tags: 
  - "stable-diffusion"
  - "van-gogh"
  - AIGC
  - LORA
photos:
  - https://media.kaerozhi.com/2025/06/793fcf3bb1209d47dce993181005977f.webp
description: ""
---

今天推荐的 Lora 是 [Van Gogh Style](https://civitai.com/models/100873/van-gogh-style)，还原度极高。以 `a young beautiful girl` 常规起手，底模选用 [DreamShaper](https://civitai.com/models/4384/dreamshaper)，Prompts 如下；

~~~
masterpiece, best quality, 8k, ultra detailed, simple background, 
a young beautiful girl, <lora:vgv1:1>, vg, painting by van gogh, vincent van gogh style,
~~~

![](https://media.kaerozhi.com/2025/06/b0bf2d77d473fe04ce07f7f3b73872c7.webp)

大笔厚涂，油画颜料的堆叠极富体积感，笔触感极佳，这一点比同类型的 Lora 都要突出，甚至真实得有些叫人心疼，这种画法是不是太费颜料了……

<!--more-->

如果觉得皮肤这么画太狂放，毕竟光滑粉嫩还是大家的普遍倾向，那稍微调整一下即可。使用同样的 Seed，将 Lora 的权重降到 0.7；

~~~
masterpiece, best quality, 8k, ultra detailed, simple background, 
a young beautiful girl, <lora:vgv1:0.7>, vg, oil painting by van gogh, vincent van gogh style,
~~~

![](https://media.kaerozhi.com/2025/06/ea7fd68bd62979f254e3803b0d4f8f36.webp)

差不多就完美了。

像梵高这种风格强烈的大师，我们最爱做的事情就是为我所用，给平淡无奇的素材加上那么一点点艺术性。比如最近热映的电影，陈思成导演的[消失的她](https://movie.douban.com/subject/35660795/)，有一组角色海报就是用梵高风格来画的，虽然这个画风更细密，但笔触感也更平了：

<div class="justified-gallery">

![](https://media.kaerozhi.com/2025/06/0165ec58f1d5a004306bad6e7d399fdf.webp)
![](https://media.kaerozhi.com/2025/06/d3cda3236d4c1f733c1198991ef6cb50.webp)
![](https://media.kaerozhi.com/2025/06/72b567c298d9fa4f8567f97c0cb4ae5b.webp)
![](https://media.kaerozhi.com/2025/06/cf699d3dbf0ce15b2adb6dc8e40f136a.webp)
![](https://media.kaerozhi.com/2025/06/23990b2988739227e2132a2d56969182.webp)

</div>

这点小伎俩自然骗不过咱们的眼睛，当然也没啥难度。比如牛教授最近用的头像，是许同学亲自创作的和服猫咪食面图。猫咪表情生动，面馆内的布置细节丰富，还能透过窗户和窗外的樱花看到远处的富士山。

![](https://media.kaerozhi.com/2025/06/cb671b597d7c25adea29edfb6ee81e58.webp)

我们丢到图生图，用梵高风格重绘一下：

<div class="justified-gallery">

![](https://media.kaerozhi.com/2025/06/6bd61c0baed98e48af8430870ac4d17a.webp)
![](https://media.kaerozhi.com/2025/06/7c1f62aa3b57ee486b79de6d70b6fdd6.webp)
![](https://media.kaerozhi.com/2025/06/18046c5b0ab8ef2899f55431c1b241a4.webp)
![](https://media.kaerozhi.com/2025/06/f1262b39dbeedc450ff03ccc148dcf4c.webp)

</div>

虽然手的问题一直存在——很显然 AI 也搞不清楚你们这些人类到底是怎么做到一只手拿筷子另外一只手端碗的[^1]——但风格还是非常明显，大成功！

[^1]: 吃拉面也是可以优化的，一位日本玩家特地开发了一个名叫 [BetterRamenEating](https://civitai.com/models/22359/betterrameneating) 的 Lora。前面的图只要加上这个 Lora，猫咪就能学会正确的拉面食用姿势了。

接着我们以阿锅家的法国斗牛犬为创作主题。有一天，阿锅忙于思考人生，家里的小狗只能穿上 Labcoat，替父从军，不，替主人去实验室里搬砖的感人故事：

第一次就接受这么重大的任务，慎重思考实验方案；

![](https://media.kaerozhi.com/2025/06/430e7af9e5b02fa5ae0d906346af7296.webp)

有思路了！然后去仓库里拿实验器材：

![](https://media.kaerozhi.com/2025/06/1d2fd1c501481db3efd7ce7c058f8387.webp)

呼呼~ 实验顺利进行中：

![](https://media.kaerozhi.com/2025/06/e41b265087ddae395dd9b79375c07a73.webp)

与实验室同事亲切沟通实验结果，毫无疑问，这次的实验数据很有价值：

![](https://media.kaerozhi.com/2025/06/3883d4da8204cdc12beedff73cb81e4d.webp)

大成功，来一杯香槟庆祝一下！

![](https://media.kaerozhi.com/2025/06/381e0175364d8defca344e53ac3bb98e.webp)