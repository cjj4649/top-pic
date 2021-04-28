const request = require("request")
var http = require('http')
const COS = require('cos-nodejs-sdk-v5');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


function getdesc(url, filename) {
  let filenames = filename.substr(2);
  let urls = url + '?ci-process=detect-label'
  console.log(urls)
  let Authorizations = COS.getAuthorization({

    SecretId: 'AKIDnM2qPmp2weFuFQbYXKrJXXS7fQvSwVYb',
    SecretKey: 'PvCE3l0k041iBPNAj8INI2d3encEbjle',
    Method: 'GET',
    Key: filenames,
  });


  return new Promise((reslove, reject) => {
    request({
      method: "GET",
      url: urls,
      headers: {//设置请求头
        "Authorization": Authorizations,
      },

    }, (err, data, resp) => {
      if (!err) {
        const document = new JSDOM(resp).window.document
        let data= [];
        let cids = document.querySelectorAll("Confidence")
        let names = document.querySelectorAll('Name')
        for(let i=0; i< cids.length;i++) {
          data[i]={cid:cids[i].textContent,name:names[i].textContent}
        }
        reslove(data)
      }
      else {
        reject({
          status: 0,
          message: "查询失败!"
        })
      }
    })

  })


}
module.exports = {
  getdesc
}