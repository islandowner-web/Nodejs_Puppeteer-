var fs = require('fs')

// 同步
// var fd = fs.openSync('hello.txt', 'r')
// console.log(fd)

// 高度封装 同步
// var content = fs.readFileSync('hello.txt', {falg: 'r', encoding: "utf-8"})
// console.log(content.toString())

// 异步
// fs.readFile('hello.txt', {flag: 'r',encoding: 'utf-8'}, function(err, data) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log('回调')
//   }
// })

// 封装 promise
function fsread(path) {
  return new Promise (function(resolve,reject) {
    fs.readFile(path, {flag: 'r',encoding: 'utf-8'}, function(err, data) {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

var w1 = fsread('hello.txt')
w1.then(res => {
  console.log(res)
})

async function ReadList() {
  var file2 = await fsread('hello.txt')
  var file3 = await fsread('hello2.txt')
  var file4 = await fsread('hello3.txt')
  console.log(file2)
  console.log(file3)
  console.log(file4)
}

ReadList()
// console.log('123')