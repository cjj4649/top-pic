const request= require("request")
const axios =require("axios")
const cheerio=require("cheerio")
const fs=require("fs")


const base_url="https://ai.baidu.com/aidemo"

// 图片分类

function aidemo(img,url=base_url){
return new Promise((reslove,reject)=>{
    request({
        method:"post",
        url,
        form:{
            image:img, 
            image_url: "",
            type: "advanced_general",
            baike_num: 1
        },
    
    },(err,data,resp)=>{
        if(!err){
            // console.log(data)
            // let datas=JSON.parse(data["body"])["data"]
            reslove(JSON.parse(resp)["data"])
           
        }
        else {
            reject({
                status:0,
                message:"查询失败!"
            })
        }
    })

})


}


// parse
// let data= fs.readFileSync("imgs/666.jpg",{})

// aidemo("data:image/png;base64,"+data.toString("base64"))
// .then(resp=>console.log(resp))
module.exports={
    aidemo
}