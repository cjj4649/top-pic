


// 验证码中间件

function yzyzm(req,resp,next){
    const {yzm}=req.body
  
    if(!yzm){
        resp.json({
            status:0,
            message:"登陆失败，验证码为空！"
        })

    }else if((yzm!==req.session.yzm)){

        resp.json({
            status:0,
            message:"登陆失败，验证码输入错误！"
        })
    }else {
        next();
    }


}

module.exports=yzyzm;