let puppeteer = require('puppeteer')

async function test() {
  //puppeteer.launch实例开启浏览器，
  //可以传入一个options对象，可以配置为无界面浏览器，也可以配置为有界面浏览器
  //无界面浏览器性能更高更快，有界面一般用于调试开式
  let options = {
    //设置视窗的宽高
    defaultViewport:{
        width:1400,
        height:900
    },
    //设置为有界面，如果为true，即为无界面
    headless:false
  }
  let browser = await puppeteer.launch(options)

  // 打开新页面
  let page = await browser.newPage()
  await page.goto('https://www.dy2018.com/?jdfwkey=1vljy2')
  // 截图
  await page.screenshot({path: 'screenshot.png'})
}

test()
