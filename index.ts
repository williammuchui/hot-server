const express = require("express");
const app = express();
import db from "./db.ts";
const PORT = 3000;
app.use(express.json());

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

app.post("/customer", (req: any, res: any):any =>{
    const {NAME, AGE, SALARY, CONTACT, ADDRESS} = req.body;
    const query = "INSERT INTO CUSTOMERS(NAME, AGE, SALARY, CONTACT, ADDRESS) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [NAME, AGE, SALARY, CONTACT, ADDRESS], (err:any, result:any):any =>{
        if(err) return res.status(500).json({message: "Internal server error", err: err});
        if(result.affectedRows === 0) return res.status(404).json({message: "Customer not created"});
        return res.status(201).json({message: "Customer created successfully"});
    });
});

app.post("/update/:id", (req: any, res:any):any =>{
    const {id} = req.params;
    const {NAME, AGE, SALARY, CONTACT, ADDRESS} = req.body;
    const query = "UPDATE CUSTOMERS SET NAME = ?, AGE = ?, SALARY = ?, CONTACT = ?, ADDRESS = ? WHERE ID = ?";
    db.query(query, [NAME, AGE, SALARY, CONTACT, ADDRESS, id], (err:any, result:any):any =>{
        if (err) return res.status(500).json({message: "Customer not found", err: err});
        if(result.affectedRows === 0) return res.status(404).json({message: "Customer not found"});
        return res.status(200).json({message: "Customer updated successfully"});
    });
});

app.delete("/delete/:id", (req: any, res: any): any =>{
    const {id} = req.params;
    const query = "DELETE FROM CUSTOMERS WHERE ID = ?";
    db.query(query, [id], (err:any, result:any): any =>{
        if(err) return res.status(500).json({message: "Internal server error", err:err});
        if(result.affectedRows === 0) return res.status(404).json({message: "Customer not found"});
        return res.status(200).json({message: "Customer deleted successfully"});
    });
});


app.listen(PORT, ()=> console.log("Server listening at port 3000"));
