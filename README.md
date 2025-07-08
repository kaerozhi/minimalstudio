Hello~ 

这是 [Kaero Zhi](https://kaerozhi.com) 的个人网站，基于 Astro 及 Tailwind CSS 框架构建，设计以 Michael Andreuzza 的 MinimalStudio 主题为基础，并参考了许多其他网站，特此致谢。

你可以 Clone 并自行构建本项目，计划进度请参考 `/src/content/blog/astro-started.md`。

## 功能

- 支持配置文件，请定位至 `/src/site.config.ts` 设置网站基本信息，配置基本功能。
- 支持动态路由，请定位至 `/src/content/config.ts` 自定义版面设置，一般保留 blog 即可。
- 支持 collection / category / tag，功能互有重叠，请自行采用。
- 支持相关文章。
- 支持 Giscus 评论。
- 支持 TOC。
- 图片会显示说明文字。

## CSS 相关文件

使用 Tailwind CSS V4，请关注以下文件：

- /src/styles/global.css
- /src/style/entry.css，定义文章页样式。
- /src/components/CustomStyles.astro，Theme 参数。

## License

本项目是根据 [GPL-3.0](https://opensource.org/licenses/GPL-3.0) 许可证许可的开源软件。随意 fork、修改和在你的项目中使用它。

---

希望你使用愉快，有任何问题或者想法请随时找我聊一聊。