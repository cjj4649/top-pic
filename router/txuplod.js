// 腾讯云 COS 的使用
const express = require('express');
const router = express.Router();
const fs = require('fs');
const COS = require('cos-nodejs-sdk-v5');
const connection = require("../db/connection")
const { getCurrentTime } = require("../utils/date")
const { getdesc } = require("../router/getdesc")


// const upload=multer()

const cos = new COS({
  SecretId: 'AKIDnM2qPmp2weFuFQbYXKrJXXS7fQvSwVYb',
  SecretKey: 'PvCE3l0k041iBPNAj8INI2d3encEbjle',
});

const tengxun_cos = {
  Bucket: 'toppic-1304218270',
  Region: 'ap-nanjing',
}
const multer = require('multer');
const { default: axios } = require('axios');
const upload = multer({ dest: 'uploads/' })
// 图片上传
router.post('/tengxun/upload', upload.single('file'), function (req, res, next) {
  // 图片数据流

  // 文件路径
  const filePath = './' + req.file.path;
  // 文件类型
  const temp = req.file.originalname.split('.');
  const fileType = temp[temp.length - 1];
  const lastName = '.' + fileType;
  // 构建图片名
  const fileName = './lunbo/' + new Date().getTime() + lastName;
  // 图片重命名
  fs.rename(filePath, fileName, (err) => {
    if (err) {
      throw err
      // res.end(JSON.stringify({status:'102',msg:'文件写入失败'}));
    } else {
      let localFile = './' + fileName;
      let key = fileName;
      // 腾讯云 文件上传
      let params = {
        Bucket: tengxun_cos.Bucket,                         /* 必须 */
        Region: tengxun_cos.Region,                         /* 必须 */
        Key: key,                                           /* 必须 */
        FilePath: localFile,                                /* 必须 */
      }
      cos.sliceUploadFile(params, function (err, data) {
        if (err) {
          fs.unlinkSync(localFile);
          res.send({ code: '100001', message: '上传失败', error: JSON.stringify(err) });
        } else {
          fs.unlinkSync(localFile);
          let imageSrc = 'https://' + tengxun_cos.Bucket + '.cos.' + tengxun_cos.Region + '.myqcloud.com/' + data.Key;

          const time = getCurrentTime()
          connection.query("insert into lunbo(url,state,time) values(?,?,?)", [imageSrc, 1, time], (err, data) => {

            if (!err) {
              res.send({ code: '1', message: '上传数据库成功', url: imageSrc });
              console.log(imageSrc)
            }
          })

        }
      });
    }
  })
})

router.post('/tengxun/uploadimg', upload.single('file'), function (req, res, next) {
  // 图片数据流

  // 文件路径
  const filePath = './' + req.file.path;
  // 文件类型
  const temp = req.file.originalname.split('.');
  const fileType = temp[temp.length - 1];
  const lastName = '.' + fileType;
  // 构建图片名
  const fileName = './imgs/' + new Date().getTime() + lastName;
  // 图片重命名
  fs.rename(filePath, fileName, (err) => {
    if (err) {
      throw err
      // res.end(JSON.stringify({status:'102',msg:'文件写入失败'}));
    } else {
      let localFile = './' + fileName;
      let key = fileName;
      // 腾讯云 文件上传
      let params = {
        Bucket: tengxun_cos.Bucket,                         /* 必须 */
        Region: tengxun_cos.Region,                         /* 必须 */
        Key: key,                                           /* 必须 */
        FilePath: localFile,                                /* 必须 */
      }
      cos.sliceUploadFile(params, function (err, data) {
        if (err) {
          fs.unlinkSync(localFile);
          res.send({ code: '100001', message: '上传失败', error: JSON.stringify(err) });
        } else {
          fs.unlinkSync(localFile);
          let imageSrc = 'https://' + tengxun_cos.Bucket + '.cos.' + tengxun_cos.Region + '.myqcloud.com/' + data.Key;
          getdesc(imageSrc, fileName).then(value => {
            let syurl = imageSrc + '?watermark/2/text/VG9w5Zu-/fill/IzNEM0QzRA/fontsize/150/dissolve/50/gravity/northeast/dx/100/dy/100/batch/1/degree/45';
            const time = getCurrentTime()
            let desc = value.map(item => {
              return item.name
            })
            let cid = value.map(item => {
              return item.cid
            })
            // connection.query("insert into class(cid,name,state) values(?,?,?)", [, , 1], (err, data) => {
            //   if (!err) {
            //     res.send({ code: '1', message: '上传数据库成功', url: imageSrc });

            //   } else {
            //     console.log(err)
            //   }
            // })
            desc = desc.toString()
            cid = cid.toString()
            connection.query("insert into imgs(url,syimg,descs,cid,state,time) values(?,?,?,?,?,?)", [imageSrc, syurl, desc, cid, 1, time], (err, data) => {
              if (!err) {
                res.send({ code: '1', message: '上传数据库成功', url: imageSrc });

              } else {
                console.log(err)
              }
            })
            for (let i = 0; i < value.length; i++) {
              connection.query("insert ignore into class(cid,name) values(?,?)", [value[i].cid, value[i].name], (err, data) => {
                if (err) {         
                  console.log(err)
                }
              })
            }

          })

        }
      });
    }
  })
})

router.post("/tengxun/callback", function (req, res, next) {
  // 图片数据流
  res.send({ code: "200" })
})
module.exports = router