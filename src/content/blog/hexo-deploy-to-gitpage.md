---
title: Hexo 同步 Github Page
date: 2023-07-15T08:26:00.000Z
categories:
  - 玩艺
  - 网站
tags:
  - Hexo
  - Github
description: 只求一键三连能成功！
photos:
  - 'https://media.kaerozhi.com/2025/06/dd7762e18e61a0b49ada020c98d334b5.webp'
---
说起 Hexo，用户最熟悉的操作自然是 `hexo clean && hexo g && hexo d`，但很不幸的是，不知是哪里出了错，我的 `hexo d` 还从未操作成功过。

<!-- more -->

可能我的部署环境比较特殊，是一台黑群晖。按照[官方文档](https://hexo.io/zh-cn/docs/one-command-deployment.html)配置 `_config.yml`：

``` yml
deploy:
  type: git
  repo: https://github.com/kaerozhi/kaerozhi.bitbucket.io
  branch: main
  token: [token]
```

运行 `hexo d` 之后会提示输入用户名和密码，然后报错：

``` bash
remote: Support for password authentication was removed on August 13, 2021.
remote: Please see https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls for information on currently recommended modes of authentication.
fatal: Authentication failed for 'https://github.com/kaerozhi/kaerozhi.github.io.git/'
FATAL Something's wrong. Maybe you can find the solution here: https://hexo.io/docs/troubleshooting.html
Error: Spawn failed
    at ChildProcess.<anonymous> (/volume1/web/Hexo/node_modules/hexo-util/lib/spawn.js:51:21)
    at ChildProcess.emit (node:events:513:28)
    at ChildProcess._handle.onexit (node:internal/child_process:291:12)
```

搜索了很多解决办法。首先，按照 [使用 personal token 将 Hexo 本地文件推到 GitHub](https://blog.csdn.net/qq_43659183/article/details/126041835) 的办法，将 Token 加入 repo：     

``` yml
deploy:
  type: git
  repo: https://[token]@github.com/kaerozhi/kaerozhi.github.io.git
  branch: main
```

可惜仍然报错：

``` shell
fatal: unable to stat 'tags/Blog-Tools/index.html': No such file or directory
```

只不过这个错误跟之前不太一样，看起来是个权限问题。

既然此路不通，那就跳船。按照这篇文章；[2023 年了，怎么用 Github Action 与 hexo 发布在 Github Pages 上发布文章](https://ayase.moe/2023/02/12/deploy-hexo-in-2023/) ，配置需要更新写法：

``` yml
deploy:
  type: git
  repo: https://github.com/aaaa/bbb.git
  token: '' # ❌

deploy:
  type: git
  repo:
    github:
      url: https://github.com/aaaa/bbb.git
      token: '' # ✅
```

这次运行了一段时间才报错：

``` bash
fatal: unable to access 'https://github.com/kaerozhi/kaerozhi.github.io.git/': HTTP/2 stream 1 was not closed cleanly before end of the underlying stream
```

还是有权限问题？实在没辙，只能再看看 SSH 能否奏效。但该文所说的「在部署前增加一个配置 SSH 的 action」，我不明白应该在什么地方操作，不知是 Github 还是本地？总之拿不太准，只能再换参考。

然后找到这一篇：[使用 Hexo 在 Github 上建博客](https://www.cnblogs.com/v1coder/p/16358864.html)，因为 SSH Keys 已经生成过了，所以直接输入：

```bash
cat ~/.ssh/id_rsa.pub
```

将内容复制到 GitHub –> Settings –> SSH and GPG keys –> NEW SSH key。然后将 `_config.yml` 里的 deploy 部分改成以下格式：

```yaml
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repository: git@github.com:yourname/yourname.github.io.git
  branch: master
```

运行 `hexo d`，居然跑通了！泪流满面~  之前也上传过 SSH Key，但可能配置文件并不是这个格式写的，真是太折腾人了。

不过又遇到了新的问题，文件夹太大了，囧：

``` bash
remote: fatal: pack exceeds maximum allowed size (2.00 GiB)
```

检查了一下文件夹，发现游记里的图片过于巨大，动辄五六百M。赶紧用 Photoshop 批处理至 1920x1080px，把整个包压缩到了 1G 以内。~~然后来一发爽快的 Hexo 三连，顺利收工。~~ 翌日起床，发现最后还是超了上限，也不知道什么原因，只能继续给文件夹瘦身，但再试依然失败。一怒之下删了整个 `.deploy_git` 文件夹，然后一键三连，嘿嘿，这次终于成功。

此时访问 https://kaerozhi.github.io ，应该能正常浏览了，稍后再设置一个自定义域名。
