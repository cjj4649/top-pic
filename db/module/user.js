const connection=require("../connection")
const {getCurrentTime}=require("../../utils/date")
const {addUUid,addMd5}=require("../../utils/md5anduuid")


// 用户注册


 function register(user){
 
    const {username,password}=user;
    let time=getCurrentTime();
    let grad=0; //0默认权限 1vip权限
    return new Promise((reslove,reject)=>{
        // 
        connection.query("select * from user where username=?",[username],(err,data)=>{
            if(!err){
               if(data.length===0){
        //    验证成功 加入数据库
                connection.query("insert into user(username,password,time,grad) values(?,?,?,?)",[username,addMd5(password),time,grad],(err,data)=>{
                    if(!err) {
                        reslove({
                            status:1,
                            message:"注册成功"
                        })
                    }else {
                        reject({
                        status:-1,
                        message:"出现错误，注册异常"
                    })
                }
                })
               } else {
                reslove({
                    status:0,
                    message:"用户名已经存在"
                })
               }
               
            }else reject({
                status:-1,
                message:"出现错误,注册失败！"

            })


        })


    })


}


// 用户登陆


function login(username,password){

    return new Promise((reslove,reject)=>{
        connection.query("select * from user where username=? and password=?",[username,addMd5(password)],(err,data)=>{

            if(!err){
                if(data.length!==0){
                    reslove({
                        status:1,
                        message:"登陆成功",
                        user:data[0]
                    }) 
                }else {
                    reslove({
                        status:0,
                        message:"用户名或者密码不存在！"
                    })
                }

            }else {
                reject({
                    status:-1,
                    message:"出现错误，登陆异常！"
                })
            }

        })


    })


}

module.exports={
register,
login
}
// register({username:"admin20",password:"admin66"})
// .then(resp=>console.log(resp))
// .catch(error=>console.log(error))