let fs = require('fs')

// 创建写入流
let ws = fs.createWriteStream('hello.txt',{flags:"w",encoding:"utf-8"})

// 打开监听
ws.on('open', function() {
  console.log('open')
})

// 准备状态监听
ws.on('ready', function() {
  console.log('ready')
})

// 关闭监听
ws.on('close', function() {
  console.log('close')
})

ws.write("wswrite1",function(err) {
  if(err) {
    console.log(err)
  } else {
    console.log('End! Success write')
  }
})

ws.write("wswrite2",function(err) {
  if(err) {
    console.log(err)
  } else {
    console.log('End! Success write')
  }
})

ws.write("wswrite3",function(err) {
  if(err) {
    console.log(err)
  } else {
    console.log('End! Success write')
  }
})

ws.end(() => {
  console.log('end close')
})