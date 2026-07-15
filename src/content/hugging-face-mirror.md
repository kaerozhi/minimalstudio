---
title: Huggingface 国内镜像下载流程
date: 2026-07-14
categories:
  - "AI"
tags:
  - "Huggingface"
  - 资源
description: ""
photos:
  - https://media.kaerozhi.com/2026/07/76ae5f7d316281b0f7c8f24764307b22.png
---
AI 确实好玩，但下载模型也未免太费流量了，尤其是视频模型，Wan 2.2 一个 High 一个 Low，一套拖下来轻轻松松拉爆30个G，眼见着 100G 的流量包一天就榨干了。Modelscope 速度很快，但稍微出格点的模型它就没有。不行，必须节约用电，想办法把 Hugging Face 的国内镜像配置起来。

花了点时间摸索下来，整个流程还算简单，虽然 hf-mirror.com 的下载速度也就一般般，1~2MB/s 的小水管，但还是能用的。**更新：如果是凌晨至上午十点之前宽松时段，速度最快可以达到 50MB/s，反之下午到晚上十点偏慢，所以是之前测试的时段不对。**

## 配置 Access Token

首先，建议先去 Hugging Face 申请一个 Access Token，虽然用到的概率一半一半，但未雨绸缪总是好的。打开[申请页面](https://huggingface.co/settings/tokens)，点击右上角的 `Create new token`，Token name 可以随便填，只要勾选 Repositories 下面的全部选项即可，其他不用管。像我这样的个人用户，Org permissions 部分可以全部无视。

![勾选 Repositories 即可](https://media.kaerozhi.com/2026/07/2a788eed286b7f53d011282f192d77c0.png)

最后拉到页面最下方，点击 `Create token`，最后复制下来备用即可。

## 配置 huggingface-cli

[`huggingface-cli`](https://hf-mirror.com/docs/huggingface_hub/guides/download#download-from-the-cli) 是 Hugging Face 官方提供的命令行工具，自带完善的下载功能。使用方法如下：

```
pip install -U huggingface_hub
```

## 用命令行下载

打开文件夹，一般是 `/ComfyUI/model/unet`，我一般会再建一个名为 `Wan 2.2` 的子目录，进入文件夹，右键「在终端中打开」，输入以下命令：

```
$env:HF_ENDPOINT = "https://hf-mirror.com"
```

这样就可以将下载点设置为国内的镜像站点，然后我们需要保持登录状态：

```
hf auth login
```

按照提示输入之前获取的 token 即可登录。或者你也可以打开 `%USERPROFILE%\.cache\huggingface`，新建一个 .txt 文本文件，将其重命名为 `token`，不需要文件后缀名，然后将 token 粘贴在内，也同样可以保持登录状态。

登录之后，就可以下载了。如果你想下载整个仓库：

```
hf download meta-llama/Llama-3.2-1B-Instruct --local-dir .
```

如果你只想下载仓库中所有的模型文件：

```
hf download meta-llama/Llama-3.2-1B-Instruct --include "*.safetensors" --local-dir .
```

如果你只想下载指定的模型文件：

```
hf download darksidewalker/DaSiWa-WAN2.2-I2V DasiwaWAN22I2V14BLightspeed_snatchkissHighV11-Q8_0.gguf --local-dir .
```

## 注意

之前的攻略中，`huggingface-cli` 已经被 `hf` 命令取代，新命令已经默认开启了断点续传，你不需要再附加任何多余参数，所以 `--resume-download` 参数也已经被取消了。

另外一个镜像站 https://hf-cdn.sufy.com/ 对 token 的支持好像有些问题，使用同样的命令行下载会失败。