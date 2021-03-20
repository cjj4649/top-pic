const connection= require("../connection")
const moment=require("moment");
moment.locale("zh-ch")
const dates=moment()
// 加入图片文件

function addImages(imgs){
    const {fileName,size,syfileName,endType,desc,cid}=imgs
  
    return new Promise((reslove,reject)=>{
        connection.query("insert into imgs(imgurl,syimg,descs,grad,intro,time,size,cid) values(?,?,?,?,?,?,?,?)",["imgs/"+fileName,"syimg/"+syfileName,desc
   ,1,"",addTime(),size,cid],(err,data)=>{
        if(!err){
            reslove({
                status:1,
                message:"上传服务器成功！"
            })
        }else {
            console.log(err)
            // reject({
            //     status:0,
            //     message:"上传服务器出错！"
            // })
        }

    })



    })



}


function addTime(){
 const time=dates.format("YYYY-MM-DD hh:mm:ss")

return time;
}


// 分页查询数据

function selectImages(cid,current,single=5){
   
    return new Promise((reslove,reject)=>{

        connection.query("select * from imgs where cid=? limit ?,?",[cid,current*single,Number(single)],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    list:data,
                    current,
                    single
                })
            }else {
                // reject({
                //     status:0,
                //     message:"查询失败！"
                // })
                console.log(err)
            }


        })

    })


}

// 分类所有条数数据

function selectCount(cid){
 
    return new Promise((reslove,reject)=>{
        connection.query("select count(*) from imgs where cid=?",[cid],(err,data)=>{
            if(!err) {
                console.log(data)
                reslove({
                    status:1,
                    count:data[0]["count(*)"]
                })
            }else {
                reject({
                    status:0,
                    message:"查询失败"
                })
            }
    
        })
    })


}

// 搜索查询

function searchImg(keyword){
    return new Promise((reslove,reject)=>{
        connection.query("select * from imgs where descs like ?",[`%${keyword}%`],(err,data)=>{

            if(!err){
                reslove({
                    status:1,
                    list:data
                })
            }else {
                // reject({
                //     status:0,
                //     message:"查询失败！"
                // })
                console.log(err)
            }

        })



    })
}

module.exports={
    addImages,
    addTime,
    selectImages,
    selectCount,
    searchImg

}