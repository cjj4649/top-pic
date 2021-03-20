const express= require("express")
// 加密token/解密token
const {devToken,addToken}=require("../config/token")
const {login,register}=require("../db/module/user")
const svgcaptcha =require("svg-captcha")
const yzmMiddware=require("../config/yzmMiddware")
const router =express.Router()

// 用户登陆逻辑
router.post("/user/login",yzmMiddware,async (req,resp)=>{
 const {username,password}=req.body
 try{
    let data=  await login(username,password)
    let userData=await addToken(data);
    resp.json(userData)
 }catch(error){
    resp.json(error)
 }
})


// 用户注册逻辑
router.post("/user/register",yzmMiddware,async (req,resp)=>{
    const {username,password}=req.body
    try{
       let data=  await register({username,password})
       resp.json(data) 
    }catch(error){
       resp.json(error)
    }
   })
   


// 生成验证码
router.get("/yzm",(req,resp)=>{

   const yzm=svgcaptcha.create({
      noise:3,
      fontSize:48,
      size:6
    
   })
   const {text,data}=yzm;
   req.session.yzm=text;
   resp.send(data)
})

//获取验证码

module.exports=router;