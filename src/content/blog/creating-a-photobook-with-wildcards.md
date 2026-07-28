---
title: "巧用 AI 制作虚拟写真集"
date: 2026-07-27
categories: 
  - "AI"
tags: 
  - "ComfyUI"
  - "Wildcards"
  - Workflow
description: "只需一张照片，就能一键输出写真集"
---
在大佬群里潜水，看别人发图，一发就是八九张一组的，而且彼此都大同小异，感觉应该有方法批量生产。于是就研究了一下，花了差不多一整天时间，终于排除万难达成了。

目前我的工作流以 Krea 2 为主，但思路应该大同小异，移植别的模型也不会很麻烦，以下就从几个关键点开始讲。

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

## 二、引入 Wildcards 打造流水线模式

理论上到上面一步，写真已经出完了，没问题了吧？要复用也很简单：在输出文件夹里找到写真集里的某一章，拖进 Comfyui，工作流就回来了。

但我们雄心勃勃，写真集怎么能出一本就完事呢？必须 Vol.01 / Vol.02 / Vol.03 不间断输出啊……

那这种手动模式可就比较麻烦了。

如果写真的思路不多，像日本写真偶像那样，夏日泳装，海边沙滩，雪国冬日，欧洲旅拍，其实套路也非常有限，那大可以写好几个模板，放在旁边候选，其实也足够方便，还能随时修改：

