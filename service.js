const express= require("express")
const cookieParser=require("cookie-parser")
const expressSession=require("express-session")
const app=express()
app.use(express.json({limit: '50mb'}))


// 应用session


app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(expressSession({
    secret:"12345",
    saveUninitialized:true, 
    cookie:{maxAge:60000},
    resave:false
}))

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// 引入路由
const userRouter=require("./router/userRouter")
const pictureRouter=require("./router/pictureRouter")
const txupload=require("./router/txuplod")
// 暴露静态资源
app.use(express.static(__dirname+"/public"))
// // 获取body资源


// 监控3003端口
app.listen("3003",(err,data)=>{
    
    if(!err) {
        app.use(userRouter)  
        app.use(pictureRouter)
        app.use(txupload)
        console.log("监控完成：")
        console.log("http://127.0.0.1:3003");   
    }else {
        console.log("抱歉，似乎连接失败哦.....")
    }
})