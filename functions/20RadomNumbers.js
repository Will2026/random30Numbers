// functions/[[path]].js
export async function onRequestGet(context) {
  // 1. 生成 10 个不重复随机整数
  const pool = Array.from({ length: 100 }, (_, i) => i + 1);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const numbers = pool.slice(0, 20);

  // 2. 拼 HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>10 Random Numbers – Refresh for New Set</title>
  <meta name="description" content="Get 20 unique random numbers between 1 and 100, instantly generated on each visit."/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  
  <link rel="canonical" href="https://random10.8384857.xyz"/>
  <meta property="og:title" content="20 Random Numbers"/>
  <meta property="og:description" content="Instantly generated 10 unique random integers from 1 to 100."/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="https://random10.8384857.xyz"/>
  <meta name="twitter:card" content="summary"/>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    h1 { margin: 0 0 1rem; }
    ul { font-size: 1.5rem; margin: 0; padding-left: 1.2rem; }
  </style>
</head>
<body>
  <h1>Your 10 random numbers</h1>
  <ul>
    ${numbers.map(n => `<li>${n}</li>`).join('')}
  </ul>
  <div class="description">
    <p> 🎲Our system will generate a set of 10 random numbers for you, perfect for various uses such as testing,
        lotteries, or data analysis.</p>
    <p> 🖱️You can easily click the "Copy" button to quickly copy these 10 random numbers to your clipboard, ready
        to paste into other applications or documents.</p>
    <p> 🖱️If you need a fresh set of random numbers, simply click the
        "Next" button, and the system will instantly generate a new set of 10 random numbers. </p>
    <p>🖱️The process is simple and fast, allowing you to get the random numbers you need anytime!</p>

</div>
</body>
</html>`;

  // 3. 返回响应
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      // 可选：告诉搜索引擎不要缓存
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
