const connection = require("../connection")
const { getCurrentTime } = require("../../utils/date")
const { addUUid, addMd5 } = require("../../utils/md5anduuid")


// 用户注册


function register(user) {

  const { username, password, name } = user;
  let time = getCurrentTime();
  let grad = 0; //0默认权限 1vip权限
  return new Promise((reslove, reject) => {
    // 
    connection.query("select * from user where username=?", [username], (err, data) => {
      if (!err) {
        if (data.length === 0) {
          //    验证成功 加入数据库
          connection.query("insert into user(username,password,time,grad,name) values(?,?,?,?,?)", [username, addMd5(password), time, grad, name], (err, data) => {
            if (!err) {
              reslove({
                status: 1,
                message: "注册成功"
              })
            } else {
              reject({
                status: -1,
                message: "出现错误，注册异常"
              })
              console.log(err)
            }
          })
        } else {
          reslove({
            status: 0,
            message: "用户名已经存在"
          })
        }

      } else reject({
        status: -1,
        message: "出现错误,注册失败！"

      })


    })


  })


}


// 用户登陆


function login(username, password) {

  return new Promise((reslove, reject) => {
    connection.query("select * from user where username=? and password=?", [username, addMd5(password)], (err, data) => {

      if (!err) {
        if (data.length !== 0) {
          reslove({
            status: 1,
            message: "登陆成功",
            user: data[0]
          })
        } else {
          reslove({
            status: 0,
            message: "用户名或者密码不存在！"
          })
        }

      } else {
        reject({
          status: -1,
          message: "出现错误，登陆异常！"
        })
      }

    })


  })


}
// 用户查询
function getuser() {

  return new Promise((reslove, reject) => {
    connection.query("select * from user ", (err, data) => {

      if (!err) {
        if (data.length !== 0) {
          reslove({
            status: 1,
            message: "查询成功",
            data: data
          })
        } else {
          reslove({
            status: 0,
            message: "查询失败"
          })
        }

      } else {
        reject({
          status: -1,
          message: "出现错误，登陆异常！"
        })
      }

    })


  })

}

// 菜单查询

function getmenu() {

  return new Promise((reslove, reject) => {
    connection.query("select * from menu ", (err, data) => {

      if (!err) {
        if (data.length !== 0) {
          reslove({
            status: 1,
            message: "查询成功",
            data: data
          })
        } else {
          reslove({
            status: 0,
            message: "查询失败"
          })
        }

      } else {
        reject({
          status: -1,
          message: "出现错误，登陆异常！"
        })
      }

    })


  })

}

// 状态修改
function change(database,state,id) {
  state = Math.abs(state-1)
  return new Promise((reslove, reject) => {
    connection.query('UPDATE ' +database+ ' SET state = '+state+ ' WHERE id ='+id, (err, data) => {

      if (!err) {
        if (data.length !== 0) {
          reslove({
            status: 1,
            message: "修改成功",
            data: data
          })
        } else {
          reslove({
            status: 0,
            message: "修改失败"
          })
        }

      } else {
        console.log(err)
        reject({
      
          status: -1,
          message: "出现错误，登陆异常！"
        })
      }

    })


  })

}
module.exports = {
  register,
  login,
  getuser,
  getmenu,
  change
}
// register({username:"admin20",password:"admin66"})
// .then(resp=>console.log(resp))
// .catch(error=>console.log(error))