![候选模板](https://media.kaerozhi.com/2026/07/c778dbfcd0eed189a2fb19f418edea52.png)

如果你觉得上述的方案已经可以满足你的需求，那不妨[**点击下载现阶段的工作流**](https://media.kaerozhi.com/2026/07/66ef0220757d9f3d5b535d814f0c0e6c.json)。毕竟做大做强都得付出时间和精力，自定义节点多折腾人。

只是人的阈值都是水涨船高的，我们不但要有场景，还要有故事……

引入故事那可就千变万化，不是几个现成模板就能满足的了，最好有个文件夹，里面都是一行行提前写好，几十上百行的剧本，简直就是视觉小说生产线啊。

当时我就灵机一动，这玩意不就是 wildcard 吗？

wildcard 是远在 SD 1.x 时代就出现的 ~~落后~~ 成熟技术。在 AI 生图的拓荒时代，玩家生成一张美女图并不容易，如果不确定衣服是红色绿色还是蓝色好看，发型是长发短发还是卷发大波浪更协调，就得考虑导入测试变量。安装好 wildcard 的相关节点之后，提示词里用 `__color__` 或 `__hairstyle__` 替换指定的颜色和发型，就能随机或者遍历所有变量了。

支持 wildcard 的节点包并不少。我们之前已经用到了 EasyUse 的提示词行节点，正好它也支持 wildcard，所以就不必他求，英文环境在节点库搜索 `wildcard`，中文环境搜索「通配符提示词矩阵」，这名字看上去是有点东西的。

![通配符提示词矩阵](https://media.kaerozhi.com/2026/07/4fad089f5dd548aff66a128f65ea4464.png)

我们在 EasyUse 的路径下，一般是 `ComfyUI\custom_nodes\ComfyUI-Easy-Use\`，会发现里面已经有一个 `wildcards` 文件夹，通常里面已经有一个 `example.txt` 文件，不必理会，直接在里面新建一个 photobook.txt，将之前写好的提示词粘贴进去，保存文件，然后重启 ComfyUI。

重启之后，重新组合我们的工作流，现在的工作流核心应该是这样的：

![工作流核心部分](https://media.kaerozhi.com/2026/07/8d5ec7bec9a1d81e201eafcfa1454f5d.png)

在「通配符提示词矩阵」节点点击下方的「选择添加通配符」，就能看到之前放进去的 photobook，点击之后会发现输入框内多了一个 `__photobook__`，这样就会逐行调取我们的提示词了。

上面的「选择添加Lora」我们不用管它。

第三行是「生成后控制」，一共有四个选项，分别是：

- **fixed** - 固定选取；
- **increment** - 递增选取，即按顺序读取。
- **decrement** - 递减选取，即倒序读取。
- **randomize** - 随机选取。

如果我们的写真集是有一点故事性的，比如一个雪国旅行的写真集，就差不多会有一个列车中、车站、街道、酒店、旅馆、温泉、居酒屋这么一个简单的流程，所以最好不要随机，`increment` 是最合适的安排。

最后还有一个「输出个数限制」，一般我们填 `-1` 全部输出即可，但一开始我们肯定要先抽几张看看品质调参数，所以第一波先填个 `4` 张看看。

然后跑起来，就会一次性输出全部的照片了。

![我扩充过提示词，所以一次性会输出16张](https://media.kaerozhi.com/2026/07/21d446b6cf450476bdfa93faf43eff63.png)

流程跑通了就好办了，我们只要在 `wildcards`  文件夹里添加新的提示词模板，以后就可以随心所欲地一键生成写真集了。

唯一的烦恼就是每次增加新的提示词都要重启 ComfyUI，调试起来会有点麻烦。

你可以[**点击此处下载使用 wildcards 的新工作流**](https://media.kaerozhi.com/2026/07/cdab5b168a02850d4ba8a8d8e3f5241a.json)。

## 三、用 AI 生成写真集模板

流水线已经打好了，可是模具还比较缺，目前只有一个简单的模板，多跑几遍也未免索然无味了。怎么办呢？

还好我们有万能的 AI，将我们的需求发送给 AI，让它来批量生成模板不就可以了？

向 AI 下达指令需要很精准，所以我们先向 AI 下达一份比较简略的需求，让它为我们生成那份精准而复杂的指令文档：

> 我希望用 ComfyUI 文生图功能为我创造的虚拟女明星打造一本写真集，请帮我在下文的基础上，扩写出针对AI（也就是你）的基本指令，以便AI为我输出底层框架，然后由我提供具体一本写真集的基本设置，再返回给AI完成最终文档，交给文生图大模型输出图片。
> 
> 1. 因为是虚拟形象，所以需要为文生图大模型严格设定每一张照片的主题（泳装、园林、时尚、运动甚至NSFW题材）、人物（服饰妆造、动作、表情）、环境（大环境可以泛指，但与人物有互动的物品则要尽量详细）、构图（全身、半身、特写，1/3法则，对称构图，仰拍，俯拍等）、光影（逆光、硬光、伦勃朗光、霓虹光）、配色，以及艺术风格等。 
> 2. 一本写真集需要相关联的多个场景，比如雪国冬旅，一般会有车站、温泉、滑雪场、居住屋等场景。 
> 3. 部分照片需要POV视角，与女主角进行亲密互动，以表现浪漫、甜蜜相关的主题。 
> 4. 写真集里都会插入一些意境、氛围都与主题相关的空镜，作为写真集的节奏点，否则全是人像未免过于单调了。空镜可能是大环境，比如群山之巅，比如夕阳下的海滩，大环境一般会加入主角的身影但占画幅比例较小。还有一种空镜是特写，比如树叶里楼下的阳光，雨后荷花骨朵上面停留的红蜻蜓，这种就不需要主角。
> 5. 
> 6. 交给文生图大模型的文档格式为 .txt，每行为一张照片的设定，每行前面不需要标注序号，行与行之间不留空格。 
> 
> 请先尝试输出这份底层框架

在跑了一一轮测试之后，我又追加了一些要求：

> 我觉得很不错，但还有需要调整的地方，首先是发送给AI的全局指令要修改： 
> 
> 1. 我们我们已经有了场景的概念，所以在输出照片时，我们按照场景来分组，可能车站的照片生成16张，温泉的照片生成16张，居酒屋16张，这样动作和情绪会更连贯。在生成的txt文档中，可以用 ## Scene 01. Spring 的格式为每个场景命名。 
> 2. 输出的 txt 文档，每个场景之间空一行，但每张照片之间不留空行。 
> 3. 写真集里都会插入一些意境、氛围都与主题相关的空镜，作为写真集的节奏点，否则全是人像未免过于单调了。空镜可能是大环境，比如群山之巅，比如夕阳下的海滩，大环境一般会加入主角的身影但占画幅比例较小。还有一种空镜是特写，比如树叶里楼下的阳光，雨后荷花骨朵上面停留的红蜻蜓，这种就不需要主角。 
> 4. 在非商业写真中，表现个人情绪的动作，比如奔跑、弱光环境会出现一些自然的韵动模糊，表现一种正在变化中的不稳定情绪，会更真实且更符合观者的情绪波动。我们也要看情况插入一些这样的照片。 
> 5. 我们还需要一些连续照片的拼贴，比如同一个面部特写的不同表情，同一组动作的连续捕捉（比如在雪地奔跑然后摔倒） 
>
> 请先按照以上意见修改全局指令

AI 的反馈非常积极，并且提出了一条被我忽略的「妆造一致性」概念，Great job!

然后我们顺势提出一本写真集的初步策划：

> 先按照雪国之旅的方案来制作一本日系文艺风格写真集，女主角日系文艺女青年形象，短发稍长一点，精致淡妆，设定的场景有有列车及车站（雪景），街道及居住屋，温泉、滑雪场、酒店私密房间等五个场景，注意户外与室内的衣着差别。照片不少于32张。

AI 思考之后丢给我一份 `Snow_Country_Letters_Directors_Cut_v1_Demo.txt`，里面包含五个场景三十几张照片的设定：

```
## Scene 01. Snow Railway Station

24 years old Japanese woman, shoulder-length short black bob hair, fair skin, natural Japanese makeup, beige wool coat, gray scarf, standing on a snowy railway platform holding a vintage suitcase, establishing shot, tiny figure in vast snowy station, 35mm, cinematic winter photography
24 years old Japanese woman, shoulder-length short black bob hair, beige wool coat, waiting beside platform, looking at arriving train, full body, rule of thirds, soft snowfall, documentary photography
24 years old Japanese woman, cream knit sweater inside train, writing travel journal beside window, half body, warm cabin light, film still
Detail shot, steaming coffee beside fogged train window, travel notebook, snowfall outside, shallow depth of field
POV, she smiles and hands over a travel ticket across the train table, warm cabin light
Motion photography, she runs toward departing train, slight motion blur, wind lifting scarf
Motion photography, she runs toward departing train, slight motion blur, wind lifting scarf, calm expression
Motion photography, she runs toward departing train, slight motion blur, wind lifting scarf, gentle smile
Ending shot, train disappearing into snowy mountains, tiny silhouette beside tracks

## Scene 02. Snow Town Street

Establishing shot, quiet Japanese snow town at dusk, small female silhouette walking through street
24 years old Japanese woman, dark green down coat, knitted hat, walking under warm lanterns, environmental portrait
24 years old Japanese woman, entering traditional wooden café, removing scarf naturally
Detail shot, knitted gloves beside ceramic coffee cup on wooden table
POV, she turns back waiting for companion at snowy crossing
Motion photography, laughing while running through falling snow, natural motion blur
Sequence, removing knitted hat
Sequence, brushing messy hair after wind
Ending shot, empty snow street with glowing windows at night

## Scene 03. Ryokan Hot Spring

Establishing shot, traditional ryokan surrounded by snow
24 years old Japanese woman, white yukata, standing in tatami room beside window
24 years old Japanese woman, sitting by kotatsu drinking tea
Detail shot, rising steam over outdoor hot spring
POV, she invites viewer to sit beside window and watch snow
Hair continuity, slightly damp hair after bath, same natural makeup
Ending shot, snowy courtyard under warm lantern light

## Scene 04. Snow Mountain Ski Resort

Establishing shot, panoramic snowy mountain
24 years old Japanese woman, white ski suit, skis on shoulder
Motion photography, skiing downhill with controlled motion blur
Sequence, stopping
Sequence, removing goggles and smiling
Detail shot, skis leaning against wooden fence covered in snow
Ending shot, cable car disappearing into mountain mist

## Scene 05. Mountain Hotel Night

Establishing shot, luxury hotel room overlooking snowy mountains
24 years old Japanese woman, oversized white shirt and knit cardigan, reading by window
Wardrobe continuity, cardigan removed, sitting on bed in same shirt
POV, showing travel photographs on camera
Detail shot, open diary, instant photos, fountain pen on wooden desk
Close-up, quiet smile looking outside
Ending shot, sunrise beyond snowy peaks viewed from balcony
```

之所以让AI这样做，是因为一次性生成太多照片的话，系统硬件并不是无限制的，很容易拉爆显存，所以每个场景十来张，先丢到上面的第一个工作流中测试（可以实时修改），测试调整之后再另存到 wildcard 目录下作为以后的模板使用。

当然，我们可以将同样的指令搭配写真集的初步策划同步发送给豆包、Deepseek、智谱和千问，如果你有条件，境外的 ChatGPT、Gemini、Grok，尽可以群英荟萃百花齐放。

比如我们把第一个车站场景丢进去测试，得到的结果是：

![雪国冬旅列车篇](https://media.kaerozhi.com/2026/07/f42e3ba323f562f9c44bfd0fd5a3b19b.png)

发现 bug 还是不少，服饰妆容的一致性果然需要重视，看来全局指令还需要继续迭代。

当然，现阶段全靠AI还是不太现实，该插手时就插手，结果怎么样，毕竟自己才是最在乎的那个人。

## 四、直接在工作流中接入 AI 实时生成


## 五、解决分辨率单一的问题

## 六、保持角色一致性的两个方法

### 6.1 Lora

### 6.2 换脸工作流