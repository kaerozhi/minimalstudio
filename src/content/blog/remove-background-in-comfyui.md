---
title: ComfyUI 抠图横向对比 & 设计师操作指南
date: "2025-07-26"
categories:
  - AI
tags:
  - ComfyUI
  - 设计
description: "设计师用 ComfyUI 系列之抠图篇"
photos:
  - https://media.kaerozhi.com/2025/07/31ffcc6ae8cff64094520db7af608cf7.webp
---
对设计师来说，抠图可能是日常最高频的操作之一了。虽然 Photoshop 现在处理选区越来越智能化，但借助 AI 的力量，我们能否进一步提升效率呢？


## 测试参照：Photoshop 选择主体的可用性

Photoshop 现在抠图已经非常方便，大部分时候只要「选择主体」，就能一键搞定，但如果对精度有要求，很多时候仍需要手动处理，尤其是在主体与背景反差不够明显的情况下。

比如我们在网上找一张刘亦菲的照片：

![图片来自网络，如侵权请联系删除](https://media.kaerozhi.com/2025/07/3e767080644510b0c822e4e9947cd72b.webp)

尝试用 Photoshop 选择主体：

![选择主体得到的结果](https://media.kaerozhi.com/2025/07/ccca5847d1438e866d05037b670c78b1.webp)

结果足以令人满意，如果要求不高，简单处理一下选区就可以直接用了。当然，需要优化的地方仍旧存在，比如右肩的曲线，放大之后坑坑洼洼，曲线不够流畅，但手动处理一下也不会太麻烦。

![放大之后明显可以看出细节的瑕疵](https://media.kaerozhi.com/2025/07/fc3309c3a338fc7be7fb69791c36a421.webp)

如果我们给 Photoshop 上点强度，另外再找一张主体与背景暧昧不分明的照片，Photoshop 还能从容应对吗？

![图片来自网络，如侵权请联系删除](https://media.kaerozhi.com/2025/07/425728c3ebcd8960cce34f6d966bb4a7.webp)

一望而知，这张图的边缘非常难处理。我们试着把图片导入 Photoshop，选择主体，得到的结果是这样的：

![地狱的难度，魔鬼的结果……](https://media.kaerozhi.com/2025/07/6c60f4fd43b7d4563df9675e80ba491a.webp)

结果实在有些魔幻。如果我们尝试用 ComfyUI 来处理这张图，能否做得更好呢？

## 主流去背模型横向比较

AI 近两年的发展速度非常快，但目前的主流去背模型，可能还是如下几个：

- [**RMBG-2.0**](https://huggingface.co/briaai/RMBG-2.0)
- [**BiRefNet**](https://huggingface.co/ViperYX/BiRefNet)
- [**InSPyReNet**](https://github.com/plemeri/InSPyReNet)
- [**BEN2**](https://huggingface.co/PramaLLC/BEN2)

相关节点很多，我们可以用 **[ComfyUI-RMBG](https://github.com/1038lab/ComfyUI-RMBG)** 这样的去背专用节点，也可以用 **[ComfyUI-Easy-Use](https://github.com/yolain/ComfyUI-Easy-Use)** 这样的整合节点包，只要能调用对应的模型就行。

以 ComfyUI-RMBG 为例，节点安装之后，需要将相关模型下载到 `ComfyUI/models/RMBG/` 文件夹。如果你希望下载所有模型，可以参照官方文档：

> - 首次使用自定义节点时，模型会自动下载到 `ComfyUI/models/RMBG/`。
> - 通过[此链接](https://huggingface.co/1038lab/RMBG-2.0)手动下载 RMBG-2.0 模型，然后放在 `/ComfyUI/models/RMBG/RMBG-2.0` 文件夹中。
> - 通过[此链接](https://huggingface.co/1038lab/inspyrenet)手动下载 INSPYRENET 模型，然后放在 `/ComfyUI/models/RMBG/INSPYRENET` 文件夹中。
> - 通过[此链接](https://huggingface.co/1038lab/BEN)手动下载 BEN 模型，然后放在 `/ComfyUI/models/RMBG/BEN` 文件夹中。
> - 通过[此链接](https://huggingface.co/1038lab/BEN2)手动下载 BEN2 模型，然后放在 `/ComfyUI/models/RMBG/BEN2` 文件夹中。
> - 通过[此链接](https://huggingface.co/1038lab/BiRefNet_HR)手动下载 BiRefNet-HR，然后放在 `/ComfyUI/models/RMBG/BiRefNet-HR` 文件夹中。
> - 通过[此链接](https://huggingface.co/1038lab/sam)手动下载 SAM 模型，然后放在 `/ComfyUI/models/SAM` 文件夹中。
> - 通过[此链接](https://huggingface.co/1038lab/GroundingDINO)手动下载 GroundingDINO 模型，然后放在 `/ComfyUI/models/grounding-dino` 文件夹中。
> - 通过[此链接](https://huggingface.co/1038lab/segformer_clothes)手动下载 Clothes Segment 模型，然后放在 `/ComfyUI/models/RMBG/segformer_clothes` 文件夹中。
> - 通过[此链接](https://huggingface.co/1038lab/segformer_fashion)手动下载 Fashion Segment 模型，然后放在 `/ComfyUI/models/RMBG/segformer_fashion` 文件夹中。
> - 通过[此链接](https://huggingface.co/1038lab/BiRefNet)手动下载 BiRefNet 模型，然后放在 `/ComfyUI/models/RMBG/BiRefNet` 文件夹中。

如果你懒得逐个下载，也没有翻墙的渠道，这里也有[听雨老师](https://www.zhihu.com/people/jie-shi-83-73)整合的夸克网盘合集，包含所有模型在内：[https://pan.quark.cn/s/5b9cf77ddf2c](https://pan.quark.cn/s/5b9cf77ddf2c)

我们快速建立一个横向对比工作流：

![基于 ComfyUI-RMBG 建立的去背工作流](https://media.kaerozhi.com/2025/07/c7a30a5460790f8bf20f35745bafb39e.webp)

下方同步输出 Mask 遮罩，方便导入 Photoshop 后续处理。

在没有调整任何参数的情况下，结果如下：

![包括 Photoshop 在内的结果对比](https://media.kaerozhi.com/2025/07/cbffd63b0f090382f9e4c534a9563918.webp)

你可以在图片上右键点击「在新标签页中打开图片」，来查看原图的细节。个人观感，RMBG-2.0 效果最好，BiRefNet 与 Photoshop 次之。

我们继续提升难度，找一张衣服是半透材质的照片来测试一下，原图如下：

![图片来自网络，如侵权请联系删除](https://media.kaerozhi.com/2025/07/aae2303bcc6b2a7c9ab5e68abb1b14f8.webp)

结果很遗憾……包括 Photoshop 在内，暂时还没有 AI 能准确地识别面纱这种半透明材质应该如何从背景中分离出来，还是得靠设计界的非物质文化遗产通道抠图大法？

![半透明材质处理结果的横向对比](https://media.kaerozhi.com/2025/07/d78d0b35947ef3d656f200c83f5ef209.webp)

事到如今，我们对终极考验的结果已经变得不那么乐观，但测试成本又不高，试一下又何妨？最终的测试结果如下：

![终极测试横向对比](https://media.kaerozhi.com/2025/07/46fed0de64fe11c942d156fa839fa40b.webp)

别说，RMBG-2.0 的处理结果还不错，比 Photoshop 强得多，其次是 BEN2。

### 追加 BiRefNet 子模型测试

BiRefNet 还有好几个子模型，下载了其中一部分，同样测试一遍作为参考：

![BiRefNet 子模型去背结果参考](https://media.kaerozhi.com/2025/07/acecc5b633b90e4e68186d87989a103b.webp)

需要注意，追加的测试都将 `mask_offset` 设置为了 `-5`，偏移的数值越低，抠图的半径越大下手越重，反之则保留的区域越多。在调试几次之后，对半透明区域的处理普遍有所提升。

![另一张图的处理结果对比](https://media.kaerozhi.com/2025/07/944e71cda620dc5e2fa5543f439dc7ea.webp)

这张图因为反差比较低，偏移值不好控制，全部设置为零，可见 BiRefNet-dynamic 的处理结果与 RMBG-2.0 是比较接近的。
## ComfyUI-RMBG 批处理抠图

在 ComfyUI 中，批量处理并非难事。我们可以先用单张图片测试，确定哪个模型的效果最好，经过前面的一番比较，个人觉得 RMBG-2.0 的效果更突出，那么就以 RMBG-2.0 为例，建立新的批处理工作流，这是一个非常简单的工作流：

![批量抠图工作流](https://media.kaerozhi.com/2025/07/fc54edadebfca2d132c3d1b82a4cc0aa.webp)

复制需要处理的文件夹路径，比如我的电脑上的某个文件夹有八张照片，复制其路径，粘贴至 Batch Load Image 的 `path` 变量中。注意，此节点需要安装 [comfyui-mixlab-nodes](https://github.com/MixLabPro/comfyui-mixlab-nodes)：

![需要批处理的文件夹](https://media.kaerozhi.com/2025/07/626671bb8ff768405336d0efb3a8f7e3.webp)

将 `mask_offset` 调整为 `-2`，运行工作流，片刻之后就得到抠图的结果：

![批量抠图的结果](https://media.kaerozhi.com/2025/07/eb5c24e98744a676711ff958b7a55d76.webp)

ComfyUI-RMBG 还有一些附加功能，比如衣物分割、面部分割等等，顾名思义，就是在画面中提取指定的元素，在 Flux Kontext 炙手可热的当下，已经没有多大的意义，可以略过。

## Flux Kontext 抠图尝试

我们都知道 Flux Kontext 最擅长的就是保持某部分不变而改变其他部分，比如刘亦菲的第一张照片，我们输入以下提示词：

> Character remain unchanged, change the background to gorgeous palace

然后我们就得到宫殿里的刘亦菲，虽然有哪里似乎不一样了……

![In a gorgeous palace.](https://media.kaerozhi.com/2025/07/0f1b80c828f5b09c119ea6d4658844ea.webp)

我们还可以尝试维持背景不变，但让角色转身背对我们：

> Maintain the background as is; the character is facing away from the audience

于是我们就得到了：

![魔法时刻！](https://media.kaerozhi.com/2025/07/d22ab04bd823c006a62b34f438d0d812.webp)

等等，这个发型好像不太对，面部线条好像也不是一个人！但 Flux Kontext 还是基本理解了咱们的意图。总之，Flux Kontext 不完美，但已经很强大，我们尝试让背景变个色：

> Character remain unchanged, change the background color to red

于是背景就变成了红色：

![红色背景](https://media.kaerozhi.com/2025/07/53a4b1a98267ab1956dfb9a5f0cb89c3.webp)

这个效果是不是已经很接近抠图了？那我们能否直接将背景转换成透明呢？

> Character remain unchanged, change the background color to transparent

答案是否定的，Flux Kontext 并不会为我们输出一张透明的 PNG 图片。

![Flux Kontext 理解的 transaprent](https://media.kaerozhi.com/2025/07/323e88d93b3597911054f9779ed09427.webp)

但即便是这样退一步要求，Flux Kontext 也不能替代专门的抠图节点，因为它有时候会错误理解你的意图，比如这两张照片的处理结果：

![背景变成红色](https://media.kaerozhi.com/2025/07/e870534203d3c4a1b812e74b34afa230.webp)

这张的背景改色基本成功，但裙摆的范围被大幅削减了。

![背景变成蓝色](https://media.kaerozhi.com/2025/07/476d879fe89a8bf64f03ef348b253a2d.webp)

这张我想的是红色衣服，为了方便导入 Photoshop 后续抠图，那背景肯定要换成反差大的蓝色，结果 Flux Kontext 直接给我整体换成了蓝色，囧RZ……

毕竟术业有专攻，目前 AI 抠图还是考虑 ComfyUI-RMBG 这样的专精节点就好。