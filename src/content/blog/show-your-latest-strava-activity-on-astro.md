---
title: 在 Astro 上展示 Strava 最近一次骑行
date: 2025-06-30T00:00:00.000Z
categories:
  - 技术
tags:
  - Strava
---
这两天在编辑「[关于](/about)」页面，内容有些单薄，考虑填充个人的一些活动在里面。作为一个懒人，很惭愧，值得分享给大家的活动并不多，骑行算是其中一种，于是就想着怎么把 Strava 的数据展示出来。如果你也是 Strava 用户，希望能有所启发。

本人基本上属于菜鸟水平，以下的操作参考了 Strava 的[官方开发者文档](https://developers.strava.com/docs/getting-started/)，并通过 ChatGPT 辅助完成。

## 第一步：获取 Strava Access Token

所有操作的前提是已经有一个 Strava 账号。Strava 使用 OAuth 2.0，你需要：

1. 创建一个 Strava 应用：[Strava Developer Portal](https://www.strava.com/settings/api)。需要注意的是最后一项「域」，在您的网站正式上线前，此项可以填 `localhost` 以便测试，上线后再改为正式域名即可；
    
2. 获取客户 ID `client_id` 和客户端密钥 `client_secret`；
   
3. 



---

## 参考

- [astro-strava-map](https://github.com/larryhudson/astro-strava-map)，该项目会将 Strava 的所有活动展示在地图上，但我只想展示最近的一次活动，所以只采用了部分代码；
- [Node-Strava-V3 开源项目教程](https://blog.csdn.net/gitblog_00090/article/details/141617688)
- [Strava V3 Examples on CodeSandbox](https://codesandbox.io/examples/package/strava-v3)
- [Show off your Strava stats on your Next.js site (statically!)](https://www.thomasledoux.be/blog/strava-stats-nextjs)
