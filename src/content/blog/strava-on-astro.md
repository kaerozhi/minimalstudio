---
title: 在 Astro 上展示 Strava 骑行数据
date: 2025-06-30
categories:
  - 技术
tags:
  - Strava
  - Astro
---
这两天在编辑「[关于](/about)」页面，内容有些单薄，考虑填充个人的一些活动在里面。作为一个懒人，很惭愧，值得分享给大家的活动并不多，骑行算是其中一种，于是就想着怎么把 Strava 的数据展示出来。如果你也是 Strava 用户，希望能有所启发。

本人基本上属于菜鸟水平，以下的操作参考了 Strava 的[官方开发者文档](https://developers.strava.com/docs/getting-started/)，并通过 ChatGPT 辅助完成。

## 第一步：注册 Strava API

所有操作的前提是已经有一个 Strava 账号，按以下步骤开始：

1. 创建一个 Strava 应用：[Strava Developer Portal](https://www.strava.com/settings/api)。需要注意的是最后一项「域」，在您的网站正式上线前，此项可以填 `localhost` 以便测试，上线后再改为正式域名即可；
    
2. 获取相关数据。
    ![Strava API 结果页](https://media.kaerozhi.com/2025/07/7bd1316f08e22a96755213732024b936.webp)

3. 将相关数据记录在 Astro 的 `.env` 环境变量中，如下图所示。*如果项目文件夹根目录没有 `.env` 文件，请自行创建。*
    ```typescript
    STRAVA_CLIENT_ID = 123456 // 换成你的客户 ID
    STRAVA_CLIENT_SECRET = abcd123456 // 换成你的客户密钥
    ```
   
## 第二步：获取 Access Token

Strava 使用 OAuth 2.0，需要用 code 换取 access token 和 refresh token 才能获得所有 API 的授权，否则就只能通过 `athelet.get()` 获取基本的个人信息。

首先，我们检查一下 `astro.config.mjs` 是否正常设置，请确认其中包含了：

```typescript
import { defineConfig } from 'astro/config';  

export default defineConfig({
  output: 'server', // 请确认是否有该项设置
});
```

如果没有设置 `output: 'server'`，就无法获取 callback 网址中的 query 参数，也就没法正常换取 access token。

然后在 `.env` 文件中添加新的变量：

```typescript
STRAVA_CLIENT_ID = 123456 // 换成你的客户 ID
STRAVA_CLIENT_SECRET = abcd123456 // 换成你的客户密钥
STRAVA_REDIRECT_URI = "http://localhost:4321/api/strava-callback" // callback 网址
PUBLIC_BASE_URL = "http://localhost:4321" // 绝对地址，防止相对路径导致失败
```

准备工作完成，下面是相关的文件结构：

```css
src/
└── strava-token.json            // 用来保存换取的 Token
└── pages/
    └── strava.astro             // Strava 展示界面
    └── api/
        └── strava.ts            // 获取最近一次活动
        └── strava-auth.ts       // 一键授权跳转
        └── strava-callback.ts   // 授权并保存 Token
```

`strava-auth.ts` 代码：

```typescript
// src/pages/api/strava-auth.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const params = new URLSearchParams({
    client_id: import.meta.env.STRAVA_CLIENT_ID,
    response_type: 'code',
    redirect_uri: import.meta.env.STRAVA_REDIRECT_URI,
    scope: 'activity:read_all',
    approval_prompt: 'force',
  });

  const authUrl = `https://www.strava.com/oauth/authorize?${params.toString()}`;

  return Response.redirect(authUrl, 302);
};
```

`strava-callback.ts` 代码：

```typescript
// src/pages/api/strava-callback.ts
import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code', { status: 400 });
  }

  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: import.meta.env.STRAVA_CLIENT_ID,
      client_secret: import.meta.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    }),
  });

  const data = await res.json();

  // 保存到本地文件
  const tokenFile = path.resolve('./strava-tokens.json');
  await fs.writeFile(tokenFile, JSON.stringify({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at,
  }, null, 2));

  return new Response('✅ Token 已保存，授权成功！');
};
```

此时访问 [http://localhost:4321/api/strava-auth](http://localhost:4321/api/strava-auth)，就会跳出 Strava 的授权页面：

![Strava 授权页面](https://media.kaerozhi.com/2025/07/060d29c42e17d3e5d4598064286925d1.webp)

点击授权之后，应该能看到「*Token 已保存，授权成功！*」的消息，如果看到的是 `missing code status: 400`，一般就是前文提及的原因，没有设置 `output: 'server'`。

## 第三步：获取 Strava 数据

`strava.ts` 代码：

```typescript
// src/pages/api/strava.ts
import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

