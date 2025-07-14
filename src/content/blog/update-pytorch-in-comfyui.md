---
title: "绘世启动器 ComfyUI 版升级 Cuda 和 Pytorch"
date: 2025-07-10T11:58:00.000Z
categories: 
  - "AI"
tags: 
  - "ComfyUI"
  - PyTorch
---
这阵子 Flux Kontext 的曝光度日益见长，忍不住想体验一下，但 Kontext 要求 PyTorch 版本在 2.5 以上。我打开自己的绘世启动器，看了一下 PyTorch 的版本，还是 `2.1.2+cu118`，差得有点多。尝试用绘世启动器内置的环境维护升级 PyTorch，不知为何一直不成功：

![Connection timed out.](https://media.kaerozhi.com/2025/07/294ef8e93c25ab125ea354c8a630f81a.webp)

看报错是网络问题，但开了翻墙依然如此，只好手动处理之。

首先我们要确认自己能用的 CUDA 版本，以本人的 Windows 11 为例，打开终端，输入命令：

```bash
nvidia-smi
```

![显卡驱动信息](https://media.kaerozhi.com/2025/07/abfe7c5e0873bed7f10f675827a2a247.webp)

我的显卡是 4090，当然显卡驱动能安装的 CUDA 版本是 12.9 。但考虑到 PyTorch 还没有兼容 CUDA 12.9，我们转到 NVIDIA 的官方网站，下载 [12.8](https://developer.nvidia.com/cuda-12-8-0-download-archive?target_os=Windows&target_arch=x86_64&target_version=11&target_type=exe_local) 就好了。

安装好 CUDA 12.8 之后，我们选择手动下载 PyTorch 的相关文件。打开 https://download.pytorch.org/whl/cu128 ，分别打开其中的 torch / torchaudio / torchvision / xformers，找到我们要下载的文件。

如果您的配置和我一样，CUDA 版本是 12.8，Python 版本是 3.10，那可以直接点击下载下面的四个文件。如果配置和版本不一样，那就只能自己找对应的版本了，建议直接以关键词 `cu128` 来搜索。Torch 和其他三个包的对应关系请参考 [PyTorch中torch、torchvision、torchaudio、torchtext版本对应关系](https://blog.csdn.net/shiwanghualuo/article/details/122860521)，xformers 请参考 [最新xformers/CUDA/pytorch版本关系对照表](https://nuowa.net/487)，一定要严格对应，非对应版本无法安装。

- [torch-2.7.0+cu128-cp310-cp310-win_amd64.whl](https://download.pytorch.org/whl/cu128/torch-2.7.0%2Bcu128-cp310-cp310-win_amd64.whl#sha256=c52c4b869742f00b12cb34521d1381be6119fa46244791704b00cc4a3cb06850)
- [torchaudio-2.7.0+cu128-cp310-cp310-win_amd64.whl](https://download.pytorch.org/whl/cu128/torchaudio-2.7.0%2Bcu128-cp310-cp310-win_amd64.whl#sha256=f96c2be8aff6c827e76fd3a85e69a54ba5b9a37090853ed886f056ddfbca09a4)
- [torchvision-0.22.0+cu128-cp310-cp310-win_amd64.whl](https://download.pytorch.org/whl/cu128/torchvision-0.22.0%2Bcu128-cp310-cp310-win_amd64.whl#sha256=cdd90b768b01b0d638cb06a6c211b550b275c0c207b5210b7cbb5cea8dde11db)
- [xformers-0.0.30-cp310-cp310-win_amd64.whl](https://download.pytorch.org/whl/cu126/xformers-0.0.30-cp310-cp310-win_amd64.whl)

把这四个文件放到 ComfyUI 启动器根目录下面的 python 文件夹，然后打开启动器，点「高级选项」菜单，打开右上角的「启动命令提示符」：

![启动命令提示符](https://media.kaerozhi.com/2025/07/0e7d44626b7d4691f9593e4b5f891fa2.webp)

我们可以先确认一下当前的 PyTorch 版本：

```bash
pip show torch
```

然后卸载之：

```bash
pip uninstall -y torch torchaudio torchvision xformers
```

最后依次运行以下命令：

```bash
pip install "torch-2.7.0+cu128-cp310-cp310-win_amd64.whl"

pip install "torchaudio-2.7.0+cu128-cp310-cp310-win_amd64.whl"

pip install "torchvision-0.22.0+cu128-cp310-cp310-win_amd64.whl"

pip install "xformers-0.0.30-cp310-cp310-win_amd64.whl"
```

不同版本文件名不同，请别忘了自行替换。安装完之后可以再确认一下 PyTorch 版本，然后进入 ComfyUI 看看是不是能跑 Kontext 了？

## 参考

- [安装PyTorch框架](https://www.hiascend.com/doc_center/source/zh/canncommercial/700/envdeployment/instg/instg_0047.html)
- [PyTorch中torch、torchvision、torchaudio、torchtext版本对应关系](https://blog.csdn.net/shiwanghualuo/article/details/122860521)
- [秋叶Lora训练器升级torch 2.4.1版本方法](https://aisc.chinaz.com/jiaocheng/10577.html)
- [查看pytorch版本的方法](https://www.cnblogs.com/rainbow70626/p/18835886)
- [SD-WebUI手动更新Torch 2.1.2+cuda12.1+Xformers0.0.23](https://aizyk.com/2756.html)