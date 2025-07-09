export const config = {
  // === Basic configuration ===
  /** Title for your website. Will be used in metadata and as browser tab title. */
  title: 'Kaero Zhi',
  /** Will be used in index page & copyright declaration */
  author: 'Kaero Zhi',
  /** Description metadata for your website. Can be used in page metadata. */
  slogan: 'Flaming in the dark.',
  description: '摄影师 / 短片导演 / 视觉设计师，定居苏州，活动范围覆盖长三角，擅长人像、活动拍摄。',
  keywords: '设计师, designer, web designer, 摄影师, photographer, portrait photography, based in suzhou, 苏州, 江浙沪摄影师',
  website: "https://kaerozhi.com",
  /** The default favicon for your site which should be a path to an image in the `public/` directory. */
  favicon: '/favicon/favicon.ico',
  logo: '/src/assets/logo-z.svg',
  /** Specify the default language for this site. */
  locale: {
    lang: 'zh-CN',
    timezone: 'Asia/Shanghai'
  },

  // === Global configuration ===
  titleDelimiter: '•',
  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',

  /** Configure the header of your site. */
  header: {
    menu: [
      { title: '影像', link: '/gallery' },
      { title: '设计', link: '/design' },
      { title: '文字', link: '/writings' },
      { title: '游历', link: '/travels' },
      { title: 'Blog', link: '/blog' },
      { title: '关于', link: '/about' }
    ],
    button: [
      { title: '预约拍照', link: '/#pricing' }
    ]
  },

  /** Configure the footer of your site. */
  footer: {
    links: [
      // Registration link
      {
        title: 'Moe ICP 114514',
        link: 'https://icp.gov.moe/?keyword=114514',
        style: 'text-sm' // Uno/TW CSS class
      },
      {
        title: 'Travelling',
        link: 'https://www.travellings.cn/go.html',
        style: 'text-sm'
      },
      // Privacy Policy link
      {
        title: 'Site Policy',
        link: '/terms/list',
        pos: 2 // position set to 2 will be appended to copyright line
      }
    ],
    /** Enable displaying a “Astro & Pure theme powered” link in your site’s footer. */
    credits: true,
    /** Optional details about the social media accounts for this site. */
    social: [
      { title: 'x', link: 'https://x.com/kaero' },
      { title: 'Github', link: 'https://github.com/kaerozhi' },
      { title: 'Bilibili', link: 'https://space.bilibili.com/9425491' },
      { title: 'Youtube', link: 'https://youtube.com/@kaerozhi' },
      { title: '小红书', link: 'https://www.xiaohongshu.com/user/profile/645ea5c2000000000f006eb8' },
      { title: 'Instagram', link : 'https://instagram/kaero' },
      { title: '500px', link: 'https://500px.com.cn/kaero' }
    ]
  },

  content: {
    externalLinksContent: ' ↗',
    /** Blog page size for pagination (optional) */
    postsPerPage: 20,
    externalLinkArrow: true, // show external link arrow
    // Currently support weibo, x, bluesky
    share: ['weibo', 'x', 'bluesky']
  }
} as const;
