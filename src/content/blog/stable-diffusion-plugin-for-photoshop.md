---
title: "Auto Photoshop Stable Diffusion Plugin"
date: 2023-07-09 10:55
categories: 
  - "玩艺"
  - "Stable Diffusion"
tags: 
  - "stable diffusion"
  - photoshop
  - plugins
description: "给 Photoshop 准备的 Stable Diffusion 操作界面，虽然还称不上尽善尽美，但至少值得一试。"
photos:
  - https://media.kaerozhi.com/2025/06/9d06ecd52d0c15521ea075b30689b4d3.webp
---
因为名字太长，为行文方便，后文一律简称为 SD4PS。[**Github 传送门**](https://github.com/AbdullahAlfaraj/Auto-Photoshop-StableDiffusion-Plugin)

这款插件其实已经推出有一段时间了，但国内好像没有太具深度的介绍，介绍完如何安装，随便生成几张图片，就点到为止了。还有普遍反应的安装报错，但我按照说明文档中的标准流程走下来，基本上通行无阻，可能是人品比较好？

至于现阶段的体验，个人觉得远不如想象的那么趁手。基本的 txt2img / img2img 虽然简单，但因为不能像 Web UI 那样存储预设，浏览和切换模型 / Lora / Embeddings 也不方便，所以得先在 Web UI 里面把包括 LORA 在内的 Prompts 写好，然后再粘贴到 SD4PS——多试几遍就反应过来了，这不是多此一举吗？还不如 Web UI 出图，然后 Photoshop 打开来得便捷。

当然，安装这个插件肯定是为了 Inpaint / Outpaint，毕竟绘制草图和处理蒙版，Photoshop 可不知比 Web UI 强到哪里去了。

<!-- more -->

## Inpaint 体验

我们先在 Photoshop 里面生成一张图，模型还是 DreamShaper 7，`a beautiful young girl`常规起手。注意这个插件不兼容画板，新建文档的时候记得取消画板选项，分辨率依旧是 512x768。走起：

![A beautiful young girl](https://media.kaerozhi.com/2025/06/d5ae087ad87e759ba4e493a014fd302f.webp)

我们从生成的结果中选了一张比较满意的，但希望把眼睛换成绿色。试着用白色画笔涂抹眼睛，作为 Inpaint 蒙版：

![](https://media.kaerozhi.com/2025/06/b04cf81ac49188095d9ed319595d59ed.webp)

此时维持原 Prompts 不变，选中整张图片，在原来的 Prompts 基础上增加眼睛的描述：`green eyes, light green pupils, high detailed eyes`，绘图模式切换至 Inpaint，点击 Generate Inpaint，五选一之后得到：

![](https://media.kaerozhi.com/2025/06/f39a887bdf8b32f68c3d4c3b41461fc5.webp)

效果不错。注意 SD4PS 选项卡，原图和蒙版都识别得很准确——不要以为这很正常，其实这就是该插件最容易翻车的地方。

![](https://media.kaerozhi.com/2025/06/ed81cdbc7deb0916c24aeb016f1cca0b.webp)

### 局部重绘

当然也有第二种方法，就是框选局部再重绘，这也是绘画和修图时最常用的场景。

此时建议将 Prompts 内关于人物整体的部分去掉，只需要眼睛的描述即可，因为我们重绘的部分只包括眼睛，保留人物的描述反而会造成干扰。而且该方法重绘的面积更小，理论上消耗的资源更低。

![](https://media.kaerozhi.com/2025/06/929c6a0b58e875374681d45ac7d59e48.webp)

出图之前记得检查一下重绘部分的分辨率，因为插件的比例控制非常任性。本来是为了节省资源才选择局部重绘，结果一不小心，插件给出 33.83 倍的放大比率，电脑差点当场崩溃……

![](https://media.kaerozhi.com/2025/06/f3e586d14f4109dc203a96019c23413e.webp)

风扇狂转了十几分钟之后，出来的结果令我……大失所望，眼睛套眼睛，右边还套歪了：

![](https://media.kaerozhi.com/2025/06/223b8113d5bfa64db2f15a1540a05d1b.webp)

怀疑是局部重绘的计算量太小，导致重绘的部分无法完美融合。既然如此，那就尝试调整参数，将 SD4PS 底部的 Mask Content 选项从 Fill 更改为 Original，此时 AI 会更多地参考原图，理论上会降低翻车的机率。

![](https://media.kaerozhi.com/2025/06/e5516167efac7fec8a2b4bcd614faa2c.webp)

在重绘的过程中注意到原图和蒙版缩略图是这样的：

![](https://media.kaerozhi.com/2025/06/aff337cdee2d2bfd7aefc71a3ed64000.webp)

不用想，这次肯定翻车。出图之后果不其然，比上一次还离谱：

![](https://media.kaerozhi.com/2025/06/cf76b56be5aa50d7c1805fd93805120e.webp)

这也是这款插件最不稳定最令人揪心的地方，操作没变，但插件并不是每次都能准确识别原图和蒙版。

再次尝试，可惜还是很魔性：

![](https://media.kaerozhi.com/2025/06/382ec66f216c63ffdf4c4d4d1ca73802.webp)

既然如此，那我们就扩大框选面积，选中整个面部，增加 `beautiful face` 关键词。为了与之前的结果有所差异，改成蓝色眼睛。

![](https://media.kaerozhi.com/2025/06/72b7e3ce5dd32e444a10323fa547c886.webp)

这样参考的要素更多，理论上会画得更好一点。再次重绘：

![](https://media.kaerozhi.com/2025/06/50b8407e2e4a0a4311c2ed6853efd623.webp)

成功。

由此可见，参考的像素越少，翻车的机率越大，即便我们希望节省系统资源，但还是要拿捏好尺度，过于局部的细节 AI 很难控制。

### 精确控制蒙版

使用几天之后，我发现其实精确控制蒙版并不难。

起初在网上看视频，想当然地认为涂白之后，插件自动将其识别为蒙版，但这样的结果就是看人品，有时候 ok，有时候叫人抓狂。但稍加注意就能发现，如果你从 txt2img / img2img 切换到 inpaint / outpaint，插件会自动生成一个名为 *Mask -- Paint White to Mask -- temporary* 的图层：

![](https://media.kaerozhi.com/2025/06/d33c9e5117e23082114548541f996788.webp)

在这个图层里，无论你是用选择工具框选，还是用画笔涂抹，又或是用钢笔精确勾选，总之只要涂白，插件就再也不会傻傻搞错你的蒙版了。

## 涂鸦重绘

涂鸦重绘也是非常普遍的使用场景。比如我想给这位已经换上蓝色美瞳的女同学戴上一顶希腊式的花冠，通过我高妙的画技，得到这样的结果：

![](https://media.kaerozhi.com/2025/06/3c7125119ac38ba737f3a12ee4fca129.webp)

在 Prompts 增加花冠的描述词：`greek flower crown, greek wreath`，选中头部，看看图生图能得到怎样的结果：

![](https://media.kaerozhi.com/2025/06/bca380d71b35bd39a58f4001f03adc30.webp)

插件读懂了我的想法，但完全没有考虑如何与原图融合。调整参数，将 Inpainting conditioning mask strenght 从 1 降到 0.3：

![](https://media.kaerozhi.com/2025/06/32b034520a223d6126661f80f9dcc0ad.webp)

重新出图：

![](https://media.kaerozhi.com/2025/06/c9c4f0913677b4b68c5c1222dfaa1d2d.webp)

脸倒是更像原来的脸了，但是这个融合还是很捉急啊，难道我都用上 AI 了，还要手动抠图合成吗？再说这光线也跟原来不一样，重塑光线可太麻烦了。

没奈何，那还是重绘一下全图试试。<kbd>Ctr</kbd> + <kbd>A</kbd> 选择全图，为了保持女同学的姿势不变，SD4PS 切换到 ControlNet 标签页，激活 slot1，选择 openpose-face 模型：

![](https://media.kaerozhi.com/2025/06/7837c756c7e1ba1c54a2a03804ea9092.webp)

回到默认标签，跑图！

![](https://media.kaerozhi.com/2025/06/f58b93a2407c92d1d558765dcc52d678.webp)
![](https://media.kaerozhi.com/2025/06/4fdb7a57adfd1f865d08040cd83d759c.webp)

挺好，就是背景和光线还是有变化，并且受 `greek` 影响，背景里出现了希腊的古典建筑。我们尝试将 Inpainting conditioning mask strenght 从 0.3 降到 0.15 试试：

![](https://media.kaerozhi.com/2025/06/85c2e5cc77c4dcce361fbd2519837f70.webp)

只能说有一点变化，但不明显。感觉方向不太对，**img2img 适合确定构图之后改变画风或者提升品质和完成度，如果只想调整局部，加一个花冠，添一条项链，或者换一身衣裳，那还是 Inpaint 更合适**。

### Inpaint 局部重绘

我们将花冠部分涂成白色蒙版：

![](https://media.kaerozhi.com/2025/06/a1b4e27162ef2c932645671906d5459e.webp)

为了减轻系统负担，只选中头部：

![](https://media.kaerozhi.com/2025/06/663ad991f3ed548eb6f26427a1e32880.webp)

跑图：

![](https://media.kaerozhi.com/2025/06/1fbcf9df34d8b6fb77c277b06b83df41.webp)
![](https://media.kaerozhi.com/2025/06/a77e5e068dca2b224a4b744981ffa377.webp)
![](https://media.kaerozhi.com/2025/06/9d06ecd52d0c15521ea075b30689b4d3.webp)

几乎每一张都得到了可用的结果，Inpaint 永远的神！

## Outpaint

Outpaint 与 Inpaint 原理基本一致，差别仅在于蒙版是正选还是反选而已，这里暂且不作探讨，以后若有意外发现再增补进来。

## 图片保存路径

Web UI 生成的任何图片都可以在 Outputs 文件夹里面找到，而 SD4PS 调用的虽然也是 Stable Diffusion，但它生成的图片却不在 Outputs 文件夹里。如果跑了图却没有另外保存，事后再去找，难免会一时摸不着头绪。

当然，办法肯定会有的。打开插件的 Settings 标签页，点击最下面的 **Get Path** 按钮，就可以找到文件的保存路径。

![](https://media.kaerozhi.com/2025/06/54e487a22b517a0b96e1a7ce10329f08.webp)

但里面的文件夹名称都是随机生成的字符串，要找指定的文件提供不了任何线索，只能海底捞针逐个翻阅。假如你已经跑过很多图生成了海量文件夹……那场面想想就很酸爽，所以有可能的话，还是养成随手存图的好习惯吧。

