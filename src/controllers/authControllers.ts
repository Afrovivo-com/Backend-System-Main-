import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors";
import { loginService, registerService } from "../services/authService";

export async function loginController(request:Request, response:Response) {
    try {
        const foundUser = await loginService(request.body);
        return response.status(200).send(foundUser);
    } catch (error) {
        return response.sendStatus(403);
    }
}

export async function registerController(request:Request, response:Response) {
    try {
        const newUser = await registerService(request.body);
        return response.status(201).send(newUser);
    } catch(error) {
        return response.sendStatus(403);
    }
}