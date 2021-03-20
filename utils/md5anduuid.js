const md5= require("md5")
const uuid=require("uuid")


// 生成md5



function addMd5(data){


    return md5(data)
}

// 生成uuid

function addUUid(){

    return uuid.v4().replace(/-/g,'');
    
}


module.exports={
    addMd5,
    addUUid
}


