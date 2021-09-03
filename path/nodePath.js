let path = require("path")

console.log(path)

let strPath = 'https://cn.vuejs.org/v2/guide/xxXMLDocument.jpg'

// 扩展名
let info = path.extname(strPath)
console.log(info)

let arr = ['/abc','def', 'yuo']
let info1 = path.resolve(...arr)
console.log(info1)

// 获取当前目录的完整路径
console.log(__dirname)
let info2 = path.join(__dirname,...arr)
console.log(info2)