const TOKEN_FILE = path.resolve('./strava-tokens.json');

async function readToken() {
  const raw = await fs.readFile(TOKEN_FILE, 'utf-8');
  return JSON.parse(raw);
}

async function saveToken(tokenData: any) {
  await fs.writeFile(TOKEN_FILE, JSON.stringify(tokenData, null, 2));
}

async function refreshToken(refresh_token: string) {
  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: import.meta.env.STRAVA_CLIENT_ID,
      client_secret: import.meta.env.STRAVA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });
  const data = await res.json();
  await saveToken(data);
  return data.access_token;
}

export const GET: APIRoute = async () => {
  const now = Math.floor(Date.now() / 1000);
  let tokenData = await readToken();

  if (tokenData.expires_at <= now) {
    tokenData.access_token = await refreshToken(tokenData.refresh_token);
    tokenData = await readToken();
  }

  const res = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=20`, {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const activities = await res.json();

  // 找到第一个 type 为 Ride 的活动
  const rideActivity = activities.find((a: any) => a.type === 'Ride');

  if (!rideActivity) {
    return new Response(JSON.stringify({ error: '没有找到骑行活动' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(rideActivity), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

```

因为我只想获取最近的一次骑行，如果你想获取别的活动，比如跑步什么的，将这一行中的 `Ride` 改成 `Run` 就可以了，具体的筛选参数请参考 [Strava API](https://developers.strava.com/docs/reference/#api-Activities)。

```typescript
const rideActivity = activities.find((a: any) => a.type === 'Ride');
```

接着在 `strava.astro` 中展示相关数据就好了：

```html
---
const baseUrl = import.meta.env.PUBLIC_BASE_URL || 'http://localhost:4321';
const res = await fetch(`${baseUrl}/api/strava`);
const activity = await res.json();
---
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>我的 Strava 最近活动</title>
  </head>
  <body>
    <h1>最近一次 Strava 活动</h1>

    {activity ? (
      <div style="border:1px solid #ccc; padding:20px; max-width:400px;">
        <h2>{activity.name}</h2>
        <p>距离: {(activity.distance / 1000).toFixed(2)} 公里</p>
        <p>时间: {Math.floor(activity.moving_time / 60)} 分钟</p>
        <p>平均速度: {(activity.average_speed * 3.6).toFixed(1)} km/h</p>
        <p>开始时间: {new Date(activity.start_date).toLocaleString()}</p>
      </div>
    ) : (
      <p>没有获取到活动数据。</p>
    )}
  </body>
</html>
```

如果你只是想展示数据，那到这一步也就足够了。但我觉得还不够，毕竟干巴巴的数据呈现出来没有什么感染力，必须得配图！所以就挖了后面这个深坑。

## 第四步：绘制骑行地图

很难想象 Strava 的主界面缺少了这些图像化的运动轨迹会多么干燥，现在咱们想要的不就是这个吗？

![Strava 主界面，好友 ID 已作隐私处理](https://media.kaerozhi.com/2025/07/d1f0354c948fdb5f4487cee48b5a4b4d.webp)

说干咱就干！在这里需要用到两个相关的库，[PolyLine](https://github.com/mapbox/polyline) 和 [LeafLet](https://github.com/Leaflet/Leaflet)。

修改 `strava.astro` 如下：

```html
---
const baseUrl = import.meta.env.PUBLIC_BASE_URL || 'http://localhost:4321';
const res = await fetch(`${baseUrl}/api/strava`);
const activity = await res.json();
const encoded = activity?.map?.summary_polyline || '';

// 传递 encoded 参数
const script = `<script>
  const encoded = ${JSON.stringify(encoded)};
  console.log(encoded);
</script>`;
---

<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>我的骑行活动</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    />
    <style>
      #map {
        height: 400px;
        max-width: 600px;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <h1>{activity.name}</h1>
    <p>距离: {(activity.distance / 1000).toFixed(2)} 公里</p>

    <div id="map"></div>
    <div set:html={script}></div>

	<script>
	  import L from "https://cdn.skypack.dev/leaflet";
	  import polyline from 'https://cdn.skypack.dev/@mapbox/polyline';
	
	  const coords = polyline.decode(encoded);
	
	  const map = L.map("map");
	
	  // ✅ 使用 OpenStreetMap 瓦片图层
	  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	    maxZoom: 19,
	    attribution: "&copy; OpenStreetMap contributors",
	  }).addTo(map);
	
	  const track = L.polyline(coords, {
	    color: "blue",
	    weight: 4,
	  }).addTo(map);
	
	  map.fitBounds(track.getBounds());
	</script>
  </body>
</html>
```

如果地图不能正常显示，需要仔细检查相关文件是否正确加载（*强国局域网！开发者的究极噩梦*）。如果出现 `polyline is not defined` 之类的报错信息，请尝试寻找可用的国内 CDN。

如果一切顺利，此时地图和轨迹应该显示正常，比如我稍作修饰之后，如下图所示：

![初步展示](https://media.kaerozhi.com/2025/07/63460418308c7a48c52d149c0eed4926.webp)

但这里还是有不少问题：

1. 地图太花了，对比 Strava App 的显示效果，差距明显。也可以参考苹果地图 App，信息减少，对比度降低；
2. 默认轨迹显示为蓝色，令人无语，你们这些程序员都不修审美课的吗？
3. 缩放控件在左上角，和我设置的小标签位置冲突，能不能挪到右下角？

参考 Leaflet 的[中文文档](https://leafletjs.cn/)，逐一修正如下：


### 修改默认轨迹的颜色

这个应该是最简单的，在上面的代码中找到这一段：

```javascript
  const track = L.polyline(coords, {
	color: "blue",
	weight: 4,
  }).addTo(map);
```

其中的参数都可以定制，包括：

 - `color: "blue"` 轨迹的颜色，可设置为任意色值，我将其设为 Strava 的品牌色橙色；
 - `weight: 4` 轨迹线条的粗细；
 - `opacity: 0.8` 轨迹的透明度；
 - `dashArray: "10, 10"` 虚线效果；
 - `lineJoin: "round"` 线条拐弯的地方处理成圆角。

### 修改缩放控件的位置

先去掉默认的缩放控件，找到这行代码：

```typescript
const map = L.map("map");
```

替换为：

```typescript
const map = L.map("map", {
  zoomControl: false,
});
```

然后再将缩放控件添加到左下角：

```typescript
L.control.zoom({
  position: 'bottomleft'
}).addTo(map);
```

位置就改好了。然后我们再用 CSS 设置一下样式，现在的阴影有点太重。

```css
.leaflet-bar {
  border: none !important;
}

.leaflet-bar a {
  border-radius: 10% !important;
  font-family: var(--font-sans);
  color: var(--color-zinc-400) !important;
}

.leaflet-bar a:hover {
  background-color: var(--color-zinc-700) !important;
  color: white !important;
}
```

### 低对比度地图

想要做到只能替换地图的贴图，ChatGPT 提供的其中一个选项是 CartoDB Positron，将 OpenStreetMap 的相关代码替换为以下代码：

```javascript
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://carto.com/attributions">CARTO</a>, &copy; OpenStreetMap contributors', //如果嫌字太多可以去掉
}).addTo(map);
```

## 最终效果展示

折腾了大半天，最终得到的效果是这样的，您也可以转到「[关于页面](/about#activities)」直接查看。

![最终效果](https://media.kaerozhi.com/2025/07/77a4ec2a4098b4cce9c335214a435687.webp)

此外不得不感概 AI 编程真是太牛了，而且还能配合你找 BUG 解决问题，永远不会厌烦，似乎也没有知识盲点。ChatGPT 在 AI 里头编程或许都不算第一梯队，已经达到这么好用的程度，其他的真是不敢想。也许是时候考虑通过 AI 来搞一些个人项目？说干咱就干，先找个点子！

---

## 参考

- [astro-strava-map](https://github.com/larryhudson/astro-strava-map)
- [node-strava-v3](https://github.com/node-strava/node-strava-v3)
- [Show off your Strava stats on your Next.js site (statically!)](https://www.thomasledoux.be/blog/strava-stats-nextjs)