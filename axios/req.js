// let axios = require('axios')
let request = require('request')
// console.log(axios)

function req(url) {
  return new Promise(function (resolve,reject) {
    request.get(url, function(err,response,body){
      if(err) {
        reject(err)
      }else {
        resolve({response,body})
      }
    })
  })
}

let httpurl = 'https://www.1905.com/vod/list/n_1_t_1/o3p1.html'

async function getClassUrl() {
  let {response, body} = await req(httpurl)
  // console.log(body)
  let reg = /<span class="search-index-L">类型(.*?)<div class="grid-12x">/igs
  let result = reg.exec(body)[1]
  // console.log(result[0])
  let reg1 = /<a href="javascript:void\(0\);" onclick="location\.href='(.*?)';return false;" (.*?)<\/a>/igs
  let arrClass = []
  var res;
  while( res = reg1.exec(result)) {
    let obj = {
      className: res[2],
      url: res[1]
    }
    arrClass.push(obj)
    getMovies(res[1], res[2])
  }
  console.log(arrClass)
}

async function getMovies(url,moviesType) {
  let {response,body} = await req(url)
  let reg = /<a class="pic-pack-outer" target="_blank" href="(.*?)".*?>/igs
  var res;
  var arrList = []

  while(res = reg.exec(body)) {
    arrList.push(res[1])
  }
  console.log(moviesType)
  console.log(arrList)
}

//解析页面
async function parsePage(url) {
  let {response, body} = await req(url)

  let reg = //
}

getClassUrl()
