const express= require("express")
const cookieParser=require("cookie-parser")
const expressSession=require("express-session")
const app=express()



// 引入路由

const userRouter=require("./router/userRouter")
const pictureRouter=require("./router/pictureRouter")
// 暴露静态资源
app.use(express.static(__dirname+"/public"))
// // 获取body资源


// 应用session


app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(expressSession({
    secret:"allimgs",
    saveUninitialized:true, 
    cookie:{maxAge:60*60},
    resave:true
}))
// 监控3003端口
app.listen("3003",(err,data)=>{
    
    if(!err) {
        app.use(userRouter)  
        app.use(pictureRouter)
        console.log("监控完成：")
        console.log("http://localhost:3003");   
    }else {
        console.log("抱歉，似乎连接失败哦.....")
    }
})