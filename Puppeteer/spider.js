let puppeteer = require('puppeteer')
let url = require('url')
let fs = require('fs')
// let axios = require('axios')

let httpUrl = 'https://sobooks.cc/';
(async function() {
  let debugOptions = {
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
  
  let options = {headless:true}
  let browser = await puppeteer.launch(debugOptions)

  // 延迟函数
  function lcWait(milliSecondes) {
    return new Promise(function(resolve,reject){
      setTimeout(function() {
        resolve('延迟' + milliSecondes)
      },milliSecondes)
    })
  }
  
  async function getAllNum () {
    let page = await browser.newPage()
    await page.goto(httpUrl)
    // 设置选择器
    let pageNum = await page.$eval('.pagination li:last-child span', (element) => {
      let text = element.innerHTML
      text = text.substring(1, text.length-2).trim()
      return text
    })
    return pageNum
  }

  let pageNumber = await getAllNum()
  console.log(pageNumber)

  async function pageList(num) {
    let pageListUrl = "https://sobooks.cc/page/" + num
    let page = await browser.newPage()
    // 访问列表页地址
    await page.goto(pageListUrl)

    let arrPage = await page.$$eval('.card .card-item .thumb-img > a', (elements) => {
      let arr = []
      elements.forEach((element, i) => {
        var obj = {
          href: element.getAttribute('href'),
          title: element.getAttribute('title')
        }
        arr.push(obj)
      })
      console.log(arr)
      return arr
    })

    page.close()

    // 通过获取的数组地址和标题去请求书籍的详情页面
    arrPage.forEach(async (pageObj,i) => {
      await lcWait(4000 * i)
      getPageInfo(pageObj)
    })
    // getPageInfo(arrPage[0])
  }

  async function getPageInfo(pageObj) {
    let page = await browser.newPage()

    // // 拦截谷歌请求
    // await page.setRequestInterception(true)
    // // 监听请求并拦截
    // page.on('request', interceptedRequest => {
    //   // url模块解析请求地址
    //   let urlObj = url.parse(interceptedRequest.url())
    //   if(urlObj.hostname === 'https://googleads.g.doubleclick.net') {
    //     // 放弃广告请求
    //     interceptedRequest.abort()
    //   } else {
    //     interceptedRequest.continue()
    //   }
    // })

    await page.goto(pageObj.href)
    inputEle = await page.$(".e-secret .euc-y-i")
    // console.log(inputEle)
    inputBtn = await page.$(".e-secret .euc-y-s")
    // 聚焦输入框
    await inputEle.focus()
    // 输入
    await page.keyboard.type('949696')
    // 点击
    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click('.e-secret .euc-y-s'), // 点击该链接将间接导致导航(跳转)
    ]);

    // 拿元素
    console.log('123')
    // let eleA = await page.$(".e-secret b a:first-child")
    // let aHref = eleA.getAttribute('href')
    // console.log(aHref)

    let elementAherf =await page.$eval('.e-secret b a:first-child',(element)=>{
      console.log(element)
      console.log(element.getAttribute("href"))
      return element.getAttribute("href");
    });
    elementAherf = elementAherf.split('?url=')[1]
    let content = `{"title":"${pageObj.title}","href":"${elementAherf}"}\n`
    fs.writeFile('book.txt',content, {flag:"a"},function(){
      console.log('写入完成: ' + pageObj.title)
      page.close()
    })
    console.log(elementAherf)
  }

  pageList(1)
})()


// 获取页数



// 获取所有链接

// 获取每个详情页的网盘地址

// 保存数据