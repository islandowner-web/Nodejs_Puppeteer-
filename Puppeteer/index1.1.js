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
  await page.goto('https://www.dytt8.net/')

  // 获取页面内容
  // $$eval函数使得我们的回调函数运行在浏览器中，并且可以通过浏览器的方式进行输出
  let elements = await page.$$eval("#menu li a", (elements) => {
    // 元素信息数组
    let eles = []
    elements.forEach(function(item,i){
      console.log(item.innerText);
      if(item.getAttribute('href') != '#') {
        var eleObj = {
          href: item.getAttribute('href'),
          text: item.innerText
        }
        eles.push(eleObj)
      }
      console.log(eleObj)
    })
    return eles
  })

  // 浏览器控制台监听输出
  // page.on('console', function(msg){
  //   console.log(msg.text())
  // })

  // 获取链接后再新开页面
  let gnPage = await browser.newPage()
  await gnPage.goto(elements[2].href)

  console.log(elements)
}

test()
