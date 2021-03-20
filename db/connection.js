const mysql= require("mysql");
const {dbConnection} =require("../config/config")
const connection= mysql.createConnection(dbConnection);
connection.connect();


module.exports=connection