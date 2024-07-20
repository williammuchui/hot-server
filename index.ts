import express,{type Request, type Response , type Application} from 'express';
import authorization, {generateToken} from './middlewares/authorization.ts';
import dotenv from 'dotenv';
import db from "./db.ts";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT;
app.use(express.json());

app.post("/generate-token", (req: Request, res: Response): void =>{
    const { username } = req.body;
    if(!username) res.status(400).json({message: "username Required!"});

    const payload = {username};
    const token = generateToken(payload);
    res.json({token});
    return;
})

app.get("/", authorization,(req: Request, res:Response):void =>{
    const query = "SELECT * FROM CUSTOMERS LIMIT 20";
    db.query(query, (err:any, result:any): any =>{
     if(err){
    res.status(500).json(err);
    return;
     }
    res.status(200).json(result);
    return;
    });
});
app.get("/customer/:id", authorization,(req:Request, res: Response): void =>{
    const {id} = req.params;
    const query = "SELECT * FROM CUSTOMERS WHERE ID = ?";
    db.query(query, [id], (err: any, result: any): any =>{
        if(err){
            res.status(500).json(err);
            return;
        }
        if( result.length === 0){
            res.status(404).json({message: "Customer not found"});
            return;
        }
        res.status(200).json(result[0]);
        return;
    });
});

app.get("/:id", authorization,(req: Request, res:Response): void =>{
    const {id} = req.params;
    const query = "SELECT * FROM CUSTOMERS WHERE ID = ?";
    db.query(query, [id], (err:any, result:any):any =>{
        if(err){
            res.status(500).json(err); 
            return;
        }
        if(result.length === 0) {
            res.status(404).json({message: "Customer not found"});
            return;
        }
        res.status(200).json(result[0]);
        return
    });
});

app.post("/customer", authorization,(req: Request, res: Response):void =>{
    const {NAME, AGE, SALARY, CONTACT, ADDRESS} = req.body;
    const query = "INSERT INTO CUSTOMERS(NAME, AGE, SALARY, CONTACT, ADDRESS) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [NAME, AGE, SALARY, CONTACT, ADDRESS], (err:any, result:any):any =>{
        if(err) {
            res.status(500).json({message: "Internal server error", err: err});
            return;
        }
        if(result.affectedRows === 0) {
            res.status(404).json({message: "Customer not created"});
            return;
        }
        res.status(201).json({message: "Customer created successfully"});
        return;
    });
});

app.patch("/update/:id", authorization, (req: Request, res:Response):void =>{
    const {id} = req.params;
    const {NAME, AGE, SALARY, CONTACT, ADDRESS} = req.body;
    const query = "UPDATE CUSTOMERS SET NAME = ?, AGE = ?, SALARY = ?, CONTACT = ?, ADDRESS = ? WHERE ID = ?";
    db.query(query, [NAME, AGE, SALARY, CONTACT, ADDRESS, id], (err:any, result:any):any =>{
        if (err){
            res.status(500).json({message: "Internal Server Error", err: err});
            return;
        }
        if(result.affectedRows === 0) {
            res.status(404).json({message: "Customer not found"});
            return;
        }
        res.status(200).json({message: "Customer updated successfully"});
        return;
    });
});

app.delete("/delete/:id", authorization, (req: Request, res: Response): void =>{
    const {id} = req.params;
    const query = "DELETE FROM CUSTOMERS WHERE ID = ?";
    db.query(query, [id], (err:any, result:any): any =>{
        if(err) {
            res.status(500).json({message: "Internal server error", err:err});
            return;
        }
        if(result.affectedRows === 0) {
            res.status(404).json({message: "Customer not found"});
            return;
        }
        res.status(200).json({message: "Customer deleted successfully"});
        return;
    });
});


app.listen(PORT, ()=> console.log(`Server listening at port ${PORT}`));
