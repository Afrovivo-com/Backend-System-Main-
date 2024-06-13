import { NextFunction, Request, Response } from "express";
import jwt from  "jsonwebtoken";

export const authenticateJWT = async(req:Request, res:Response, next:NextFunction)=>
    {
        const token = req.header('Authorization')?.split('')[1];
        if(!token)
            {
                res.status(401).json({message: "Access Denied"});
            }

            try {
                const verify = jwt.verify(token, process.env.SECRET_KEY!);
                (req as any).user = verified;
                next();
            } catch (error) {
                res.status(4004).json({message: "Invalid token"
                })
            }
    }