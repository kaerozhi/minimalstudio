Hello~ 

这是 [Kaero Zhi](https://kaerozhi.com) 的个人网站，基于 Astro 及 Tailwind CSS 框架构建，设计以 Michael Andreuzza 的 [Minimal Studio](https://github.com/michael-andreuzza/microstudio)  主题为基础，并参考了许多其他网站，特此致谢。

![Preview](https://media.kaerozhi.com/2025/07/d6fe4128a0121103e0bde742f1c63aaf.webp)

你可以 Clone 并自行构建本项目，计划进度请参考 `/src/content/blog/astro-started.md`。

## 功能

- 支持配置文件，请定位至 `/src/site.config.ts` 设置网站基本信息，配置基本功能。站点名称建议使用英文，请控制字母总数，单词之间的空格会被删除。
- 支持动态路由，请定位至 `/src/content/config.ts` 自定义版面设置，一般保留 blog 即可。
- 支持 collection / category / tag，功能互有重叠，请自行采用。
- 支持相关文章。
- 内置 [Giscus](https://giscus.app/) 评论。
- 内置 TOC 支持。
- 默认显示 Makrdown 图片的说明文字。
- 内置 Alpine.js。

## CSS 相关文件

使用 Tailwind CSS V4，请关注以下文件：

- `/src/styles/global.css`
- `/src/style/entry.css`，定义文章页样式。
- `/src/components/CustomStyles.astro`，Theme 参数。

## License

本项目是根据 [GPL-3.0](https://opensource.org/licenses/GPL-3.0) 许可证许可的开源软件。随意 fork、修改和在你的项目中使用它。

---

希望你使用愉快，有任何问题或者想法请随时找我聊一聊。