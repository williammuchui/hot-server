const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "juan",
    password: "davinci1.",
    database: "CUSTOMER_INFO",
});

db.connect((err:any)=>{
    if(err){
        console.log("error connecting to db", err);
        return;
    }
    // console.log("connected to db");
});

export default db;
