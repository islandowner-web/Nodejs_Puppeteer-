let fs = require("fs");

//创建读取流
let rs = fs.createReadStream('mp31.mp3',{flags:'r'})

let ws = fs.createWriteStream('b.mp4',{flags:"w"})

rs.on('open', function() {
  console.log('read open')
})

rs.on('close', function() {
  console.log('read close')
})

rs.pipe(ws)