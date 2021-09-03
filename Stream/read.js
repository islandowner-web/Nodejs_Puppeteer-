let fs = require("fs");

//创建读取流
let rs = fs.createReadStream('mp31.mp3',{flags:'r'})

let ws = fs.createWriteStream('a.mp4',{flags:"w"})

rs.on('open', function() {
  console.log('read open')
})

rs.on('close', function() {
  ws.end()
  console.log('read close')
})

// 数据流入完成
rs.on('data', function(chunk) {
  console.log("单批数据流入:"+chunk.length)
  console.log(chunk)
  ws.write(chunk,()=>{console.log("单批输入流入完成")})
})