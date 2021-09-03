let url = require('url')

// let httpurl = 'https://sale.vmall.com/newmate.html?cid=123840'
// let urlobj = url.parse(httpurl)
// console.log(urlobj)

// 解析url
let httpurl = new URL('https://sale.vmall.com/newmate.html?cid=123840')
console.log(httpurl)

// 合成
let targetUrl = 'https://www.qlinyun.com/'
reurl = './foreignBusiness'
let newUrl = url.resolve(targetUrl, reurl)
// let newUrl = new URL(targetUrl, reurl)
console.log(newUrl)