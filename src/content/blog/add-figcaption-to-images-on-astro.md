---
title: Astro 中让图片展示说明文字
date: "2025-07-02"
description: 图片没有说明文字，就像逛景点没有导游——不对，没有导游好像更惬意……
categories:
  - Sitelog
  - Coding
tags:
  - astro
  - node.js
---

我们写 Markdown 的时候，插入图片一般是这样的：

```markdown
![这是一张图片](/assets/a-photo.jpg)
```

但 Astro 默认渲染内容时，「这是一张图片」只是图片的 `alt` 属性，屏幕上并不显示。如果希望它作为 `<figcaption>` 出现在图片下方，渲染为：

```html
<figure>
  <img src="/assets/a-photo.jpg" alt="这是一张图片" />
  <figcaption>这是一张图片</figcaption>
</figure>
```

那我们就需要用到 rehype-figure 插件。首先安装该插件：

```bash
npm install rehype-figure
```

然后在 `astro.config.mjs` 中配置 `rehype-figure`，改动请参考：

```js
import { defineConfig } from 'astro/config';
import rehypeFigure from 'rehype-figure';

export default defineConfig({
  markdown: {
    rehypePlugins: [
      [rehypeFigure, { className: 'my-figure', figcaption: true }]
    ]
  }
});
```

代码中可以修改的配置：

- `className`: 给 `<figure>` 添加 CSS 类名，目前是 `my-figure`，之后就可以按照类名自行修改 CSS 的样式了；
- `figcaption: true`: 自动将 `alt` 转为 `<figcaption>`。

重启 Astro 就可以看到效果了。