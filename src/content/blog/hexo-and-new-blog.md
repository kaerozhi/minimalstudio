---
title: Hexo 的安装与配置
date: "2023-05-27"
categories:
  - Sitelog
tags:
  - Hexo
  - Synology
  - Obsidian
photos:
  - 'https://media.kaerozhi.com/2025/06/4c178a66234170aa24ca739d112b396c.webp'
---
最近计划把自己的[个人网站](https://kaero.org)转移到本地的 NAS 上，但 Wordpress 用了这么多年，确实越来越臃肿，最新的模块化编辑器确实很简单，但主题定制的成本也更高了。所以这次就琢磨着趁机改换门庭，试试其他博客平台。
<!-- more -->
[Typecho](https://typecho.org/) 虽然轻量化，但开后台写文章的路数与 Wordpress 并无太大差异，而主题、插件的生态又远不如 Wordpress 繁荣多元。最要命的是，不知是我的 Wordpress 数据包太大，还是 NAS 存在性能瓶颈，总之 Typecho 试着导入好几次，每次都卡在百分之三四十就报错。即便我没有任何其他不满，光这一点就足以杀死该进程了。

然后就是 [Hexo](https://hexo.io) 了。本地写 Markdown，服务器端一键生成静态文件，这个模式确实简便。我行文经常卡住，拖十天半月实属寻常，拖十几年都没有写完的题目还有好几篇呢……王师北定中原日，一个 `hexo g` 命令敲下去，痛快！

## 安装 Hexo

参考张大妈上的一篇文章：[在群晖上部署快速简洁且高效的博客框架HEXO](https://post.smzdm.com/p/az39o2xp/)，按部就班，顺利完成。只不过仍有一些疑问：

1. **np日常国内镜像**，安装之后输入 `cnpm -v` 查看版本，输出的是：
   ```
   cnpm@9.2.0 (/usr/local/lib/node_modules/cnpm/lib/parse_argv.js)
   npm@9.6.7 (/usr/local/lib/node_modules/cnpm/node_modules/npm/index.js)
   node@18.12.0 (/volume1/@appstore/Node.js_v18/usr/local/bin/node)
   npminstall@7.9.0 
   /usr/local/lib/node_modules/cnpm/node_modules/npminstall/lib/index.js)
   prefix=/usr/local
   linux x64 4.4.180+
   registry=https://registry.npmmirror.com
   ```
   看起来已经成功，但实际上有没有生效，我一点拿不准，毕竟 `npm install` 拉取超时的错误仍旧经常发生；
2. 原文经常切换普通账号与 root 账号，颇有些应接不暇。在我应该不存在误操作的情况下，如果登录的是普通账号，则无法通过 `hexo init blog` 命令去建立 Hexo 的安装目录，必须用 root 账号才能完成这一步；
3. 前一个问题导致，所有与 Hexo 相关的命令都必须通过 root 账号才能操作，不知何解？虽然普通用户也有文件夹的操作权限，映射到本地写 Markdown 并不受影响，但后续还得再研究一下。

## 配置 Hexo

Hexo 的配置比较简单，按照[官方文档](https://hexo.io/zh-cn/docs/index.html)操作，基本顺利。不过有几点需要注意：

1. **`language`** 参数，中文用户自然默认设置为 `zh-CN`，但某些主题会产生奇怪现象。比如 [Minos](http://ppoffice.github.io/hexo-theme-minos/) 主题，`zh-CN` 会导致界面上出现德文，改为小写的 `zh-cn` 则恢复正常。
2. **`permalink`** 参数，我一度将其设置为 `':categories/:title/'`，结果输出为 `https://kaerozhi.com/[object object]/posttile/`，当时纳闷了半天，后来改作 `':category/:title/'` 就正常了。
3. **`category_map`** 参数，官方文档没有具体说明，我将其理解为分类名称与用于链接的别名，然而设置之后似乎没有任何效果。后来查阅[资料](https://paugram.com/coding/hexo-secret-usage.html)，发现是我理解错了。我原以为，如果 `_config.yml` 这么写：
   ```
   category_map:
     '随笔': blog
     '文字': writings 
     '游历': tours
     '玩艺': playground
     '观点': thoughts
   ```
   然后 Markdown 的 Front-Matter 内配置 `categories: writings`，那么 Hexo 在前端会将分类显示为 “文字”。但 Hexo 的实际逻辑是，你的 Front-Matter 写作 `categories: '文字'`，然后链接地址会自动给你转为 `https://kaerozhi.com/writings/yourpost`。
4. `tag_map` 同理。

## 从 Wordpress 导入

Hexo 没有 `/wp-admin` 这样的后台管理界面，无法通过图形界面导入 Wordpress 数据。虽然后台也可以自行安装，但完全没这个必要。毕竟 Hexo 的设计初衷就不走这条路，既然选择了 Hexo，自然也就不图一个图形界面了。

我使用的是一个名为 [wordpress-export-to-markdown](https://github.com/lonekorean/wordpress-export-to-markdown) （后文简称 WE2M）的脚本，可以将 Wordpress 导出的 xml 转换成每篇文章、页面各自独立的 Markdown 文档集合，用过的图片也可以选择一并下载到本地。即使你只写 Markdown 但不捣鼓 Hexo，这个脚本也值得推荐。

操作很简单，只要本地安装 Node.js 环境，然后运行以下命令：
```
npx wordpress-export-to-markdown
```
过程中会有几个选项，一般保持默认即可，也可以根据自身需求灵活选择。

Wordpress 数据包的解析非常快，脚本完成的时间还是取决于需要下载的图片包有多大。脚本结束后，在 Typora、Obsidian 查看导出的 Markdown 文档，一般都能正常显示。

参阅[官方文档](https://hexo.io/zh-cn/docs/asset-folders)，如果 `_config.xml` 保持默认的资源配置：
```
post_asset_folder: false
```
则 Hexo 会统一从 `/images/` 读取图片，那每篇文章都能正常显示。WE2M 默认也会将所有图片下载到 `images` 文件夹。

但是，如果和我一样经常在文章里引用大量的照片，那应该也会倾向给每篇文章指定独立的资源文件夹，Hexo 与 WE2M 就没法完美匹配了。

## 给每篇文章配置独立资源文件夹

当然，我这样的强迫症还是免不了作死，如前文所述，我改了 Hexo 的资源配置：
```
post_asset_folder: true
```
此时 Hexo 会给每篇文章生成独立的资源文件夹。观众老爷可能要发问：这有什么影响？

本来不会有什么影响的，但因为 Hexo 的奇异机制，如果你用 `![](image.jpg)` 在 Markdown 文档中插入图片，图片在文章页面显示正常，但首页却不显示。

根据官方建议，我们可以安装 [hexo-renderer-marked](https://github.com/hexojs/hexo-renderer-marked) 来规避这个问题，如需启用：
```
post_asset_folder: true  
marked:  
  prependRoot: true  
  postAsset: true
```
启用之后，文章页面和首页都可以正常显示。

## 与 Obsidian 协作

用 Obsidian 直接将 `Hexo/source` 文件夹作为仓库打开，即便不作任何设置，基本也能完美接管 Hexo 的内容创作部分。

但因为我们在 Hexo 里面配置了每篇文章生成单独的资源文件夹，与之对应，在 Obsidian 中，我们也需要将文章用到的图片收纳到指定的同名文件夹，这样 Hexo 每次生成静态网站的时候才不需要额外的配置。

这里要用到一个 Obsidian 的第三方插件 [Custom-Attachment-Location](https://github.com/RainCat1998/obsidian-custom-attachment-location)。不知为何，我在第三方插件市场能找到该插件，但无法安装，只能按照以下步骤手动安装：

1. 在插件的 Github 页面下载最新版的 `main.js`、`manifest.json`；
2. 将以上的两个文件复制到已经建立 Obsidian 仓库的 Hexo 文件夹：`Hexo/source/.obsidian/plugins/obsidian-custom-attachment-localtion/`；
3. 最后在 Obsidian 设置界面启用该插件。

设置很简单，将 Default location for new attachments（默认资源路径）设置为 `./${filename}`，插入文章的图片就会自动收纳到与文章同名的子文件夹了。

还有一点，Obsidian 插入图片时，默认会写作 `![[image.jpg]]`，但这种格式 Hexo 无法识别，在 Obsidian 的设置界面找到 `文件与链接 > 使用 Wiki 链接`，将其关闭。再次插入图片，就会变成 Markdown 通用格式 `![](image.jpg)`了。

如此一来，Obsidian 与 Hexo 差不多做到无缝接入。
