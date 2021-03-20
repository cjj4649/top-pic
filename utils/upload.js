const fs= require("fs")
const path=require("fs")
const {uploadFilter}=require("../config/config")
const images=require("images")
const {addUUid}=require("./md5anduuid")
const {aidemo}=require("../spider/imgs")
const {addImages}=require("../db/module/imgs")
// 处理文件上传并保存

function saveFile(files){
   
    return new Promise((reslove,reject)=>{
        try{
            if(!fs.existsSync("public/imgs")){
                fs.mkdirSync("public/imgs")
            }
            let length=files.length
            let success=0
            let data=[]
            files.forEach(item => {
                const {originalname,buffer,size}=item
                let realName=originalname.substring(0,originalname.lastIndexOf("."))
                let endType=originalname.substring(originalname.lastIndexOf("."))   
                if(uploadFilter.indexOf(endType)!==-1){ 
                    let fileName=addUUid()+endType;
                     fs.writeFileSync(`public/imgs/${fileName}`,buffer,{})
                    
                     success++;
                     data.push({
                        fileName,
                        size,
                        realName,
                        endType
                     })
                }
            });
            reslove({
                status:1,
                total:length,
                success,
                data
            })
        }catch{

            reject({
                status:0,
                message:"解析出错"
            })
        }
    })
}
// saveFile()
async function alterFile(data,cid){
   return new Promise(async (reslove,reject)=>{
    try{
        for(const item of data){
            let {syfileName}= await addSy(item)
            item["syfileName"]=syfileName
            // ai检测
           let base64= fs.readFileSync("public/syimgs/"+syfileName,{encoding:"base64"})
            let {result}=await aidemo("data:image/png;base64,"+base64);
            let desc="";
            
             if(result.length>0){
                desc=result.reduce((str,item)=>{
                    str+=(item["root"]+item["keyword"])
                    return str;
                },"")
             }  
             item["desc"]=desc
             item["cid"]=cid;
             let results=await addImages(item)    //加入数据库 
         }
          reslove({
              status:1,
              ...data
          })
        }catch(error){
            reject(error)
         }
    
        




   })


}
// 添加水印文件
function addSy(item){
    const{fileName,endType}=item
    return new Promise((reslove,reject)=>{
        try{
            let startImg=images("public/imgs/"+fileName);
            let syImg=images("public/sy/sy.png");
            let syfileName=addUUid()+endType;
            startImg.draw(syImg,startImg.width()/2,startImg.height()/2)
            .save(`public/syimgs/${syfileName}`)
         
            reslove({
                status:1,
                syfileName
            })
        }catch{
            reject({
                status:0,
                message:"error"
            })

        }



    })
}


module.exports={
    saveFile,alterFile
}
