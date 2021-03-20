const moment= require("moment")()
moment.locale("zh-cn")



// 获取当前时间


function getCurrentTime(){


    return moment.format("YYYY-MM-DD hh:mm:ss");
}


module.exports={
    getCurrentTime
}