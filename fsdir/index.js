let fs = require("fs")
let {fsRead,fsWrite}  = require('./lcfs')

const txtPath = 'all.txt'

fs.readdir('../fs', function(err,files){
  if(err) {
    console.log(err)
  } else {
    console.log(files)

    files.forEach(async function(filename, i){
      let content = await fsRead('../fs/' + filename)
      await fsWrite(txtPath, content)
    })
  }
})