export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return year + " 年 " + month + " 月 " + day + " 日";
}

export function formatYear(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  return year;
}

export function formatChineseDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  var dict = {
    "0": "〇",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六",
    "7": "七",
    "8": "八",
    "9": "九",
    "10": "十",
    "11": "十一",
    "12": "十二",
    "13": "十三",
    "14": "十四",
    "15": "十五",
    "16": "十六",
    "17": "十七",
    "18": "十八",
    "19": "十九",
    "20": "二十",
    "21": "二十一",
    "22": "二十二",
    "23": "二十三",
    "24": "二十四",
    "25": "二十五",
    "26": "二十六",
    "27": "二十七",
    "28": "二十八",
    "29": "二十九",
    "30": "三十",
    "31": "三十一"
  }
  
  const yy = year.toString().split("");
  const cyear = dict[yy[0]] + dict[yy[1]] + dict[yy[2]] + dict[yy[3]];
  const cmonth = dict[month];
  const cday = dict[day];

  return cyear + "年" + cmonth + "月" + cday + "日";
}

// debounce function
export function debounce(fn, delay) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}


export function formatDateV2(date) {
  // 创建一个Date对象
  let d = new Date(date);
  // 使用toLocaleString方法返回本地时间字符串
  let localTime = d.toLocaleString("zh-CN", {year: "numeric", month: "2-digit", day: "2-digit"});
  // 去掉字符串中的斜杠和空格
  let formattedDate = localTime.replace(/\//g, "-").replace(/\s/g, "");
  // 返回格式化后的日期
  return formattedDate;
}

export function formatIndex(number) {
  let Index = number + 1;

  let formattedNumber = '0' + Index.toString();

  return formattedNumber;
}