const express = require("express");
const app = express();
import db from "./db.ts";
const PORT = 3000;

app.get("/", (req: any, res:any):any =>{
    const query = "SELECT * FROM CUSTOMERS";
    db.query(query, (err:any, result:any): any =>{
     if(err){
      return res.status(500).json(err);
     }
    return res.status(200).json(result);
    });
});
app.get("/customer/:id", (req:any, res: any): any =>{
    const {id} = req.params;
    const query = "SELECT * FROM CUSTOMERS WHERE ID = ?";
    db.query(query, [id], (err: any, result: any): any =>{
        if(err){
            return res.status(500).json(err);
        }
        if( result.length === 0){
            return res.status(404).json({message: "Customer not found"});
        }
        return res.status(200).json(result[0]);
    });
});

app.get("/:id", (req: any, res:any): any =>{
    const {id} = req.params;
    const query = "SELECT * FROM CUSTOMERS WHERE ID = ?";
    db.query(query, [id], (err:any, result:any):any =>{
        if(err) return res.status(500).json(err);
        if(result.length === 0) return res.status(404).json({message: "Customer not found"});
        return res.status(200).json(result[0]);
    });
});

app.listen(PORT, ()=> console.log("Server listening at port 3000"));
