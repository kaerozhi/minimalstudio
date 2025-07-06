---
title: 在 Astro 上展示豆瓣电影
date: 2025-07-01T00:00:00.000Z
categories:
  - 技术
tags:
  - Astro
  - 豆瓣电影
---
搞定 Strava 的骑行展示之后，决定再接再厉，把平时使用频率比较高的四个平台都展示出来，分别是：

- [Strava 最近一次骑行](/blog/strava-on-astro)。刚刚搞定；
- 豆瓣最新标记为看过的一部电影；
- Spotify 最新标记为喜欢的一首歌；
- 小宇宙最新标记为听过的一期播客。

话不多说，叫上 ChatGPT，Let's go!

## 获取豆瓣数字 ID

豆瓣没有公开的 OAuth API，所以我们需要用「曲线救国」方式来实现。豆瓣为每个用户提供 RSS Feed，例如：

```bash
https://www.douban.com/feed/people/{你的豆瓣 ID}/interests
```

这个 ID 获取非常简单，网页端打开个人主页，右侧的个人信息模块上就有：

![我的个人信息模块](https://media.kaerozhi.com/2025/07/52c480ed281aa9f57de43f37076c27c7.webp)

注意第二行的 `2237229 (kaero)` 了没？前面的数字就是我们需要的 ID 了。所以我的 RSS 地址就是：

```bash
https://www.douban.com/feed/people/2237229/interests
```

## 获取 RSS 数据

我们新建一个文件 `/api/douban.ts`，代码如下：

```typescript
import type { APIRoute } from 'astro';
import Parser from 'rss-parser';

type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  content?: string;
};

const parser = new Parser<{}, FeedItem>();

export const GET: APIRoute = async () => {
  // 此处请替换成你的数字 ID
  const feed = await parser.parseURL('https://www.douban.com/feed/people/{YOUR-ID}/interests');
  const latest = feed.items?.[0];

  if (!latest) {
    return new Response(JSON.stringify({ error: 'No entries found' }), { status: 404 });
  }

  const cleanTitle = latest.title.replace(/^看过\s*/, '');
  const html = latest.content || '';

  // 推荐等级 -> 星级映射
  const ratingTextMatch = html.match(/推荐[:：] ?(力荐|推荐|还行|较差|很差)/);
  const ratingMap: Record<string, string> = {
    '力荐': '★★★★★',
    '推荐': '★★★★',
    '还行': '★★★',
    '较差': '★★',
    '很差': '★',
  };
  const rating = ratingMap[ratingTextMatch?.[1] || ''] || '暂无评分';

  // 提取图片
  const imgMatch = html.match(/<img src="([^"]+)"/);
  const poster = imgMatch?.[1] || '';

  // 时间格式
  const rawDate = new Date(latest.pubDate);
  const formattedDate = rawDate.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return new Response(
    JSON.stringify({
      title: cleanTitle,
      link: latest.link,
      rating,
      poster,
      pubDate: formattedDate,
    }),
    { status: 200 }
  );
};

```

运行代码之前需要先安装 `rss-parser`：

```bash
npm install rss-parser
```

然后访问 `http://localhost:4321/api/douban`，得到类似这样的数据：

```json
{"title":"大菩萨岭","link":"https://movie.douban.com/subject/1440164/","rating":"★★★★","poster":"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2187846310.jpg","pubDate":"2025年6月21日"}
```

说明已经解析成功。

## 电影展示

新建一个 `/components/Douban.Astro`，代码如下：

```typescript
---
const res = await fetch('http://localhost:4321/api/douban');
const movie = await res.json();
---
<div>
  <div >
    <label>最近一部电影</label>
    <a href={movie.link}><img src={movie.poster} /></a>
  </div>
  <h2><a href={movie.link}>{movie.title}</a></h2>
  <p>{movie.rating} | {movie.pubDate}</p>
</div>
```

不过这里却发生一个意外的问题，其他数据都正常，只有电影海报无法显示，直接访问图片网址倒是 ok 的。很显然，豆瓣屏蔽了部分图片的站外引用，这是他们反爬机制的一部分，尤其是电影海报图这种热门资源。

豆瓣会对以下情况进行限制：

- 图片被外部网站直接引用（即浏览器直接请求 img9.doubanio.com 等）；
- 请求没有合适的 Referer（非 douban.com）；
- 请求太频繁或来自非浏览器。

于是会出现：

- 图片无法加载；
- 控制台报错：`403 Forbidden` 或 `net::ERR_BLOCKED_BY_RESPONSE`。

不过我们可以通过代理转发图片来规避豆瓣的站外引用策略。新建一个文件 `/api/proxy-img.ts`，将图片通过服务器中转，绕开防盗链。

```typescript
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const target = new URL(url).searchParams.get('url');
  if (!target) return new Response('Missing url', { status: 400 });

  const res = await fetch(target, {
    headers: {
      Referer: 'https://movie.douban.com/', // 冒充豆瓣页面请求
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
    },
  });

  const contentType = res.headers.get('content-type') || 'image/jpeg';
  return new Response(res.body, {
    status: 200,
    headers: {
      'Content-Type': contentType,
    },
  });
};

```

然后将 `/components/Douban.Astro` 中的 `<img src={movie.poster} />` 替换为以下代码：

```typescript
<img src={`/api/proxy-img?url=${encodeURIComponent(movie.poster)}`} />
```

搞定！

## 最终效果

相比 Strava，豆瓣的展示可谓行云流水手到擒来，经过一番修饰，最终的呈现效果是这样：

![与 Strava 肩并肩](https://media.kaerozhi.com/2025/07/289812e99cc205bd81ac70f91011bc25.webp)

感觉还不错。接下来继续挑战音乐与播客，敬请期待。
