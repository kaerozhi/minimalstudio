---
title: 用 Synology Drive 同步 Obsidian 仓库
date: 2023-05-31T11:36:27.000Z
categories:
  - 软件
tags:
  - Obsidian
  - Synology Drive
  - NAS
photos:
  - 'https://media.kaerozhi.com/2025/06/41850176ac14f298242d68cdd2a443ad.webp'
---
转用 Hexo 以后，在桌面端更新是没问题了，但如果出门在外，又希望分享一些东西，能否做到呢？

我平时都用 Obsidian 来写 Markdown，在 [Hexo 的安装与配置](/playground/web/hexo-and-new-blog/) 一文中，我介绍了如何配置 Obsidian 与 Hexo 无缝协作。Obsidian 也有移动端 App，所以这两天就想，能否通过网盘同步 Obsidian 的仓库，随时随地写 Hexo 里面的 Markdown 呢？

<!-- more -->

同时为了开源节流，如果目标能通过 NAS 搞定，就尽量不使用云服务。我家的 NAS 装的是 Unraid，同时也通过虚拟机装了群晖。最近因为 OneDrive 被墙，所以一直考虑逐步用 Synology Drive 作为替代。既然如此，不如就先试试能否用 Synology Drive 来同步 Obsidian 仓库。

## Synology Drive 服务器端

打开 Synology Drive 管理控制台，在团队文件夹里启用 Hexo 所在的 `web` 文件夹。

![Synology Drive 服务器端配置](https://media.kaerozhi.com/2025/06/a041aecc056218dc463a8e04a6b5ae29.webp)

不过团队文件夹只能选择根目录下面的文件夹，不能直接定位至 Markdown 文档所在的 `/web/Hexo/source`，略有遗憾。

## Synology Drive 手机端

服务器端的配置就到此为止，接下来下载移动端的 Synology Drive。

我用的是 Android 手机，App 怎么下载不赘述。打开 App，登录到自家的群晖，进入主界面，从下方的主菜单转到“**更多**”。

![](https://media.kaerozhi.com/2025/06/ec5fb06355848c7137d7da2dcc36f57b.webp)

然后点击“备份和同步任务”，里面只有两个选项，一个是“照片备份”，群晖用户备份照片肯定用 Synology Photos，这里略过就好。另外一个是“同步任务”：

![备份和同步任务](https://media.kaerozhi.com/2025/06/77938ff7a14a93bc88945c8046103c4a.webp)

点击同步任务，初次打开列表自然是空白的，直接点击右上角的加号，开始创建任务：

我们逐个设置界面上的各种选项：

1. **服务器上的远程路径**，就是我们之前在服务器上指定的 `Hexo/source` 文件夹；
2. **本地路径**，Synology Drive 会提示“*请先允许 Drive 访问文件夹*”，点击确定；
   我们在文件管理器的根目录先新建一个 `Hexo` 目录，然后在其中再建一个 `source` 文件夹，这样就与服务器端对应上了；
3. **模式**一般选择“**双向**”，如果手机上只限于收集和记录灵感，正式的文章留到电脑上再编辑，那选择“**仅上传**”也 OK，需要同步的数据会小很多；
4. 其他的保持默认即可，也可以根据自身偏好自行配置。

最后点击右上角的“**完成**”，回到同步任务界面，应该会看到当前的任务已经在同步了。

![任务同步中](https://media.kaerozhi.com/2025/06/25f8c1da8fbab14c2505a63b148feffc.webp)
打开系统文件管理器，找到 `Hexo/source` 文件夹，确认无误，Synology Drive 客户端的配置就完成了。

## Obsidian 的配置

同样，先安装 Obsidian App，进入主界面。Obsidian 并不会根据系统语言自动配置界面语言，我们稍后再设置。

![Obisidian 主界面](https://media.kaerozhi.com/2025/06/d24a1ba83390a4e41b21b973a35395a8.webp)

点击主界面上的 `Open folder as vault`，找到我们之前同步的 `Hexo/source` 文件夹，选择底部的“**使用此文件夹**”：

![使用此文件夹](https://media.kaerozhi.com/2025/06/f501a4ceb5b5f60275a5f8aea49be9bc.webp)

然后就可以将这个文件夹作为 Obsidian 仓库使用了，打开其中的一个 Markdown 文档 试试：

![Markdown 编辑界面](https://media.kaerozhi.com/2025/06/5f0c48973afe8e3a3d971f8b83ab2bfe.webp)

Bingo！

最后我们手动配置一下界面语言。

点击右上角的仓库图标，从左侧滑出主菜单，点齿轮图标进入设置界面。选择 `About`，第二项 `Language` 找到简体中文，然后 **Relaunch** 重启，就是中文界面了。

![配置中文界面](https://media.kaerozhi.com/2025/06/7393cd46cc985d1dd708a867ec5c8b6c.webp)

至此目标全部达成，撒花~
