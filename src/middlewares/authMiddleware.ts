import { Request, Response, NextFunction } from "express";
import jwt, {Secret, JwtPayload } from "jsonwebtoken";

export const SECRET_KEY: Secret = 'jihakhi384q-4389yef8eih;v;ioew9ur83p';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export async function auth(request:Request, response:Response, next:NextFunction) {
    try
        {const token = request.header('Authorization')?.replace('Bearer', '');

        if (!token) {
            throw new Error("No token");
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        (request as CustomRequest).token = decoded;

        next();
        } catch(error) {
            response.status(401).send("Not authentication");
        }
}