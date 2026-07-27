---
title: "巧用 Wildcard 制作写真集"
date: 2026-07-27
categories: 
  - "AI"
tags: 
  - "ComfyUI"
  - "Wildcards"
  - Workflow
description: "只需一张照片，一键输出写真集"
photos:
  - 
---
在大佬群里潜水，看别人发图，一发就是八九张一组的，而且彼此都大同小异，感觉应该有方法可以批量生产。于是就研究了一下，花了差不多一整天时间，终于排除万难达成了。

目前我的工作流以 Krea 2 为主，但思路应该都是差不多的，移植别的模型应该不会很麻烦，以下就从几个关键点开始讲。

## 一、批量文生图

一般我们写主提示词，为了方边描述，人物主体、背景环境、艺术风格、品质控制一般会分行处理，比如我们准备生成一个美女，简单一点也要这样写：

```
照片的主体是一位中国女子，淡妆红唇，

masterpiece, 8K resolution, perfect lighting, soft light, pure white background
```

点击运行，就是正常输出一张图，很 ok。

但如果我们借助节点的力量，正好有一类节点可以将提示词分行输出，比如我用的是 [EasyUse](https://github.com/yolain/Comfyui-Easy-Use) 的提示词行，它的界面长这样：

![EasyUse 提示词行](https://media.kaerozhi.com/2026/07/accacc725993ba81dd3cdfee36a09e48.png)

我们把四行提示词置入其中：

```
正面标准头像
正面近距离特写 half-face portrait，淡妆红唇
正面近距离特写，手持一朵盛开的荷花遮住半张脸，淡妆红唇
正面中距离半身肖像，上身全裸，双手遮胸，佩戴华丽的钻石水滴项链
```

我们把这个节点和上面的提示词组装起来，前面接上模型、lora，后面接上采样器和输出节点，工作流核心部分像下面这样：

![工作流核心节点，其实只要看左边三列即可。](https://media.kaerozhi.com/2026/07/7196e2120e7025bd848923fbcc4755ef.png)

我们写了四行，那么点击一次就会运行四次，输出四张不同的照片。

![第一行的输出结果](https://media.kaerozhi.com/2026/07/9e252ca58c24c4e0a480b580bdf13de2.png)
![第二行的输出结果](https://media.kaerozhi.com/2026/07/15df40ab2b8fb289490c4fcfc711f384.png)
![第三行的输出结果](https://media.kaerozhi.com/2026/07/00e03856dd37998202dfc8ef96d80c80.png)
![第四行的输出结果](https://media.kaerozhi.com/2026/07/fe7e18e2e12f7de26495c4fd5990fb43.png)

理论上只要我们一行接一行地把提示词写下去，一次性出一百张照片也没问题。写真集？一次搞定！