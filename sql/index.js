let mysql = require("mysql");

let connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'abc1235789',
  database: 'jianshu'
});

//建立连接
connection.connect((err)=>{
  //如果建立连接失败
  if(err){
      console.log(err)
  }else{
      console.log('数据库连接成功')
  }
})

// let strSql = "select * from book where author='Hussein A. Abbass'"
// connection.query(strSql,(err,results,fields) => {
//   console.log(err)
//   console.log(results)
//   // console.log(fields)
// })

// let obj = {
//   fileName: '100861',
//   title: '12580',
//   updateType: 1,

// }
// let strSql = `insert into book(fileName,title,updateType) values(${obj.fileName},${obj.title},${obj.updateType})`
// connection.query(strSql,(err,results) => {
//   console.log(err)
//   console.log(results)
// })

// let strSql7 = "insert into book (fileName,title,updateType) values (?,?,?)"
// connection.query(strSql7,["1008611111","12580111",2],(err,results)=>{
//     console.log(err);
//     console.log(results)
// })

let strSql8 = "insert into articles (title,author,release_time,word_num,read_num,article_content) values (?,?,?,?,?,?)"
connection.query(strSql8,["1008611111","12580111",'111',233,444,'xadasdxczczxcxzc'],(err,results)=>{
    console.log(err);
    console.log(results)
})