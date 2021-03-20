const jsonwebtoken= require("jsonwebtoken")



// 生成token

function addToken(user){

    return new Promise((reslove,reject)=>{
        jsonwebtoken.sign(user,"allimgs",{expiresIn :"7 s"},(err,data)=>{

            if(!err) {
                user["token"]=data
                reslove({
                    status:1,
                    ...user
                });
            }else {
                reject({
                    status:0,
                    message:"error"
                })
            }
        })
    })
}

// 解密token


function devToken(token){

   return new Promise((reslove,reject)=>{

    if(typeof(token)!=='string'){
        reslove ({
            status:0,
            message:"请传入token格式的数据"
        })
    }
    // 解密token
    
     jsonwebtoken.verify(token,"allimgs",(err,data)=>{
         if(!err){
             reslove(data);
         }else {
             reject({
                 status:0,
                 message:"身份验证失败，请重新授权"
             })
         }
     })
   })
    
}

module.exports={
    addToken,
    devToken
}