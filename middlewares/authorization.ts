import {type Request, type Response, type NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.HOT_SERVER_SECRET_KEY!;

const authorization = (req: Request, res: Response, next: NextFunction): any =>{
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({message: "Authorization header missing!"});

    const token = authHeader.split(' ')[1];
    if(!token) return res.status(401).json({message: "Token missing!"});

    try{
        jwt.verify(token, SECRET_KEY);
        next();
    }catch(err:any){
        return res.status(401).json({message: "Invalid Token!"});
    }
};
type Payload = {
    username : string;
};
export const generateToken = (payload: Payload): string =>{
    return jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
}

export default authorization;