// 数据库连接配置


const dbConnection={ host:'localhost',       
'user':'root',              
'password': '123456',       
'port':'3306',                   
'database':'picture'
}

// 配置上传过滤器
const uploadFilter=[".jpg",".png",".jpeg"]

module.exports={
    dbConnection,
    uploadFilter,
}



