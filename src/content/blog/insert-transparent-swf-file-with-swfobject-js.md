---
title: SWFObject.js 插入透明 SWF 文件
date: 2006-12-13T00:00:00.000Z
categories:
  - 日常
tags:
  - javascript
  - 网页开发
---

使用 SWFObject.js 非常方便，不过貌似也有一个缺点，就是不能插入透明的文件——在源文件里面搜索不到 wmode，所以应该是这样子的。但是没有关系，我们可以修改一下，让它支持透明：

1、在 swfobject.js 里面找到这一句：

> if(c){this.addParam("bgcolor",c);}

将它改为：

> if(c){this.addParam("bgcolor",c);} else {this.addParam("wmode","transparent");}

2、在 HTML 页面插入 swfobject 将背景色一项留空，如下所示：

> <script type="text/javascript"> // <!\[CDATA\[ var so = new SWFObject("movie.swf", "mymovie", "640", "480", "7", ""); so.write("flashcontent); // \]\]> </script>

哈哈，这样子就成啦。
