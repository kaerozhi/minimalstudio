---
title: Flux 初体验
date: 2024-10-28T02:08:00.000Z
categories:
  - 玩艺
  - AI
tags:
  - AI
  - Flux
  - ComfyUI
photos:
  - 'https://media.kaerozhi.com/2025/06/255a263dceccb80a6bfa357d4744a7d5.webp'
---
下载好 Flux 三件套之后，分别放入对应的文件夹。启动 ComfyUI，打开官方提供的 FLUX-Dev 原版（fp16）标准工作流，默认 prompt 是 `A drone photo of a foggy black forest scenery`，直接执行队列！



![fp16 输出](https://media.kaerozhi.com/2025/06/32c43dc3bcdb9295259c836340a7d910.webp)

成品还 ok，就是时间长达 373.58s。这张图的分辨率只有 1024x512，而我的显卡还是 4090……

同样的图，同样的尺寸，用 fp8 跑一遍，速度就正常多了，只花了 8.13s。

![fp8 输出，品质看不出太大差异](https://media.kaerozhi.com/2025/06/a6f858b6cd7da1051c1b86f26450f50a.webp)

这样的风景图，说实话并没有肉眼可见的差异。不如试试人像，`A beautiful girl wearing hanfu in a Chinese garden`，园林里的汉服女孩。

![fp8 输出，7.81s](https://media.kaerozhi.com/2025/06/eaa04dfae37a91915a58e85a7b0a9d3c.webp)

![fp16 输出，624.73s](https://media.kaerozhi.com/2025/06/a614d68b630f11cf1c611540d8e2ee3e.webp)

这个轮廓光打得确实很讲究，发丝细节要细腻得多，但高达 90 倍的时间差足以抹平所有画质的优势。感觉可以 fp8 抽奖，然后 fp16 放大？

Flux 宣传的最关键的一个亮点是对文字（*英文，中文不行*）的理解，我们也来试一试。`A frog holds a wooden sign with the words "waxa pictures" written diagonally on it`，咱们也请吉祥物出场亮个像对不对？

![fp16 输出，414.50s](https://media.kaerozhi.com/2025/06/886ad458358ecc470f9cc26e14271a41.webp)

厉害了我的蛙，但是也要注意，waxa pictures，漏了最后一个字母 s。

![fp8 输出，10.83s](https://media.kaerozhi.com/2025/06/aee1c2854a97b93fd7947c20cc959ddc.webp)

完成度确实明显有差距，但文字完全正确，还是挺不错的！

再实战一个复杂的，下面是 Civitai 上的[一幅作品](https://civitai.com/images/36862637)，Prompts 非常复杂，还加载了三个 lora：

![@VelvetS](https://media.kaerozhi.com/2025/06/3c57ebbebb1ed2937f4a38dcc729a202.webp)

我们使用相同的 Seed 和参数，分别用 fp8 和 fp16 跑一遍，看看差距会多大。

![fp8 输出，16.98s](https://media.kaerozhi.com/2025/06/eee4a89973e1e685ee238c390a969df6.webp)

fp16 没跑出来，不知道哪里出错了……
