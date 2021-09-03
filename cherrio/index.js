const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const url = require('url')
const path = require('path')

let httpUrl = 'https://www.doutula.com/article/list/?page=1'

// 获取页面总数
async function getNum() {
  const res = await axios.get(httpUrl)
  let $ = cheerio.load(res.data)
  let btnLength = $('.pagination li').length
  let allNum = $('.pagination li').eq(btnLength - 2).find('a').text()
  console.log(allNum)
  return allNum
} 

async function __init__() {
  // 获取所有页面总数
  let allPageNum = await getNum()
  for(let i = 1; i <= 2; i++) {
    getListPage(i)
  }
}

async function getListPage(pageNum) {
  let httpUrl = 'https://www.doutula.com/article/list/?page=' + pageNum
  const res = await axios.get(httpUrl)
  let $ = cheerio.load(res.data)
  $('#home .col-sm-9 > a').each((i,element) => {
    let pageUrl = $(element).attr('href')
    let title = $(element).find('.random_title').text()
    let reg = /(.*?)\d/igs
    title = reg.exec(title)[1]
    fs.mkdir('./img/' + title, function(err) {
      if (err) {
        // console.log(err)
      } else {
        console.log("成功创建目录："+'./img/'+title)
      }
    })
    // console.log(title)
    parasePage(pageUrl, title)
  })
}

// axios.get(httpUrl).then(res => {
//   // console.log(res.data)
//   let $ = cheerio.load(res.data)
//   $('#home .col-sm-9 > a').each((i,element) => {
//     let pageUrl = $(element).attr('href')
//     let title = $(element).find('.random_title').text()
//     let reg = /(.*?)\d/igs
//     title = reg.exec(title)[1]
//     fs.mkdir('./img/' + title, function(err) {
//       if (err) {
//         // console.log(err)
//       } else {
//         console.log("成功创建目录："+'./img/'+title)
//       }
//     })
//     // console.log(title)
//     parasePage(pageUrl, title)
//   })
// })

async function parasePage(url, title) {
  let res = await axios.get(url)
  let $ = cheerio.load(res.data)
  $('.pic-content img').each((i,element) => {
    let imgUrl = $(element).attr('src')
    // console.log(imgUrl)
    // 扩展名
    let extName = path.extname(imgUrl)
    // 路径
    let imgPath = `./img/${title}/${title}-${i}${extName}`
    // 创建写入流
    let ws = fs.createWriteStream(imgPath)
    axios.get(imgUrl, {responseType:'stream'}).then(res => {
      res.data.pipe(ws)
      console.log('图片加载完成:' + imgPath)
      //关闭写入流
      res.data.on('close',function(){
        ws.close()
    })
    })
  })
}

__init__()