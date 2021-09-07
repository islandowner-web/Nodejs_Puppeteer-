let puppeteer = require('puppeteer')
let url = require('url')
let fs = require('fs')
// let axios = require('axios')
let mysql = require('mysql')

let options = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'abc1235789',
  database: 'jianshu'
}
let con = mysql.createConnection(options)
con.connect()

let searchContent = 'axios';
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

  function numtoarr (num) {
    let arr = []
    for(let i = 1; i < num; i++) { arr.push(i) }
    return arr
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
    const element = await page.$("._gp-ck h1")
    if (element) {
      let title = await page.$eval("._gp-ck h1", node => node.innerText)
      let author = await page.evaluate(x => {
        return document.querySelector('._gp-ck button').parentNode.parentNode.firstChild.querySelector('span a').innerText
      })
      let release_time = await page.$eval("._gp-ck .s-dsoj time", node => node.innerText)
  
      let wordAndread = await page.$$eval("._gp-ck .s-dsoj span", (elements) => {
        elements = elements.slice(-2)
        let elobj = {
          word_num: elements[0].innerText.split('字数')[1].trim().replace(/,/g, ""),
          read_num: elements[1].innerText.split('阅读')[1].trim().replace(/,/g, ""),
        }
        return elobj
      })

      let word_num = wordAndread.word_num
      let read_num = wordAndread.read_num
  
      let article_content = await page.$eval("._gp-ck article", node => node.innerHTML)
  
      // console.log(title)
      // console.log(author)
      // console.log(release_time)
      // console.log(word_num)
      // console.log(read_num)
      // console.log(article_content)
      let arr = [title,author,release_time,word_num,read_num,article_content]
      let strSql = "insert into articles (title,author,release_time,word_num,read_num,article_content) values (?,?,?,?,?,?)"
      try {
        await sqlQuery(strSql,arr)
        console.log("写入数据库：",title)
      } catch (error) {
        console.log(error)
      }
    }

    page.close()
  }

  // pageList(1)

  // 算页数
  let pageNumber = await getAllNum()
  console.log('页数:' + pageNumber)
  let pagearr = numtoarr(pageNumber)
  console.log('页数数组:' + pagearr)

  async function spiter(){
    pagearr.forEach(async i=>{
      if(i !== 1) await lcWait(15000 * i)
      console.log(i)
      pageList(i)
    })
  }
  await spiter()


  // mysql写入
  function sqlQuery(strSql,arr){
      return new Promise(function(resolve,reject){
          con.query(strSql,arr,(err,results)=>{
              if(err){
                  reject(err)
              }else{
                  resolve(results)
              }
            
          })
      })
  }
})()
