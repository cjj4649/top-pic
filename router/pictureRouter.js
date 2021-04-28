const express=require("express")
const captcha=require("svg-captcha")
// 引入上传插件
const multer=require("multer")
const {saveFile,alterFile}=require("./../utils/upload")
const upload=multer()
const router=express.Router()
const {selectImages,selectCount,searchImg,getImg,getAllLunBo,getAllimg} =require("../db/module/imgs")


// 文件上传

router.post("/upload",upload.fields([{name:"upload",maxCount:9}]),async (req,resp)=>{
   try{
    var files=req.files
    let cid=req.body.cid | 0;
    let datas= await saveFile(files["upload"])
    const {data}=datas;
    if(data.length>0){
        // 添加水印，
     let {status}=await alterFile(data,cid) 
      if(status===1){ 
          resp.json({ 
              status:1,
              message:"上传成功！"
          })
      }
    }

   }catch(err){
    console.log(err)
    resp.json({
        status:0,
        message:err
    })

   }

})


// 文件下载


router.post("/down",(req,resp)=>{
    resp.download("imgs/f6ac2c70b2694d45a5c2e643c9282193.jpg")

    resp.json({
        status:1,
        message:"成功"
    })


})



// 分类查询
// 分页查询
router.get("/getImgs", async(req,resp)=>{
    
    const {cid,current,single}=req.query
    try{
        let data= await selectImages(cid,current,single)
        resp.json(data)
    }catch(err){
        resp.json(err)
    }
})

// 分类查询所有条目

router.get("/getCount",async(req,resp)=>{
    const {cid}=req.query
   try{
    let data=await selectCount(cid)
    resp.json(data)
   }catch(err){
       resp.json(err)
   }

})

// 搜索模糊匹配
router.post("/search", async(req,resp)=>{

    const {keywords}=req.body
    console.log(req.body)
  try{
    let data= await searchImg(keywords)
    resp.json(data)
  }catch(err){
      resp.json(err)
  }


})

// 轮播图获取
router.get("/lunbotu", async(req,resp)=>{

  try{
    let data= await getImg()
    resp.json(data)
  }catch(err){
      resp.json(err)
  }
  })


// 管理员查询轮播图


router.get("/alllunbo", async(req,resp)=>{

  try{
    let data = await getAllLunBo()
    resp.json(data)
  }catch(err){
      resp.json(err)
  }
})
// 查询图片
router.get("/allimgs", async(req,resp)=>{

  try{
    let data = await getAllimg()
    resp.json(data)
  }catch(err){
      resp.json(err)
  }
})
module.exports=router