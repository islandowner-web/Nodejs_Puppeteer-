let fs = require('fs')

// flag w---覆盖 a---追加
// 异步操作 先执行完成的先写入
// fs.writeFile('testwrite.txt', '写入测试123\n', {flag: "a",encoding: "utf-8"}, function(err){
//   if(err) {
//     console.log('err')
//   } else {
//     console.log('write success')
//   }
// })


// 套娃
// fs.writeFile('testwrite.txt', '写入测试123\n', {flag: "a",encoding: "utf-8"}, function(err){
//   if(err) {
//     console.log('err')
//   } else {
//     console.log('write success')
//     fs.writeFile('testwrite.txt', '写入测试456\n', {flag: "a",encoding: "utf-8"}, function(err){
//       if(err) {
//         console.log('err')
//       } else {
//         console.log('write success')
//       }
//     })
//   }
// })

// 封装
function writefs(path, content) {
  return new Promise(function(resolve, reject){
    fs.writeFile(path, content, {flag: "a",encoding: "utf-8"}, function(err){
      if(err) {
        reject(err)
      } else {
        resolve(err)
      }
    })
  })
}

async function writeList() {
  await writefs('tsetw.txt', '1kylin\n')
  await writefs('tsetw.txt', '2kylin\n')
  await writefs('tsetw.txt', '3kylin\n')
  await writefs('tsetw.txt', '4kylin\n')
}

writeList()