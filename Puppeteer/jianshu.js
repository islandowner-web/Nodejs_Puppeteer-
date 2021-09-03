let puppeteer = require('puppeteer')
let url = require('url')
let fs = require('fs')
// let axios = require('axios')

let searchContent = 'react';
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
  
  // [1]页数计算
  async function getAllNum () {
    let page = await browser.newPage()
    await page.goto(`https://www.jianshu.com/search?q=${searchContent}&page=1&type=note`)
    let pageNum = await page.$eval('.search-content .result', (element) => {
      let text = parseInt(element.innerHTML.split('个')[0])
      let num = text % 10 === 0 ? text / 10 : parseInt(text / 10 + 1)
      return num
    })
    page.close()
    return pageNum
  }

  let pageNumber = await getAllNum()
  console.log('页数:' + pageNumber)

  // [2]获取当前搜索结果页的所有详细文章的url
  async function pageList(num) {
    let page = await browser.newPage()
    // 访问列表页地址
    await page.goto(`https://www.jianshu.com/search?q=${searchContent}&page=${num}&type=note`)

    let arrPage = await page.$$eval('.search-content .note-list li .content .title', (elements) => {
      let arr = []
      elements.forEach((element, i) => {
        arr.push('https://www.jianshu.com' + element.getAttribute('href'))
      })
      return arr
    })
    console.log(arrPage)

    page.close()

    // 通过获取的数组地址和标题去请求书籍的详情页面
    arrPage.forEach(async (href,i) => {
      await lcWait(4000 * i)
      getPageInfo(href)
    })
  }

  // [3]根据url进入页面,并拿取数据
  async function getPageInfo(href) {
    let page = await browser.newPage()

    await page.goto(href)
    let title = await page.$eval("._gp-ck h1", node => node.innerText)
    let author = await page.evaluate(x => {
      return document.querySelector('._gp-ck button').parentNode.parentNode.firstChild.querySelector('span a').innerText
    })
    let time = await page.$eval("._gp-ck .s-dsoj time", node => node.innerText)

    let wordAndread = await page.$$eval("._gp-ck .s-dsoj span", (elements) => {
      elements = elements.slice(-2)
      let elobj = {
        wordCount: elements[0].innerText.split('字数')[1].trim(),
        readNum: elements[1].innerText.split('阅读')[1].trim(),
      }
      return elobj
    })

    let article = await page.$eval("._gp-ck article", node => node.innerHTML)

    console.log(title)
    console.log(author)
    console.log(time)
    console.log(wordAndread)
    console.log(article)

    page.close()

    // fs.writeFile('book.txt',content, {flag:"a"},function(){
    //   console.log('写入完成: ' + pageObj.title)
    //   page.close()
    // })
    // console.log(elementAherf)
  }

  pageList(1)

  // let list = [1,2,3]
  // async function spiter(){
  //   list.forEach(async i=>{
  //     await lcWait(4000 * i)
  //     pageList(i)
  //   })
  // }
  // spiter()
})()
