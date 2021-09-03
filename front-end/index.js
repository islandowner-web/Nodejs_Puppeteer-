const axios = require('axios')
const fs = require("fs")
const path = require('path')

async function getPage(num) {
  let httpUrl = 'http://www.app-echo.com/api/recommend/sound-day?page=' + num
  let res = await axios.get(httpUrl)
  // console.log(res.data.list)
  res.data.list.forEach(function(item,i){
    let title = item.sound.name
    let mp3url = item.sound.source
    console.log(title)
    console.log(mp3url)
    download(mp3url,title)
  })
}

async function download(mp3url,title) {
  axios.get(mp3url,{responseType:"stream"}).then(res => {
    let wspath = './mp3/'+title+".mp3"
    let ws = fs.createWriteStream(wspath, {flag: 'r'});
    res.data.pipe(ws)
  })
}

// getPage(1)

(async () => {
  console.log('start')
  for(let i = 0; i < 5; i++) {
    await getPage(i);
    console.log(i + '页写入完成')
  }
  console.log('end')
})()