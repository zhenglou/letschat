// 方法1：使用 Date.now()（推荐，最简洁）
const timestamp = Date.now();

// 方法2：使用 new Date().getTime()
const timestamp2 = new Date().getTime();

// 方法3：使用 new Date().valueOf()
const timestamp3 = new Date().valueOf();

// 方法4：使用一元加号操作符
const timestamp4 = +new Date();
console.log(timestamp,timestamp2,timestamp3,timestamp4);
const localDate = new Date(timestamp).toLocaleString('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
});
console.log(localDate);