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
    headless:false,
    // 每个步骤操作放慢
    slowMo: 250
  }
  let browser = await puppeteer.launch(options)

  // 打开新页面
  let page = await browser.newPage()
  await page.goto('https://www.dytt8.net/')
  // 获取页面对象

  // 模拟点击
  // elementHandles = await page.$$("#menu li a")
  // elementHandles[1].click()

  // 模拟输入搜索
  inputEle = await page.$(".searchl .formhue")
  // 聚焦输入框
  await inputEle.focus()
  // 输入
  await page.keyboard.type('小丑')
  await page.$eval('.bd3rl>.search',(element) => {
    element.addEventListener('click', function(event) {
      event.cancelBubble = true
    })
  })
  // 点击搜索按钮
  let btnEle = await page.$('.searchr input[name="Submit"]')
  await btnEle.click()

}

test()
