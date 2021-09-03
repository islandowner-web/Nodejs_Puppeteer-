let readline = require('readline')
let {fsWrite} = require('./lcfs')

// 实例化接口对象
let r1 = readline.createInterface({
  input:process.stdin,
  output:process.stdout,
})

// 设置事件
// r1.question("hello?", function(answer) {
//   console.log("fuck you" + answer)
//   // 退出
//   r1.close()
// })

// 封装
function outquestion(title) {
  return new Promise(function(resolve,reject){
    r1.question(title, function(answer) {
      resolve(answer)
    })
  })
}

async function createPackage() {
  let name = await outquestion('Package Name:')
  let description = await outquestion('Description:')
  let main = await outquestion('Init:')
  let author = await outquestion('author:')

  let content = `{
    "name": "${name}",
    "description": "${description}",
    "Init": "${main}",
    "author": "${author}",
  }`
  await fsWrite('package.json', content)
  r1.close()
}

// 退出
r1.on('close', function() {
  process.exit(0)
})

createPackage()