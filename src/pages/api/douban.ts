import type { APIRoute } from 'astro';
import Parser from 'rss-parser';

type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  content?: string;
};

const parser = new Parser<{}, FeedItem>();

// Fallback 数据：五部最爱的电影
const fallbackMovies = [
  {
    title: "坏孩子的天空 (Kids Return)",
    link: "https://movie.douban.com/subject/1299062/",
    rating: "★★★★★",
    poster: "https://nenya.doubanio.com/view/photo/xl/public/p2197513152.jpg?sa_cv=d3812e32b8d94b258d936ca2ba513a29&sa_ct=686d1349",
    pubDate: "1996年7月27日"
  },
  {
    title: "星际牛仔 (Cowboy Bebop)",
    link: "https://movie.douban.com/subject/1424406/",
    rating: "★★★★½",
    poster: "https://nenya.doubanio.com/view/photo/xl/public/p2554030400.jpg?sa_cv=cc33ad27a821ce42fb3825cf0b18c106&sa_ct=686d1396",
    pubDate: "1998年4月3日"
  },
  {
    title: "国产凌凌漆",
    link: "https://movie.douban.com/subject/1307739/",
    rating: "★★★★★",
    poster: "https://nenya.doubanio.com/view/photo/xl/public/p2403566771.jpg?sa_cv=76d17a0497f185bed5e046390303f215&sa_ct=686d1409",
    pubDate: "2020年09月14日"
  },
  {
    title: "一代宗师",
    link: "https://movie.douban.com/subject/3821067/",
    rating: "★★★★",
    poster: "https://nenya.doubanio.com/view/photo/xl/public/p2533921258.jpg?sa_cv=3e87dd220f84715e82a8b872d9fc7317&sa_ct=686d1447",
    pubDate: "2020年08月21日"
  },
  {
    title: "南国野兽 Beasts of the Southern Wild",
    link: "https://movie.douban.com/subject/7015714/",
    rating: "★★★★★",
    poster: "https://nenya.doubanio.com/view/photo/xl/public/p1790179785.jpg?sa_cv=6319c43261118a51db7f80209ae4acf6&sa_ct=686d147d",
    pubDate: "2023年03月25日"
  }
];

function getRandomFallbackMovie() {
  const idx = Math.floor(Math.random() * fallbackMovies.length);
  return fallbackMovies[idx];
}

export const GET: APIRoute = async () => {
  try {
    const feed = await parser.parseURL(
      'https://www.douban.com/feed/people/2237229/interests'
    );
    const latest = feed.items?.[0];
    console.log(latest);

    if (!latest) throw new Error('No entries found');

    const cleanTitle = latest.title.replace(/^看过\s*/, '');
    const html = latest.content || '';

    // 推荐等级 -> 星级映射
    const ratingTextMatch = html.match(/推荐[:：] ?(力荐|推荐|还行|较差|很差)/);
    const ratingMap: Record<string, string> = {
      力荐: '★★★★★',
      推荐: '★★★★',
      还行: '★★★',
      较差: '★★',
      很差: '★',
    };
    const rating = ratingMap[ratingTextMatch?.[1] || ''] || '暂无评分';

    // 提取图片
    const imgMatch = html.match(/<img src="([^"]+)"/);
    const poster = imgMatch?.[1] || '';

    // 时间格式化
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
  } catch (err) {
    // 出错时，随机返回一部备选电影
    const fallback = getRandomFallbackMovie();
    return new Response(JSON.stringify(fallback), { status: 200 });
  }
};