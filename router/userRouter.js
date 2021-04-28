const express= require("express")
// 加密token/解密token
const {devToken,addToken}=require("../config/token")
const {login,register,getuser,getmenu,change}=require("../db/module/user")
const svgcaptcha =require("svg-captcha")
const yzmMiddware=require("../config/yzmMiddware")
const router =express.Router()

// 用户登陆逻辑
router.post("/user/login",yzmMiddware, async (req,resp)=>{
 let {username,password}=req.body
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
    const {username,password,name}=req.body
    try{
       let data=  await register({username,password,name})
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

// 获取用户
router.get("/getuser", async(req,resp)=>{

  try{
    let data = await getuser()
    resp.json(data)
  }catch(err){
      resp.json(err)
  }
})
// 获取菜单
router.get("/getmenu", async(req,resp)=>{

  try{
    let data = await getmenu()
    resp.json(data)
  }catch(err){
      resp.json(err)
  }
})

// 修改状态
router.post("/change/Lunbo", async(req,resp)=>{
const {state, id} = req.body
  try{
    let data = await change('lunbo',state,id)
    resp.json(data)
  }catch(err){
      resp.json(err)
  }
})
router.post("/change/imgs", async(req,resp)=>{
  const {state, pid} = req.body
  try{
    let data = await  change('imgs',state,pid)
    resp.json(data)
  }catch(err){
      resp.json(err)
  }
})

module.exports=router;